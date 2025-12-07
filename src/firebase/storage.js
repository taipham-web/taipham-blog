// Firebase Storage Service - Upload images
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./config.js";

/**
 * Upload image to Firebase Storage
 * @param {File} file - Image file to upload
 * @param {string} folder - Folder path (e.g., 'posts', 'thumbnails')
 * @returns {Promise<string>} - Download URL of uploaded image
 */
export async function uploadImage(file, folder = "posts") {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const path = `${folder}/${filename}`;

    // Create storage reference
    const storageRef = ref(storage, path);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Delete image from Firebase Storage
 * @param {string} imageUrl - Full URL of image to delete
 */
export async function deleteImage(imageUrl) {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

/**
 * Upload image from blob/dataURL (for TinyMCE)
 * @param {Blob} blob - Image blob
 * @param {string} filename - Filename
 * @returns {Promise<string>} - Download URL
 */
export async function uploadImageBlob(blob, filename = "image.jpg") {
  try {
    const timestamp = Date.now();
    const path = `posts/${timestamp}_${filename}`;
    const storageRef = ref(storage, path);

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image blob:", error);
    throw error;
  }
}
