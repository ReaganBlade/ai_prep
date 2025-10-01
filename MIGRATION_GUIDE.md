# Migration Guide: Firebase to Appwrite

This guide outlines the complete migration from Firebase to Appwrite for the AI Mock Interviews application.

## What Was Changed

### 1. Dependencies

- **Removed**: `firebase`, `firebase-admin`
- **Added**: `appwrite`, `node-appwrite`

### 2. Configuration Files

- **Removed**: `firebase/admin.ts`, `firebase/client.ts`
- **Added**: `appwrite/admin.ts`, `appwrite/client.ts`, `appwrite/config.ts`

### 3. Authentication

- Migrated from Firebase Auth to Appwrite Auth
- Updated session management to use Appwrite sessions
- Modified user creation and authentication flow

### 4. Database Operations

- Migrated from Firestore to Appwrite Database
- Updated all CRUD operations for interviews and feedback
- Changed query syntax to Appwrite's Query API

## Required Appwrite Setup

### 1. Create Appwrite Project

1. Go to [Appwrite Cloud Console](https://cloud.appwrite.io/)
2. Create a new project
3. Note down your Project ID

### 2. Create Database and Collections

#### Database

Create a new database and note the Database ID.

#### Collections

**Users Collection:**

```json
{
  "name": "users",
  "attributes": [
    {
      "key": "name",
      "type": "string",
      "required": true,
      "size": 100
    },
    {
      "key": "email",
      "type": "string",
      "required": true,
      "size": 255
    }
  ],
  "indexes": [
    {
      "key": "email_index",
      "type": "key",
      "attributes": ["email"]
    }
  ]
}
```

**Interviews Collection:**

```json
{
  "name": "interviews",
  "attributes": [
    {
      "key": "role",
      "type": "string",
      "required": true,
      "size": 100
    },
    {
      "key": "level",
      "type": "string",
      "required": true,
      "size": 50
    },
    {
      "key": "type",
      "type": "string",
      "required": true,
      "size": 50
    },
    {
      "key": "techstack",
      "type": "string",
      "required": true,
      "array": true,
      "size": 50
    },
    {
      "key": "questions",
      "type": "string",
      "required": true,
      "array": true,
      "size": 1000
    },
    {
      "key": "userId",
      "type": "string",
      "required": true,
      "size": 50
    },
    {
      "key": "finalized",
      "type": "boolean",
      "required": true
    },
    {
      "key": "coverImage",
      "type": "string",
      "required": false,
      "size": 255
    },
    {
      "key": "createdAt",
      "type": "datetime",
      "required": true
    }
  ],
  "indexes": [
    {
      "key": "user_index",
      "type": "key",
      "attributes": ["userId"]
    },
    {
      "key": "finalized_index",
      "type": "key",
      "attributes": ["finalized"]
    },
    {
      "key": "created_index",
      "type": "key",
      "attributes": ["createdAt"],
      "orders": ["DESC"]
    }
  ]
}
```

**Feedback Collection:**

```json
{
  "name": "feedback",
  "attributes": [
    {
      "key": "interviewId",
      "type": "string",
      "required": true,
      "size": 50
    },
    {
      "key": "userId",
      "type": "string",
      "required": true,
      "size": 50
    },
    {
      "key": "totalScore",
      "type": "integer",
      "required": true
    },
    {
      "key": "categoryScores",
      "type": "string",
      "required": true,
      "size": 2000
    },
    {
      "key": "strengths",
      "type": "string",
      "required": true,
      "array": true,
      "size": 500
    },
    {
      "key": "areasForImprovement",
      "type": "string",
      "required": true,
      "array": true,
      "size": 500
    },
    {
      "key": "finalAssessment",
      "type": "string",
      "required": true,
      "size": 2000
    },
    {
      "key": "createdAt",
      "type": "datetime",
      "required": true
    }
  ],
  "indexes": [
    {
      "key": "interview_user_index",
      "type": "key",
      "attributes": ["interviewId", "userId"]
    }
  ]
}
```

### 3. Configure Permissions

Set appropriate read/write permissions for each collection based on your security requirements.

### 4. Generate API Key

Create an API key with appropriate permissions for server-side operations.

## Environment Variables

Update your `.env.local` file with these Appwrite variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
NEXT_PUBLIC_APPWRITE_INTERVIEWS_COLLECTION_ID=your_interviews_collection_id
NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID=your_feedback_collection_id

# Server-side Appwrite API Key
APPWRITE_API_KEY=your_api_key

# Other existing variables remain the same
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Data Migration

If you have existing data in Firebase, you'll need to migrate it to Appwrite:

1. Export data from Firebase Firestore
2. Transform data structure to match Appwrite collections
3. Import data using Appwrite's Import API or SDK

## Key Differences

### Authentication

- **Firebase**: Used Firebase Auth with ID tokens
- **Appwrite**: Uses Appwrite Auth with session-based authentication

### Database Queries

- **Firebase**: Firestore queries with `.where()`, `.orderBy()`
- **Appwrite**: Query builder with `Query.equal()`, `Query.orderDesc()`

### Session Management

- **Firebase**: Server-side session cookies with Firebase Admin SDK
- **Appwrite**: Session data stored in cookies, validated through Appwrite

## Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Interview creation works
- [ ] Interview retrieval works
- [ ] Feedback generation works
- [ ] Feedback retrieval works
- [ ] Session management works
- [ ] User authentication persists across page reloads

## Troubleshooting

### Common Issues

1. **Collection permissions**: Ensure proper read/write permissions are set
2. **Index creation**: Make sure all required indexes are created
3. **Environment variables**: Double-check all environment variables are set correctly
4. **API key permissions**: Ensure the API key has sufficient permissions for all operations

### Error Handling

The migration includes improved error handling for Appwrite-specific error codes:

- `409`: Resource conflict (user already exists)
- `401`: Unauthorized (invalid credentials)
- `404`: Resource not found

## Benefits of Migration

1. **Open Source**: Appwrite is open-source and self-hostable
2. **Better Developer Experience**: More intuitive API and better documentation
3. **Built-in Features**: Built-in user management, real-time features
4. **Cost Effective**: More predictable pricing
5. **Privacy Focused**: Better data privacy and control
