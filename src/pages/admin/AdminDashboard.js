// Admin Dashboard - List all posts
import { getAllPosts, deletePost } from "../../firebase/posts.js";
import { logout } from "../../firebase/auth.js";

let posts = [];

export async function AdminDashboard() {
  posts = await getAllPosts();

  return `
    <div class="admin-dashboard">
      <div class="admin-header">
        <h1>📝 Quản lý Bài viết</h1>
        <div class="admin-actions">
          <a href="/admin/post/new" class="btn-primary">+ Tạo bài mới</a>
          <button id="logoutBtn" class="btn-secondary">Đăng xuất</button>
        </div>
      </div>
      
      <div class="posts-table">
        <table>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Ngày đăng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            ${
              posts.length === 0
                ? '<tr><td colspan="4" style="text-align: center;">Chưa có bài viết nào</td></tr>'
                : posts
                    .map(
                      (post) => `
                <tr>
                  <td>${post.title}</td>
                  <td><span class="badge">${post.category}</span></td>
                  <td>${post.date}</td>
                  <td class="actions">
                    <a href="/admin/post/edit/${post.id}" class="btn-edit">✏️ Sửa</a>
                    <button class="btn-delete" data-post-id="${post.id}">🗑️ Xóa</button>
                  </td>
                </tr>
              `
                    )
                    .join("")
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function initAdminDashboard() {
  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await logout();
        window.history.pushState({}, "", "/admin/login");
        window.location.reload();
      } catch (error) {
        alert("Lỗi khi đăng xuất");
      }
    });
  }

  // Delete buttons
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const postId = e.target.getAttribute("data-post-id");
      const post = posts.find((p) => p.id === postId);

      if (confirm(`Bạn có chắc muốn xóa bài "${post.title}"?`)) {
        try {
          await deletePost(postId);
          alert("Đã xóa bài viết!");
          window.location.reload();
        } catch (error) {
          alert("Lỗi khi xóa bài viết");
        }
      }
    });
  });
}
