// App.js - Component chính để điều hướng (Routing)
import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { HomePage, loadMorePosts } from "./pages/HomePage.js";
import { PostDetail } from "./pages/PostDetail.js";
import { AboutPage } from "./pages/AboutPage.js";
import { FavoritesPage } from "./pages/FavoritesPage.js";
import { CategoryPage } from "./pages/CategoryPage.js";
import { SearchPage } from "./pages/SearchPage.js";
import { toggleFavorite } from "./utils/favorites.js";
import { ThemeToggleButton, toggleTheme, initTheme } from "./utils/theme.js";
import { initLanguage, initLanguageToggle } from "./utils/language.js";
import { addReaction } from "./firebase/posts.js";
import {
  AdminLoginPage,
  initAdminLogin,
} from "./pages/admin/AdminLoginPage.js";
import {
  AdminDashboard,
  initAdminDashboard,
} from "./pages/admin/AdminDashboard.js";
import {
  AdminPostEditor,
  initAdminPostEditor,
} from "./pages/admin/AdminPostEditor.js";
import { auth } from "./firebase/config.js";
import { setPageTitle } from "./utils/pageTitle.js";
import { getPostById } from "./firebase/posts.js";
import {
  HomePageSkeleton,
  PostDetailSkeleton,
  PostsListSkeleton,
} from "./components/SkeletonLoading.js";
import { autoAddScrollReveal } from "./utils/scrollReveal.js";

export async function App() {
  const path = window.location.pathname;
  let content = "";
  let isAdminPage = path.startsWith("/admin");

  // Admin routes
  if (path === "/admin/login") {
    setPageTitle("Đăng nhập Admin", false);
    content = AdminLoginPage();
  } else if (path === "/admin" || path === "/admin/dashboard") {
    // Wait for auth to initialize before checking
    const user = await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    if (!user) {
      window.location.href = "/admin/login";
      return "";
    }
    setPageTitle("Admin Dashboard", false);
    content = await AdminDashboard();
  } else if (path.startsWith("/admin/post/edit/")) {
    // Wait for auth to initialize before checking
    const user = await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    if (!user) {
      window.location.href = "/admin/login";
      return "";
    }
    const postId = path.split("/")[4];
    setPageTitle("Chỉnh sửa bài viết", false);
    content = await AdminPostEditor(postId);
  } else if (path === "/admin/post/new") {
    // Wait for auth to initialize before checking
    const user = await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    if (!user) {
      window.location.href = "/admin/login";
      return "";
    }
    setPageTitle("Viết bài mới", false);
    content = await AdminPostEditor("new");
  }
  // Public routes
  else if (path === "/" || path === "/index.html") {
    setPageTitle("Trang chủ");
    content = await HomePage();
  } else if (path.startsWith("/post/")) {
    const postId = path.split("/")[2];
    // Lấy thông tin bài viết để set title
    const post = await getPostById(postId);
    if (post) {
      setPageTitle(post.title);
    } else {
      setPageTitle("Không tìm thấy bài viết");
    }
    content = await PostDetail(postId);
  } else if (path === "/about") {
    setPageTitle("Giới thiệu");
    content = AboutPage();
  } else if (path === "/favorites") {
    setPageTitle("Yêu thích");
    content = await FavoritesPage();
  } else if (path.startsWith("/category/")) {
    const categoryName = decodeURIComponent(path.split("/")[2]);
    setPageTitle(`Danh mục: ${categoryName}`);
    content = await CategoryPage(categoryName);
  } else if (path.startsWith("/search/")) {
    const searchQuery = decodeURIComponent(path.split("/")[2]);
    setPageTitle(`Tìm kiếm: ${searchQuery}`);
    content = await SearchPage(searchQuery);
  } else {
    setPageTitle("404 - Không tìm thấy trang");
    content = '<div class="error">404 - Không tìm thấy trang</div>';
  }

  // Admin pages don't need header/footer
  if (isAdminPage) {
    return content;
  }

  return `
        ${Header()}
        <div class="container main-container">
            ${content}
        </div>
        ${Footer()}
        ${ThemeToggleButton()}
    `;
}

// Simple client-side navigation
export function navigate(url) {
  window.history.pushState({}, "", url);
  render();
  window.scrollTo(0, 0); // Scroll to top after navigation
}

