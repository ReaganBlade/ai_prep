<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="vapi" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=DD2C00" alt="firebase" />
  </div>

  <h3 align="center">Prepwise: A Job Interview Preparation Platform Powered by Vapi AI Voice Agents</h3>

  <div align="center">
     Build this project step by step with our detailed tutorial on <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b></a> YouTube. Join the JSM family!
  </div>
</div>

## 📋 Table of Contents
1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Code Snippets](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

---

## 🤖 Introduction

**Prepwise** is a job interview preparation platform designed to help individuals prepare for job interviews using AI-powered voice agents. Built with **Next.js** for both the frontend and backend, **Firebase** for authentication and data storage, and **TailwindCSS** for modern styling, this platform leverages the power of **Vapi AI** for voice interaction.

The platform enables users to create mock interviews, take them, and get instant feedback from an AI voice agent. With a sleek and user-friendly design, Prepwise offers an effective and engaging way to practice for interviews.

> If you're new to the project, feel free to check out our tutorial on YouTube, where we guide you step by step in building this app from scratch. Join our vibrant community of developers!

[Watch the tutorial here!](https://www.youtube.com/watch?v=8GK8R77Bd7g)

---

## ⚙️ Tech Stack

- **Next.js**: Framework for building the app’s frontend and backend.
- **Firebase**: For authentication and data storage.
- **TailwindCSS**: For styling the app with utility-first CSS.
- **Vapi AI**: For integrating AI voice agents for interactive mock interviews.
- **Shadcn/UI**: A set of beautiful and functional UI components.
- **Google Gemini**: For enhancing the platform's capabilities with Google's generative AI.
- **Zod**: For data validation.

---

## 🔋 Features

### Key Features of Prepwise:
- **Authentication**: Secure Sign Up and Sign In with Firebase using email/password authentication.
- **AI-powered Interviews**: Create mock job interviews with the help of Vapi voice agents and Google Gemini.
- **Instant Feedback**: After completing an interview, users receive real-time feedback on their performance from AI agents.
- **Modern UI/UX**: A sleek, responsive, and modern user interface designed for the best experience.
- **Interview Dashboard**: A centralized place to manage and track all the interviews you’ve conducted.
- **Fully Responsive Design**: Works seamlessly across different devices and screen sizes.

---

## 🤸 Quick Start

Follow these steps to set up the project on your local machine:

### Prerequisites
Before you start, make sure you have the following installed on your machine:
- **Git**: For cloning the repository
- **Node.js**: To run the project locally
- **npm**: To manage project dependencies

### 1. Clone the Repository
Clone the project to your local machine using Git:
```bash
git clone https://github.com/ReaganBlade/ai_prep.git
cd ai_mock_interviews
```

### 2. Install Dependencies
Install the project dependencies with npm:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following configuration:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Replace the placeholders with your actual credentials for Firebase and Vapi AI.

### 4. Run the Project
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

---

## 🔗 Links

- [Vapi AI](https://vapi.ai)
- [Firebase](https://firebase.google.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)

