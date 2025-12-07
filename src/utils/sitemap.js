// Generate dynamic sitemap.xml for SEO
import { getAllPosts } from "../firebase/posts.js";

export async function generateSitemap() {
  const posts = await getAllPosts();
  const baseUrl = "https://taipham-blog.vercel.app";
  const currentDate = new Date().toISOString().split("T")[0];

  const urls = [
    // Static pages
    { loc: `${baseUrl}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${baseUrl}/about`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/favorites`, priority: "0.7", changefreq: "weekly" },

    // Category pages
    {
      loc: `${baseUrl}/category/Siêu%20xe`,
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      loc: `${baseUrl}/category/Review%20Phim`,
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      loc: `${baseUrl}/category/Review%20Sách`,
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      loc: `${baseUrl}/category/Trinh%20thám`,
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      loc: `${baseUrl}/category/Kinh%20dị`,
      priority: "0.8",
      changefreq: "weekly",
    },

    // Dynamic post pages
    ...posts.map((post) => ({
      loc: `${baseUrl}/post/${post.id}`,
      priority: "0.9",
      changefreq: "monthly",
      lastmod: post.date,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod || currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}
