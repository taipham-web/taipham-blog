// Quản lý bình luận trong localStorage
const COMMENTS_KEY = "blog_comments";

// Lấy tất cả bình luận
export function getAllComments() {
  const comments = localStorage.getItem(COMMENTS_KEY);
  return comments ? JSON.parse(comments) : {};
}

// Lấy bình luận cho một bài viết cụ thể
export function getPostComments(postId) {
  const allComments = getAllComments();
  return allComments[postId] || [];
}

// Thêm bình luận mới
export function addComment(postId, commentData) {
  const allComments = getAllComments();

  if (!allComments[postId]) {
    allComments[postId] = [];
  }

  const newComment = {
    id: Date.now(),
    name: commentData.name || "Ẩn danh",
    content: commentData.content,
    timestamp: new Date().toISOString(),
    isAnonymous: commentData.isAnonymous || false,
  };

  allComments[postId].unshift(newComment); // Thêm vào đầu mảng
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));

  return newComment;
}

// Xóa bình luận (optional - có thể thêm sau)
export function deleteComment(postId, commentId) {
  const allComments = getAllComments();

  if (allComments[postId]) {
    allComments[postId] = allComments[postId].filter((c) => c.id !== commentId);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  }
}

// Format thời gian hiển thị
export function formatCommentTime(timestamp) {
  const now = new Date();
  const commentDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - commentDate) / 1000);

  if (diffInSeconds < 60) {
    return "Vừa xong";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} phút trước`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} giờ trước`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ngày trước`;
  } else {
    return commentDate.toLocaleDateString("vi-VN");
  }
}
