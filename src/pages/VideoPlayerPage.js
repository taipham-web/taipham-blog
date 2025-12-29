// VideoPlayerPage - Trang phát video YouTube
import { t } from "../utils/language.js";

export function VideoPlayerPage(videoId, projectTitle = "") {
  return `
    <div class="video-player-page">
      <div class="video-container">
        <button class="back-button" onclick="history.back()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          ${t("common.back") || "Quay lại"}
        </button>
        
        ${projectTitle ? `<h1 class="video-title">${projectTitle}</h1>` : ""}
        
        <div class="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  `;
}
