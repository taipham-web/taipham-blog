// src/utils/scrollReveal.js

/**
 * Initialize scroll reveal animation
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll(".scroll-reveal");

  if (revealElements.length === 0) return;

  // Options for the Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px", // Start animation slightly before element is in view
    threshold: 0.1, // Element is considered visible when 10% is in viewport
  };

  // Callback function for the observer
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add active class to trigger animation
        entry.target.classList.add("active");
        // Stop observing this element after it's revealed
        observer.unobserve(entry.target);
      }
    });
  };

  // Create the observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all reveal elements
  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Add scroll reveal classes to elements automatically
 * Call this after page content is loaded
 */
export function autoAddScrollReveal() {
  // Add scroll-reveal to post cards with staggered delays
  const postCards = document.querySelectorAll(".post-card");
  postCards.forEach((card, index) => {
    if (!card.classList.contains("scroll-reveal")) {
      card.classList.add(
        "scroll-reveal",
        "fade-up",
        `delay-${(index % 3) + 1}`
      );
    }
  });

  // Add scroll-reveal to post content paragraphs and headings
  const postContent = document.querySelector(".post-content");
  if (postContent) {
    const contentElements = postContent.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, img, pre"
    );
    contentElements.forEach((element, index) => {
      if (!element.classList.contains("scroll-reveal")) {
        // Different animations for different elements
        if (element.tagName.startsWith("H")) {
          element.classList.add("scroll-reveal", "fade-right", "fast");
        } else if (element.tagName === "IMG") {
          element.classList.add("scroll-reveal", "zoom-in", "slow");
        } else if (element.tagName === "BLOCKQUOTE") {
          element.classList.add("scroll-reveal", "fade-left", "ease-spring");
        } else if (element.tagName === "PRE") {
          element.classList.add("scroll-reveal", "fade-up");
        } else {
          element.classList.add("scroll-reveal", "fade-up");
        }
      }
    });
  }

  // Add scroll-reveal to related posts with staggered delays
  const relatedPosts = document.querySelectorAll(".related-post-card");
  relatedPosts.forEach((card, index) => {
    if (!card.classList.contains("scroll-reveal")) {
      card.classList.add(
        "scroll-reveal",
        "fade-up",
        `delay-${(index % 3) + 1}`
      );
    }
  });

  // Add scroll-reveal to sidebar widgets
  const sidebarWidgets = document.querySelectorAll(
    ".categories, .sidebar-quote, .search-box"
  );
  sidebarWidgets.forEach((widget, index) => {
    if (!widget.classList.contains("scroll-reveal")) {
      widget.classList.add("scroll-reveal", "fade-left", `delay-${index + 1}`);
    }
  });

  // Add scroll-reveal to reaction bar
  const reactionBar = document.querySelector(".reaction-bar");
  if (reactionBar && !reactionBar.classList.contains("scroll-reveal")) {
    reactionBar.classList.add("scroll-reveal", "fade-up", "slow");
  }

  // Add scroll-reveal to category items
  const categoryItems = document.querySelectorAll(".category-item");
  categoryItems.forEach((item, index) => {
    if (!item.classList.contains("scroll-reveal")) {
      item.classList.add(
        "scroll-reveal",
        "fade-right",
        `delay-${(index % 4) + 1}`,
        "fast"
      );
    }
  });

  // Add scroll-reveal to post header
  const postHeader = document.querySelector(".post-header h1");
  if (postHeader && !postHeader.classList.contains("scroll-reveal")) {
    postHeader.classList.add("scroll-reveal", "fade-down", "slow");
  }

  // Add scroll-reveal to post meta
  const postMeta = document.querySelector(".post-meta");
  if (postMeta && !postMeta.classList.contains("scroll-reveal")) {
    postMeta.classList.add("scroll-reveal", "fade-up", "delay-1", "fast");
  }

  // Add scroll-reveal to feature image
  const featureImage = document.querySelector(
    ".post-feature-image, .youtube-video"
  );
  if (featureImage && !featureImage.classList.contains("scroll-reveal")) {
    featureImage.classList.add("scroll-reveal", "zoom-in", "slow");
  }

  // Initialize the observer after adding classes
  setTimeout(() => {
    initScrollReveal();
  }, 100);
}
