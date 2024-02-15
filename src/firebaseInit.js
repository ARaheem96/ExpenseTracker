// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB_xZj1Q5rpTUD8g1TNZKccYSahw8naNM",
  authDomain: "expenses-81d95.firebaseapp.com",
  projectId: "expenses-81d95",
  storageBucket: "expenses-81d95.appspot.com",
  messagingSenderId: "1091637978270",
  appId: "1:1091637978270:web:e17d474cdb53142c0ac78f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);