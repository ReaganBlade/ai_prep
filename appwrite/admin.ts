import { Client, Account, TablesDB, Users } from "node-appwrite";

// Initialize Appwrite Admin SDK
function initAppwriteAdmin() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    account: new Account(client),
    tablesdb: new TablesDB(client),
    users: new Users(client),
  };
}

export const { account, tablesdb, users } = initAppwriteAdmin();
