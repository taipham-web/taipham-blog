// CategoryPage - Trang hiển thị bài viết theo danh mục
import { PostCard } from "../components/PostCard.js";
import { Sidebar } from "../components/Sidebar.js";
import { getAllPosts } from "../firebase/posts.js";
import { t } from "../utils/language.js";

export async function CategoryPage(categoryName) {
  const decodedCategory = decodeURIComponent(categoryName);

  // Lấy tất cả bài viết từ Firebase
  const allPosts = await getAllPosts();

  const categoryPosts = allPosts
    .filter((post) => post.category === decodedCategory)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const categories = [...new Set(allPosts.map((post) => post.category))];

  return `
        <div class="home-page">
            <main class="main-content">
                <h1>${t("sidebar.categories")}: ${decodedCategory}</h1>
                ${
                  categoryPosts.length > 0
                    ? `
                    <p class="category-count">${categoryPosts.length} ${t(
                        "category.posts"
                      )}</p>
                    <div class="posts-list">
                        ${categoryPosts.map((post) => PostCard(post)).join("")}
                    </div>
                `
                    : `
                    <div class="no-posts">
                        <p>${t("category.noPosts")}</p>
                        <a href="/" class="back-home">← ${t(
                          "favorites.discover"
                        )}</a>
                    </div>
                `
                }
            </main>
            ${Sidebar(categories)}
        </div>
    `;
}
