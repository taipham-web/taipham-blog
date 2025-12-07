// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase config - THAY BẰNG CONFIG CỦA BẠN
// Lấy từ Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyD1Odri7_9FoOAfZ4MZnywdXdF_6OQxigQ",
  authDomain: "taipham-blog.firebaseapp.com",
  projectId: "taipham-blog",
  storageBucket: "taipham-blog.firebasestorage.app",
  messagingSenderId: "283537431116",
  appId: "1:283537431116:web:bf0c8ae5807a10e958f2e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