// Show skeleton loading based on route
function getSkeletonForRoute(path) {
  if (path === "/" || path === "/index.html") {
    return HomePageSkeleton();
  } else if (path.startsWith("/post/")) {
    return PostDetailSkeleton();
  } else if (
    path.startsWith("/category/") ||
    path.startsWith("/search/") ||
    path === "/favorites"
  ) {
    return HomePageSkeleton();
  }
  return "";
}

export function render() {
  const root = document.getElementById("root");
  if (root) {
    const path = window.location.pathname;
    const isAdminPage = path.startsWith("/admin");

    // Show skeleton loading for public pages
    if (!isAdminPage) {
      const skeleton = getSkeletonForRoute(path);
      if (skeleton) {
        root.innerHTML = `
          ${Header()}
          <div class="container main-container">
            ${skeleton}
          </div>
          ${Footer()}
          ${ThemeToggleButton()}
        `;
      }
    }

    // Load actual content
    App().then((html) => {
      root.innerHTML = html;
      // Add fade-in animation
      const mainContent = root.querySelector(
        ".main-container, .post-detail-container, .home-page"
      );
      if (mainContent) {
        mainContent.classList.add("fade-in");
      }
      initPageScripts();
    });
  }
}

function initPageScripts() {
  const path = window.location.pathname;

  // Init admin pages
  if (path === "/admin/login") {
    initAdminLogin();
    return;
  } else if (path === "/admin" || path === "/admin/dashboard") {
    initAdminDashboard();
    return;
  } else if (path.startsWith("/admin/post/")) {
    const postId = path.split("/")[4] || "new";
    initAdminPostEditor(postId);
    return;
  }

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
      const postId = btn.getAttribute("data-post-id"); // Không cần parseInt, giữ nguyên string
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

  // Initialize Credly badges if on About page
  initCredlyBadges();

  // Initialize Credly badges if on About page
  initCredlyBadges();

  // Initialize categories dropdown
  initCategoriesDropdown();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize load more button
  initLoadMore();

  // Initialize scroll to top button
  initScrollToTop();

  // Initialize theme toggle
  initThemeToggle();

  // Initialize language toggle
  initLanguageToggle();

  // Add reaction button handlers
  document.querySelectorAll(".reaction-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const reactionType = btn.getAttribute("data-reaction");
      const postId = btn.closest(".reactions").getAttribute("data-post-id");

      // Add reaction to Firebase
      const success = await addReaction(postId, reactionType);

      if (success) {
        // Update count
        const countSpan = btn.querySelector(".count");
        const currentCount = parseInt(countSpan.textContent) || 0;
        countSpan.textContent = currentCount + 1;

        // Create flying emoji animation
        const emoji = btn.querySelector(".emoji").textContent;
        const flyingEmoji = document.createElement("span");
        flyingEmoji.className = "flying-emoji";
        flyingEmoji.textContent = emoji;
        flyingEmoji.style.left = btn.offsetLeft + btn.offsetWidth / 2 + "px";
        btn.parentElement.appendChild(flyingEmoji);

        // Remove after animation
        setTimeout(() => flyingEmoji.remove(), 1000);
      }
    });
  });

  // Initialize scroll reveal animations
  autoAddScrollReveal();
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("open");
  });

  // Close menu when clicking outside or on a link
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header") && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
    }
  });

  // Close menu when clicking on a menu link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
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

// Initialize Credly badges
function initCredlyBadges() {
  const badgeContainers = document.querySelectorAll("[data-share-badge-id]");
  if (badgeContainers.length === 0) return;

  // Remove existing script if any
  const existingScript = document.querySelector('script[src*="credly.com"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Load Credly embed script
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "//cdn.credly.com/assets/utilities/embed.js";
  document.body.appendChild(script);
}

// Load more functionality
function initLoadMore() {
  const loadMoreBtn = document.querySelector("[data-load-more]");

  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener("click", () => {
    loadMorePosts();
  });
}

// Scroll to top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (!scrollToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggleBtn = document.querySelector("[data-theme-toggle]");

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener("click", () => {
    toggleTheme();
  });
}

// Initialize theme on page load
initTheme();

// Initialize language on page load
initLanguage();

// Handle browser back/forward buttons
window.addEventListener("popstate", render);
