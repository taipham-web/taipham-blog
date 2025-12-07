# HƯỚNG DẪN SETUP FIREBASE ADMIN PANEL

## 📋 Tổng quan

Bạn đã có đầy đủ code cho Firebase Admin Panel. Bây giờ cần:

1. Tạo Firebase project
2. Cài đặt dependencies
3. Config Firebase credentials
4. Tạo tài khoản admin đầu tiên
5. Deploy lên Vercel

---

## 🚀 Bước 1: Tạo Firebase Project

1. Truy cập https://console.firebase.google.com/
2. Click "Add project" / "Thêm dự án"
3. Đặt tên project (ví dụ: `taipham-blog`)
4. Tắt Google Analytics (không cần thiết)
5. Click "Create project"

---

## 🔥 Bước 2: Setup Firestore Database

1. Trong Firebase Console, vào **Build** → **Firestore Database**
2. Click **Create database**
3. Chọn location gần Việt Nam (ví dụ: `asia-southeast1`)
4. Chọn **Start in production mode** (sẽ config rules sau)
5. Click **Enable**

### Setup Firestore Rules (Bảo mật)

Vào tab **Rules**, paste code này:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts collection - Public read, admin write
    match /posts/{postId} {
      allow read: if true;  // Ai cũng đọc được
      allow write: if request.auth != null;  // Chỉ user đã login mới write được
    }
  }
}
```

Click **Publish**

---

## 🔐 Bước 3: Setup Authentication

1. Vào **Build** → **Authentication**
2. Click **Get started**
3. Chọn **Email/Password**
4. **Enable** Email/Password
5. Click **Save**

---

## ⚙️ Bước 4: Lấy Firebase Config

1. Vào **Project settings** (icon ⚙️ góc trên bên trái)
2. Scroll xuống phần **Your apps**
3. Click icon **</>** (Web)
4. Đặt nickname (ví dụ: `Blog Web App`)
5. **KHÔNG** check "Also set up Firebase Hosting"
6. Click **Register app**
7. Copy đoạn `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "taipham-blog.firebaseapp.com",
  projectId: "taipham-blog",
  storageBucket: "taipham-blog.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};
```

8. Mở file `src/firebase/config.js`
9. **THAY BẰNG config của bạn**

---

## 💻 Bước 5: Cài đặt dependencies

```bash
npm install
```

---

## 👤 Bước 6: Tạo tài khoản Admin đầu tiên

### Cách 1: Dùng Firebase Console (Khuyên dùng)

1. Vào **Authentication** → tab **Users**
2. Click **Add user**
3. Nhập email: `admin@yourdomain.com` (hoặc email bạn muốn)
4. Nhập password mạnh (ít nhất 8 ký tự)
5. Click **Add user**

### Cách 2: Dùng code (Temporary)

Tạo file tạm `create-admin.html` trong thư mục `public/`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Create Admin</title>
  </head>
  <body>
    <h1>Create Admin User</h1>
    <input type="email" id="email" placeholder="admin@example.com" />
    <input type="password" id="password" placeholder="Password" />
    <button onclick="createAdmin()">Create</button>
    <div id="result"></div>

    <script type="module">
      import { createAdminUser } from "../src/firebase/auth.js";

      window.createAdmin = async function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const result = document.getElementById("result");

        try {
          await createAdminUser(email, password);
          result.innerHTML =
            '<p style="color: green">✅ Admin created! Delete this file now.</p>';
        } catch (error) {
          result.innerHTML = `<p style="color: red">❌ Error: ${error.message}</p>`;
        }
      };
    </script>
  </body>
</html>
```

Chạy `npm run dev`, vào `http://localhost:5173/create-admin.html`, tạo admin, **XÓA FILE NÀY NGAY SAU ĐÓ!**

---

## 🌐 Bước 7: Test Admin Panel

```bash
npm run dev
```

1. Vào `http://localhost:5173/admin/login`
2. Đăng nhập bằng email/password admin vừa tạo
3. Thử tạo bài viết mới
4. Check Firestore Database xem có data không

---

## 🚢 Bước 8: Deploy lên Vercel

### Update vercel.json để support admin routes:

```json
{
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/index.html"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy:

```bash
git add .
git commit -m "Add Firebase admin panel"
git push
```

Vercel sẽ tự động deploy!

---

## 📱 Bước 9: Cập nhật Frontend để đọc từ Firebase

Hiện tại blog vẫn đọc từ `posts.js`. Để đọc từ Firebase, sửa `HomePage.js`:

```javascript
import { getAllPosts } from "../firebase/posts.js";

export async function HomePage() {
  // Đọc từ Firebase thay vì posts.js
  const posts = await getAllPosts();

  // Code còn lại giống cũ...
}
```

Tương tự cho `PostDetail.js`, `CategoryPage.js`, v.v.

---

## ✅ Checklist

- [ ] Tạo Firebase project
- [ ] Enable Firestore Database
- [ ] Setup Firestore Rules
- [ ] Enable Authentication (Email/Password)
- [ ] Copy Firebase config vào `src/firebase/config.js`
- [ ] Run `npm install`
- [ ] Tạo tài khoản admin
- [ ] Test login tại `/admin/login`
- [ ] Tạo bài viết test
- [ ] Update vercel.json
- [ ] Deploy lên Vercel
- [ ] Test admin panel trên production

---

## 🎉 Kết quả

Sau khi hoàn thành, bạn sẽ có:

- **Admin Panel**: `https://your-site.vercel.app/admin/login`
- **Dashboard**: `https://your-site.vercel.app/admin/dashboard`
- **Tạo bài**: `https://your-site.vercel.app/admin/post/new`

Bài viết sẽ được lưu trên Firebase Firestore, không cần commit code mỗi lần viết bài!

---

## 🔒 Bảo mật

- Chỉ user đã authentication mới vào được admin panel
- Firestore rules chỉ cho phép authenticated users write
- Mọi người vẫn đọc được posts (public read)

---

**Cần hỗ trợ? Hỏi tôi!** 🙋‍♂️
