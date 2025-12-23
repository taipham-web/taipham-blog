// HomePage - Trang chủ (list bài viết)
import { PostCard } from "../components/PostCard.js";
import { Sidebar } from "../components/Sidebar.js";
import { getAllPosts } from "../firebase/posts.js";
import { t } from "../utils/language.js";

const POSTS_PER_PAGE = 5;
let currentDisplayCount = POSTS_PER_PAGE;
let allPosts = [];
let sortOrder = "desc"; // 'desc' = mới nhất đến cũ nhất, 'asc' = cũ nhất đến mới nhất

// Hàm lấy bài viết đã sắp xếp
function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    const timeA = a.createdAt?.seconds || 0;
    const timeB = b.createdAt?.seconds || 0;
    return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
  });
}

export async function HomePage() {
  // Reset count khi vào trang chủ
  currentDisplayCount = POSTS_PER_PAGE;
  sortOrder = "desc"; // Reset về sắp xếp mặc định

  // Lấy bài viết từ Firebase
  allPosts = await getAllPosts();

  // Sắp xếp bài viết
  const sortedPosts = getSortedPosts();

  // Lấy danh sách danh mục duy nhất
  const categories = [...new Set(allPosts.map((post) => post.category))];

  // Lấy bài viết để hiển thị
  const displayPosts = sortedPosts.slice(0, currentDisplayCount);
  const hasMore = sortedPosts.length > currentDisplayCount;

  return `
        <div class="home-page">
            <main class="main-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h1 style="margin: 0;">${t("home.title")}</h1>
                    <button class="sort-btn" data-sort-btn title="${
                      sortOrder === "desc"
                        ? "Sắp xếp: Mới nhất → Cũ nhất"
                        : "Sắp xếp: Cũ nhất → Mới nhất"
                    }">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18M3 12h15M3 18h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            ${
                              sortOrder === "desc"
                                ? '<path d="M19 15l-3 3-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                                : '<path d="M19 9l-3-3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                            }
                        </svg>
                        <span style="margin-left: 0.5rem;">${
                          sortOrder === "desc" ? "Mới nhất" : "Cũ nhất"
                        }</span>
                    </button>
                </div>
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

// Hàm đổi thứ tự sắp xếp
export function toggleSort() {
  // Đảo ngược thứ tự sắp xếp
  sortOrder = sortOrder === "desc" ? "asc" : "desc";

  // Reset về trang đầu
  currentDisplayCount = POSTS_PER_PAGE;

  // Lấy bài viết đã sắp xếp
  const sortedPosts = getSortedPosts();
  const displayPosts = sortedPosts.slice(0, currentDisplayCount);
  const hasMore = sortedPosts.length > currentDisplayCount;

  // Cập nhật danh sách bài viết
  const postsList = document.querySelector("[data-posts-list]");
  if (postsList) {
    postsList.innerHTML = displayPosts.map((post) => PostCard(post)).join("");
  }

  // Cập nhật nút sort
  const sortBtn = document.querySelector("[data-sort-btn]");
  if (sortBtn) {
    sortBtn.title =
      sortOrder === "desc"
        ? "Sắp xếp: Mới nhất → Cũ nhất"
        : "Sắp xếp: Cũ nhất → Mới nhất";
    sortBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18M3 12h15M3 18h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        ${
          sortOrder === "desc"
            ? '<path d="M19 15l-3 3-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
            : '<path d="M19 9l-3-3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        }
      </svg>
      <span style="margin-left: 0.5rem;">${
        sortOrder === "desc" ? "Mới nhất" : "Cũ nhất"
      }</span>
    `;
  }

  // Cập nhật hoặc xóa nút "Load More"
  const loadMoreContainer = document.querySelector(".load-more-container");
  if (hasMore && !loadMoreContainer) {
    // Thêm nút Load More nếu cần
    const mainContent = document.querySelector(".main-content");
    const loadMoreHtml = `
      <div class="load-more-container">
        <button class="load-more-btn" data-load-more>
          ${t("home.loadMore")}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
    mainContent.insertAdjacentHTML("beforeend", loadMoreHtml);
  } else if (!hasMore && loadMoreContainer) {
    loadMoreContainer.remove();
  }

  // Re-attach event listeners cho favorite buttons
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

export function loadMorePosts() {
  const sortedPosts = getSortedPosts();
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
