# My Personal Blog

Blog cá nhân đơn giản được xây dựng bằng HTML, CSS và JavaScript thuần (Vanilla JS).

## 🚀 Cấu trúc dự án

```
my-personal-blog/
│
├── public/                 # Các file tĩnh
│   ├── images/             # Ảnh bài viết, avatar
│   ├── favicon.ico
│   └── index.html          # File HTML gốc
│
├── src/                    # Source code chính
│   ├── assets/             # CSS và icons
│   ├── components/         # Các component tái sử dụng
│   ├── pages/              # Các trang chính
│   ├── data/               # Database giả (posts.json)
│   ├── utils/              # Hàm tiện ích
│   ├── App.js              # Component chính & routing
│   └── main.js             # Entry point
│
├── package.json
└── README.md
```

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview bản build
npm run preview
```

## ✨ Tính năng

- ✅ Hiển thị danh sách bài viết
- ✅ Đọc chi tiết bài viết
- ✅ Phân loại theo danh mục
- ✅ Routing đơn giản (client-side)
- ✅ Responsive design
- ✅ Không sử dụng framework (Vanilla JS)

## 📝 Quản lý bài viết

Bài viết được lưu trong file `src/data/posts.json`. Để thêm bài viết mới, chỉ cần thêm object mới vào mảng:

```json
{
  "id": 4,
  "title": "Tiêu đề bài viết",
  "date": "2024-12-05",
  "category": "Danh mục",
  "excerpt": "Tóm tắt ngắn...",
  "content": "<p>Nội dung HTML...</p>"
}
```

## 🛠️ Công nghệ sử dụng

- HTML5
- CSS3 (với CSS Variables)
- JavaScript (ES6+)
- Vite (Build tool)

## 📄 License

MIT
