"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export const getInterviewsByUserId = async (
  userId: string
): Promise<Interview[] | null> => {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  if (interviews.empty) {
    return null;
  }

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
};

export const getLatestInterviews = async (
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> => {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  if (interviews.empty) {
    return null;
  }

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
};

export const getInterviewById = async (
  id: string
): Promise<Interview | null> => {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
};

export const createFeedback = async (params: CreateFeedbackParams) => {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join(``);

    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
      You are an expert AI interviewer evaluating a mock interview transcript. Your task is to **critically and precisely** assess the candidate’s performance based on specific evaluation categories. Use a **strict scoring policy** to ensure fairness and clarity.
    
      🔴 Important Guidelines:
      - **Only assign high scores for strong, clearly demonstrated performance.**
      - If there is **insufficient evidence** in the transcript to evaluate a category, assign a **score of 0, 5, or 10 at most**—do **not** use placeholder scores like 50.
      - Be honest and professional. Avoid inflating scores based on assumptions or potential.
      - Provide a **specific justification** for every score, referencing content (or lack thereof) from the transcript.
    
      Transcript:
      ${formattedTranscript}
    
      Evaluation Categories (Score each from 0 to 100 with detailed justification):
      1. **Communication Skills**: Clarity, structure, and articulation of responses.
      2. **Technical Knowledge**: Demonstrated understanding of relevant concepts and ability to discuss them effectively.
      3. **Problem-Solving**: Analytical thinking and ability to approach and solve problems logically.
      4. **Cultural & Role Fit**: Alignment with company values and appropriateness for the role, based on what is said.
      5. **Confidence & Clarity**: Display of confidence, decisiveness, and clarity under pressure.
    
      Format your output like this:
      - **[Category Name]**: [Score]/100  
        *Justification:* [Detailed, specific reasoning with reference to the transcript.]
    
      End with a short summary (3–5 sentences) outlining overall performance, key strengths, and areas for improvement.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = await db.collection(`feedback`).add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      feedbackId: feedback.id,
    };
  } catch (e) {
    console.error(`Error Saving Feedback ${e}`);
    return {
      sucess: false,
      feedbackId: null,
    };
  }
};

export const getFeedbackByInterviewId = async (
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> => {
  const { interviewId, userId } = params;

  console.log(`FeedbackId: ${interviewId}, UserId: ${userId}`);

  const feedback = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  if (!interviewId || !userId) {
    console.warn("Missing interviewId or userId in getFeedbackByInterviewId:", {
      interviewId,
      userId,
    });
    return null;
  }

  if (feedback.empty) {
    return null;
  }

  const feedbackDoc = feedback.docs[0];

  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data(),
  } as Feedback;
};
