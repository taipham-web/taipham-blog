// favorites.js - Quản lý danh sách yêu thích
const FAVORITES_KEY = "blog_favorites";

// Lấy danh sách yêu thích từ localStorage
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
}

// Kiểm tra bài viết có trong danh sách yêu thích không
export function isFavorite(postId) {
  const favorites = getFavorites();
  return favorites.includes(postId);
}

// Thêm bài viết vào danh sách yêu thích
export function addFavorite(postId) {
  const favorites = getFavorites();
  if (!favorites.includes(postId)) {
    favorites.push(postId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  }
  return false;
}

// Xóa bài viết khỏi danh sách yêu thích
export function removeFavorite(postId) {
  let favorites = getFavorites();
  favorites = favorites.filter((id) => id !== postId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return true;
}

// Toggle favorite (thêm hoặc xóa)
export function toggleFavorite(postId) {
  if (isFavorite(postId)) {
    removeFavorite(postId);
    return false; // Đã xóa
  } else {
    addFavorite(postId);
    return true; // Đã thêm
  }
}
