// Footer Component - Chân trang
export function Footer() {
  const currentYear = new Date().getFullYear();
  return `
        <footer class="footer">
            <div class="container">
                <p>&copy; ${currentYear} PhamHuynhTai's Blog. All rights reserved.</p>
            </div>
        </footer>
        <button class="scroll-to-top" id="scrollToTop" aria-label="Scroll to top">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5z"/>
            </svg>
        </button>
    `;
}
