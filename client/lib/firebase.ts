import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  update,
  child,
} from "firebase/database";

// TODO: Replace with your Firebase config from Firebase Console
// Get this from: https://console.firebase.google.com/
// Project Settings -> Web App -> Copy the config object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);

export { ref, set, get, onValue, update, child };
