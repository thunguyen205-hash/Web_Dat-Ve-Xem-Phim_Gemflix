# 🎬 GemFlix - Website Đặt Vé Xem Phim Trực Tuyến

## Thông tin Đồ án / Bài tập lớn
- **Sinh viên thực hiện:** [Điền tên của bạn]
- **Mã sinh viên:** [Điền mã SV]
- **Lớp/Học phần:** [Điền thông tin lớp]
- **Giảng viên hướng dẫn:** [Điền tên Giảng viên]

---

Website đặt vé xem phim và quản trị rạp chiếu cho GemFlix. Dự án được xây dựng bằng HTML5/CSS3/JavaScript thuần, có giao diện khách hàng, luồng đặt vé trực quan nhiều bước, quản trị nội dung phim và quản lý lịch chiếu. Toàn bộ hệ thống hoạt động dựa trên dữ liệu giả lập (Mock Data) và LocalStorage ở phía client, không yêu cầu cấu hình backend hay database thực.

---

## Demo trực tuyến

Website đã được deploy tại:

[Dùng thử website tại đây](https://web-dat-ve-xem-phim-gemflix.vercel.app/)

---

## Mục lục
- [Demo trực tuyến](#demo-trực-tuyến)
- [Tính năng chính](#tính-năng-chính)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt nhanh](#cài-đặt-nhanh)
- [Cơ sở dữ liệu và API giả lập](#cơ-sở-dữ-liệu-và-api-giả-lập)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Tài khoản demo](#tài-khoản-demo)

---

## Tính năng chính

### Website khách hàng
- **Trang chủ** giới thiệu banner phim hot, danh sách phim mới cập nhật và phim thịnh hành.
- **Chi tiết phim** với thông tin đạo diễn, diễn viên, thời lượng, thể loại, ngày chiếu và xem trailer trực tiếp qua popup.
- **Trang danh sách phim** hỗ trợ lọc theo thể loại và từ khóa tìm kiếm.
- **Tài khoản**: Đăng ký, đăng nhập, quản lý thông tin cá nhân và xem lịch sử đặt vé.

### Luồng đặt vé
- **Chọn phim & suất chiếu**: Hiển thị linh hoạt suất chiếu theo ngày và phòng chiếu.
- **Sơ đồ ghế ngồi trực quan**: Cập nhật trạng thái ghế trống/đã đặt, phân loại ghế (thường, VIP), hỗ trợ chọn nhiều ghế cùng lúc.
- **Thanh toán & Khuyến mãi**: Cho phép nhập mã voucher giảm giá, tự động tính toán lại giá vé, hiển thị tóm tắt hóa đơn và xác nhận thanh toán giả lập.
- **Lưu trữ vé**: Thông tin vé được lưu trực tiếp vào tài khoản (trong LocalStorage) và hiển thị ở phần lịch sử cá nhân.

### Admin dashboard
- **Quản lý phim**: Thêm mới, chỉnh sửa, xóa phim, cập nhật trạng thái (hot, mới, banner).
- **Quản lý lịch chiếu**: Xếp lịch chiếu phim theo phòng chiếu, ngày và giờ.
- **Quản lý khách hàng**: Xem danh sách tài khoản thành viên và lịch sử giao dịch.

---

## Công nghệ sử dụng
- **Frontend Core**: HTML5, CSS3 (Vanilla CSS, Responsive Layout), JavaScript (ES6+).
- **Icons & Fonts**: FontAwesome, Google Fonts.
- **Architecture**: Component-based UI bằng cách dùng `fetch()` tải các phần tử dùng chung (Header, Footer).
- **Data Management**: Mock API (Interceptors) & Mock Data (JavaScript) kết hợp cùng trình duyệt LocalStorage để lưu trữ trạng thái lâu dài.

---

## Yêu cầu hệ thống
- Môi trường chạy file HTML tĩnh qua Local Web Server.
- Trình duyệt web hiện đại (Chrome, Edge, Firefox, Safari...).
- Khuyên dùng tiện ích **Live Server** trên VS Code hoặc **Node.js**.

---

## Cài đặt nhanh

Dự án này tải các thành phần giao diện động qua hàm `fetch()`, do đó bạn **không thể** mở trực tiếp file `index.html` (chạy qua giao thức `file://`) mà bắt buộc phải thông qua một local web server. Bạn có thể cài đặt nhanh qua 1 trong 3 cách sau:

### Cách 1: Dùng tiện ích Live Server (VS Code) - *Khuyên dùng*
1. Mở thư mục dự án bằng phần mềm **Visual Studio Code**.
2. Cài đặt tiện ích mở rộng **Live Server** (của Ritwick Dey).
3. Mở file `index.html`, click chuột phải chọn **"Open with Live Server"**.
4. Trình duyệt tự động mở: `http://127.0.0.1:5500/index.html`

### Cách 2: Dùng Node.js
Nếu máy tính bạn đã có Node.js, mở Terminal tại thư mục dự án và chạy:
```bash
npx serve
```
Mở trình duyệt: `http://localhost:3000`

### Cách 3: Dùng XAMPP / WAMP
1. Move/Clone thư mục dự án vào thư mục web gốc (`htdocs` đối với XAMPP).
2. Mở XAMPP Control Panel, nhấn **Start** module **Apache**.
3. Mở trình duyệt: `http://localhost/Web_Dat-Ve-Xem-Phim_Gemflix/index.html`

---

## Cơ sở dữ liệu và API giả lập

Hệ thống hoạt động hoàn toàn offline ở phía Client. Không cần MySQL hay PHP.

- **Mock Data (`js/mock-data.js`)**: Chứa dữ liệu tĩnh khởi tạo ban đầu bao gồm danh sách người dùng, phim, voucher...
- **Mock API (`js/mock-api.js`)**: Hoạt động như một Middleware. Nó chặn toàn bộ các cuộc gọi `fetch()` đến đường dẫn ảo (ví dụ: `/backend/api/movies`), sau đó lấy dữ liệu từ `mock-data.js` hoặc LocalStorage để trả về dưới dạng JSON mô phỏng HTTP Response thật.
- **LocalStorage**: Đóng vai trò như Database. Bất kỳ thao tác tạo/sửa/xóa (Đặt vé, Đăng ký, Tạo phim mới) đều được ghi nhận vào LocalStorage giúp dữ liệu không bị mất khi tải lại trang.

> *Lưu ý: Nếu bạn sửa đổi mã nguồn ở file dữ liệu `mock-data.js`, hãy "Clear Data" (Xóa cache) trình duyệt hoặc mở tab Ẩn danh để hệ thống lấy lại dữ liệu mới nhất.*

---

## Cấu trúc thư mục

```text
Web_Dat-Ve-Xem-Phim_Gemflix/
├── index.html              # Trang chủ hệ thống
├── booking.html            # Trang đặt vé & sơ đồ chọn ghế
├── movie-detail.html       # Trang chi tiết phim
├── movies.html             # Trang danh sách & tìm kiếm phim
├── payment.html            # Trang thanh toán
├── login.html              # Trang đăng nhập
├── register.html           # Trang đăng ký
├── profile.html            # Trang quản lý hồ sơ cá nhân
├── admin/                  # Bảng điều khiển Admin Dashboard
│   ├── index.html          # Quản lý phim (Danh sách, Thêm/Sửa)
│   ├── showtimes.html      # Quản lý suất chiếu
│   └── customers.html      # Quản lý người dùng
├── assets/                 # Thư mục chứa hình ảnh, banner, posters
├── components/             # Các phần tử UI dùng chung (Header, Footer, Modal)
├── css/                    # Các tập tin CSS thuần
└── js/                     # Logic giao diện & Dữ liệu giả lập
    ├── mock-api.js         # Interceptor giả lập API
    ├── mock-data.js        # Dữ liệu hạt giống (Seed data)
    ├── main.js             # Logic xử lý giao diện trang chủ
    ├── booking.js          # Logic luồng đặt vé và chọn ghế
    ├── payment.js          # Logic tính tiền, voucher, thanh toán
    ├── auth.js             # Logic xác thực đăng nhập/đăng ký
    └── ...                 # Các file logic từng trang
```

---

## Tài khoản demo

Sau khi chạy dự án, bạn có thể tự đăng ký tài khoản mới trực tiếp trên web hoặc sử dụng các tài khoản có sẵn trong hệ thống:

**Tài khoản Khách Hàng (Customer):**
- Email: `thu@gmail.com`
- Mật khẩu: `123456`
- Có thể đăng ký thêm tài khoản mới

**Tài khoản Quản Trị (Admin):**
- Email: `admin@gmail.com`
- Mật khẩu: `1`