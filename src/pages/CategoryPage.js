// CategoryPage - Trang hiển thị bài viết theo danh mục
import { PostCard } from "../components/PostCard.js";
import { Sidebar } from "../components/Sidebar.js";
import { posts } from "../data/posts.js";

export function CategoryPage(categoryName) {
  const decodedCategory = decodeURIComponent(categoryName);
  const categoryPosts = posts.filter(
    (post) => post.category === decodedCategory
  );
  const categories = [...new Set(posts.map((post) => post.category))];

  return `
        <div class="home-page">
            <main class="main-content">
                <h1>Danh mục: ${decodedCategory}</h1>
                ${
                  categoryPosts.length > 0
                    ? `
                    <p class="category-count">${
                      categoryPosts.length
                    } bài viết</p>
                    <div class="posts-list">
                        ${categoryPosts.map((post) => PostCard(post)).join("")}
                    </div>
                `
                    : `
                    <div class="no-posts">
                        <p>Không có bài viết nào trong danh mục này</p>
                        <a href="/" class="back-home">← Quay lại trang chủ</a>
                    </div>
                `
                }
            </main>
            ${Sidebar(categories)}
        </div>
    `;
}
