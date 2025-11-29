import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyANAAVhwFHDIX12dhLaQVrqgvJ4QHin_Fg",
    authDomain: "webdevmastery-by-oruzenlab.firebaseapp.com",
    projectId: "webdevmastery-by-oruzenlab",
    storageBucket: "webdevmastery-by-oruzenlab.firebasestorage.app",
    messagingSenderId: "661210047744",
    appId: "1:661210047744:web:da4bcd0024650cc567bfe5"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
