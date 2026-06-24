// State-preserving Mock API for GemFlix
// Intercepts fetch calls to http://gemflix.rf.gd/backend/api and local path backend API
(function () {
    // 1. Dynamically load the user's original mock-data.js synchronously
    const currentScript = document.currentScript;
    if (currentScript) {
        const dataScriptUrl = currentScript.src.replace('mock-api.js', 'mock-data.js');
        document.write('<script src="' + dataScriptUrl + '"><\/script>');
    }

    const API_BASE_URL_REMOTE = "http://gemflix.rf.gd/backend/api";
    const API_BASE_URL_LOCAL = "http://localhost/LT-Web_Dat-Ve-Xem-Phim/backend/api";

    // Fallback movies in case mock-data.js fails to load
    const initialMoviesFallback = [
        {
            id: 99,
            title: "Mưa Đỏ",
            year: 2025,
            description: "Lấy bối cảnh 81 ngày đêm khốc liệt tại Thành Cổ Quảng Trị năm 1972, Mưa Đỏ là câu chuyện hư cấu, theo chân một tiểu đội gồm những người lính trẻ tuổi, đầy nhiệt huyết, chiến đấu và bám trụ tại trận địa lịch sử này.",
            imageUrl: "https://imgchinhsachcuocsong.vnanet.vn/MediaUpload/Org/2025/07/23/204219-z6833331728306_9920591c2fadf96b8ec838e4967f44a4.jpg",
            bannerUrl: "https://imgchinhsachcuocsong.vnanet.vn/MediaUpload/Org/2025/07/23/204219-z6833331728306_9920591c2fadf96b8ec838e4967f44a4.jpg",
            trailerUrl: "https://www.youtube.com/embed/BD6PoZJdt_M",
            duration: "120 phút",
            rating: "T18",
            genre: "Chiến tranh, Lịch sử",
            director: "Nguyễn Quang Dũng",
            cast: "Nhiều diễn viên trẻ",
            release_date: "2025-07-23"
        },
        {
            id: 1,
            title: "Lật Mặt 7: Một Điều Ước",
            year: 2024,
            description: "Phim xoay quanh câu chuyện của bà Hai (Thanh Hiền) và bốn người con. Khi bà Hai không may gặp nạn, cần người chăm sóc, bốn người con đùn đẩy nhau. Câu chuyện đặt ra câu hỏi về lòng hiếu thảo và tình cảm gia đình.",
            imageUrl: "https://photo-baomoi.bmcdn.me/w700_r1/2024_03_13_17_48553023/057ac6914bdda283fbcc.jpg",
            trailerUrl: "https://www.youtube.com/embed/d1ZHdosjNX8",
            duration: "138 phút",
            rating: "T13",
            genre: "Gia đình, Chính kịch",
            director: "Lý Hải",
            cast: "Thanh Hiền, Trương Minh Cường, Đinh Y Nhung, Quách Ngọc Tuyên",
            release_date: "2024-04-26"
        },
        {
            id: 2,
            title: "Gặp Lại Chị Bầu",
            year: 2024,
            description: "Phúc, một thanh niên có quá khứ bất hảo, cùng bạn bè lập nghiệp ở xóm trọ. Anh gặp Huyền, một cô gái tốt bụng. Tình yêu của họ nảy nở giữa những khó khăn, và bí mật về quá khứ của Huyền dần được hé lộ.",
            imageUrl: "https://tse3.mm.bing.net/th/id/OIP.xrGKhbdzKrWVQ2urtnnk-AHaK_?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/8WS_CiekZLc",
            duration: "110 phút",
            rating: "T16",
            genre: "Hài, Tình cảm",
            director: "Nhất Trung",
            cast: "Anh Tú, Diệu Nhi, Lê Giang, Ngọc Phước",
            release_date: "2024-02-10"
        },
        {
            id: 3,
            title: "Nhà Gia Tiên",
            year: 2025,
            description: "Câu chuyện về một gia đình gốc Việt tại Mỹ và những xung đột thế hệ. Phim khám phá sự khác biệt văn hóa, kỳ vọng của cha mẹ và ước mơ của con cái trong bối cảnh hiện đại.",
            imageUrl: "https://st.download.com.vn/data/image/2025/02/14/nha-gia-tien.jpg",
            trailerUrl: "https://www.youtube.com/embed/aR2lnpCLqUk",
            duration: "95 phút",
            rating: "T13",
            genre: "Gia đình, Hài",
            director: "Trần Hữu Tấn",
            cast: "Lê Khanh, Hồng Đào, Thái Hòa, Tuấn Trần",
            release_date: "2025-02-14"
        },
        {
            id: 4,
            title: "Thám Tử Kiên: Kỳ Án Không Đầu",
            year: 2025,
            description: "Một thám tử tư tài ba nhưng lập dị điều tra một vụ án mạng bí ẩn nơi nạn nhân bị mất đầu. Anh phải chạy đua với thời gian để tìm ra hung thủ trước khi hắn ra tay lần nữa.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.4HedOsPiqdgGJBNfuEHYUQHaKl?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/QiXNbEKF3U0",
            duration: "115 phút",
            rating: "T18",
            genre: "Trinh thám, Kinh dị",
            director: "Victor Vũ",
            cast: "Hứa Vĩ Văn, Trúc Anh, Kaity Nguyễn",
            release_date: "2025-03-05"
        },
        {
            id: 5,
            title: "Nhà Bà Nữ",
            year: 2023,
            description: "Phim xoay quanh gia đình bà Nữ, chủ một quán bánh canh cua, và những mâu thuẫn thế hệ gay gắt. Câu chuyện khai thác áp lực gia đình, tình yêu và sự tha thứ.",
            imageUrl: "https://th.bing.com/th/id/R.4484bb72cef55c45590763e3d98772ed?rik=KN1P4v1nfCF6sA&pid=ImgRaw&r=0",
            trailerUrl: "https://www.youtube.com/embed/4peQFKutH34",
            duration: "135 phút",
            rating: "T16",
            genre: "Chính kịch, Gia đình",
            director: "Trấn Thành",
            cast: "Trấn Thành, Lê Giang, Uyển Ân, Song Luân",
            release_date: "2023-01-22"
        }
    ];

    const initialUsers = [
        { id: 1, username: "admin", email: "admin@gmail.com", role: "admin", total_bookings: 3, total_spent: 1200000 },
        { id: 2, username: "Thư Nguyễn", email: "thu@gmail.com", role: "user", total_bookings: 1, total_spent: 90000 },
        { id: 3, username: "Gia Bảo", email: "bao@gmail.com", role: "user", total_bookings: 0, total_spent: 0 }
    ];

    const initialVouchers = [
        { code: "GEMFLIX10", desc: "Giảm 10% tổng hóa đơn", exp: "31/12/2026", is_valid: 1, is_percent: 1, discount_value: 10 },
        { code: "HELLOSUMMER", desc: "Giảm 50.000đ khi đặt vé", exp: "31/12/2026", is_valid: 1, is_percent: 0, discount_value: 50000 },
        { code: "EXPIRED50", desc: "Giảm 50% siêu sale", exp: "01/01/2025", is_valid: 0, is_percent: 1, discount_value: 50 }
    ];

    // Helper functions to get/set state from localStorage
    function getLocalStorage(key, defaultValue) {
        const val = localStorage.getItem(key);
        if (!val) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
        try {
            return JSON.parse(val);
        } catch(e) {
            return defaultValue;
        }
    }

    function setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Helper to get active movies from localStorage, falling back to mockData from mock-data.js
    function getActiveMovies() {
        const defaultMovies = window.mockData ? 
            [window.mockData.banner, ...window.mockData.newMovies, ...window.mockData.trendingMovies] : 
            initialMoviesFallback;
        
        let storedMovies = localStorage.getItem("mock_movies");
        if (storedMovies) {
            try {
                const parsed = JSON.parse(storedMovies);
                // If local storage has fewer movies than defaultMovies (cache outdated), reset it to load all movies
                if (window.mockData && parsed.length < defaultMovies.length) {
                    localStorage.setItem("mock_movies", JSON.stringify(defaultMovies));
                    // Also clear cached showtimes to re-generate them for all movies
                    localStorage.removeItem("mock_showtimes");
                    return defaultMovies;
                }
                return parsed;
            } catch(e) {
                return defaultMovies;
            }
        } else {
            localStorage.setItem("mock_movies", JSON.stringify(defaultMovies));
            return defaultMovies;
        }
    }

    // Initialize databases
    let users = getLocalStorage("mock_users", initialUsers);
    let vouchers = getLocalStorage("mock_vouchers", initialVouchers);
    let bookings = getLocalStorage("mock_bookings", [
        {
            booking_code: "GF984210",
            movie_title: "Lật Mặt 7: Một Điều Ước",
            seats: "A3, A4",
            created_at: "2026-06-24 10:15:30",
            total: "180.000 VND",
            show_time: "14:30 - 24/06/2026",
            cinema_room: "Phòng chiếu 2"
        }
    ]);
    
    // Generate mock showtimes dynamically if not set
    let showtimes = getLocalStorage("mock_showtimes", []);
    if (showtimes.length > 0 && showtimes[0].show_time.split(':').length === 3) {
        localStorage.removeItem("mock_showtimes");
        showtimes = [];
    }
    if (showtimes.length === 0) {
        // Wait for window.mockData to be ready (it will be loaded synchronously after script execution)
        window.addEventListener('DOMContentLoaded', () => {
            const activeMovies = getActiveMovies();
            let showtimesData = getLocalStorage("mock_showtimes", []);
            if (showtimesData.length === 0 && activeMovies.length > 0) {
                let idCounter = 1;
                const rooms = ["Phòng chiếu 1", "Phòng chiếu 2", "Phòng chiếu 3", "Phòng chiếu IMAX"];
                const times = ["09:00", "12:00", "15:00", "18:00", "19:30", "21:00"];
                
                activeMovies.forEach(m => {
                    for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
                        const dateObj = new Date();
                        dateObj.setDate(dateObj.getDate() + dayOffset);
                        const dateStr = dateObj.toLocaleDateString('en-CA');
                        
                        times.forEach((time, index) => {
                            showtimesData.push({
                                id: idCounter++,
                                movie_id: m.id,
                                movie_title: m.title,
                                show_date: dateStr,
                                show_time: time,
                                room_name: rooms[(m.id + index + dayOffset) % rooms.length],
                                price: 90000
                            });
                        });
                    }
                });
                setLocalStorage("mock_showtimes", showtimesData);
            }
        });
    }

    let bookedSeats = getLocalStorage("mock_booked_seats", {
        "1": [3, 4],
        "2": [10, 11, 12]
    });

    // 2. Intercept fetch
    const originalFetch = window.fetch;

    window.fetch = async function (resource, init) {
        const urlStr = typeof resource === 'string' ? resource : resource.url;
        const isRemote = urlStr.startsWith(API_BASE_URL_REMOTE);
        const isLocal = urlStr.startsWith(API_BASE_URL_LOCAL);

        if (isRemote || isLocal) {
            const apiBase = isRemote ? API_BASE_URL_REMOTE : API_BASE_URL_LOCAL;
            const url = new URL(urlStr);
            let path = urlStr.substring(apiBase.length);
            const questionIdx = path.indexOf('?');
            const cleanPath = questionIdx !== -1 ? path.substring(0, questionIdx) : path;

            console.log(`[Mock API Intercept] ${init?.method || 'GET'} ${path}`);

            let status = 200;
            let responseData = null;

            // Route mapping
            if (cleanPath.startsWith('/auth/me.php')) {
                const loggedIn = localStorage.getItem('mockLoggedInUser');
                if (loggedIn) {
                    const user = JSON.parse(loggedIn);
                    responseData = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        fullName: user.username,
                        phone: user.phone || "0987654321"
                    };
                } else {
                    status = 401;
                    responseData = { message: "Chưa đăng nhập!" };
                }
            } 
            else if (cleanPath.startsWith('/auth/check_admin.php')) {
                const loggedIn = localStorage.getItem('mockLoggedInUser');
                if (loggedIn && JSON.parse(loggedIn).role === 'admin') {
                    responseData = { status: 'success', role: 'admin' };
                } else {
                    status = 403;
                    responseData = { status: 'error', message: 'Access denied' };
                }
            }
            else if (cleanPath.startsWith('/auth/login.php')) {
                try {
                    const body = JSON.parse(init.body);
                    const email = body.email;
                    const password = body.password;

                    const activeUsers = getLocalStorage("mock_users", initialUsers);
                    const user = activeUsers.find(u => u.email === email);

                    if (user) {
                        localStorage.setItem('mockLoggedInUser', JSON.stringify(user));
                        responseData = { status: 'success', message: 'Đăng nhập thành công', user };
                    } else if (email === 'admin@gmail.com' || email === 'admin') {
                        const adminUser = activeUsers.find(u => u.role === 'admin') || activeUsers[0];
                        localStorage.setItem('mockLoggedInUser', JSON.stringify(adminUser));
                        responseData = { status: 'success', message: 'Đăng nhập thành công', user: adminUser };
                    } else {
                        const newUser = {
                            id: activeUsers.length + 1,
                            username: email.split('@')[0],
                            email: email,
                            role: email.includes('admin') ? 'admin' : 'user',
                            total_bookings: 0,
                            total_spent: 0
                        };
                        activeUsers.push(newUser);
                        setLocalStorage("mock_users", activeUsers);
                        localStorage.setItem('mockLoggedInUser', JSON.stringify(newUser));
                        responseData = { status: 'success', message: 'Đăng nhập thành công', user: newUser };
                    }
                } catch (e) {
                    status = 400;
                    responseData = { message: "Yêu cầu không hợp lệ" };
                }
            } 
            else if (cleanPath.startsWith('/auth/logout.php')) {
                localStorage.removeItem('mockLoggedInUser');
                responseData = { status: 'success', message: 'Đăng xuất thành công' };
            } 
            else if (cleanPath.startsWith('/auth/register.php')) {
                try {
                    const body = JSON.parse(init.body);
                    const activeUsers = getLocalStorage("mock_users", initialUsers);
                    
                    if (activeUsers.some(u => u.email === body.email)) {
                        status = 400;
                        responseData = { message: "Email đã tồn tại!" };
                    } else {
                        const newUser = {
                            id: activeUsers.length + 1,
                            username: body.username,
                            email: body.email,
                            role: body.email.includes('admin') ? 'admin' : 'user',
                            total_bookings: 0,
                            total_spent: 0
                        };
                        activeUsers.push(newUser);
                        setLocalStorage("mock_users", activeUsers);
                        responseData = { status: 'success', message: "Đăng ký tài khoản thành công!" };
                    }
                } catch(e) {
                    status = 400;
                    responseData = { message: "Yêu cầu không hợp lệ" };
                }
            }
            else if (cleanPath.startsWith('/movies/list.php')) {
                const type = url.searchParams.get('type');
                const activeMovies = getActiveMovies();
                
                if (type === 'new') {
                    responseData = activeMovies.filter(m => m.id !== 99).slice(0, 5);
                } else if (type === 'trending') {
                    responseData = activeMovies.filter(m => m.id !== 99).slice(5, 10);
                } else {
                    responseData = activeMovies;
                }
            } 
            else if (cleanPath.startsWith('/movies/detail.php')) {
                const id = parseInt(url.searchParams.get('id'));
                const activeMovies = getActiveMovies();
                const movie = activeMovies.find(m => m.id === id);
                responseData = movie || activeMovies[0];
            }
            else if (cleanPath.startsWith('/showtimes/list.php')) {
                const movieId = parseInt(url.searchParams.get('movie_id'));
                const date = url.searchParams.get('date');
                const activeShowtimes = getLocalStorage("mock_showtimes", showtimes);
                
                const filtered = activeShowtimes.filter(s => s.movie_id === movieId && s.show_date === date);
                responseData = filtered;
            }
            else if (cleanPath.startsWith('/showtimes/booked_seats.php')) {
                const showtimeId = url.searchParams.get('id');
                const activeBooked = getLocalStorage("mock_booked_seats", bookedSeats);
                responseData = activeBooked[showtimeId] || [];
            }
            else if (cleanPath.startsWith('/vouchers/list.php')) {
                responseData = getLocalStorage("mock_vouchers", initialVouchers);
            }
            else if (cleanPath.startsWith('/vouchers/check.php')) {
                const code = url.searchParams.get('code');
                const activeVouchers = getLocalStorage("mock_vouchers", initialVouchers);
                const voucher = activeVouchers.find(v => v.code.toUpperCase() === code.toUpperCase());
                
                if (voucher) {
                    responseData = {
                        valid: true,
                        message: "Áp dụng voucher thành công!",
                        is_percent: voucher.is_percent,
                        discount_value: voucher.discount_value
                    };
                } else {
                    responseData = {
                        valid: false,
                        message: "Mã voucher không tồn tại hoặc đã hết hạn!"
                    };
                }
            }
            else if (cleanPath.startsWith('/bookings/create.php')) {
                try {
                    const body = JSON.parse(init.body);
                    const activeBookings = getLocalStorage("mock_bookings", bookings);
                    const activeBookedSeats = getLocalStorage("mock_booked_seats", bookedSeats);

                    const showtimeId = body.showtime_id.toString();
                    if (!activeBookedSeats[showtimeId]) {
                        activeBookedSeats[showtimeId] = [];
                    }
                    
                    const seatIds = body.seats || body.seat_ids || [];
                    activeBookedSeats[showtimeId] = [...activeBookedSeats[showtimeId], ...seatIds];
                    setLocalStorage("mock_booked_seats", activeBookedSeats);

                    const randCode = "GF" + Math.floor(100000 + Math.random() * 900000);
                    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

                    // Get showtime details from mock database
                    const activeShowtimes = getLocalStorage("mock_showtimes", showtimes);
                    const st = activeShowtimes.find(s => s.id === parseInt(body.showtime_id));
                    const mTitle = st ? st.movie_title : "Phim Điện Ảnh";
                    const sTime = st ? `${st.show_time.substring(0, 5)} - ${st.show_date}` : "18:00";
                    const rRoom = st ? st.room_name : "Phòng chiếu 3";

                    const newBooking = {
                        booking_code: randCode,
                        movie_title: mTitle,
                        seats: body.seat_labels || "Ghế",
                        created_at: dateStr,
                        total: body.total_amount.toLocaleString('vi-VN') + " VND",
                        show_time: sTime,
                        cinema_room: rRoom
                    };

                    activeBookings.unshift(newBooking);
                    setLocalStorage("mock_bookings", activeBookings);

                    const loggedIn = localStorage.getItem('mockLoggedInUser');
                    if (loggedIn) {
                        const userObj = JSON.parse(loggedIn);
                        const activeUsers = getLocalStorage("mock_users", initialUsers);
                        const userIndex = activeUsers.findIndex(u => u.id === userObj.id);
                        if (userIndex !== -1) {
                            activeUsers[userIndex].total_bookings += 1;
                            activeUsers[userIndex].total_spent = (parseInt(activeUsers[userIndex].total_spent) || 0) + body.total_amount;
                            setLocalStorage("mock_users", activeUsers);
                        }
                    }

                    responseData = { status: 'success', message: 'Đặt vé thành công!', booking_code: randCode };
                } catch(e) {
                    status = 400;
                    responseData = { message: "Đặt vé thất bại! Dữ liệu không hợp lệ." };
                }
            }
            else if (cleanPath.startsWith('/bookings/list.php')) {
                responseData = getLocalStorage("mock_bookings", bookings);
            }
            else if (cleanPath.startsWith('/user/update_profile.php')) {
                try {
                    const body = JSON.parse(init.body);
                    const loggedIn = localStorage.getItem('mockLoggedInUser');
                    if (loggedIn) {
                        const userObj = JSON.parse(loggedIn);
                        userObj.username = body.username || userObj.username;
                        userObj.phone = body.phone || userObj.phone;
                        localStorage.setItem('mockLoggedInUser', JSON.stringify(userObj));

                        const activeUsers = getLocalStorage("mock_users", initialUsers);
                        const userIndex = activeUsers.findIndex(u => u.id === userObj.id);
                        if (userIndex !== -1) {
                            activeUsers[userIndex].username = userObj.username;
                            activeUsers[userIndex].phone = userObj.phone;
                            setLocalStorage("mock_users", activeUsers);
                        }
                    }
                    responseData = { status: 'success', message: 'Cập nhật thông tin thành công!' };
                } catch(e) {
                    status = 400;
                    responseData = { message: 'Lỗi cập nhật' };
                }
            }
            else if (cleanPath.startsWith('/user/change_password.php')) {
                responseData = { status: 'success', message: 'Đổi mật khẩu thành công!' };
            }
            else if (cleanPath.startsWith('/user/delete_account.php')) {
                localStorage.removeItem('mockLoggedInUser');
                responseData = { status: 'success', message: 'Xóa tài khoản thành công!' };
            }
            // ADMIN ROUTES
            else if (cleanPath.startsWith('/admin/dashboard_stats.php')) {
                const activeBookings = getLocalStorage("mock_bookings", bookings);
                const activeMovies = getActiveMovies();
                
                let rev = 0;
                activeBookings.forEach(b => {
                    const rawNum = parseInt(b.total.replace(/\./g, '').replace(' VND', '')) || 0;
                    rev += rawNum;
                });

                responseData = {
                    revenue: rev,
                    tickets: activeBookings.length,
                    total_movies: activeMovies.length
                };
            }
            else if (cleanPath.startsWith('/admin/customers.php')) {
                responseData = getLocalStorage("mock_users", initialUsers);
            }
            else if (cleanPath.startsWith('/admin/voucher_options.php')) {
                responseData = getLocalStorage("mock_vouchers", initialVouchers);
            }
            else if (cleanPath.startsWith('/admin/grant_voucher.php')) {
                responseData = { status: 'success', message: 'Tặng voucher thành công!' };
            }
            else if (cleanPath.startsWith('/admin/showtimes_list.php')) {
                responseData = getLocalStorage("mock_showtimes", showtimes);
            }
            else if (cleanPath.startsWith('/admin/showtimes_create.php')) {
                try {
                    const body = JSON.parse(init.body);
                    const activeShowtimes = getLocalStorage("mock_showtimes", showtimes);
                    const activeMovies = getActiveMovies();
                    const movie = activeMovies.find(m => m.id === parseInt(body.movie_id));

                    const newSt = {
                        id: activeShowtimes.length > 0 ? Math.max(...activeShowtimes.map(s=>s.id)) + 1 : 1,
                        movie_id: parseInt(body.movie_id),
                        movie_title: movie ? movie.title : "Phim mới",
                        show_date: body.show_date,
                        show_time: body.show_time,
                        room_name: body.room_name || "Phòng chiếu 1",
                        price: parseInt(body.price) || 90000
                    };

                    activeShowtimes.push(newSt);
                    setLocalStorage("mock_showtimes", activeShowtimes);

                    responseData = { status: 'success', message: 'Thêm suất chiếu thành công!' };
                } catch(e) {
                    status = 400;
                    responseData = { message: 'Lỗi thêm suất chiếu!' };
                }
            }
            else if (cleanPath.startsWith('/admin/showtimes_delete.php')) {
                try {
                    const body = JSON.parse(init.body);
                    let activeShowtimes = getLocalStorage("mock_showtimes", showtimes);
                    activeShowtimes = activeShowtimes.filter(s => s.id !== parseInt(body.id));
                    setLocalStorage("mock_showtimes", activeShowtimes);
                    responseData = { status: 'success', message: 'Xóa suất chiếu thành công!' };
                } catch(e) {
                    status = 400;
                    responseData = { message: 'Lỗi xóa suất chiếu!' };
                }
            }
            else if (cleanPath.startsWith('/movies/create.php')) {
                try {
                    const body = JSON.parse(init.body);
                    const activeMovies = getActiveMovies();
                    
                    const newMov = {
                        id: activeMovies.length > 0 ? Math.max(...activeMovies.map(m=>m.id)) + 1 : 1,
                        title: body.title,
                        genre: body.genre,
                        duration: body.duration,
                        imageUrl: body.imageUrl || "https://photo-baomoi.bmcdn.me/w700_r1/2024_03_13_17_48553023/057ac6914bdda283fbcc.jpg",
                        trailerUrl: body.trailerUrl || "https://www.youtube.com/embed/d1ZHdosjNX8",
                        description: body.description || "Mô tả phim",
                        director: body.director || "Chưa cập nhật",
                        cast: body.cast || "Chưa cập nhật",
                        release_date: body.release_date || new Date().toISOString().split('T')[0]
                    };

                    activeMovies.push(newMov);
                    setLocalStorage("mock_movies", activeMovies);
                    responseData = { status: 'success', message: 'Thêm phim thành công!' };
                } catch(e) {
                    status = 400;
                    responseData = { message: 'Lỗi thêm phim!' };
                }
            }
            else if (cleanPath.startsWith('/movies/update.php')) {
                try {
                    const body = JSON.parse(init.body);
                    const activeMovies = getActiveMovies();
                    const mIndex = activeMovies.findIndex(m => m.id === parseInt(body.id));
                    
                    if (mIndex !== -1) {
                        activeMovies[mIndex] = {
                            ...activeMovies[mIndex],
                            title: body.title || activeMovies[mIndex].title,
                            genre: body.genre || activeMovies[mIndex].genre,
                            duration: body.duration || activeMovies[mIndex].duration,
                            imageUrl: body.imageUrl || activeMovies[mIndex].imageUrl,
                            trailerUrl: body.trailerUrl || activeMovies[mIndex].trailerUrl,
                            description: body.description || activeMovies[mIndex].description,
                            director: body.director || activeMovies[mIndex].director,
                            cast: body.cast || activeMovies[mIndex].cast,
                            release_date: body.release_date || activeMovies[mIndex].release_date
                        };
                        setLocalStorage("mock_movies", activeMovies);
                        responseData = { status: 'success', message: 'Cập nhật phim thành công!' };
                    } else {
                        status = 404;
                        responseData = { message: 'Không tìm thấy phim!' };
                    }
                } catch(e) {
                    status = 400;
                    responseData = { message: 'Lỗi cập nhật phim!' };
                }
            }
            else if (cleanPath.startsWith('/movies/delete.php')) {
                try {
                    const body = JSON.parse(init.body);
                    let activeMovies = getActiveMovies();
                    activeMovies = activeMovies.filter(m => m.id !== parseInt(body.id));
                    setLocalStorage("mock_movies", activeMovies);
                    responseData = { status: 'success', message: 'Xóa phim thành công!' };
                } catch(e) {
                    status = 400;
                    responseData = { message: 'Lỗi xóa phim!' };
                }
            }
            else {
                console.warn(`[Mock API] Route not implemented: ${path}`);
                responseData = { message: "Mock Route Not Implemented" };
            }

            return new Response(JSON.stringify(responseData), {
                status: status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return originalFetch.apply(this, arguments);
    };

    console.log("🚀 State-preserving Mock API Interceptor successfully registered!");
})();
