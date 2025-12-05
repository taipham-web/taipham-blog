// Hàm convert ngày tháng cho đẹp
export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", options);
}
