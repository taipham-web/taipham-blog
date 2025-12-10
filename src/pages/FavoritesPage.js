// FavoritesPage - Trang hiển thị bài viết yêu thích
import { PostCard } from "../components/PostCard.js";
import { getFavorites } from "../utils/favorites.js";
import { getAllPosts } from "../firebase/posts.js";
import { t } from "../utils/language.js";

export async function FavoritesPage() {
  const favoriteIds = getFavorites();

  // Lấy tất cả bài viết từ Firebase
  const allPosts = await getAllPosts();

  // Lọc các bài viết yêu thích (so sánh string)
  const favoritePosts = allPosts.filter((post) =>
    favoriteIds.some((id) => String(id) === String(post.id))
  );

  if (favoritePosts.length === 0) {
    return `
            <div class="favorites-page">
                <h1>${t("favorites.title")}</h1>
                <div class="empty-favorites">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                              stroke="#ccc" stroke-width="2"/>
                    </svg>
                    <p>${t("favorites.empty")}</p>
                    <p class="hint">Nhấn vào icon trái tim ở các bài viết để lưu vào danh sách yêu thích</p>
                    <a href="/" class="back-home">← ${t(
                      "favorites.discover"
                    )}</a>
                </div>
            </div>
        `;
  }

  return `
        <div class="favorites-page">
            <h1>${t("favorites.title")}</h1>
            <p class="favorites-count">Bạn có ${
              favoritePosts.length
            } bài viết yêu thích</p>
            <div class="posts-list">
                ${favoritePosts.map((post) => PostCard(post)).join("")}
            </div>
        </div>
    `;
}
