// AboutPage - Trang giới thiệu
import { t } from "../utils/language.js";

export function AboutPage() {
  return `
        <div class="about-page">
            <div class="about-container">
                <div class="about-hero">
                    <div class="about-avatar-section">
                        <div class="about-avatar">
                            <img src="/images/avatar.jpg" alt="Avatar" />
                        </div>
                    </div>
                    
                    <div class="about-content">
                        <h1>${t("about.title")}</h1>
                        
                        <div class="about-slogan-wrapper">
                            <span class="quote-mark opening">"</span>
                            <p class="about-slogan">${t("about.slogan")}</p>
                            <span class="quote-mark closing">"</span>
                        </div>
                        
                        <div class="about-intro">
                            <p>${t("about.intro")}</p>
                        </div>
                        
                        <div class="social-buttons">
                            <a href="https://www.facebook.com/huynhftaif/" class="social-btn facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                                </svg>
                                <span>Facebook</span>
                            </a>
                            <a href="https://www.instagram.com/dawn.gif/" class="social-btn instagram">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" stroke-width="2" fill="none"/>
                                    <circle cx="12" cy="12" r="3" stroke="white" stroke-width="2" fill="none"/>
                                    <circle cx="18.5" cy="5.5" r="1.5" fill="white"/>
                                </svg>
                                <span>dawn.gif</span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="about-benefits">
                    <h2 class="benefits-title">${t("about.whyStopBy")}</h2>
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                                    <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                                    <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                                </svg>
                            </div>
                            <h3>${t("about.benefit1Title")}</h3>
                            <p>${t("about.benefit1Text")}</p>
                        </div>
                        
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                                </svg>
                            </div>
                            <h3>${t("about.benefit2Title")}</h3>
                            <p>${t("about.benefit2Text")}</p>
                        </div>
                        
                        <div class="benefit-card">
                            <div class="benefit-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <h3>${t("about.benefit3Title")}</h3>
                            <p>${t("about.benefit3Text")}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="about-gallery">
                <div class="gallery-intro">
                    <p class="gallery-description">${t(
                      "about.galleryDescription"
                    )}</p>
                </div>
                <button class="gallery-nav prev" data-gallery-prev>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15 18l-6-6 6-6v12z"/>
                    </svg>
                </button>
                <div class="gallery-slider" data-gallery-slider>
                    <div class="gallery-slide active">
                        <img src="/images/about/gallery1.jpg" alt="Gallery 1" />
                    </div>
                    <div class="gallery-slide">
                        <img src="/images/about/gallery2.jpg" alt="Gallery 2" />
                    </div>
                    <div class="gallery-slide">
                        <img src="/images/about/gallery3.jpg" alt="Gallery 3" />
                    </div>
                </div>
                <button class="gallery-nav next" data-gallery-next>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 18l6-6-6-6v12z"/>
                    </svg>
                </button>
                <div class="gallery-indicators" data-gallery-indicators>
                    <span class="indicator active"></span>
                    <span class="indicator"></span>
                    <span class="indicator"></span>
                </div>
            </div>
        </div>
    `;
}
