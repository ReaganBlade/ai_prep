"use server";

import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
// import { databases, users } from "@/appwrite/admin";
import { tablesdb, users } from "@/appwrite/admin";
import { APPWRITE_CONFIG } from "@/appwrite/config";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(session: string) {
  const cookieStore = await cookies();

  // Set cookie in the browser
  cookieStore.set("session", session, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
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

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    // In Appwrite, we'll need to parse the session data
    // This is a simplified approach - you might need to implement proper session validation
    const sessionData = JSON.parse(sessionCookie);
    const userId = sessionData.userId;

    if (!userId) return null;

    // Get user info from database
    // const userRecord = await databases.getDocument(
    //   APPWRITE_CONFIG.databaseId,
    //   APPWRITE_CONFIG.usersTableId,
    //   userId
    // );
    const userRecord = await tablesdb.getRow({
      databaseId: APPWRITE_CONFIG.tablesDBId,
      tableId: APPWRITE_CONFIG.usersTableId,
      rowId: userId,
    });

    return {
      id: userRecord.$id,
      name: userRecord.name,
      email: userRecord.email,
    } as User;
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
