// src/components/PostCard.js
import { formatDate } from "../utils/formatDate.js";
import { isFavorite } from "../utils/favorites.js";

// Hàm hỗ trợ: Loại bỏ thẻ HTML và cắt ngắn văn bản
function createExcerpt(htmlContent, maxLength = 120) {
  // 1. Dùng Regex để xóa tất cả thẻ HTML (ví dụ <p>, <img>, <b>...)
  const textContent = htmlContent.replace(/<[^>]+>/g, "");

  // 2. Cắt chuỗi và thêm dấu "..."
  if (textContent.length > maxLength) {
    return textContent.slice(0, maxLength).trim() + "...";
  }
  return textContent;
}

export function PostCard(post) {
  // Ưu tiên excerpt có sẵn, nếu không có thì tự tạo từ content
  const excerpt = post.excerpt || createExcerpt(post.content);
  const isLiked = isFavorite(post.id);

  return `
        <article class="post-card">
            ${
              post.image
                ? `<div class="post-card-image"><img src="${post.image}" alt="${post.title}" /></div>`
                : ""
            }
            <div class="post-card-content">
                <button class="favorite-btn ${
                  isLiked ? "active" : ""
                }" data-post-id="${post.id}" aria-label="Yêu thích">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                <h2 class="post-title">
                    <a href="/post/${post.id}">${post.title}</a>
                </h2>
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-category">${post.category}</span>
                </div>
                
                <p class="post-excerpt">${excerpt}</p>
                
                <a href="/post/${post.id}" class="read-more">Đọc tiếp →</a>
            </div>
        </article>
    `;
}
