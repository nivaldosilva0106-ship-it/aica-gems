import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { getDatabase, ref, set, get, update, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDth5rNlopBDn9gkrHbD2n-2lIvtIKHtfM",
  authDomain: "aica-8fa35.firebaseapp.com",
  databaseURL: "https://aica-8fa35-default-rtdb.firebaseio.com",
  projectId: "aica-8fa35",
  storageBucket: "aica-8fa35.firebasestorage.app",
  messagingSenderId: "108965979418",
  appId: "1:108965979418:web:9ebf5f7440ea2d61a778a3",
  measurementId: "G-RR5SSPGSEQ",
};

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  ref,
  set,
  get,
  update,
  push,
  onValue,
  type User,
};
