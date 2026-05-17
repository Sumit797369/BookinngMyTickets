// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bookmytickets-7577b.firebaseapp.com",
  projectId: "bookmytickets-7577b",
  storageBucket: "bookmytickets-7577b.firebasestorage.app",
  messagingSenderId: "219759870148",
  appId: "1:219759870148:web:e6526b9ba8aea11fb7c991"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider };