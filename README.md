<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="Vapi" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=DD2C00" alt="Firebase" />
  </div>

  <h2 align="center">Prepwise</h2>
  <p align="center">An AI-Powered Job Interview Preparation Platform with Vapi Voice Agents</p>

</div>

---

## 📋 Table of Contents
- [Introduction](#-introduction)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Additional Links](#-additional-links)

---

## 🤖 Introduction

**Prepwise** is a smart interview preparation platform designed to elevate your job-hunting skills with **AI-powered voice mock interviews**.

Built using:
- **Next.js** for a full-stack architecture,
- **Firebase** for seamless authentication and storage,
- **TailwindCSS** for modern, responsive UI,
- and **Vapi AI** to power voice-driven interactions.

With Prepwise, users can simulate real-world interviews, receive instant AI feedback, and refine their responses — all inside a clean, intuitive interface.

---

## ⚙️ Tech Stack

- **Next.js** — Framework for frontend and backend.
- **Firebase** — Authentication, database, and storage services.
- **TailwindCSS** — Utility-first CSS framework for styling.
- **Vapi AI** — Voice agent APIs for interactive mock interviews.
- **Shadcn/UI** — Modern, accessible UI components.
- **Google Gemini** — Enhances feedback capabilities with generative AI.
- **Zod** — Schema-based validation for data safety.

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

## 🤸 Quick Start

Get Prepwise up and running locally in just a few minutes:

### ⚡ Prerequisites
Make sure you have:
- **Git** installed
- **Node.js** and **npm** installed

### 📥 1. Clone the Repository
```bash
git clone https://github.com/ReaganBlade/ai_prep.git
cd ai_mock_interviews
```

### 📦 2. Install Dependencies
```bash
npm install
```

### ⚙️ 3. Configure Environment Variables
Create a `.env.local` file in the root directory with the following keys:

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
> ✍️ Fill in the values with your actual Firebase and Vapi credentials.

### 🏃 4. Run the Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 🔗 Additional Links

- 🌟 [Vapi AI](https://vapi.ai)
- 🔥 [Firebase](https://firebase.google.com/)
- 🎨 [TailwindCSS](https://tailwindcss.com/)
- ⚡ [Next.js](https://nextjs.org/)
