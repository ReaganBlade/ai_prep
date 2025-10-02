"use client";

import { account } from "@/appwrite/client";
import { signOut as serverSignOut } from "@/lib/actions/auth.action";

export async function clientSignOut() {
  try {
    // First, try to delete the current Appwrite session
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("No active Appwrite session to delete");
    }

    // Then call the server action to clear the cookie
    await serverSignOut();

    // Redirect to sign-in page
    window.location.href = "/sign-in";
  } catch (error) {
    console.error("Error during sign out:", error);
    // Even if there's an error, redirect to sign-in
    window.location.href = "/sign-in";
  }
}

export async function clearAllSessions() {
  try {
    // Delete all sessions for the current user
    await account.deleteSessions();
    console.log("All sessions cleared");
  } catch (error) {
    console.log("No sessions to clear or error clearing sessions:", error);
  }
}

export async function getCurrentSession() {
  try {
    return await account.getSession("current");
  } catch (error) {
    return null;
  }
}
