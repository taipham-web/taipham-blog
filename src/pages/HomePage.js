// HomePage - Trang chủ (list bài viết)
import { PostCard } from "../components/PostCard.js";
import { Sidebar } from "../components/Sidebar.js";
import { posts } from "../data/posts.js";

export function HomePage() {
  // Sắp xếp bài viết theo id từ lớn đến bé (mới nhất trước)
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  // Lấy danh sách danh mục duy nhất
  const categories = [...new Set(posts.map((post) => post.category))];

  return `
        <div class="home-page">
            <main class="main-content">
                <h1>Bài viết mới nhất</h1>
                <div class="posts-list">
                    ${sortedPosts.map((post) => PostCard(post)).join("")}
                </div>
            </main>
            ${Sidebar(categories)}
        </div>
    `;
}
