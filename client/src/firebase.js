// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3f885.firebaseapp.com",
  projectId: "mern-blog-3f885",
  storageBucket: "mern-blog-3f885.appspot.com",
  messagingSenderId: "991463955431",
  appId: "1:991463955431:web:44c4c706e33d4da43dbb42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);