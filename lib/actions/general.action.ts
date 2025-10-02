"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { ID, Query } from "node-appwrite";

import { tablesdb } from "@/appwrite/admin";
import { APPWRITE_CONFIG } from "@/appwrite/config";
import { feedbackSchema } from "@/constants";
// import { table } from "console";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let result;

    if (feedbackId) {
      // Update existing feedback
      // result = await databases.updateDocument(
      //   APPWRITE_CONFIG.databaseId,
      //   APPWRITE_CONFIG.feedbackCollectionId,
      //   feedbackId,
      //   feedback
      // );

      result = await tablesdb.updateRow({
        databaseId: APPWRITE_CONFIG.tablesDBId,
        tableId: APPWRITE_CONFIG.feedbackTableId,
        rowId: feedbackId,
        data: feedback,
      });

    } else {
      // Create new feedback
      // result = await databases.createDocument(
      //   APPWRITE_CONFIG.databaseId,
      //   APPWRITE_CONFIG.feedbackCollectionId,
      //   ID.unique(),
      //   feedback
      // );

      result = await tablesdb.createRow({
        databaseId: APPWRITE_CONFIG.tablesDBId,
        tableId: APPWRITE_CONFIG.feedbackTableId,
        rowId: ID.unique(),
        data: feedback
      });
    }

    return { success: true, feedbackId: result.$id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    // const interview = await databases.getDocument(
    //   APPWRITE_CONFIG.tablesDBId,
    //   APPWRITE_CONFIG.interviewsTableId,
    //   id
    // );

    const interview = await tablesdb.getRow({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.interviewsTableId,
      rowId: id,
    });

    console.log("Fetched interview:", interview);

    if (!interview) return null;

    // Extract only the relevant data for Interview type
    return {
      id: interview.$id,
      role: interview.role,
      level: interview.level,
      questions: interview.questions,
      techstack: interview.techstack,
      createdAt: interview.createdAt,
      userId: interview.userId,
      type: interview.type,
      finalized: interview.finalized,
    } as Interview;
  } catch (error) {
    console.error("Error getting interview:", error);
    return null;
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  try {
    // const feedbackList = await databases.listDocuments(
    //   APPWRITE_CONFIG.tablesDBId,
    //   APPWRITE_CONFIG.feedbackTableId,
    //   [
    //     Query.equal("interviewId", interviewId),
    //     Query.equal("userId", userId),
    //     Query.limit(1),
    //   ]
    // );

    const feedbackList = await tablesdb.listRows({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.feedbackTableId,
      queries: [
        Query.equal("interviewId", interviewId),
        Query.equal("userId", userId),
        Query.limit(1),
      ]
    })

    if (feedbackList.total === 0) return null;

    const feedbackDoc = feedbackList.rows[0];
    return {
      id: feedbackDoc.$id,
      interviewId: feedbackDoc.interviewId,
      totalScore: feedbackDoc.totalScore,
      categoryScores: feedbackDoc.categoryScores,
      strengths: feedbackDoc.strengths,
      areasForImprovement: feedbackDoc.areasForImprovement,
      finalAssessment: feedbackDoc.finalAssessment,
      createdAt: feedbackDoc.createdAt,
    } as Feedback;
  } catch (error) {
    console.error("Error getting feedback:", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  try {
    const interviews = await tablesdb.listRows({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.interviewsTableId,
      queries: [
        Query.equal("finalized", true),
        Query.notEqual("userId", userId),
        Query.orderDesc("createdAt"),
        Query.limit(limit),
      ],
    });

    // return interviews.document.map((doc) => ({
    return interviews.rows.map((doc) => ({
      id: doc.$id,
      role: doc.role,
      level: doc.level,
      questions: doc.questions,
      techstack: doc.techstack,
      createdAt: doc.createdAt,
      userId: doc.userId,
      type: doc.type,
      finalized: doc.finalized,
    })) as Interview[];
  } catch (error) {
    console.error("Error getting latest interviews:", error);
    return null;
  }
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    // const interviews = await databases.listDocuments(
    //   APPWRITE_CONFIG.tablesDBId,
    //   APPWRITE_CONFIG.interviewsTableId,
    //   [Query.equal("userId", userId), Query.orderDesc("createdAt")]
    // );

    const interviews = await tablesdb.listRows({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.interviewsTableId,
      queries: [
        Query.equal("userId", userId),
        Query.orderDesc("createdAt")
      ]
    })

    // return interviews.documents.map((doc) => ({
    return interviews.rows.map((doc) => ({
      id: doc.$id,
      role: doc.role,
      level: doc.level,
      questions: doc.questions,
      techstack: doc.techstack,
      createdAt: doc.createdAt,
      userId: doc.userId,
      type: doc.type,
      finalized: doc.finalized,
    })) as Interview[];
  } catch (error) {
    console.error("Error getting user interviews:", error);
    return null;
  }
}
