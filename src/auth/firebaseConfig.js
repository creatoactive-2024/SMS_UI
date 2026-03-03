// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "patsanstha-6fa80.appspot.com",
  messagingSenderId: "207139234509",
  appId: "1:207139234509:web:d736d69ec1235ed4b1ff84",
  measurementId: "G-42RNYHTC52"
};


const app = initializeApp(firebaseConfig)

const auth = getAuth();

export { app, auth };
