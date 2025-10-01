import { Client, Account, Databases, Users } from "node-appwrite";

// Initialize Appwrite Admin SDK
function initAppwriteAdmin() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    account: new Account(client),
    databases: new Databases(client),
    users: new Users(client),
  };
}

export const { account, databases, users } = initAppwriteAdmin();
