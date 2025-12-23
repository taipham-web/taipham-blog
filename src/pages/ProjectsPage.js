// ProjectsPage - Trang showcase các dự án
import { t } from "../utils/language.js";

export function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Personal Blog Website",
      description: t("projects.project1.description"),
      technologies: ["JavaScript", "Firebase", "Vite", "CSS3"],
      image: "/images/projects/blog-project.jpg",
      github: "https://github.com/taipham-web/taipham-blog.git",
      demo: "https://taipham-blog.vercel.app",
      features: t("projects.project1.features"),
      category: "Web Development",
    },
    {
      id: 2,
      title: "SportConnect Mobile App",
      description: t("projects.project2.description"),
      technologies: ["Flutter", "Dart", "Firebase NoSQL"],
      image: "/images/projects/SportConnect-project.jpg",
      github: "https://github.com/Nhom666/sport_connect_app.git",
      demo: "",
      features: t("projects.project2.features"),
      category: "Mobile App",
    },
  ];

  const categories = ["All", "Web Development", "Mobile App", "Cloud", "Other"];

  // Setup filter functionality after render
  setTimeout(() => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter projects
        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (filterValue === "All" || cardCategory === filterValue) {
            card.style.display = "block";
            // Add animation
            card.style.animation = "fadeIn 0.5s ease";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }, 0);

  return `
    <div class="projects-page">
      <div class="projects-hero">
        <h1>${t("projects.title")}</h1>
        <p class="projects-subtitle">${t("projects.subtitle")}</p>
      </div>

      <div class="projects-container">
        <div class="projects-filters">
          ${categories
            .map(
              (cat) => `
            <button class="filter-btn ${
              cat === "All" ? "active" : ""
            }" data-filter="${cat}">
              ${cat === "All" ? t("projects.allCategories") : cat}
            </button>
          `
            )
            .join("")}
        </div>

        <div class="projects-grid">
          ${projects
            .map(
              (project) => `
            <article class="project-card" data-category="${project.category}">
              <img src="${project.image}" alt="${
                project.title
              }" class="project-image" loading="lazy" />
              
              <div class="project-overlay">
                <span class="overlay-text">${t("projects.viewDetails")}</span>
              </div>

              <div class="project-content">
                <div class="project-header">
                  <h3 class="project-title">${project.title}</h3>
                  <div class="project-links">
                    ${
                      project.github
                        ? `
                      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    `
                        : ""
                    }
                    ${
                      project.demo
                        ? `
                      <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link" title="Live Demo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    `
                        : ""
                    }
                  </div>
                </div>

                <p class="project-description">${project.description}</p>

                <div class="project-tech">
                  ${project.technologies
                    .map(
                      (tech) => `
                    <span class="tech-badge">${tech}</span>
                  `
                    )
                    .join("")}
                </div>
              </div>
            </article>
          `
            )
            .join("")}
        </div>

        ${
          projects.length === 0
            ? `
          <div class="no-projects">
            <p>${t("projects.noProjects")}</p>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
}
