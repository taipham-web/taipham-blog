# Hướng dẫn Setup Decap CMS cho Blog

## ✅ Đã hoàn thành

1. ✅ Tạo giao diện admin tại `/public/admin/`
2. ✅ Tạo file config cho Decap CMS
3. ✅ Tạo thư mục `content/posts/` để chứa bài viết Markdown
4. ✅ Tạo utility để load markdown files
5. ✅ Tạo file markdown mẫu

## 📋 Các bước tiếp theo (BẮT BUỘC)

### Bước 1: Cài đặt Netlify Identity hoặc GitHub Backend

Bạn có 2 lựa chọn:

#### **Lựa chọn A: Netlify Identity (Đơn giản nhất - Khuyên dùng)**

1. **Deploy lên Netlify:**

   - Truy cập https://app.netlify.com/
   - Kết nối GitHub repo của bạn
   - Deploy site

2. **Bật Netlify Identity:**

   - Vào site Settings → Identity → Enable Identity
   - Registration preferences → Invite only (hoặc Open nếu muốn)
   - Services → Git Gateway → Enable Git Gateway

3. **Mời bản thân làm user:**

   - Identity tab → Invite users
   - Nhập email của bạn → Send invitation
   - Check email và set password

4. **Thêm script vào index.html:**

   Mở file `index.html` và thêm trước thẻ `</head>`:

   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```

   Và thêm trước thẻ `</body>`:

   ```html
   <script>
     if (window.netlifyIdentity) {
       window.netlifyIdentity.on("init", (user) => {
         if (!user) {
           window.netlifyIdentity.on("login", () => {
             document.location.href = "/admin/";
           });
         }
       });
     }
   </script>
   ```

#### **Lựa chọn B: GitHub Backend (Không cần Netlify)**

Thay đổi trong file `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: taipham-web/taipham-blog # Thay bằng repo của bạn
  branch: main
```

Sau đó cần tạo OAuth App trên GitHub và config thêm.

---

### Bước 2: Test CMS

1. Deploy code lên Netlify hoặc Vercel
2. Truy cập `https://your-site.netlify.app/admin/`
3. Đăng nhập bằng Netlify Identity
4. Bắt đầu tạo bài viết!

---

### Bước 3: Cập nhật code để đọc Markdown (Tùy chọn)

Hiện tại blog vẫn đọc từ `posts.js` cũ. Nếu muốn chuyển hoàn toàn sang Markdown:

1. Xóa hoặc comment code cũ trong `posts.js`
2. Cập nhật các page để dùng `postsLoader.js`
3. Build tool như Vite sẽ tự động load markdown files

---

## 🎯 Cách sử dụng CMS

1. **Truy cập Admin:** `https://your-site.com/admin/`
2. **Login** với Netlify Identity
3. **Click "Bài viết"** → **"New Bài viết"**
4. **Điền thông tin:**
   - Tiêu đề
   - Ngày đăng
   - Danh mục
   - Upload ảnh bìa
   - YouTube ID (nếu có)
   - Viết nội dung bằng Markdown
5. **Click "Publish"** → Tự động commit lên GitHub!
6. **Site tự động rebuild** và bài mới xuất hiện

---

## 📝 Format Markdown

```markdown
---
title: "Tiêu đề bài viết"
date: "2025-12-07"
category: "Siêu xe"
image: "/images/posts/anh-bia.jpg"
youtubeId: "VIDEO_ID"
---

Nội dung bài viết ở đây...

### Tiêu đề phụ

Đoạn văn bản...

![Alt text](/images/posts/anh.jpg)

**Chữ in đậm** và _chữ nghiêng_
```

---

## 🚀 Lợi ích

- ✅ Không cần code để thêm bài
- ✅ Giao diện admin đẹp, dễ dùng
- ✅ Tự động commit lên GitHub
- ✅ Preview trước khi publish
- ✅ Upload ảnh trực tiếp
- ✅ Hỗ trợ Markdown editor
- ✅ Hoàn toàn miễn phí!

---

## ⚠️ Lưu ý

- Bài viết trong `posts.js` vẫn hoạt động bình thường
- Markdown posts sẽ được ưu tiên hiển thị
- Bạn có thể dần dần chuyển bài từ `posts.js` sang Markdown
- File `postsLoader.js` sẽ merge cả 2 nguồn lại

---

## 🆘 Troubleshooting

**Lỗi: "Unable to access..."**
→ Chưa enable Git Gateway trên Netlify

**Không thấy bài mới:**
→ Check xem file .md đã commit lên GitHub chưa

**Ảnh không hiển thị:**
→ Đảm bảo upload vào đúng thư mục `public/images/posts/`

---

**Cần hỗ trợ thêm? Hãy hỏi tôi!** 🙋‍♂️
