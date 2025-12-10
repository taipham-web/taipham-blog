// SearchPage - Trang hiển thị kết quả tìm kiếm
import { PostCard } from "../components/PostCard.js";
import { Sidebar } from "../components/Sidebar.js";
import { getAllPosts } from "../firebase/posts.js";
import { t } from "../utils/language.js";

export async function SearchPage(searchQuery) {
  const decodedQuery = decodeURIComponent(searchQuery).toLowerCase();

  // Lấy tất cả bài viết từ Firebase
  const allPosts = await getAllPosts();

  const searchResults = allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(decodedQuery);
    const categoryMatch = post.category.toLowerCase().includes(decodedQuery);
    const contentMatch = post.content.toLowerCase().includes(decodedQuery);
    const excerptMatch = post.excerpt
      ? post.excerpt.toLowerCase().includes(decodedQuery)
      : false;
    return titleMatch || categoryMatch || contentMatch || excerptMatch;
  });

  const categories = [...new Set(allPosts.map((post) => post.category))];

  return `
        <div class="home-page">
            <main class="main-content">
                <h1>${t("search.title")} ${t(
    "search.for"
  )}: "${decodeURIComponent(searchQuery)}"</h1>
                ${
                  searchResults.length > 0
                    ? `
                    <p class="search-count">${t("search.noResults")} ${
                        searchResults.length
                      } ${t("search.resultsCount")}</p>
                    <div class="posts-list">
                        ${searchResults.map((post) => PostCard(post)).join("")}
                    </div>
                `
                    : `
                    <div class="no-posts">
                        <p>${t("search.noResults")}</p>
                        <p class="hint">Thử tìm kiếm với từ khóa khác</p>
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
