// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRDeS_yfvp7Ddw1yx25GlPrQGDTtV_hFc",
  authDomain: "patsanstha-6fa80.firebaseapp.com",
  projectId: "patsanstha-6fa80",
  storageBucket: "patsanstha-6fa80.appspot.com",
  messagingSenderId: "207139234509",
  appId: "1:207139234509:web:d736d69ec1235ed4b1ff84",
  measurementId: "G-42RNYHTC52"
};


const app = initializeApp(firebaseConfig)

const auth = getAuth();

export { app, auth };
