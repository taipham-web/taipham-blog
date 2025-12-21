// main.js - File khởi chạy JavaScript (Entry point)
import { render } from "./App.js";
import { MusicPlayer, initMusicPlayer } from "./components/MusicPlayer.js";

// Ngăn chặn việc copy nội dung
const disableCopyContent = () => {
  // Vô hiệu hóa context menu (click chuột phải)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  // Vô hiệu hóa copy (Ctrl+C / Cmd+C)
  document.addEventListener("copy", (e) => {
    e.preventDefault();
    return false;
  });

  // Vô hiệu hóa cut (Ctrl+X / Cmd+X)
  document.addEventListener("cut", (e) => {
    e.preventDefault();
    return false;
  });

  // Vô hiệu hóa paste (Ctrl+V / Cmd+V)
  document.addEventListener("paste", (e) => {
    e.preventDefault();
    return false;
  });

  // Vô hiệu hóa các phím tắt
  document.addEventListener("keydown", (e) => {
    // Chặn Ctrl+C, Ctrl+X, Ctrl+U, Ctrl+S, F12, Ctrl+Shift+I
    if (
      (e.ctrlKey &&
        (e.key === "c" || e.key === "x" || e.key === "u" || e.key === "s")) ||
      (e.metaKey &&
        (e.key === "c" || e.key === "x" || e.key === "u" || e.key === "s")) ||
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.metaKey && e.altKey && e.key === "I")
    ) {
      e.preventDefault();
      return false;
    }
  });
};

// Khởi chạy ứng dụng khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // Kích hoạt chức năng ngăn chặn copy
  disableCopyContent();

  // Render music player một lần duy nhất vào body
  const musicPlayerDiv = document.createElement("div");
  musicPlayerDiv.innerHTML = MusicPlayer();
  document.body.appendChild(musicPlayerDiv.firstElementChild);

  // Khởi tạo music player
  initMusicPlayer();

  // Render app
  render();
});
