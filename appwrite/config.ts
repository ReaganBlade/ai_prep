// Appwrite configuration constants
export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,

  // Collections
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  interviewsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_INTERVIEWS_COLLECTION_ID!,
  feedbackCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID!,
};

// Server-side configuration
export const APPWRITE_SERVER_CONFIG = {
  apiKey: process.env.APPWRITE_API_KEY!,
};
