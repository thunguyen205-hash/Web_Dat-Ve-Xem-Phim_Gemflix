const API_BASE_URL = "http://gemflix.rf.gd/backend/api";

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('#header-placeholder', 'components/header.html'),
        loadComponent('#footer-placeholder', 'components/footer.html'),
        loadComponent('#modal-placeholder', 'components/modal-trailer.html')
    ]);
    await checkLoginStatus();
    addHeaderScrollEffect();
    setupModalListeners();
    setupUserMenuListeners();
    setupHeaderSearchListeners();
    
    // Gọi hàm render kết quả từ API
    renderSearchResults();
});

async function renderSearchResults() {
    try {
        // Xóa cache cũ để luôn load dữ liệu mới nhất từ mock-data.js
        localStorage.removeItem('mock_movies');

        const params = new URLSearchParams(window.location.search);
        const q = (params.get('q') || '').trim().toLowerCase();

        const container = document.getElementById('movies-results');
        const title = document.getElementById('results-title');
        if (!container) return;

        // Cập nhật tiêu đề
        title.textContent = q ? `Kết quả tìm kiếm cho "${q}"` : 'Tất cả phim';
        container.innerHTML = '<p>Đang tải dữ liệu...</p>';

        // 1. Tải template
        const templateRes = await fetch('components/movie-card.html');
        const cardTemplate = await templateRes.text();

        // 2. ⭐ GỌI API LẤY TẤT CẢ PHIM ⭐ (Không truyền param type để lấy all)
        const res = await fetch(`${API_BASE_URL}/movies/list.php`);
        const allMovies = await res.json();

        // 3. Lọc phim theo phân loại và từ khóa (Client-side filtering)
        const type = (params.get('type') || '').trim().toLowerCase();
        let filtered = allMovies.filter(m => m.id !== 99); // Loại banner

        if (type === 'showing') {
            filtered = allMovies.filter(m => m.id !== 99 && m.year <= 2024);
            title.textContent = 'Phim Đang Chiếu';
        } else if (type === 'upcoming') {
            filtered = allMovies.filter(m => m.id !== 99 && m.year >= 2025);
            title.textContent = 'Phim Sắp Chiếu';
        } else if (type === 'trending') {
            // Lấy ID từ danh sách trendingMovies trong mockData nếu có
            const trendingIds = window.mockData ? window.mockData.trendingMovies.map(m => m.id) : [];
            filtered = trendingIds.length > 0
                ? allMovies.filter(m => trendingIds.includes(m.id))
                : allMovies.filter(m => m.id > 5 && m.id !== 99);
            title.textContent = 'Phim Thịnh Hành';
        } else if (type === 'new') {
            // Lấy ID từ danh sách newMovies trong mockData nếu có
            const newIds = window.mockData ? window.mockData.newMovies.map(m => m.id) : [];
            filtered = newIds.length > 0
                ? allMovies.filter(m => newIds.includes(m.id))
                : allMovies.filter(m => m.id <= 5);
            title.textContent = 'Phim Mới Cập Nhật';
        } else if (!q) {
            // Không có filter -> hiển thị tất cả phim (trừ banner)
            title.textContent = 'Tất cả phim';
        }

        if (q !== '') {
            filtered = filtered.filter(m => m.title.toLowerCase().includes(q));
            title.textContent = `Kết quả tìm kiếm cho "${q}"`;
        }

        if (filtered.length === 0) {
            container.innerHTML = '<p>Không tìm thấy kết quả nào.</p>';
            return;
        }

        // 4. Render ra màn hình
        let html = '';
        filtered.forEach(m => {
            const year = m.release_date ? m.release_date.split('-')[0] : '2025';
            html += cardTemplate
                .replace(/{id}/g, m.id)
                .replace(/{trailerUrl}/g, m.trailerUrl || '')
                .replace(/{imageUrl}/g, m.imageUrl || '')
                .replace(/{title}/g, m.title || '')
                .replace(/{year}/g, year);
        });

        container.innerHTML = html;

    } catch (err) {
        console.error('Lỗi khi render:', err);
        document.getElementById('movies-results').innerHTML = '<p>Lỗi tải dữ liệu.</p>';
    }
}

// (Các hàm helper loadComponent, checkLoginStatus... giữ nguyên giống main.js)
// ... Bạn có thể copy đoạn Helper từ main.js sang đây để code gọn hơn ...
async function loadComponent(id, url) { try { document.querySelector(id).innerHTML = await (await fetch(url)).text(); } catch(e){} }
async function checkLoginStatus() { try { const res = await fetch(`${API_BASE_URL}/auth/me.php`, {credentials:"include"}); const data=await res.json(); updateHeaderUI(res.ok?data.username:null); } catch(e){} }
function updateHeaderUI(username) { 
    const btn = document.getElementById("user-menu-btn");
    const dropdown = document.getElementById("user-dropdown");
    if (username) {
        btn.innerHTML = `<i class="fa-solid fa-user"></i> ${username}`;
        dropdown.innerHTML = `<a href="profile.html">Tài khoản</a><a href="#" id="logout-btn">Đăng xuất</a>`;
        setTimeout(() => { document.getElementById('logout-btn')?.addEventListener('click', async (e)=>{ e.preventDefault(); await fetch(`${API_BASE_URL}/auth/logout.php`, {credentials:"include"}); window.location.href="index.html"; })}, 500);
    } else {
        btn.innerHTML = `<i class="fa-solid fa-user"></i>`;
        dropdown.innerHTML = `<a href="login.html">Đăng nhập</a><a href="register.html">Đăng kí</a>`;
    }
}
function addHeaderScrollEffect() { const h=document.querySelector('.main-header'); if(h) window.addEventListener('scroll', ()=>h.classList.toggle('scrolled', window.scrollY>50)); }
function setupModalListeners() { 
    const modal = document.getElementById("trailer-modal");
    const iframe = document.getElementById("trailer-iframe");
    const closeBtn = document.getElementById("modal-close-btn");
    if(!modal) return;
    document.body.addEventListener("click", e => {
        const btn = e.target.closest(".btn-open-modal");
        if(btn) { iframe.src = `${btn.dataset.trailerUrl}?autoplay=1`; modal.classList.add("active"); }
    });
    closeBtn?.addEventListener("click", ()=>{ modal.classList.remove("active"); iframe.src=""; });
}
function setupUserMenuListeners() {
    const btn = document.getElementById('user-menu-btn');
    const dropdown = document.getElementById('user-dropdown');
    if(btn) btn.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.toggle('active'); });
    window.addEventListener('click', () => dropdown?.classList.remove('active'));
}
function setupHeaderSearchListeners() {
    const input = document.getElementById('header-search-input');
    const btn = document.getElementById('header-search-btn');
    if(!input) return;
    const doSearch = () => { const q = input.value.trim(); window.location.href = q ? `movies.html?q=${encodeURIComponent(q)}` : "movies.html"; };
    input.addEventListener('keydown', e => e.key === 'Enter' && doSearch());
    btn.addEventListener('click', doSearch);
}
