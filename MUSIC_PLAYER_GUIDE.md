# Hướng dẫn sử dụng Music Player

## Tổng quan

Music Player là tính năng cho phép người dùng nghe nhạc trong khi duyệt blog. Tính năng này bao gồm:

- Button music cố định ở góc phải màn hình
- Danh sách nhạc có thể cuộn
- Hiệu ứng hiển thị bài đang phát
- Các nút điều khiển: Play/Pause, Previous, Next
- Thanh điều chỉnh âm lượng
- Thanh tiến trình phát nhạc

## Cách thêm nhạc của bạn

### Bước 1: Chuẩn bị file nhạc

1. Tải lên các file nhạc của bạn (định dạng MP3, WAV, OGG) lên một hosting
   - Có thể dùng: Firebase Storage, AWS S3, Cloudinary, hoặc thư mục public của project
2. Lưu lại URL của từng bài nhạc

### Bước 2: Thêm vào public folder (khuyến nghị)

1. Tạo thư mục `public/music` trong project
2. Đặt các file nhạc vào đó
3. URL sẽ có dạng: `/music/ten-bai-hat.mp3`

### Bước 3: Cập nhật danh sách nhạc

Mở file `src/data/music.js` và cập nhật:

```javascript
export const musicList = [
  {
    id: 1,
    title: "Tên bài hát",
    artist: "Tên nghệ sĩ",
    url: "/music/bai-hat-1.mp3", // hoặc URL đầy đủ từ hosting
    duration: "3:45", // Thời lượng bài hát
  },
  {
    id: 2,
    title: "Bài hát khác",
    artist: "Nghệ sĩ khác",
    url: "https://example.com/music/song2.mp3",
    duration: "4:20",
  },
  // Thêm nhiều bài hát...
];
```

## Các nguồn nhạc miễn phí

### 1. Free Music Archive (freemusicarchive.org)

- Thư viện lớn với nhạc miễn phí bản quyền
- Nhiều thể loại khác nhau
- Có thể tải về và sử dụng

### 2. YouTube Audio Library

- Nhạc miễn phí bản quyền từ YouTube
- Tải về dưới dạng MP3
- Không cần ghi nguồn (tùy bài)

### 3. Incompetech (incompetech.com)

- Nhạc của Kevin MacLeod
- Miễn phí với ghi nguồn
- Nhiều thể loại

### 4. Bensound (bensound.com)

- Nhạc nền chất lượng cao
- Miễn phí với ghi nguồn
- Phù hợp cho blog/website

### 5. SoundHelix (soundhelix.com)

- Nhạc được tạo tự động
- Hoàn toàn miễn phí
- Không cần ghi nguồn

## Tùy chỉnh giao diện

### Thay đổi màu sắc

Chỉnh sửa trong file `src/assets/css/variables.css`:

```css
:root {
  --primary-color: #2563eb; /* Màu chính */
  --secondary-color: #1e40af; /* Màu phụ */
}
```

### Thay đổi vị trí

Chỉnh sửa trong file `src/assets/css/music-player.css`:

```css
.music-player-container {
  bottom: 30px; /* Khoảng cách từ dưới */
  right: 110px; /* Khoảng cách từ phải */
}
```

### Thay đổi kích thước

```css
.music-toggle-btn {
  width: 60px; /* Chiều rộng button */
  height: 60px; /* Chiều cao button */
}

.music-player-panel {
  width: 380px; /* Chiều rộng panel */
  max-height: 600px; /* Chiều cao tối đa */
}
```

## Tính năng

### Auto-play

Nhạc sẽ tự động chuyển bài khi kết thúc. Để tắt:

```javascript
// Trong file src/components/MusicPlayer.js
// Comment dòng này:
// audio.addEventListener('ended', () => { ... });
```

### Lưu trạng thái âm lượng

Âm lượng mặc định là 70%. Để thay đổi:

```javascript
// Trong initMusicPlayer():
audio.volume = 0.7; // Thay đổi giá trị từ 0.0 đến 1.0
```

### Thêm chế độ loop

Thêm vào `initMusicPlayer()`:

```javascript
audio.loop = true; // Loop bài hiện tại
```

## Responsive

Music player đã được tối ưu cho mobile:

- Button nhỏ hơn trên màn hình nhỏ
- Panel tự động điều chỉnh chiều rộng
- Touch-friendly controls

## Lưu ý bản quyền

⚠️ **Quan trọng**: Đảm bảo bạn có quyền sử dụng nhạc trên website của mình:

- Sử dụng nhạc miễn phí bản quyền
- Ghi nguồn nếu yêu cầu
- Không sử dụng nhạc có bản quyền mà không có giấy phép

## Khắc phục sự cố

### Nhạc không phát

1. Kiểm tra URL của file nhạc có đúng không
2. Kiểm tra file nhạc có tồn tại không
3. Mở Console (F12) để xem lỗi
4. Kiểm tra CORS nếu file từ domain khác

### Âm thanh bị vỡ

1. Kiểm tra định dạng file (khuyến nghị MP3)
2. Kiểm tra bitrate không quá cao
3. Nén file nếu cần

### Button không hiển thị

1. Kiểm tra CSS đã được import
2. Xóa cache trình duyệt
3. Kiểm tra z-index không bị che

## Hỗ trợ

Nếu có vấn đề, hãy kiểm tra:

1. Console trong Developer Tools (F12)
2. Network tab để xem file nhạc có load được không
3. Đảm bảo tất cả file đã được import đúng

Chúc bạn sử dụng vui vẻ! 🎵
