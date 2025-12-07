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
  // So sánh cả string và number để tương thích Firebase
  return favorites.some((id) => String(id) === String(postId));
}

// Thêm bài viết vào danh sách yêu thích
export function addFavorite(postId) {
  const favorites = getFavorites();
  // Kiểm tra xem đã có chưa (so sánh string)
  if (!favorites.some((id) => String(id) === String(postId))) {
    favorites.push(postId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  }
  return false;
}

// Xóa bài viết khỏi danh sách yêu thích
export function removeFavorite(postId) {
  let favorites = getFavorites();
  // Filter bằng cách so sánh string
  favorites = favorites.filter((id) => String(id) !== String(postId));
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
