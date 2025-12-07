// Firestore Service - CRUD operations for posts
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config.js";

const POSTS_COLLECTION = "posts";

// Get all posts
export async function getAllPosts() {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
}

// Get single post by ID
export async function getPostById(id) {
  try {
    const docRef = doc(db, POSTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}

// Create new post
export async function createPost(postData) {
  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      ...postData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return {
      id: docRef.id,
      ...postData,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// Update post
export async function updatePost(id, postData) {
  try {
    const docRef = doc(db, POSTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: Timestamp.now(),
    });

    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// Delete post
export async function deletePost(id) {
  try {
    await deleteDoc(doc(db, POSTS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// Get posts by category
export async function getPostsByCategory(category) {
  try {
    const posts = await getAllPosts();
    return posts.filter((post) => post.category === category);
  } catch (error) {
    console.error("Error getting posts by category:", error);
    return [];
  }
}

// Search posts
export async function searchPosts(searchTerm) {
  try {
    const posts = await getAllPosts();
    const term = searchTerm.toLowerCase();

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
    );
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}
