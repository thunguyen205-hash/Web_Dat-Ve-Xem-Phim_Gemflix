# 🎬 GemFlix - Website Đặt Vé Xem Phim Trực Tuyến

Website đặt vé xem phim và quản trị rạp chiếu cho GemFlix. Dự án được xây dựng bằng HTML/CSS/JS thuần và hệ thống xử lý dữ liệu bằng PHP (OOP). Có giao diện khách hàng, luồng đặt vé kèm chọn ghế trực quan, quản trị nội dung phim, lịch chiếu và quản lý doanh thu.

---


## Mục lục
- [Tính năng chính](#tính-năng-chính)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt nhanh](#cài-đặt-nhanh)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Tài khoản demo](#tài-khoản-demo)
- [Triển khai production](#triển-khai-production)

---

## Tính năng chính

### Website khách hàng
- **Trang chủ** giới thiệu banner phim hot, danh sách phim mới cập nhật và phim thịnh hành.
- **Chi tiết phim** với thông tin đạo diễn, diễn viên, thời lượng, thể loại, ngày chiếu và xem trailer trực tiếp qua popup.
- **Tài khoản**: Đăng ký, đăng nhập, quản lý thông tin cá nhân và xem lịch sử đặt vé.

### Luồng đặt vé
- Chọn phim, sơ đồ ghế ngồi trực quan, cập nhật trạng thái ghế trống/đã đặt.
- Phân loại ghế (thường, VIP), hỗ trợ chọn nhiều ghế.
- Lựa chọn combo bắp nước đi kèm.
- **Thanh toán & Khuyến mãi**: nhập mã voucher giảm giá, tự động tính toán lại giá vé, hiển thị tóm tắt hóa đơn và xác nhận thanh toán giả lập.

### Admin dashboard
- Đăng nhập admin.
- **Quản lý phim**: Thêm mới, chỉnh sửa, xóa phim, cập nhật trạng thái (hot, mới, banner).
- **Quản lý lịch chiếu**: Xếp lịch chiếu phim theo phòng chiếu, ngày và giờ.
- **Quản lý người dùng & hóa đơn**: Xem danh sách tài khoản thành viên và theo dõi thống kê doanh thu vé bán ra.

---

## Công nghệ sử dụng
- **Giao diện**: HTML5, CSS3 (Vanilla, Responsive Layout).
- **JavaScript**: ES6+, thao tác DOM, xử lý sự kiện, fetch dữ liệu (`Fetch API`).
- **Icons & Fonts**: FontAwesome.
- **Hệ thống xử lý**: PHP (OOP), MySQL.

---

## Yêu cầu hệ thống
- Phần mềm tạo máy chủ ảo như **XAMPP**, **WAMP**, **MAMP** hoặc đơn giản là extension **Live Server** trên VS Code.
- Trình duyệt web hiện đại (Chrome, Firefox, Edge, Safari...).

---

## Cài đặt nhanh

Mở Terminal và chạy các lệnh sau:

```bash
# Clone dự án từ GitHub
git clone https://github.com/thunguyen205-hash/Web_Dat-Ve-Xem-Phim_Gemflix.git

# Di chuyển vào thư mục dự án
cd Web_Dat-Ve-Xem-Phim_Gemflix
```

Sau khi clone xong, bạn có thể mở thư mục dự án bằng VS Code và dùng extension **Live Server** để chạy project:
1. Mở file `index.html`.
2. Click chuột phải chọn "Open with Live Server".

Trang khách hàng sẽ mở tại địa chỉ:
```text
http://127.0.0.1:5500/index.html
```

Trang quản trị (Admin):
```text
http://127.0.0.1:5500/admin/
```

> **Lưu ý**: Hiện tại toàn bộ mã nguồn đang trỏ tới đường dẫn API cục bộ (`http://gemflix.rf.gd/backend/api`). Để website hoạt động đầy đủ tính năng, bạn cần thiết lập và chạy hệ thống xử lý dữ liệu (Backend) thông qua XAMPP trên máy tính của bạn cùng với cơ sở dữ liệu.

---

## Cấu trúc thư mục

```text
.
├── admin/                # Giao diện Admin Dashboard
├── assets/               # Hình ảnh (bắp nước, hình nền...) và media
├── components/           # Các phần tử UI HTML được tái sử dụng (header, footer...)
├── css/                  # Chứa các file style Vanilla CSS
├── js/                   # File xử lý logic giao diện
├── index.html            # Trang chủ hệ thống
├── ...                   # Các file HTML khác (movie-detail, booking, payment...)
└── README.md             # Tài liệu hướng dẫn
```

---

## Tài khoản demo

Sau khi thiết lập cơ sở dữ liệu nội bộ ở máy bạn, bạn có thể tự **Đăng ký** một tài khoản người dùng mới và trải nghiệm luồng đặt vé.

- **Đăng nhập khách hàng:** Tại trang chủ -> Nhấn "Đăng nhập"
- **Đăng nhập Admin:** Điều hướng tới thư mục `/admin/` trên URL để truy cập bảng điều khiển quản trị.

---

## Triển khai production

Khuyến nghị triển khai (hosting) website trên các nền tảng lưu trữ miễn phí và phổ biến:

- **Vercel**, **Netlify**, hoặc **GitHub Pages**.
- Chỉ cần trỏ thư mục gốc của project (chứa `index.html`) lên dịch vụ hosting.
- Hệ thống gọi API qua HTTP/HTTPS nên hoạt động bình thường trên mọi môi trường.

---

