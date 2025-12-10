// Header Component - Thanh menu
import { t } from "../utils/language.js";
import { LanguageToggle } from "../utils/language.js";

export function Header() {
  return `
        <header class="header">
            <div class="header-hero">
                <div class="header-overlay"></div>
                <div class="header-content">
                    <h1 class="header-title">${t("header.title")}</h1>
                    <p class="header-subtitle">${t("header.subtitle")}</p>
                    <nav class="header-nav">
                        <a href="/">${t("header.home")}</a>
                        <a href="/favorites">${t("header.favorites")}</a>
                        <a href="/about">${t("header.about")}</a>
                        ${LanguageToggle()}
                    </nav>
                </div>
            </div>
            <button class="menu-toggle" data-menu-toggle aria-label="${t(
              "header.menu"
            )}">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </button>
            <ul class="mobile-menu" data-nav-menu>
                <li><a href="/">${t("mobileMenu.home")}</a></li>
                <li><a href="/favorites">${t("mobileMenu.favorites")}</a></li>
                <li><a href="/about">${t("mobileMenu.about")}</a></li>
                <li class="mobile-menu-lang">${LanguageToggle()}</li>
            </ul>
        </header>
    `;
}
