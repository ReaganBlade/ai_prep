"use server";

import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
// import { databases, users } from "@/appwrite/admin";
import { tablesdb, users } from "@/appwrite/admin";
import { APPWRITE_CONFIG } from "@/appwrite/config";
import { validateAppwriteSession } from "@/lib/appwrite-server";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(session: string) {
  const cookieStore = await cookies();

  console.log("Setting session cookie:", {
    sessionLength: session?.length,
    sessionStart: session?.substring(0, 20),
    isProduction: process.env.NODE_ENV === "production",
  });

  // Set cookie in the browser
  cookieStore.set("session", session, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  console.log("Session cookie set successfully");
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // Check if user exists in database
    // const existingUsers = await databases.listDocuments(
    //   APPWRITE_CONFIG.databaseId,
    //   APPWRITE_CONFIG.usersTableId,
    //   [Query.equal("email", email)]
    // );

    const existingUsers = await tablesdb.listRows({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.usersTableId,
      queries: [Query.equal("email", email)],
    });

    if (existingUsers.total > 0) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    // Create user document in database
    // await databases.createDocument(
    //   APPWRITE_CONFIG.databaseId,
    //   APPWRITE_CONFIG.usersTableId,
    //   uid,
    //   {
    //     name,
    //     email,
    //   }
    // );
    await tablesdb.createRow({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.usersTableId,
      rowId: uid,
      data: {
        name,
        email,
      },
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, session } = params;

  console.log("signIn called with:", {
    email,
    sessionLength: session?.length,
    sessionStart: session?.substring(0, 20),
  });

  try {
    // Check if user exists
    // const existingUsers = await databases.listDocuments(
    //   APPWRITE_CONFIG.databaseId,
    //   APPWRITE_CONFIG.usersTableId,
    //   [Query.equal("email", email)]
    // );

    const existingUsers = await tablesdb.listRows({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.usersTableId,
      queries: [Query.equal("email", email)],
    });

    if (existingUsers.total === 0) {
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };
    }

    await setSessionCookie(session);

    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error: any) {
    console.error("Sign in error:", error);

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  try {
    // Also try to delete the Appwrite session if possible
    // Note: This is a server action, so we can't directly access the client account
    // The client should handle deleting the Appwrite session
    cookieStore.delete("session");

    return {
      success: true,
      message: "Signed out successfully.",
    };
  } catch (error) {
    console.error("Sign out error:", error);
    // Still delete the cookie even if there's an error
    cookieStore.delete("session");

    return {
      success: true,
      message: "Signed out successfully.",
    };
  }
}

// Helper function to safely parse session data
async function parseSessionSafely(
  sessionCookie: string
): Promise<string | null> {
  // First, try to detect if it's a JWT token
  const isJWT =
    sessionCookie.startsWith("eyJ") ||
    (sessionCookie.includes(".") && sessionCookie.split(".").length === 3) ||
    (!sessionCookie.startsWith("{") && !sessionCookie.startsWith("["));

  if (isJWT) {
    console.log("Detected JWT token, validating with Appwrite");
    try {
      const appwriteUser = await validateAppwriteSession(sessionCookie);
      return appwriteUser?.$id || null;
    } catch (error) {
      console.error("JWT validation failed:", error);
      return null;
    }
  } else {
    console.log("Detected JSON format, parsing");
    try {
      const sessionData = JSON.parse(sessionCookie);
      return sessionData.userId || null;
    } catch (error) {
      console.error("JSON parsing failed, trying as JWT:", error);
      // Fallback: try as JWT if JSON parsing fails
      try {
        const appwriteUser = await validateAppwriteSession(sessionCookie);
        return appwriteUser?.$id || null;
      } catch (jwtError) {
        console.error("JWT fallback also failed:", jwtError);
        return null;
      }
    }
  }
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    console.log("No session cookie found");
    return null;
  }

  console.log(
    "Session cookie found, length:",
    sessionCookie.length,
    "starts with:",
    sessionCookie.substring(0, 10)
  );

  try {
    // Use the safe parsing helper
    const userId = await parseSessionSafely(sessionCookie);

    if (!userId) {
      console.log("No userId found in session");
      cookieStore.delete("session");
      return null;
    }

    // Get user info from database
    console.log("Fetching user data from database for:", userId);
    const userRecord = await tablesdb.getRow({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.usersTableId,
      rowId: userId,
    });

    console.log("Successfully fetched user data:", userRecord.$id);
    return {
      id: userRecord.$id,
      name: userRecord.name,
      email: userRecord.email,
    } as User;
  } catch (error) {
    console.error("Session verification error:", error);
    cookieStore.delete("session");
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
