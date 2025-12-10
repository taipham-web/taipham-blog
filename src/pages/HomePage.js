// HomePage - Trang chủ (list bài viết)
import { PostCard } from "../components/PostCard.js";
import { Sidebar } from "../components/Sidebar.js";
import { getAllPosts } from "../firebase/posts.js";
import { t } from "../utils/language.js";

const POSTS_PER_PAGE = 5;
let currentDisplayCount = POSTS_PER_PAGE;
let allPosts = [];

export async function HomePage() {
  // Reset count khi vào trang chủ
  currentDisplayCount = POSTS_PER_PAGE;

  // Lấy bài viết từ Firebase
  allPosts = await getAllPosts();

  // Sắp xếp bài viết theo createdAt (thời gian tạo thực tế) từ mới đến cũ
  const sortedPosts = [...allPosts].sort((a, b) => {
    const timeA = a.createdAt?.seconds || 0;
    const timeB = b.createdAt?.seconds || 0;
    return timeB - timeA;
  });

  // Lấy danh sách danh mục duy nhất
  const categories = [...new Set(allPosts.map((post) => post.category))];

  // Lấy bài viết để hiển thị
  const displayPosts = sortedPosts.slice(0, currentDisplayCount);
  const hasMore = sortedPosts.length > currentDisplayCount;

  return `
        <div class="home-page">
            <main class="main-content">
                <h1>${t("home.title")}</h1>
                <div class="posts-list" data-posts-list>
                    ${displayPosts.map((post) => PostCard(post)).join("")}
                </div>
                ${
                  hasMore
                    ? `
                    <div class="load-more-container">
                        <button class="load-more-btn" data-load-more>
                            ${t("home.loadMore")}
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                `
                    : ""
                }
            </main>
            ${Sidebar(categories)}
        </div>
    `;
}

export function loadMorePosts() {
  const sortedPosts = [...allPosts].sort((a, b) => {
    const timeA = a.createdAt?.seconds || 0;
    const timeB = b.createdAt?.seconds || 0;
    return timeB - timeA;
  });
  const postsList = document.querySelector("[data-posts-list]");
  const loadMoreBtn = document.querySelector("[data-load-more]");

  if (!postsList) return;

  // Tăng số lượng bài viết hiển thị
  currentDisplayCount += POSTS_PER_PAGE;

  // Lấy bài viết mới
  const newPosts = sortedPosts.slice(
    currentDisplayCount - POSTS_PER_PAGE,
    currentDisplayCount
  );

  // Thêm bài viết mới vào danh sách
  newPosts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.innerHTML = PostCard(post);
    postsList.appendChild(postCard.firstElementChild);
  });

  // Ẩn nút nếu hết bài viết
  if (currentDisplayCount >= sortedPosts.length && loadMoreBtn) {
    loadMoreBtn.parentElement.remove();
  }

  // Re-attach event listeners cho favorite buttons mới
  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.dataset.listenerAttached = "true";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const postId = btn.getAttribute("data-post-id");
        const { toggleFavorite } = require("../utils/favorites.js");
        const isNowFavorite = toggleFavorite(postId);

        if (isNowFavorite) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
  });
}
