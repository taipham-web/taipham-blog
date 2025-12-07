// src/utils/pageTitle.js

/**
 * Cập nhật tiêu đề trang
 * @param {string} title - Tiêu đề trang
 * @param {boolean} includeBlogName - Có thêm tên blog vào sau không
 */
export function setPageTitle(title, includeBlogName = true) {
  if (includeBlogName && title) {
    document.title = `${title} - Blog của Tài Phạm`;
  } else if (title) {
    document.title = title;
  } else {
    document.title = "Blog của Tài Phạm";
  }
}
