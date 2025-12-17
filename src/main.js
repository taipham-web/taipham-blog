// main.js - File khởi chạy JavaScript (Entry point)
import { render } from "./App.js";
import { MusicPlayer, initMusicPlayer } from "./components/MusicPlayer.js";

// Khởi chạy ứng dụng khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // Render music player một lần duy nhất vào body
  const musicPlayerDiv = document.createElement("div");
  musicPlayerDiv.innerHTML = MusicPlayer();
  document.body.appendChild(musicPlayerDiv.firstElementChild);

  // Khởi tạo music player
  initMusicPlayer();

  // Render app
  render();
});
