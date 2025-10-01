<div align="center">
  <br />
  <a href="https://prepwise-ai.vercel.## 🔋 Features

### 🎯 Core Functionality

#### 🔐 **Secure Authentication**

- User registration and login powered by Appwrite Auth
- Session-based authentication with secure cookie management
- Password reset and account recovery options

#### 🎤 **AI-Powered Voice Interviews**

- Real-time voice conversations with AI interviewers
- Support for technical, behavioral, and mixed interview types
- Customizable interview questions based on role and experience level
- Natural conversation flow with follow-up questions

#### 📊 **Intelligent Feedback System**

- Comprehensive performance analysis across 5 key categories:
  - Communication Skills
  - Technical Knowledge
  - Problem-Solving Abilities
  - Cultural Fit Assessment
  - Confidence and Clarity
- Detailed scoring (0-100) with specific improvement suggestions
- Strengths and areas for improvement identification

#### 📈 **Interview Management**

- Personal interview dashboard with complete history
- Interview creation with role-specific question generation
- Progress tracking and performance analytics
- Retake interviews to measure improvement

#### 🎨 **User Experience**

- Modern, responsive design that works on all devices
- Dark theme optimized for comfortable extended use
- Intuitive navigation and clean interface
- Real-time transcription during interviews

### 🌟 Advanced Features

- **Tech Stack Recognition**: Automatic icon generation for various technologies
- **Interview Covers**: Dynamic cover images for different interview types
- **Session Management**: Persistent login with secure session handling
- **Performance Analytics**: Track your progress over multiple interviews
- **Mobile Optimized**: Full functionality on smartphones and tablets

---="\_blank">
<img src="https://github.com/user-attachments/assets/1c0131c7-9f2d-4e3b-b47c-9679e76d8f9a" alt="PrepWise Banner" width="100%" />
</a>
<br />

  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="Vapi" />
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="Appwrite" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
  </div>

  <h1 align="center">PrepWise</h1>
  <p align="center">
    <strong>AI-Powered Job Interview Preparation Platform</strong><br>
    Practice real interviews with AI voice agents and get instant feedback
  </p>

  <p align="center">
    <a href="#-features"><strong>Features</strong></a> •
    <a href="#-quick-start"><strong>Quick Start</strong></a> •
    <a href="#-tech-stack"><strong>Tech Stack</strong></a> •
    <a href="#-deployment"><strong>Deployment</strong></a>
  </p>
</div>

---

## 🤖 Introduction

**PrepWise** is a cutting-edge interview preparation platform that revolutionizes how job seekers practice and improve their interview skills. Using advanced AI voice agents powered by Vapi and Google Gemini, PrepWise provides realistic mock interview experiences with instant, detailed feedback.

### 🎯 What Makes PrepWise Special?

- **🎙️ Real Voice Interactions**: Practice with AI interviewers that speak and listen naturally
- **📊 Intelligent Feedback**: Get detailed analysis of your communication, technical knowledge, and confidence
- **🚀 Comprehensive Coverage**: Support for technical, behavioral, and mixed interview types
- **📈 Progress Tracking**: Monitor your improvement over time with detailed interview history
- **🎨 Modern Interface**: Clean, responsive design that works seamlessly across all devices

Built with modern technologies including **Next.js 15**, **Appwrite**, **TailwindCSS**, and **Vapi AI**, PrepWise delivers a professional-grade interview preparation experience that helps candidates land their dream jobs.

---

## ⚙️ Tech Stack

### Frontend & Framework

- **Next.js 15** — Full-stack React framework with App Router
- **TypeScript** — Type-safe development experience
- **TailwindCSS** — Utility-first CSS framework for rapid UI development
- **Shadcn/UI** — Modern, accessible component library

### Backend & Database

- **Appwrite** — Open-source backend-as-a-service for authentication and database
- **Node.js** — Server-side runtime environment

### AI & Voice

- **Vapi AI** — Advanced voice agent APIs for realistic interview conversations
- **Google Gemini** — Generative AI for intelligent feedback and analysis

### Development Tools

- **Zod** — Schema validation for type-safe data handling
- **React Hook Form** — Performant forms with easy validation
- **ESLint & Prettier** — Code quality and formatting tools

---

## 🔋 Features

