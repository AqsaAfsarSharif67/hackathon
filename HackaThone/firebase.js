// Import Firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; 
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9BSz5b7vAGnEpriV2OODBq8CniS7ccHs",
    authDomain: "post-app-d6251.firebaseapp.com",
    projectId: "post-app-d6251",
    storageBucket: "post-app-d6251.firebasestorage.app",
    messagingSenderId: "114777495390",
    appId: "1:114777495390:web:1d80b373d7e6652580a1cf",
    measurementId: "G-NL4CHSB1CH"
  };

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Get Firebase Authentication instance
const auth = getAuth(app);

// Export Firestore and Auth services
export { db, auth };

// Export necessary auth functions
export { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification 
};