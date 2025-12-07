// Admin Login Page
import { signIn } from "../../firebase/auth.js";

export function AdminLoginPage() {
  return `
    <div class="admin-login">
      <div class="login-container">
        <h1>🔐 Admin Login</h1>
        <form id="loginForm" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="admin@example.com">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="••••••••">
          </div>
          <div id="loginError" class="error-message" style="display: none;"></div>
          <button type="submit" class="btn-primary">Đăng nhập</button>
        </form>
      </div>
    </div>
  `;
}

export function initAdminLogin() {
  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("loginError");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = "Đang đăng nhập...";
    errorDiv.style.display = "none";

    try {
      await signIn(email, password);
      // Redirect to admin dashboard
      window.history.pushState({}, "", "/admin/dashboard");
      window.location.reload();
    } catch (error) {
      errorDiv.textContent = "Email hoặc mật khẩu không đúng!";
      errorDiv.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.textContent = "Đăng nhập";
    }
  });
}
