// App.js - Component chính để điều hướng (Routing)
import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { HomePage } from "./pages/HomePage.js";
import { PostDetail } from "./pages/PostDetail.js";
import { AboutPage } from "./pages/AboutPage.js";
import { FavoritesPage } from "./pages/FavoritesPage.js";
import { CategoryPage } from "./pages/CategoryPage.js";
import { SearchPage } from "./pages/SearchPage.js";
import { toggleFavorite } from "./utils/favorites.js";

export function App() {
  const path = window.location.pathname;

  let content = "";

  // Simple routing
  if (path === "/" || path === "/index.html") {
    content = HomePage();
  } else if (path.startsWith("/post/")) {
    const postId = path.split("/")[2];
    content = PostDetail(postId);
  } else if (path === "/about") {
    content = AboutPage();
  } else if (path === "/favorites") {
    content = FavoritesPage();
  } else if (path.startsWith("/category/")) {
    const categoryName = path.split("/")[2];
    content = CategoryPage(categoryName);
  } else if (path.startsWith("/search/")) {
    const searchQuery = path.split("/")[2];
    content = SearchPage(searchQuery);
  } else {
    content = '<div class="error">404 - Không tìm thấy trang</div>';
  }

  return `
        ${Header()}
        <div class="container main-container">
            ${content}
        </div>
        ${Footer()}
    `;
}

// Simple client-side navigation
export function navigate(url) {
  window.history.pushState({}, "", url);
  render();
  window.scrollTo(0, 0); // Scroll to top after navigation
}

export function render() {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = App();

    // Add click handlers for navigation
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        navigate(link.getAttribute("href"));
      });
    });

    // Add click handlers for favorite buttons
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const postId = parseInt(btn.getAttribute("data-post-id"));
        const isNowFavorite = toggleFavorite(postId);

        // Toggle active class
        if (isNowFavorite) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    });

    // Add search functionality
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const query = searchInput.value.trim();
          if (query) {
            navigate(`/search/${encodeURIComponent(query)}`);
          }
        }
      });
    }

    // Initialize gallery slider if on About page
    initGallerySlider();

    // Initialize categories dropdown
    initCategoriesDropdown();

    // Initialize mobile menu
    initMobileMenu();
  }
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav") && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
    }
  });
}

// Categories dropdown functionality
function initCategoriesDropdown() {
  const toggleBtn = document.querySelector("[data-categories-toggle]");
  const categoriesList = document.querySelector("[data-categories-list]");

  if (!toggleBtn || !categoriesList) return;

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    categoriesList.classList.toggle("open");
  });
}

// Gallery slider functionality
function initGallerySlider() {
  const slider = document.querySelector("[data-gallery-slider]");
  if (!slider) return;

  const slides = slider.querySelectorAll(".gallery-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");

  let currentSlide = 0;
  let autoPlayInterval;

  function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Add active class to current slide and indicator
    slides[index].classList.add("active");
    indicators[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoPlay(); // Restart auto-play after manual interaction
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoPlay(); // Restart auto-play after manual interaction
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
      startAutoPlay(); // Restart auto-play after manual interaction
    });
  });

  // Start auto-play
  startAutoPlay();

  // Pause auto-play on hover
  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);
}

// Handle browser back/forward buttons
window.addEventListener("popstate", render);
