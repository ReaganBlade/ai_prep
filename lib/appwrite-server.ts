import { Client, Account } from "node-appwrite";

// Server-side Appwrite client for session validation
export function createServerAppwriteClient(sessionToken?: string) {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    console.error("Missing Appwrite configuration:", { endpoint, projectId });
    throw new Error("Appwrite configuration is missing");
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  if (sessionToken) {
    client.setSession(sessionToken);
  }

  return {
    account: new Account(client),
  };
}

// Validate session token with Appwrite
export async function validateAppwriteSession(sessionToken: string) {
  try {
    if (!sessionToken || sessionToken.trim() === "") {
      console.error("Invalid session token provided");
      return null;
    }

    const { account } = createServerAppwriteClient(sessionToken);
    const user = await account.get();

    console.log("Session validation successful for user:", user.$id);
    return user;
  } catch (error: any) {
    console.error("Session validation failed:", {
      error: error.message,
      code: error.code,
      type: error.type,
    });
    return null;
  }
}
