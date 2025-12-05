// Sidebar Component - Thanh bên (tìm kiếm, danh mục)
export function Sidebar(categories = []) {
  return `
        <aside class="sidebar">
            <div class="search-box">
                <input type="text" placeholder="Tìm kiếm..." id="search-input">
            </div>
            
            <div class="categories">
                <button class="categories-toggle" data-categories-toggle>
                    <span>Danh mục</span>
                    <svg class="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </button>
                <ul class="categories-list" data-categories-list>
                    <li><a href="/">Tất cả</a></li>
                    ${categories
                      .map(
                        (cat) => `
                        <li><a href="/category/${cat}">${cat}</a></li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
        </aside>
    `;
}
