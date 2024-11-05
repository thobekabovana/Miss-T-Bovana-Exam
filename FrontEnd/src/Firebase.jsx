// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVcAb3nFZXZif3afWUZqWy5ZPBcBfWsEQ",
  authDomain: "market-place-778b7.firebaseapp.com",
  projectId: "market-place-778b7",
  storageBucket: "market-place-778b7.firebasestorage.app",
  messagingSenderId: "737880274775",
  appId: "1:737880274775:web:d4daf5ede116e68d3ab012",
  measurementId: "G-K06VFW5H8W"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };