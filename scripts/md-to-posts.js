// Script to convert markdown files to posts.js
// Run: node scripts/md-to-posts.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, "../content/posts");
const OUTPUT_FILE = path.join(__dirname, "../src/data/posts.js");

// Parse frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const frontmatterContent = match[1];
  const body = match[2];

  frontmatterContent.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

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

// Convert markdown to HTML
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
  const lines = html.split("\n");
  const result = [];
  let inList = false;

  for (let line of lines) {
    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      if (!inList) {
        result.push("<ul>");
        inList = true;
      }
      result.push(`<li>${line.trim().substring(2)}</li>`);
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      if (line.trim() && !line.trim().startsWith("<")) {
        result.push(`<p>${line}</p>`);
      } else {
        result.push(line);
      }
    }
  }

  if (inList) result.push("</ul>");

  return result.join("\n");
}

// Read all markdown files
function readMarkdownFiles() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log("No content/posts directory found");
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts = [];

  files.forEach((file, index) => {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const parsed = parseFrontmatter(content);

    if (parsed) {
      const { frontmatter, body } = parsed;
      const htmlContent = markdownToHtml(body);

      posts.push({
        id: index + 1,
        title: frontmatter.title || "Untitled",
        date: frontmatter.date || new Date().toISOString().split("T")[0],
        category: frontmatter.category || "Khác",
        image: frontmatter.image || null,
        youtubeId: frontmatter.youtubeId || null,
        content: htmlContent,
      });
    }
  });

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Re-assign IDs
  posts.forEach((post, index) => {
    post.id = index + 1;
  });

  return posts;
}

// Generate posts.js file
function generatePostsFile(posts) {
  const output = `// src/data/posts.js
// Auto-generated from markdown files
// Run 'npm run md-to-posts' to update

export const posts = ${JSON.stringify(posts, null, 2).replace(
    /"([^"]+)":/g,
    "$1:"
  )};
`;

  fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
  console.log(`✅ Generated ${OUTPUT_FILE} with ${posts.length} posts`);
}

// Main
const posts = readMarkdownFiles();
generatePostsFile(posts);
