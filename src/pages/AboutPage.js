// AboutPage - Trang giới thiệu
export function AboutPage() {
  return `
        <div class="about-page">
            <div class="about-container">
                <div class="about-content">
                    <h1>about me</h1>
                    <p class="about-subtitle">Mình là một sinh viên IT đang tìm lại niềm đam mê bằng việc viết lách.</p>
                    
                    <div class="about-text">
                        <p>Mong bạn sẽ tìm thấy những điều thú vị và hữu ích tại đây.</p>
                        
                        <p>Nơi mình chia sẻ những suy nghĩ, trải nghiệm về sách, phim ảnh và cả cuộc sống.</p>
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
            
            <div class="about-gallery">
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
                    <div class="gallery-slide">
                        <img src="/images/about/gallery4.jpg" alt="Gallery 4" />
                    </div>
                    <div class="gallery-slide">
                        <img src="/images/about/gallery5.jpg" alt="Gallery 5" />
                    </div>
                    <div class="gallery-slide">
                        <img src="/images/about/gallery6.jpg" alt="Gallery 6" />
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
                    <span class="indicator"></span>
                    <span class="indicator"></span>
                    <span class="indicator"></span>
                </div>
            </div>
        </div>
    `;
}
