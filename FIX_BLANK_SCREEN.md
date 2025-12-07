# HƯỚNG DẪN SỬA LỖI MÀN HÌNH TRẮNG

## Nguyên nhân

- File `postsLoader.js` dùng `import.meta.glob` gây lỗi khi build production
- Blog hiện tại hoạt động tốt với `posts.js`, không cần load markdown runtime

## Giải pháp

### 1. XÓA file postsLoader.js

```bash
rm src/data/postsLoader.js
```

### 2. Workflow mới với Decap CMS:

**Khi viết bài mới trên CMS:**

1. Viết bài trên `/admin/`
2. CMS tạo file `.md` trong `content/posts/`
3. Chạy lệnh: `npm run md-to-posts`
4. Script tự động convert `.md` → `posts.js`
5. Commit & push lên GitHub
6. Site tự động rebuild

### 3. Build lại site:

```bash
# Local test
npm run build
npm run preview

# Nếu OK, commit và push
git add .
git commit -m "Remove postsLoader, use md-to-posts script"
git push
```

### 4. Kiểm tra build trên Netlify:

- Vào Netlify Dashboard → Deploys
- Xem build log có lỗi gì không
- Nếu có lỗi, paste lỗi để tôi giúp

## Cách dùng Decap CMS (Workflow mới)

1. ✍️ Viết bài trên `/admin/`
2. 📝 CMS tạo file markdown
3. 💻 Pull code về local: `git pull`
4. 🔄 Convert sang JS: `npm run md-to-posts`
5. ⬆️ Push lại: `git add . && git commit -m "Update posts" && git push`
6. ✅ Site tự rebuild

## Tips

- Có thể tự động hóa bước 4 bằng GitHub Actions
- Hoặc tạm thời vẫn thêm bài trực tiếp vào `posts.js` như cũ
- Decap CMS chủ yếu để backup content dạng markdown

## Nếu vẫn lỗi

Mở browser console (F12) → Console tab → Chụp ảnh lỗi gửi cho tôi
