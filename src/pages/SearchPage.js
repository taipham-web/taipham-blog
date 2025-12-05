// SearchPage - Trang hiển thị kết quả tìm kiếm
import { PostCard } from "../components/PostCard.js";
import { Sidebar } from "../components/Sidebar.js";
import { posts } from "../data/posts.js";

export function SearchPage(searchQuery) {
  const decodedQuery = decodeURIComponent(searchQuery).toLowerCase();
  const searchResults = posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(decodedQuery);
    const categoryMatch = post.category.toLowerCase().includes(decodedQuery);
    const contentMatch = post.content.toLowerCase().includes(decodedQuery);
    return titleMatch || categoryMatch || contentMatch;
  });

  const categories = [...new Set(posts.map((post) => post.category))];

  return `
        <div class="home-page">
            <main class="main-content">
                <h1>Kết quả tìm kiếm: "${decodeURIComponent(searchQuery)}"</h1>
                ${
                  searchResults.length > 0
                    ? `
                    <p class="search-count">Tìm thấy ${
                      searchResults.length
                    } bài viết</p>
                    <div class="posts-list">
                        ${searchResults.map((post) => PostCard(post)).join("")}
                    </div>
                `
                    : `
                    <div class="no-posts">
                        <p>Không tìm thấy bài viết nào phù hợp</p>
                        <p class="hint">Thử tìm kiếm với từ khóa khác</p>
                        <a href="/" class="back-home">← Quay lại trang chủ</a>
                    </div>
                `
                }
            </main>
            ${Sidebar(categories)}
        </div>
    `;
}
