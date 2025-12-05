// Header Component - Thanh menu
export function Header() {
  return `
        <header class="header">
            <div class="container">
                <nav class="nav">
                    <a href="/" class="logo">
                        <span class="logo-main">Phạm Huỳnh Tài's Blog</span>
                        <span class="logo-sub">sky's still blue</span>
                    </a>
                    <button class="menu-toggle" data-menu-toggle aria-label="Menu">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>
                    </button>
                    <ul class="nav-menu" data-nav-menu>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/favorites">Yêu thích</a></li>
                        <li><a href="/about">Giới thiệu</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
}