### 🎯 Core Highlights:

- **Secure Authentication** — Sign up or log in using Firebase’s robust auth system.
- **AI-Powered Mock Interviews** — Create and take interviews with intelligent voice agents.
- **Real-time Feedback** — Instantly receive performance insights and improvement suggestions.
- **Interview Dashboard** — Track and manage your mock interview history.
- **Modern, Responsive UI** — Built with TailwindCSS and Shadcn/UI, ensuring optimal experience across devices.
- **Cross-Platform Compatibility** — Fully functional on mobile, tablet, and desktop screens.

---

## 🚀 Quick Start

Get PrepWise running locally in just a few minutes:

### 📋 Prerequisites

- **Node.js 18+** and **npm**
- **Git** for version control
- **Appwrite Account** ([Sign up here](https://appwrite.io/))
- **Vapi Account** ([Sign up here](https://vapi.ai/))
- **Google AI Studio Account** ([Get API key](https://makersuite.google.com/app/apikey))

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/adrianhajdin/ai_mock_interviews.git
cd ai_mock_interviews
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Appwrite Backend

#### Create Appwrite Project

1. Go to [Appwrite Cloud Console](https://cloud.appwrite.io/)
2. Create a new project
3. Note your Project ID

#### Create Database and Collections

Create a database with these three collections:

**Users Collection:**

- `name` (string, required, size: 100)
- `email` (string, required, size: 255)
- Add index on `email` field

**Interviews Collection:**

- `role` (string, required, size: 100)
- `level` (string, required, size: 50)
- `type` (string, required, size: 50)
- `techstack` (string array, required, size: 50)
- `questions` (string array, required, size: 1000)
- `userId` (string, required, size: 50)
- `finalized` (boolean, required)
- `coverImage` (string, optional, size: 255)
- `createdAt` (datetime, required)

**Feedback Collection:**

- `interviewId` (string, required, size: 50)
- `userId` (string, required, size: 50)
- `totalScore` (integer, required)
- `categoryScores` (string, required, size: 2000)
- `strengths` (string array, required, size: 500)
- `areasForImprovement` (string array, required, size: 500)
- `finalAssessment` (string, required, size: 2000)
- `createdAt` (datetime, required)

### 4️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory:

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

# Vapi Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id

# Google AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5️⃣ Validate Setup

```bash
npm run validate-appwrite
```

### 6️⃣ Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📱 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**

   ```bash
   npx vercel
   ```

2. **Configure Environment Variables**

   - Add all environment variables from `.env.local` to Vercel
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Other Platforms

PrepWise can be deployed on any platform that supports Next.js:

- **Netlify**: Use the Next.js plugin
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Container-based deployment

---

## 🧪 Development

### Project Structure

```
ai_mock_interviews/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   └── api/               # API routes
├── appwrite/              # Appwrite configuration
├── components/            # React components
├── lib/                   # Utility functions and actions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run validate-appwrite  # Validate Appwrite setup
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## � Documentation

- **[Migration Guide](./MIGRATION_GUIDE.md)** - Complete Firebase to Appwrite migration documentation
- **[API Reference](./docs/api.md)** - Detailed API documentation
- **[Component Guide](./docs/components.md)** - UI component usage guide

---

## 🤝 Support & Community

- **Issues**: [GitHub Issues](https://github.com/adrianhajdin/ai_mock_interviews/issues)
- **Discussions**: [GitHub Discussions](https://github.com/adrianhajdin/ai_mock_interviews/discussions)
- **Discord**: [Join our community](https://discord.com/invite/n6EdbFJ)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Vapi AI](https://vapi.ai)** - For providing advanced voice AI capabilities
- **[Appwrite](https://appwrite.io)** - For the excellent backend-as-a-service platform
- **[Google Gemini](https://ai.google.dev/)** - For powering intelligent feedback generation
- **[Vercel](https://vercel.com)** - For seamless deployment and hosting
- **[JavaScript Mastery](https://jsmastery.pro)** - For the excellent development tutorials

---

<div align="center">
  <p>Made with ❤️ by the PrepWise Team</p>
  <p>
    <a href="https://github.com/adrianhajdin/ai_mock_interviews">⭐ Star this repository</a> if you found it helpful!
  </p>
</div>
