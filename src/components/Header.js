// Header Component - Thanh menu
export function Header() {
  return `
        <header class="header">
            <div class="header-hero">
                <div class="header-overlay"></div>
                <div class="header-content">
                    <h1 class="header-title">PHẠM HUỲNH TÀI'S BLOG</h1>
                    <p class="header-subtitle">sky's still blue</p>
                    <nav class="header-nav">
                        <a href="/">TRANG CHỦ</a>
                        <a href="/favorites">YÊU THÍCH</a>
                        <a href="/about">GIỚI THIỆU</a>
                    </nav>
                </div>
            </div>
            <button class="menu-toggle" data-menu-toggle aria-label="Menu">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </button>
            <ul class="mobile-menu" data-nav-menu>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/favorites">Yêu thích</a></li>
                <li><a href="/about">Giới thiệu</a></li>
            </ul>
        </header>
    `;
}
