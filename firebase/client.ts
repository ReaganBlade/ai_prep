// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig): getApp();
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);