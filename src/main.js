// main.js - File khởi chạy JavaScript (Entry point)
import "./assets/css/variables.css";
import "./assets/css/main.css";
import { render } from "./App.js";

// Khởi chạy ứng dụng khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  render();
});
