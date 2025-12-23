// Sidebar Component - Thanh bên (tìm kiếm, danh mục)
import { t } from "../utils/language.js";

export function Sidebar(categories = []) {
  return `
        <aside class="sidebar">
            <div class="search-box">
                <input type="text" placeholder="${t(
                  "sidebar.search"
                )}" id="search-input">
            </div>
            
            <div class="categories">
                <button class="categories-toggle" data-categories-toggle>
                    <span>${t("sidebar.categories")}</span>
                    <svg class="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </button>
                <ul class="categories-list" data-categories-list>
                    <li><a href="/">${t("sidebar.allCategories")}</a></li>
                    ${categories
                      .map(
                        (cat) => `
                        <li><a href="/category/${cat}">${cat}</a></li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
            
            <div class="sidebar-quote">
                <p class="quote-text">${t("sidebar.quote")}</p>
                <p class="quote-author">${t("sidebar.quoteAuthor")}</p>
            </div>
        </aside>
    `;
}
