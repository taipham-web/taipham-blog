// ResumePage - Trang CV/Resume chuyên nghiệp
import { t } from "../utils/language.js";

export function ResumePage() {
  return `
    <div class="resume-page">
      <!-- Header Profile Section -->
      <div class="resume-header">
        <div class="resume-avatar">
          <img src="/images/avatar.jpg" alt="Phạm Huỳnh Tài" />
        </div>
        <div class="resume-title">
          <h1>${t("resume.name")}</h1>
          <p class="resume-position">${t("resume.position")}</p>
        </div>
      </div>

      <div class="resume-container">
        <!-- Left Column -->
        <aside class="resume-sidebar">
          <!-- Contact Info -->
          <section class="resume-section">
            <h2 class="resume-section-title">${t("resume.contact")}</h2>
            <div class="resume-contact">
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>0383008242</span>
              </div>
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>phamhuyinhtai2004@gmail.com</span>
              </div>
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <a href="https://taipham-blog.vercel.app" target="_blank">taipham-blog.vercel.app</a>
              </div>
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>${t("resume.location")}</span>
              </div>
            </div>
          </section>

          <!-- About Me -->
          <section class="resume-section">
            <h2 class="resume-section-title">${t("resume.aboutTitle")}</h2>
            <p class="resume-text">${t("resume.aboutText")}</p>
          </section>

          <!-- Education -->
          <section class="resume-section">
            <h2 class="resume-section-title">${t("resume.educationTitle")}</h2>
            <div class="education-item">
              <h3 class="education-degree">${t("resume.degree")}</h3>
              <p class="education-school">${t("resume.school")}</p>
              <p class="education-year">2022 - 2026</p>
            </div>
          </section>

          <!-- Skills -->
          <section class="resume-section">
            <h2 class="resume-section-title">${t("resume.skillsTitle")}</h2>
            <div class="skills-list">
              ${[
                { name: "Flutter/Dart", level: 70 },
                { name: "JavaScript", level: 60 },
                { name: "HTML5", level: 70 },
                { name: "CSS3", level: 70 },
                { name: "Figma", level: 80 },
                { name: "ReactJS", level: 70 },
                { name: "Next.js", level: 70 },
              ]
                .map(
                  (skill) => `
                <div class="skill-item">
                  <span class="skill-name">${skill.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </section>

          <!-- Languages -->
          <section class="resume-section">
            <h2 class="resume-section-title">${t("resume.languagesTitle")}</h2>
            <ul class="language-list">
              <li>English</li>
              <li>VietNam</li>
            </ul>
          </section>
        </aside>

        <!-- Right Column - Main Content -->
        <main class="resume-main">
          <!-- Projects / Experience -->
          <section class="resume-section">
            <h2 class="resume-section-title-main">${t(
              "resume.projectsTitle"
            )}</h2>
            
            <!-- Project 1 -->
            <div class="resume-project">
              <div class="project-header-resume">
                <h3 class="project-title-resume">${t(
                  "resume.project1.title"
                )}</h3>
                <span class="project-year">2024 - 2025</span>
              </div>
              <p class="project-description-resume">${t(
                "resume.project1.description"
              )}</p>
              <ul class="project-details">
                ${t("resume.project1.details")
                  .map((detail) => `<li>${detail}</li>`)
                  .join("")}
              </ul>
            </div>

            <!-- Project 2 -->
            <div class="resume-project">
              <div class="project-header-resume">
                <h3 class="project-title-resume">${t(
                  "resume.project2.title"
                )}</h3>
                <span class="project-year">2025</span>
              </div>
              <p class="project-description-resume">${t(
                "resume.project2.description"
              )}</p>
              <ul class="project-details">
                ${t("resume.project2.details")
                  .map((detail) => `<li>${detail}</li>`)
                  .join("")}
              </ul>
            </div>

            <!-- Experience -->
            <div class="resume-project">
              <div class="project-header-resume">
                <h3 class="project-title-resume">${t(
                  "resume.experience.title"
                )}</h3>
                <span class="project-year">2024 - 2025</span>
              </div>
              <p class="project-description-resume">${t(
                "resume.experience.description"
              )}</p>
              <ul class="project-details">
                ${t("resume.experience.details")
                  .map((detail) => `<li>${detail}</li>`)
                  .join("")}
              </ul>
            </div>
          </section>

          <!-- Download CV Button -->
          <div class="resume-actions">
            <button class="btn-download-cv" onclick="window.location.href='/cv/Pham-Huynh-Tai-CV.pdf'; return false;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              ${t("resume.downloadCV")}
            </button>
          </div>
        </main>
      </div>
    </div>
  `;
}
