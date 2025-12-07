// Utility to load posts from markdown files
import { posts as legacyPosts } from "./posts.js";

let cachedPosts = null;

// Parse markdown frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const frontmatterContent = match[1];
  const body = match[2];

  // Parse YAML-like frontmatter
  frontmatterContent.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

// Convert markdown to HTML (basic conversion)
function markdownToHtml(markdown) {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");

  // Lists
  html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Paragraphs
  const lines = html.split("\n");
  const processedLines = [];
  let inTag = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("<") || trimmed === "") {
      processedLines.push(line);
      if (
        trimmed.startsWith("<ul>") ||
        trimmed.startsWith("<ol>") ||
        trimmed.startsWith("<blockquote>")
      ) {
        inTag = true;
      }
      if (
        trimmed.startsWith("</ul>") ||
        trimmed.startsWith("</ol>") ||
        trimmed.startsWith("</blockquote>")
      ) {
        inTag = false;
      }
    } else if (!inTag) {
      processedLines.push(`<p>${line}</p>`);
    } else {
      processedLines.push(line);
    }
  }

  html = processedLines.join("\n");

  return html;
}

// Load posts from markdown files
async function loadMarkdownPosts() {
  try {
    // Get all markdown files from content/posts
    const modules = import.meta.glob("/content/posts/*.md", {
      as: "raw",
      eager: true,
    });

    const posts = [];
    let id = 1;

    for (const [path, content] of Object.entries(modules)) {
      const parsed = parseFrontmatter(content);
      if (parsed) {
        const { frontmatter, body } = parsed;

        // Convert markdown body to HTML
        const htmlContent = markdownToHtml(body);

        posts.push({
          id: id++,
          title: frontmatter.title || "Untitled",
          date: frontmatter.date || new Date().toISOString().split("T")[0],
          category: frontmatter.category || "Khác",
          image: frontmatter.image || null,
          youtubeId: frontmatter.youtubeId || null,
          content: htmlContent,
        });
      }
    }

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return posts;
  } catch (error) {
    console.warn("Could not load markdown posts:", error);
    return [];
  }
}

// Get all posts (markdown + legacy)
export async function getAllPosts() {
  if (cachedPosts) {
    return cachedPosts;
  }

  const markdownPosts = await loadMarkdownPosts();

  // Combine markdown posts with legacy posts
  // Markdown posts will have priority
  const allPosts = [...markdownPosts, ...legacyPosts];

  // Remove duplicates based on title
  const uniquePosts = allPosts.filter(
    (post, index, self) =>
      index === self.findIndex((p) => p.title === post.title)
  );

  // Re-assign IDs and sort by date
  const sortedPosts = uniquePosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((post, index) => ({ ...post, id: index + 1 }));

  cachedPosts = sortedPosts;
  return sortedPosts;
}

// Clear cache (useful for development)
export function clearPostsCache() {
  cachedPosts = null;
}
