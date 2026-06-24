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

    // === CACHE VERSION: Tăng số này lên mỗi khi cập nhật dữ liệu phim ===
    const CACHE_VERSION = '3';
    if (localStorage.getItem('mock_cache_version') !== CACHE_VERSION) {
        localStorage.removeItem('mock_movies');
        localStorage.removeItem('mock_showtimes');
        localStorage.setItem('mock_cache_version', CACHE_VERSION);
    }

    // Fallback movies in case mock-data.js fails to load — bao gồm TẤT CẢ phim (mới + thịnh hành)
    const initialMoviesFallback = [
        {
            id: 99,
            title: "Mưa Đỏ",
            year: 2025,
            description: "Lấy bối cảnh 81 ngày đêm khốc liệt tại Thành Cổ Quảng Trị năm 1972, Mưa Đỏ là câu chuyện hư cấu, theo chân một tiểu đội gồm những người lính trẻ tuổi, đầy nhiệt huyết, chiến đấu và bám trụ tại trận địa lịch sử này.",
            imageUrl: "https://imgchinhsachcuocsong.vnanet.vn/MediaUpload/Org/2025/07/23/204219-z6833331728306_9920591c2fadf96b8ec838e4967f44a4.jpg",
            bannerUrl: "https://imgchinhsachcuocsong.vnanet.vn/MediaUpload/Org/2025/07/23/204219-z6833331728306_9920591c2fadf96b8ec838e4967f44a4.jpg",
            trailerUrl: "https://www.youtube.com/embed/BD6PoZJdt_M",
            duration: "120 phút", rating: "T18", genre: "Chiến tranh, Lịch sử",
            director: "Nguyễn Quang Dũng", cast: "Nhiều diễn viên trẻ", release_date: "2025-07-23"
        },
        // --- Phim Mới (id 1-11) ---
        {
            id: 1,
            title: "Lật Mặt 7: Một Điều Ước",
            year: 2024,
            description: "Phim xoay quanh câu chuyện của bà Hai (Thanh Hiền) và bốn người con. Khi bà Hai không may gặp nạn, cần người chăm sóc, bốn người con đùn đẩy nhau. Câu chuyện đặt ra câu hỏi về lòng hiếu thảo và tình cảm gia đình.",
            imageUrl: "https://photo-baomoi.bmcdn.me/w700_r1/2024_03_13_17_48553023/057ac6914bdda283fbcc.jpg",
            trailerUrl: "https://www.youtube.com/embed/d1ZHdosjNX8",
            // Dữ liệu mới
            duration: "138 phút",
            rating: "T13",
            genre: "Gia đình, Chính kịch",
            director: "Lý Hải",
            cast: "Thanh Hiền, Trương Minh Cường, Đinh Y Nhung, Quách Ngọc Tuyên"
        },
        {
            id: 2,
            title: "Gặp Lại Chị Bầu",
            year: 2024,
            description: "Phúc, một thanh niên có quá khứ bất hảo, cùng bạn bè lập nghiệp ở xóm trọ. Anh gặp Huyền, một cô gái tốt bụng. Tình yêu của họ nảy nở giữa những khó khăn, và bí mật về quá khứ của Huyền dần được hé lộ.",
            imageUrl: "https://tse3.mm.bing.net/th/id/OIP.xrGKhbdzKrWVQ2urtnnk-AHaK_?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/8WS_CiekZLc",
            // Dữ liệu mới
            duration: "110 phút",
            rating: "T16",
            genre: "Hài, Tình cảm",
            director: "Nhất Trung",
            cast: "Anh Tú, Diệu Nhi, Lê Giang, Ngọc Phước"
        },
        {
            id: 3,
            title: "Nhà Gia Tiên",
            year: 2025,
            description: "Câu chuyện về một gia đình gốc Việt tại Mỹ và những xung đột thế hệ. Phim khám phá sự khác biệt văn hóa, kỳ vọng của cha mẹ và ước mơ của con cái trong bối cảnh hiện đại.",
            imageUrl: "https://st.download.com.vn/data/image/2025/02/14/nha-gia-tien.jpg",
            trailerUrl: "https://www.youtube.com/embed/aR2lnpCLqUk",
            // Dữ liệu mới
            duration: "95 phút",
            rating: "T13",
            genre: "Gia đình, Hài",
            director: "Trần Hữu Tấn",
            cast: "Lê Khanh, Hồng Đào, Thái Hòa, Tuấn Trần"
        },
        {
            id: 4,
            title: "Thám Tử Kiên: Kỳ Án Không Đầu",
            year: 2025,
            description: "Một thám tử tư tài ba nhưng lập dị điều tra một vụ án mạng bí ẩn nơi nạn nhân bị mất đầu. Anh phải chạy đua với thời gian để tìm ra hung thủ trước khi hắn ra tay lần nữa.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.4HedOsPiqdgGJBNfuEHYUQHaKl?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/QiXNbEKF3U0",
            // Dữ liệu mới
            duration: "115 phút",
            rating: "T18",
            genre: "Trinh thám, Kinh dị",
            director: "Victor Vũ",
            cast: "Hứa Vĩ Văn, Trúc Anh, Kaity Nguyễn"
        },
        {
            id: 5,
            title: "Nhà Bà Nữ",
            year: 2023,
            description: "Phim xoay quanh gia đình bà Nữ, chủ một quán bánh canh cua, và những mâu thuẫn thế hệ gay gắt. Câu chuyện khai thác áp lực gia đình, tình yêu và sự tha thứ.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.0et2-sBhpgAZnwWjU3oG0AHaLG?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/4peQFKutH34",
            // Dữ liệu mới
            duration: "135 phút",
            rating: "T16",
            genre: "Chính kịch, Gia đình",
            director: "Trấn Thành",
            cast: "Trấn Thành, Lê Giang, Uyển Ân, Song Luân"
        },
        {
            id: 6,                          
            title: "Ai Thương Ai Mến",
            year: 2026,
            description: "Lấy bối cảnh miền Tây sông nước, Ai Thương Ai Mến xoay quanh Hai Mến - người phụ nữ mất cha mẹ, một mình gồng gánh gia đình giữa nợ nần và những bi kịch dồn dập.",
            imageUrl: "https://cdn.galaxycine.vn/media/2025/11/27/ai-thuong-ai-men-750_1764227806673.jpg",
            trailerUrl: "https://www.youtube.com/embed/zRi3hdDslNc",
            duration: "112 phút",
            rating: "T13",                  
            genre: "Hài, Gia đình",
            director: "Thu Trang",
            cast: "Thu Trang, Ngọc Thuận, Trâm Anh, Võ Điền Gia Huy, Khả Như, La Thành, Trương Minh Thảo và NSƯT Ngọc Hiệp"
        },   
        {
            id: 7,                          
            title: "Con Kể Ba Nghe",
            year: 2026,
            description: "Con Kể Ba Nghe theo chân một nghệ sĩ xiếc đi trên dây và cậu con trai khép kín trong hành trình tìm lại sự kết nối đã đánh mất. Giữa ánh đèn rực rỡ nhưng đầy mong manh của sân khấu xiếc, hai cha con dần mở lòng, chữa lành những tổn thương cũ.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.t4EU-lTeF028S7UyBDpMkwHaEK?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/8QYwOWO4jCQ",
            duration: "111 phút",
            rating: "T13",                   
            genre: "Hài,Tâm lý, Gia đình",
            director: "Đỗ Quốc Trung",
            cast: "Kiều Minh Tuấn, Hạo Khang, Quốc Khánh, Phương Thanh, Lê Lộc, Yến Nhi, Hồng Ánh, Mai Cát Vi"
        },   
        {
            id: 8,                          
            title: "Thỏ Ơi!!",
            year: 2026,
            description: "Thỏ Ơi!! là phim tâm lý đối chất (thriller tâm lý) của đạo diễn Trấn Thành, khai thác vấn đề đạo đức và quyền phán xét trên mạng xã hội. Phim xoay quanh cuộc phỏng vấn talkshow về chuyện tình cảm cá nhân của một nữ MC, dần mở rộng thành những góc khuất, bi kịch hôn nhân và tâm lý nạn nhân của các nhân vật.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.Aw-6JVXlymSTtJdT5oMLYQHaEK?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/aJOXdRSj91g",
            duration: "123 phút",
            rating: "T13",                   
            genre: "Chính kịch, Tâm lý, Hài",
            director: "Trấn Thành",
            cast: "Trấn Thành, Pháo, LyLy, Quốc Anh, Văn Mai Hương, Vĩnh Đam, Ngọc Hoa, Quỳnh Anh Shyn, Ngọc Nguyễn, Ali Hoàng Dương, Pháp Kiều."
        }, 
        {
            id: 9,                                  
            title: "Nhà Ba Tôi Một Phòng",
            year: 2026,
            description: "Nội dung phim...",
            imageUrl: "https://tse3.mm.bing.net/th/id/OIP.07GCpFTKu1BRy0CdaqWyrQHaJ4?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/APBB-zfYFGw",
            duration: "100 phút",
            rating: "T13",                   
            genre: "Hài,Tâm lý, Gia đình",
            director: "Tên đạo diễn",
            cast: "Trường Giang, Minh Anh..."
        },
        {
            id: 10,                          
            title: "Mùi Phở",
            year: 2026,
            description: "Phim xoay quanh một gia đình có truyền thống nấu phở lâu đời: ông Mùi, một người gìn giữ nghề nấu phở gia truyền với niềm tin rằng hương vị truyền thống là linh hồn của gia đình và văn hóa. Khi các thế hệ trẻ trong gia đình mong muốn đổi mới và thương mại hóa thương hiệu phở, những xung đột quan điểm bắt đầu nảy sinh.",
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.GVk2qQQXXnc34TfRIdeSZwHaKf?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/xsJmZ5UWge0",
            duration: "111 phút",
            rating: "T13",                   
            genre: "Hài, Gia đình",
            director: "Minh Beta",
            cast: "Xuân Hinh, Thu Trang, Thanh Thanh Hiền, Quốc Tuấn, Bảo Nam, Hà Hương, Thanh Hương, Chu Mạnh Cường (Cường Ca) và Tiến Lộc"
        },
        {
            id: 11,                         
            title: "Minions & Quái Vật",
            year: 2026,
            description: "Minions & Quái Vật là câu chuyện vừa náo loạn, vừa ngớ ngẩn nhưng “hoàn toàn có thật” về cách Minions chinh phục Hollywood, trở thành ngôi sao điện ảnh, rồi mất tất cả, vô tình thả quái vật ra khắp thế giới và sau đó phải cùng nhau hợp sức để cứu lấy hành tinh khỏi chính mớ hỗn loạn mà mình tạo ra.",
            imageUrl: "https://tse4.mm.bing.net/th/id/OIP.f21xZ4-jPX857-R8YwoRPQHaLu?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/ZSdOwt-G49w",
            duration: "90 phút",
            rating: "T13",                   
            genre: "Hoạt hình, Phiêu lưu",
            director: "Pierre Coffin",
            cast: "Pierre Coffin, Trey Parker, Jesse Eisenberg"
        },   
        // --- Phim Thịnh Hành (id 11-22) ---
        {
            id: 12,
            title: "Lật Mặt 6: Tấm Vé Định Mệnh",
            year: 2023,
            description: "Một nhóm bạn thân trúng số độc đắc. Tấm vé đã thay đổi cuộc đời họ, nhưng cũng kéo theo những âm mưu, sự phản bội và cái chết. Tình bạn của họ bị thử thách bởi lòng tham.",
            imageUrl: "https://tse3.mm.bing.net/th/id/OIP.gwUCRkCrlItYPT7oEALsKAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/ns9f92mR6bM",
            // Dữ liệu mới
            duration: "132 phút",
            rating: "T18",
            genre: "Hành động, Giật gân",
            director: "Lý Hải",
            cast: "Quốc Cường, Trung Dũng, Huy Khánh, Thanh Thức"
        },
        {
            id: 13,
            title: "Đất Rừng Phương Nam",
            year: 2023,
            description: "Phiên bản điện ảnh kể về hành trình phiêu lưu của cậu bé An đi tìm cha qua các tỉnh miền Tây Nam Bộ trong thời kỳ kháng chiến chống Pháp. Phim tái hiện vẻ đẹp hùng vĩ của thiên nhiên và con người nơi đây.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.fAgqmbugm7Fvfh9qY37GkwHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/D0_w81Q-P3M",
            // Dữ liệu mới
            duration: "110 phút",
            rating: "T13",
            genre: "Phiêu lưu, Gia đình",
            director: "Nguyễn Quang Dũng",
            cast: "Hạo Khang, Trấn Thành, Tuấn Trần, Hồng Ánh"
        },
        {
            id: 14,
            title: "Em và Trịnh",
            year: 2022,
            description: "Bộ phim tái hiện cuộc đời và những mối tình của nhạc sĩ Trịnh Công Sơn. Phim là bức tranh lãng mạn về âm nhạc, tình yêu và những nàng thơ đã đi qua cuộc đời ông.",
            imageUrl: "https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2022/06/review-em-va-trinh_62a329726ea9a.jpeg",
            trailerUrl: "https://www.youtube.com/embed/zzik4JB9D1Q",
            // Dữ liệu mới
            duration: "136 phút",
            rating: "T13",
            genre: "Tiểu sử, Lãng mạn",
            director: "Phan Gia Nhật Linh",
            cast: "Avin Lu, Bùi Lan Hương, Hoàng Hà, Lan Thy"
        },
        {
            id: 15,
            title: "Con Nhót Mót Chồng",
            year: 2023,
            description: "Câu chuyện hài hước và cảm động về Nhót, một người phụ nữ 'quá lứa' sống cùng người cha nghiện rượu. Hành trình tìm chồng của Nhót cũng là hành trình cô hàn gắn tình cảm với cha mình.",
            imageUrl: "https://tse1.explicit.bing.net/th/id/OIP.ycZsFjfDFuRrzw-EGbeosAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/e7KHOQ-alqY",
            // Dữ liệu mới
            duration: "90 phút",
            rating: "T16",
            genre: "Hài, Gia đình",
            director: "Vũ Ngọc Đãng",
            cast: "Thu Trang, Thái Hòa, Tiến Luật"
        },
        {
            id: 16,
            title: "Siêu Lừa Gặp Siêu Lầy",
            year: 2023,
            description: "Khoa, một tên lừa đảo, đến Phú Quốc với ý định lừa đảo. Anh gặp Tú, một tên lừa đảo 'lầy lội' khác. Cả hai hợp tác trong nhiều phi vụ dở khóc dở cười trước khi đối mặt với một đối thủ lớn.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.wqDOC6JOXfblf2BIRrMLlQHaK4?rs=1&pid=ImgDetMain&o=7&rm=3",
            trailerUrl: "https://www.youtube.com/embed/oNqD2HxBUq4",
            // Dữ liệu mới
            duration: "112 phút",
            rating: "T16",
            genre: "Hài, Hành động",
            director: "Võ Thanh Hòa",
            cast: "Anh Tú, Mạc Văn Khoa, Ngọc Phước"
        },
        {
            id: 17,
            title: "Song Hỷ Lâm Môn",
            year: 2026,
            description: "Hai lễ cưới, một sang trọng sa hoa, một đạm bạc dân dã, đáng lý sẽ được tổ chức đối diện nhau. Rắc rối bắt đầu khi đội ngũ tổ chức của hai lễ cưới phát hiện ra danh sách khách mời của hai bên là giống nhau.",
            imageUrl: "https://tse4.mm.bing.net/th/id/OIP.NpnZwQ9Xma81h27ZRp96xwHaJQ?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/tqaPZSVHff4",
            duration: "113 phút",
            rating: "T16",                   
            genre: "Gia đình, Tâm lý, Hài",
            director: "Vũ Hà",
            cast: "Jun Vũ, Đinh Y Nhung, Dustin Nguyễn, MisThy, NSƯT Trung Anh"
        },
        {
            id: 18,
            title: "Ốc Mượn Hồn",
            year: 2026,
            description: "Câu chuyện kể về Quân, một người chồng đau khổ khi vợ qua đời trong một tai nạn bất ngờ. Hạnh phúc tưởng chừng được hồi sinh khi linh hồn vợ anh 'trở về' trong thân xác của cô đồng nghiệp, người gặp tai nạn chung với vợ Quân nhưng may mắn sống sót. Giống như những con ốc mượn hồn, họ đều bám víu - lệ thuộc vào chiếc vỏ khác để tồn tại cũng như cố lẩn tránh nỗi đau của cuộc đời.",
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.1QSaacBAbca5FEgjZ2lv7wHaDt?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/lsRijdOlvCk",
            duration: "109 phút",
            rating: "T18",                   
            genre: "Bí ẩn, Tâm lý",
            director: "Đinh Tuấn Vũ",
            cast: "Quốc Trường, Tiểu Vy, Lương Gia Huy, Anh Phạm, Yên Đan, Xuân An, Nguyễn Văn Chung"
        },
        {
            id: 19,
            title: "Ma Xó",
            year: 2026,
            description: "Trong cái nghèo cùng cực và nỗi sợ mất con sau một lần sảy thai, cuộc sống của vợ chồng Phú và Thảo (đang mang thai) trở nên tăm tối hơn bao giờ hết khi bà Thuận (mẹ Phú) qua đời vì không có tiền chữa bệnh. Giữa lúc tuyệt vọng, Thảo nghe lời bà Tánh – một người hàng xóm làm nghề cúng – quyết định thực hiện nghi thức thỉnh “vong cô hồn” về làm ma xó để trấn giữ ngôi nhà và bảo vệ thai nhi. Khi thực thể trong xó nhà bắt đầu 'đòi nợ', Thảo mới bàng hoàng nhận ra: thứ cô rước về để bảo vệ gia đình, thực chất là một cơn ác mộng không có đường lui.",
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.8SVqgqSZ4SbH3_dAppSuYwAAAA?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/BTo23ZCJu6E",
            duration: "102 phút",
            rating: "T18",                  
            genre: "Kinh dị, Tâm Linh",
            director: "Phan Bá Hỷ",
            cast: "Lê Khánh, Tín Nguyễn, Avin Lu, NSƯT Hạnh Thúy, Nguyễn Sỹ Hậu, Gi A Nguyễn, Leona Khánh Tiên."
        },
        {
            id: 20,
            title: "Báu Vật Trời Cho",
            year: 2026,
            description: "BÁU VẬT TRỜI CHO - bộ phim đa sắc cảm xúc, rực rỡ yêu thương, gắn kết gia đình Tết 2026. Ngọc (Phương Anh Đào) là mẹ đơn thân, có con nhờ thụ tinh nhân tạo từ tinh trùng hiến tặng. Trong chuyến đi biển để đổi gió và trốn chạy quá khứ, cô & Tô chạm mặt Hồng (Tuấn Trần) – chàng trai làng chài phóng khoáng, cũng chính là người góp phần tạo nên sự ra đời của Tô.",
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.fce0HiYyeJczG2nImhS-xwHaJQ?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/dwfUi9SV5ss",
            duration: "124 phút",
            rating: "T16",
            genre: "Hài Hước, Gia Đình",
            director: "Lê Thanh Sơn",
            cast: "NSND Kim Xuân, Tuấn Trần, Phương Anh Đào, Võ Tấn Phát, Hưng Nguyễn, La Thành, Trung Dân, Khương Lê, Tạ Lâm, Quách Ngọc Ngoan, Chị Phiến, Thư Đan"
        },
        {
            id: 21,
            title: "Tài",
            year: 2026,
            description: "Tài bất ngờ rơi vào vòng xoáy nguy hiểm vì một khoản nợ tiền khổng lồ. Bị dồn vào đường cùng, Tài buộc phải dấn thân vào những lựa chọn sai lầm khiến gia đình trở thành mục tiêu bị đe dọa. Đằng sau những hành động liều lĩnh ấy là nỗi ám ảnh về người mẹ mà Tài luôn muốn bảo vệ và bù đắp bằng mọi giá. Khi ranh giới giữa đúng và sai ngày càng mong manh, Tài phải đối mặt với câu hỏi lớn nhất của đời mình: liệu lòng hiếu thảo có đủ để biện minh cho con đường anh đang đi.",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.l3AIs632N_6nHKRflOG9HwHaJH?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/HyaRaYwgQ-A",
            duration: "101 phút",
            rating: "T16",                  
            genre: "Gia đình, Hành Động, Tâm Lý",
            director: "Mai Tài Phến",
            cast: "Mai Tài Phến, Mỹ Tâm, NSƯT Hạnh Thuý, Hồng Ánh, Long Đẹp Trai, Vinh Râu, Trần Kim Hải, Sỹ Toàn, Quang Trung, Huỳnh Thi, Ray Nguyễn,..."
        },
        {
            id: 22,
            title: "Hẹn em ngày nhật thực",
            year: 2026,
            description: "Lấy bối cảnh một xóm đạo miền Trung Việt Nam cuối thập niên 1980, đầu thập niên 1990, phim xoay quanh mối tình giữa Thiên Ân và chàng thợ điện An Thiên. Phim được lên kế hoạch trong khoảng hai năm, khởi quay từ tháng 9 năm 2025 dưới tựa Thư tình gửi ma-sơ trước khi đổi sang tên hiện tại.[",
            imageUrl: "https://tse4.mm.bing.net/th/id/OIP.HC3OJvP4jwk-VrF48v460wHaJQ?pid=Api&P=0&h=180",
            trailerUrl: "https://www.youtube.com/embed/8fRszUyt_YQ",
            duration: "118 phút",
            rating: "T16",                  
            genre: "Tình cảm, Gia đình",
            director: "Lê Thiện Viễng",
            cast: "Đoàn Thiên Ân, Khương Lê, Lê Khanh, Kim Xuân, Hứa Vĩ Văn và Thanh Sơn."
        },
    ];


    const initialUsers = [
        { id: 1, username: "admin", email: "admin@gmail.com", role: "admin", total_bookings: 3, total_spent: 1200000 },
        { id: 2, username: "Thư Nguyễn", email: "thu@gmail.com", role: "user", total_bookings: 1, total_spent: 90000 }
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
                // Reset cache nếu số lượng phim ít hơn expected (dù mockData có hay không)
                const expectedCount = defaultMovies.length; // 22 phim
                if (parsed.length < expectedCount) {
                    localStorage.setItem("mock_movies", JSON.stringify(defaultMovies));
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
            movie_title: "Song Hỷ Lâm Môn",
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
    // Vô hiệu hóa tính năng tự động tạo ngẫu nhiên lịch chiếu
    // Để cho phép Admin xóa sạch lịch chiếu mà không bị tự động sinh lại
    if (!localStorage.getItem("mock_showtimes_initialized")) {
        setLocalStorage("mock_showtimes", []);
        localStorage.setItem("mock_showtimes_initialized", "true");
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
                    responseData = activeMovies.filter(m => m.id !== 99).slice(0, 11);
                } else if (type === 'trending') {
                    responseData = activeMovies.filter(m => m.id !== 99).slice(11, 22);
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
