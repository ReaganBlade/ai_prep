// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// import { firebaseConfig } from "./firebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD53lplKCzY8LSdTbscXcQ2ScbpywOEv5E",
  authDomain: "interview-platform-f50ce.firebaseapp.com",
  projectId: "interview-platform-f50ce",
  storageBucket: "interview-platform-f50ce.firebasestorage.app",
  messagingSenderId: "13441024713",
  appId: "1:13441024713:web:ab64099a8ae236e6ec0318",
  measurementId: "G-2MCW3TED1K",
};

// console.log(firebaseConfig);

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
