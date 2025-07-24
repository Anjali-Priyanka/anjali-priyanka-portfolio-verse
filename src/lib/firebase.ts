// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmfJz-XcIq9Bqeit_RP3RmL821hdHIrYk",
  authDomain: "anjali-portfolio-56fdc.firebaseapp.com",
  projectId: "anjali-portfolio-56fdc",
  storageBucket: "anjali-portfolio-56fdc.firebasestorage.app",
  messagingSenderId: "124556261716",
  appId: "1:124556261716:web:a4f0dc24934e34eb47b0c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);