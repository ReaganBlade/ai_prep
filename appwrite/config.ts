// Appwrite configuration constants
export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  tablesDBId: process.env.NEXT_PUBLIC_APPWRITE_TABLES_DB_ID!,

  // Collections
  usersTableId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  interviewsTableId: process.env.NEXT_PUBLIC_APPWRITE_INTERVIEWS_COLLECTION_ID!,
  feedbackTableId: process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID!,
};

// Server-side configuration
export const APPWRITE_SERVER_CONFIG = {
  apiKey: process.env.APPWRITE_API_KEY!,
};
