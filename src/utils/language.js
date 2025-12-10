// Language management utility
import { translations } from "./translations.js";

const STORAGE_KEY = "preferred_language";
const DEFAULT_LANGUAGE = "vi";

// Get current language from localStorage or default
export function getCurrentLanguage() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
}

// Set language and save to localStorage
export function setLanguage(lang) {
  if (translations[lang]) {
    localStorage.setItem(STORAGE_KEY, lang);
    // Trigger custom event to notify components about language change
    window.dispatchEvent(new CustomEvent("languagechange", { detail: lang }));
    return true;
  }
  return false;
}

// Toggle between languages
export function toggleLanguage() {
  const current = getCurrentLanguage();
  const newLang = current === "vi" ? "en" : "vi";
  setLanguage(newLang);
  return newLang;
}

// Get translation text
export function t(key) {
  const lang = getCurrentLanguage();
  const keys = key.split(".");
  let value = translations[lang];

  for (const k of keys) {
    if (value && typeof value === "object") {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return value || key;
}

// Initialize language on page load
export function initLanguage() {
  const savedLang = getCurrentLanguage();
  // Ensure language is valid
  if (!translations[savedLang]) {
    setLanguage(DEFAULT_LANGUAGE);
  }
}

// Language toggle button component
export function LanguageToggle() {
  const currentLang = getCurrentLanguage();

  return `
    <button class="language-toggle" data-language-toggle aria-label="Toggle language">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span class="language-text">${currentLang.toUpperCase()}</span>
    </button>
  `;
}

// Initialize language toggle functionality
export function initLanguageToggle() {
  const toggleBtns = document.querySelectorAll("[data-language-toggle]");

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const newLang = toggleLanguage();
      // Reload page to apply new language
      window.location.reload();
    });
  });
}
