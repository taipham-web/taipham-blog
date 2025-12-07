// src/utils/readingTime.js

/**
 * Tính thời gian đọc ước tính dựa trên nội dung
 * @param {string} content - Nội dung HTML của bài viết
 * @returns {number} - Thời gian đọc tính bằng phút
 */
export function calculateReadingTime(content) {
  if (!content) return 1;

  // Loại bỏ các thẻ HTML
  const textContent = content.replace(/<[^>]+>/g, " ");

  // Đếm số từ (split bởi khoảng trắng)
  const words = textContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const wordCount = words.length;

  // Tốc độ đọc trung bình: 200-250 từ/phút cho tiếng Việt
  // Sử dụng 200 từ/phút để an toàn
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Tối thiểu 1 phút
  return Math.max(1, minutes);
}

/**
 * Format thời gian đọc thành chuỗi hiển thị
 * @param {number} minutes - Số phút
 * @returns {string} - Chuỗi hiển thị
 */
export function formatReadingTime(minutes) {
  return `${minutes} phút đọc`;
}
