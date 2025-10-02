#!/usr/bin/env node

/**
 * Appwrite Setup Validation Script
 * Run this script to validate your Appwrite configuration
 */

const { Client, Databases, Users } = require("node-appwrite");

async function validateAppwriteSetup() {
  console.log("🚀 Validating Appwrite Setup...\n");

  // Check environment variables
  const requiredEnvVars = [
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
    "NEXT_PUBLIC_APPWRITE_DATABASE_ID",
    "NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_INTERVIEWS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID",
    "APPWRITE_API_KEY",
  ];

  console.log("📋 Checking environment variables...");
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error("❌ Missing environment variables:");
    missingVars.forEach((varName) => console.error(`   - ${varName}`));
    process.exit(1);
  }
  console.log("✅ All environment variables are set\n");

  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  const users = new Users(client);

  try {
    // Test database connection
    console.log("🔗 Testing database connection...");
    await databases.get(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
    console.log("✅ Database connection successful\n");

    // Test collections exist
    console.log("📚 Checking collections...");
    const collections = [
      {
        name: "Users",
        id: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
      },
      {
        name: "Interviews",
        id: process.env.NEXT_PUBLIC_APPWRITE_INTERVIEWS_COLLECTION_ID,
      },
      {
        name: "Feedback",
        id: process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID,
      },
    ];

    for (const collection of collections) {
      try {
        await databases.getCollection(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          collection.id
        );
        console.log(`✅ ${collection.name} collection exists`);
      } catch (error) {
        console.error(
          `❌ ${collection.name} collection not found or inaccessible`
        );
        console.error(`   Collection ID: ${collection.id}`);
      }
    }

    console.log("\n🎉 Appwrite setup validation completed!");
    console.log("🚀 Your application should now work with Appwrite.");
  } catch (error) {
    console.error("❌ Appwrite connection failed:");
    console.error(`   Error: ${error.message}`);
    console.error("   Please check your configuration and try again.");
    process.exit(1);
  }
}

// Load environment variables from .env.local if running directly
if (require.main === module) {
  require("dotenv").config({ path: ".env.local" });
  validateAppwriteSetup();
}

module.exports = { validateAppwriteSetup };
