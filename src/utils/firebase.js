// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUKYJVbeqp5vbCOX3vHy1JmUKnZKx3vCk",
  authDomain: "netflix-gpt-f93fb.firebaseapp.com",
  projectId: "netflix-gpt-f93fb",
  storageBucket: "netflix-gpt-f93fb.firebasestorage.app",
  messagingSenderId: "1084264338943",
  appId: "1:1084264338943:web:554a4f484328f4cc0743ca",
  measurementId: "G-9G62JSPBSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
