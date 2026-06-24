# 🎬 GemFlix - Website Đặt Vé Xem Phim Trực Tuyến

Website đặt vé xem phim và quản trị rạp chiếu cho GemFlix. Dự án được xây dựng bằng PHP thuần (OOP), MySQL, HTML5/CSS3/JS, có giao diện khách hàng, luồng đặt vé kèm chọn ghế trực quan, quản trị nội dung phim, lịch chiếu và quản lý doanh thu.

---

## Mục lục
- [Tính năng chính](#tính-năng-chính)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt nhanh](#cài-đặt-nhanh)
- [Cơ sở dữ liệu](#cơ-sở-dữ-liệu)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Tài khoản demo](#tài-khoản-demo)

---

## Tính năng chính

### Website khách hàng
- **Trang chủ** giới thiệu banner phim hot, danh sách phim mới cập nhật và phim thịnh hành.
- **Chi tiết phim** với thông tin đạo diễn, diễn viên, thời lượng, thể loại, ngày chiếu và xem trailer trực tiếp qua popup.
- **Luồng đặt vé**: chọn phim, sơ đồ ghế ngồi trực quan, cập nhật trạng thái ghế trống/đã đặt, phân loại ghế (thường, VIP), hỗ trợ chọn nhiều ghế.
- **Thanh toán & Khuyến mãi**: nhập mã voucher giảm giá, tự động tính toán lại giá vé, hiển thị tóm tắt hóa đơn và xác nhận thanh toán giả lập.
- **Tài khoản**: Đăng ký, đăng nhập, quản lý thông tin cá nhân và xem lịch sử đặt vé.

### Admin dashboard
- **Quản lý phim**: Thêm mới, chỉnh sửa, xóa phim, cập nhật trạng thái (hot, mới, banner).
- **Quản lý lịch chiếu**: Xếp lịch chiếu phim theo phòng chiếu, ngày và giờ.
- **Quản lý người dùng & hóa đơn**: Xem danh sách tài khoản thành viên và theo dõi thống kê doanh thu vé bán ra.

---

## Công nghệ sử dụng
- **Frontend**: HTML5, CSS3 (Vanilla, Responsive Layout), JavaScript (ES6+, Fetch API), FontAwesome.
- **Backend**: PHP (Xây dựng RESTful API với cấu trúc lập trình thuần hướng đối tượng OOP).
- **Database**: MySQL (Quản lý phim, người dùng, lịch chiếu, ghế ngồi, hóa đơn, voucher).

---

## Yêu cầu hệ thống
- Phần mềm tạo máy chủ ảo như **XAMPP**, **WAMP**, hoặc **MAMP**.
- **PHP** phiên bản 7.4 trở lên (Khuyến nghị PHP 8+).
- **MySQL** hoặc **MariaDB**.

---

## Cài đặt nhanh

Mở Terminal (hoặc Command Prompt) trong thư mục gốc của web server, ví dụ `C:\xampp\htdocs\` và chạy các lệnh sau:

```bash
# Clone dự án từ GitHub
git clone https://github.com/thunguyen205-hash/LT-Web_Dat-Ve-Xem-Phim.git

# Di chuyển vào thư mục dự án
cd LT-Web_Dat-Ve-Xem-Phim
```

Sau khi clone xong:
1. Mở **XAMPP Control Panel** và Start 2 module: **Apache** và **MySQL**.
2. Nạp cơ sở dữ liệu (xem hướng dẫn phần *Cơ sở dữ liệu* bên dưới).

Sau khi hoàn tất, mở trình duyệt và truy cập trang khách hàng:
```text
http://localhost/LT-Web_Dat-Ve-Xem-Phim/frontend/index.html
```

Trang quản trị (Admin):
```text
http://localhost/LT-Web_Dat-Ve-Xem-Phim/frontend/admin/
```

---

## Cơ sở dữ liệu

Dự án sử dụng cơ sở dữ liệu MySQL. Bạn có thể nạp dữ liệu bằng một trong hai cách sau:

**Cách 1: Sử dụng Terminal (Dòng lệnh)**

Mở Terminal và chạy lệnh sau (yêu cầu máy đã cài biến môi trường cho mysql):
```bash
# Đăng nhập vào mysql và tạo database (nếu chưa có)
mysql -u root -e "CREATE DATABASE IF NOT EXISTS cinema_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"

# Import dữ liệu
mysql -u root cinema_db < backend/database/cinema_db.sql
```

**Cách 2: Sử dụng phpMyAdmin (Giao diện trực quan)**

1. Truy cập công cụ quản trị CSDL: `http://localhost/phpmyadmin/`
2. Tạo database mới với tên: **`cinema_db`** (Collation: `utf8mb4_general_ci`).
3. Click vào database `cinema_db` vừa tạo, chuyển sang tab **Import**.
4. Nhấn **Choose File**, chọn tệp `backend/database/cinema_db.sql`.
5. Nhấn **Go** để nạp dữ liệu.

---

## Cấu trúc thư mục

```text
.
├── backend/                  # Chứa toàn bộ mã nguồn PHP Backend API
│   ├── api/                  # Các endpoint API (auth, movies, bookings...)
│   ├── config/               # Cấu hình kết nối CSDL và hằng số
│   ├── database/             # Chứa file SQL mẫu (cinema_db.sql)
│   ├── model/                # Các class hướng đối tượng xử lý logic DB
│   └── postman_collection.json # Collection để test API bằng Postman
├── frontend/                 # Chứa mã nguồn giao diện
│   ├── admin/                # Giao diện Admin Dashboard
│   ├── assets/               # Hình ảnh và media
│   ├── components/           # Các phần tử UI tái sử dụng
│   ├── css/                  # Chứa các file style Vanilla CSS
│   ├── data/                 # Dữ liệu tĩnh hoặc cấu hình cho frontend
│   ├── js/                   # File xử lý logic giao diện, gọi Fetch API
│   ├── style-guide/          # Quy chuẩn thiết kế UI
│   ├── index.html            # Trang chủ hệ thống
│   └── ...                   # Các file HTML khác (movie-detail, booking, payment...)
└── README.md                 # Tài liệu hướng dẫn
```

---

## Tài khoản demo

Sau khi import thành công database `cinema_db.sql`, bạn có thể kiểm tra trong bảng `users` để lấy tài khoản đăng nhập mẫu.
Hoặc bạn có thể truy cập trực tiếp trang web để tự **Đăng ký** một tài khoản người dùng mới và trải nghiệm luồng đặt vé.

- **Đăng nhập khách hàng:** Tại trang chủ -> Nhấn "Đăng nhập"
- **Đăng nhập Admin:** Điều hướng tới thư mục `/frontend/admin/` trên URL để truy cập bảng điều khiển quản trị.

---

## Tác Giả
*   **GitHub**: [@thunguyen205-hash (AThu205)](https://github.com/thunguyen205-hash)