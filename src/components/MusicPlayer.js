// MusicPlayer.js - Component music player cho blog
import { musicList } from "../data/music.js";

export function MusicPlayer() {
  return `
    <div class="music-player-container">
      <button class="music-toggle-btn" id="musicToggleBtn" aria-label="Toggle Music Player">
        <svg class="music-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </button>
      
      <div class="music-player-panel" id="musicPlayerPanel">
        <div class="music-player-header">
          <h3>Danh sách nhạc</h3>
          <button class="close-music-btn" id="closeMusicBtn" aria-label="Close Music Player">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="music-playlist" id="musicPlaylist">
          ${musicList
            .map(
              (song, index) => `
            <div class="music-item" data-song-id="${song.id}" data-index="${index}">
              <div class="music-item-info">
                <div class="music-item-title">${song.title}</div>
                <div class="music-item-artist">${song.artist}</div>
              </div>
              <div class="music-item-controls">
                <span class="music-item-duration">${song.duration}</span>
                <div class="music-playing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        
        <div class="music-controls" id="musicControls">
          <div class="now-playing">
            <div class="now-playing-title">Chưa phát nhạc</div>
            <div class="now-playing-artist"></div>
          </div>
          
          <div class="control-buttons">
            <button class="control-btn" id="prevBtn" aria-label="Previous Song">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5"></line>
              </svg>
            </button>
            
            <button class="control-btn play-pause-btn" id="playPauseBtn" aria-label="Play/Pause">
              <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <svg class="pause-icon" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
              <svg class="loading-icon" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                <path d="M12 2 A10 10 0 0 1 22 12" opacity="0.75">
                  <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </path>
              </svg>
            </button>
            
            <button class="control-btn" id="nextBtn" aria-label="Next Song">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>
          </div>
          
          <div class="volume-control">
            <svg class="volume-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="70">
          </div>
          
          <div class="progress-bar">
            <div class="progress-time">
              <span id="currentTime">0:00</span>
              <span id="totalTime">0:00</span>
            </div>
            <div class="progress-track" id="progressTrack">
              <div class="progress-fill" id="progressFill"></div>
            </div>
          </div>
        </div>
      </div>
      
      <audio id="audioPlayer" preload="auto"></audio>
    </div>
  `;
}

export function initMusicPlayer() {
  const toggleBtn = document.getElementById("musicToggleBtn");
  const closeBtn = document.getElementById("closeMusicBtn");
  const panel = document.getElementById("musicPlayerPanel");
  const playlist = document.getElementById("musicPlaylist");
  const audio = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const progressTrack = document.getElementById("progressTrack");
  const progressFill = document.getElementById("progressFill");
  const currentTimeEl = document.getElementById("currentTime");
  const totalTimeEl = document.getElementById("totalTime");
  const nowPlayingTitle = document.querySelector(".now-playing-title");
  const nowPlayingArtist = document.querySelector(".now-playing-artist");

  let currentSongIndex = -1;
  let isPlaying = false;
  let isLoading = false;

  // Preload bài đầu tiên để play nhanh hơn
  if (musicList.length > 0) {
    audio.src = musicList[0].url;
    audio.load();
    currentSongIndex = 0;
    updateNowPlaying(musicList[0]);
  }

  // Toggle panel
  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("active");
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".music-player-container")) {
      panel.classList.remove("active");
    }
  });

  // Play song
  function playSong(index) {
    if (index < 0 || index >= musicList.length) return;

    const song = musicList[index];
    const needsLoad = currentSongIndex !== index;
    currentSongIndex = index;

    if (needsLoad) {
      isLoading = true;
      updatePlayPauseBtn();
      audio.src = song.url;
      audio.load();
    }
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        isLoading = false;
        updatePlayPauseBtn();
      }).catch((error) => {
        console.log('Play interrupted:', error);
        isLoading = false;
        isPlaying = false;
        updatePlayPauseBtn();
      });
    }

    updateNowPlaying(song);
    updateActiveItem();
  }

  // Update now playing info
  function updateNowPlaying(song) {
    nowPlayingTitle.textContent = song.title;
    nowPlayingArtist.textContent = song.artist;
  }

  // Update play/pause button
  function updatePlayPauseBtn() {
    const playIcon = playPauseBtn.querySelector(".play-icon");
    const pauseIcon = playPauseBtn.querySelector(".pause-icon");
    const loadingIcon = playPauseBtn.querySelector(".loading-icon");

    if (isLoading) {
      playIcon.style.display = "none";
      pauseIcon.style.display = "none";
      loadingIcon.style.display = "block";
      playPauseBtn.disabled = true;
    } else {
      loadingIcon.style.display = "none";
      playPauseBtn.disabled = false;
      if (isPlaying) {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      } else {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    }
  }

  // Update active item in playlist
  function updateActiveItem() {
    const items = playlist.querySelectorAll(".music-item");
    items.forEach((item, index) => {
      if (index === currentSongIndex) {
        item.classList.add("active");
        item.classList.toggle("playing", isPlaying);
      } else {
        item.classList.remove("active", "playing");
      }
    });
  }

  // Play/Pause toggle
  playPauseBtn.addEventListener("click", () => {
    if (isLoading) return; // Prevent action while loading
    
    if (currentSongIndex === -1) {
      playSong(0);
    } else {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        updatePlayPauseBtn();
        updateActiveItem();
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            updatePlayPauseBtn();
            updateActiveItem();
          }).catch((error) => {
            console.log('Play interrupted:', error);
          });
        }
      }
    }
  });

  // Previous song
  prevBtn.addEventListener("click", () => {
    const prevIndex = currentSongIndex - 1;
    if (prevIndex >= 0) {
      playSong(prevIndex);
    } else {
      playSong(musicList.length - 1);
    }
  });

  // Next song
  nextBtn.addEventListener("click", () => {
    const nextIndex = currentSongIndex + 1;
    if (nextIndex < musicList.length) {
      playSong(nextIndex);
    } else {
      playSong(0);
    }
  });

  // Click on playlist item
  playlist.addEventListener("click", (e) => {
    const musicItem = e.target.closest(".music-item");
    if (musicItem) {
      const index = parseInt(musicItem.dataset.index);
      if (index === currentSongIndex && isPlaying) {
        audio.pause();
        isPlaying = false;
        updatePlayPauseBtn();
        updateActiveItem();
      } else {
        playSong(index);
      }
    }
  });

  // Volume control
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });
  audio.volume = 0.7;

  // Progress bar
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${progress}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      totalTimeEl.textContent = formatTime(audio.duration);
    }
  });

  // Click on progress bar
  progressTrack.addEventListener("click", (e) => {
    if (audio.duration) {
      const rect = progressTrack.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percent * audio.duration;
    }
  });

  // Auto play next song
  audio.addEventListener("ended", () => {
    const nextIndex = currentSongIndex + 1;
    if (nextIndex < musicList.length) {
      playSong(nextIndex);
    } else {
      playSong(0);
    }
  });

  // Format time helper
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Update on play/pause events
  audio.addEventListener("play", () => {
    isPlaying = true;
    isLoading = false;
    updatePlayPauseBtn();
    updateActiveItem();
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    updatePlayPauseBtn();
    updateActiveItem();
  });

  // Loading events
  audio.addEventListener("loadstart", () => {
    isLoading = true;
    updatePlayPauseBtn();
  });

  audio.addEventListener("canplay", () => {
    isLoading = false;
    updatePlayPauseBtn();
  });

  audio.addEventListener("waiting", () => {
    isLoading = true;
    updatePlayPauseBtn();
  });

  audio.addEventListener("playing", () => {
    isLoading = false;
    updatePlayPauseBtn();
  });
}
