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
    let userId: string;

    // Check if the session cookie is a JWT token or our custom JSON
    if (sessionCookie.startsWith("eyJ")) {
      // This is likely a JWT token from Appwrite
      console.log("Processing JWT session token");
      try {
        const appwriteUser = await validateAppwriteSession(sessionCookie);
        if (!appwriteUser) {
          console.log("Appwrite session validation returned null");
          cookieStore.delete("session");
          return null;
        }
        userId = appwriteUser.$id;
        console.log(
          "Successfully validated Appwrite session for user:",
          userId
        );
      } catch (validationError) {
        console.error("Appwrite session validation failed:", validationError);
        cookieStore.delete("session");
        return null;
      }
    } else {
      // Try to parse as our custom JSON format
      console.log("Processing custom JSON session");
      try {
        const sessionData = JSON.parse(sessionCookie);
        userId = sessionData.userId;
        console.log("Successfully parsed custom session for user:", userId);
      } catch (parseError) {
        console.error("Failed to parse custom session format:", parseError);
        cookieStore.delete("session");
        return null;
      }
    }

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
