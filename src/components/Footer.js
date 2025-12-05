// Footer Component - Chân trang
export function Footer() {
  const currentYear = new Date().getFullYear();
  return `
        <footer class="footer">
            <div class="container">
                <p>&copy; ${currentYear} My Personal Blog. All rights reserved.</p>
            </div>
        </footer>
    `;
}
