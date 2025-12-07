// src/components/SkeletonLoading.js

/**
 * Skeleton loading cho PostCard - Chỉ hiển thị dots animation
 */
export function PostCardSkeleton() {
  return `
    <article class="post-card skeleton">
    </article>
  `;
}

/**
 * Skeleton loading cho danh sách bài viết (HomePage, CategoryPage, etc.)
 */
export function PostsListSkeleton(count = 5) {
  return `
    <div class="posts-list">
      ${Array(count).fill(PostCardSkeleton()).join("")}
    </div>
  `;
}

/**
 * Skeleton loading cho PostDetail - Chỉ hiển thị dots animation
 */
export function PostDetailSkeleton() {
  return `
    <div class="post-detail-container">
      <article class="post-detail skeleton" style="min-height: 500px; display: flex; align-items: center; justify-content: center; position: relative;">
      </article>
    </div>
  `;
}

/**
 * Skeleton loading cho Sidebar - Ẩn đi khi loading
 */
export function SidebarSkeleton() {
  return `
    <aside class="sidebar" style="opacity: 0.3;">
    </aside>
  `;
}

/**
 * Skeleton loading cho HomePage với sidebar
 */
export function HomePageSkeleton() {
  return `
    <div class="home-page">
      <main class="main-content skeleton" style="min-height: 400px; position: relative;">
      </main>
      ${SidebarSkeleton()}
    </div>
  `;
}
