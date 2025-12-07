// Authentication Service
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config.js";

// Sign in
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

// Sign out
export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

// Create admin user (chỉ dùng 1 lần để tạo tài khoản admin)
export async function createAdminUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Get current user
export function getCurrentUser() {
  return auth.currentUser;
}

// Listen to auth state changes
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Check if user is authenticated
export function isAuthenticated() {
  return auth.currentUser !== null;
}
