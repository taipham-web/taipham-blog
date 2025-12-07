import { formatDate } from "../utils/formatDate.js";
import {
  getPostById,
  getAllPosts,
  incrementViews,
  addReaction,
} from "../firebase/posts.js";
import { isFavorite } from "../utils/favorites.js";
import {
  calculateReadingTime,
  formatReadingTime,
} from "../utils/readingTime.js";

export async function PostDetail(postId) {
  const post = await getPostById(postId);

  if (!post) {
    return '<div class="error">Không tìm thấy bài viết</div>';
  }

  // Tăng lượt xem
  incrementViews(postId);

  const isLiked = isFavorite(post.id);

  // Lấy tất cả bài viết để tìm bài liên quan
  const allPosts = await getAllPosts();

  // Lấy bài viết cùng danh mục (trừ bài hiện tại)
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3); // Lấy tối đa 3 bài

  // LOGIC MỚI: Kiểm tra xem nên hiện Video hay Ảnh
  let mediaDisplay;

  if (post.youtubeId) {
    // Nếu có ID Youtube -> Hiện Iframe Video
    mediaDisplay = `
      <div class="youtube-video">
        <iframe 
          src="https://www.youtube.com/embed/${post.youtubeId}" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>`;
  } else if (post.image) {
    // Nếu không có video nhưng có ảnh -> Hiện Ảnh
    mediaDisplay = `<img src="${post.image}" alt="${post.title}" class="post-feature-image" />`;
  } else {
    mediaDisplay = ""; // Không có gì hết
  }

  return `
    <div class="post-detail-container">
        <article class="post-detail">
            <header class="post-header">
                <button class="favorite-btn ${
                  isLiked ? "active" : ""
                }" data-post-id="${post.id}" aria-label="Yêu thích">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                ${mediaDisplay} <h1>${post.title}</h1>
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-category">${post.category}</span>
                    <span class="post-views">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      ${post.views || 0}
                    </span>
                    <span class="reading-time">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      ${formatReadingTime(calculateReadingTime(post.content))}
                    </span>
                </div>
            </header>
            <div class="post-content">
                ${post.content}
            </div>
            
            <!-- Reaction Bar -->
            <div class="reaction-bar">
              <h3>Bạn cảm thấy bài viết này thế nào?</h3>
              <div class="reactions" data-post-id="${post.id}">
                <button class="reaction-btn" data-reaction="like" title="Thích">
                  <span class="emoji">👍</span>
                  <span class="count">${post.reactions?.like || 0}</span>
                </button>
                <button class="reaction-btn" data-reaction="love" title="Yêu thích">
                  <span class="emoji">❤️</span>
                  <span class="count">${post.reactions?.love || 0}</span>
                </button>
                <button class="reaction-btn" data-reaction="haha" title="Haha">
                  <span class="emoji">😂</span>
                  <span class="count">${post.reactions?.haha || 0}</span>
                </button>
                <button class="reaction-btn" data-reaction="wow" title="Wow">
                  <span class="emoji">😮</span>
                  <span class="count">${post.reactions?.wow || 0}</span>
                </button>
                <button class="reaction-btn" data-reaction="sad" title="Buồn">
                  <span class="emoji">😢</span>
                  <span class="count">${post.reactions?.sad || 0}</span>
                </button>
                <button class="reaction-btn" data-reaction="angry" title="Tức giận">
                  <span class="emoji">😠</span>
                  <span class="count">${post.reactions?.angry || 0}</span>
                </button>
              </div>
            </div>
        </article>
        
        ${
          relatedPosts.length > 0
            ? `
        <aside class="related-posts">
            <h3>Bài viết liên quan</h3>
            <div class="related-posts-list">
                ${relatedPosts
                  .map(
                    (relatedPost) => `
                    <a href="/post/${relatedPost.id}" class="related-post-card">
                        <img src="${relatedPost.image}" alt="${
                      relatedPost.title
                    }" />
                        <div class="related-post-content">
                            <h4>${relatedPost.title}</h4>
                            <span class="related-post-date">${formatDate(
                              relatedPost.date
                            )}</span>
                        </div>
                    </a>
                `
                  )
                  .join("")}
            </div>
        </aside>
        `
            : ""
        }
    </div>
    `;
}
