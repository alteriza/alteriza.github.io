// ======================= DATA BLOG (Postingan) =======================
// Semua thread disimpan dalam array. Setiap thread punya ID, judul, tanggal, konten (HTML), dll.
const threads = [
  {
    id: "hello-world",
    title: "Halo Dunia!",
    date: "2025-01-15",
    category: "Pengumuman",
    excerpt: "Selamat datang di blog Protocol404. Ini adalah postingan pertama.",
    content: `
      <p>Halo semuanya! Selamat datang di blog pribadi saya, <strong>Protocol404</strong>.</p>
      <p>Di sini saya akan berbagi catatan tentang coding, desain, dan eksperimen teknologi. Juga akan ada diskusi seru dengan komunitas melalui fitur chat di bawah setiap thread.</p>
      <p>Oh iya, jangan lupa mampir ke channel YouTube saya: <a href="https://youtube.com/@gajeinaja" target="_blank" style="color:#6c63ff;">@gajeinaja</a>.</p>
      <pre><code>console.log("Halo dari Protocol404!");</code></pre>
    `
  },
  {
    id: "belajar-github-pages",
    title: "Cara Membuat Blog Gratis dengan GitHub Pages",
    date: "2025-01-18",
    category: "Tutorial",
    excerpt: "Panduan lengkap setup GitHub Pages untuk blog statis yang keren.",
    content: `
      <p>GitHub Pages adalah hosting gratis untuk file statis. Dengan sedikit kreativitas, kita bisa bikin blog seperti ini tanpa bayar sepeser pun.</p>
      <p>Langkah-langkah:</p>
      <ul>
        <li>Buat repository <strong>username.github.io</strong></li>
        <li>Upload file HTML, CSS, JS seperti yang saya lakukan</li>
        <li>Aktifkan Pages di Settings</li>
      </ul>
      <p>Mudah, kan? Selamat mencoba!</p>
    `
  },
  {
    id: "komunitas-chat",
    title: "Fitur Chat Komunitas dengan Utterances",
    date: "2025-01-20",
    category: "Teknis",
    excerpt: "Integrasikan GitHub Issues sebagai ruang chat publik di blog kamu.",
    content: `
      <p>Utterances adalah widget komentar yang menggunakan GitHub Issues. Tapi kita bisa 'akali' untuk jadi chat komunitas global.</p>
      <p>Cukup buat satu issue khusus, lalu arahkan widget utterances ke issue tersebut. Maka semua pesan akan terkumpul di satu tempat.</p>
      <p>Keren dan gratis!</p>
    `
  }
];

// ======================= GLOBAL VARIABLES =======================
let currentPage = "home";   // home, detail, search, community
let currentThreadId = null;

// ======================= HELPER FUNCTIONS =======================
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('id-ID', options);
}

// Render Halaman Home (daftar thread terbaru)
function renderHome() {
  const main = document.getElementById("main-content");
  // Urutkan dari terbaru ke lama
  const sorted = [...threads].sort((a,b) => new Date(b.date) - new Date(a.date));
  let cardsHtml = "";
  sorted.forEach(thread => {
    cardsHtml += `
      <div class="thread-card" data-id="${thread.id}">
        <h3>${escapeHtml(thread.title)}</h3>
        <div class="thread-meta">
          <span><i class="far fa-calendar-alt"></i> ${formatDate(thread.date)}</span>
          <span><i class="fas fa-tag"></i> ${escapeHtml(thread.category)}</span>
        </div>
        <div class="thread-excerpt">${escapeHtml(thread.excerpt)}</div>
      </div>
    `;
  });
  main.innerHTML = `
    <div class="thread-list">
      <div class="section-header">
        <h2>📝 Thread <span class="accent">Terbaru</span></h2>
        <p>Catatan, tutorial, dan obrolan dari Protocol404</p>
      </div>
      <div class="thread-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
  // Tambah event listener ke setiap card
  document.querySelectorAll('.thread-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      showThreadDetail(id);
    });
  });
}

// Menampilkan halaman detail thread
function showThreadDetail(threadId) {
  const thread = threads.find(t => t.id === threadId);
  if (!thread) return;
  currentThreadId = threadId;
  currentPage = "detail";
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <div class="thread-detail">
      <div class="container">
        <div class="back-home" id="backHomeBtn"><i class="fas fa-arrow-left"></i> Kembali ke Beranda</div>
        <h1 class="thread-title">${escapeHtml(thread.title)}</h1>
        <div class="thread-info">
          <span><i class="far fa-calendar-alt"></i> ${formatDate(thread.date)}</span>
          <span><i class="fas fa-tag"></i> ${escapeHtml(thread.category)}</span>
        </div>
        <div class="thread-content">
          ${thread.content}
        </div>
        <div style="margin-top: 3rem; border-top: 1px solid var(--border-glass); padding-top: 2rem;">
          <h3>💬 Komentar & Diskusi Thread Ini</h3>
          <div id="thread-comments"></div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("backHomeBtn")?.addEventListener("click", () => {
    navigateTo("home");
  });
  // Load Utterances untuk komentar per-thread (gunakan issue berbeda per thread)
  loadUtterancesForThread(threadId);
  updateActiveNav();
}

// Memuat Utterances untuk komentar per thread (berdasarkan ID thread)
function loadUtterancesForThread(threadId) {
  const container = document.getElementById("thread-comments");
  if (!container) return;
  container.innerHTML = ""; // bersihkan
  // Buat script Utterances
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", "protocol404/protocol404.github.io"); // GANTI dengan repo kamu!
  script.setAttribute("issue-term", `title: ${threadId}`); // Setiap thread punya issue berbeda
  script.setAttribute("theme", "github-dark");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;
  container.appendChild(script);
}

// Halaman Search
function renderSearch() {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <div class="search-page">
      <div class="container">
        <div class="section-header">
          <h2>🔍 Cari <span class="accent">Thread</span></h2>
          <p>Temukan artikel atau diskusi yang kamu cari</p>
        </div>
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="Ketik judul atau konten..." autocomplete="off">
          <button id="searchBtn"><i class="fas fa-search"></i></button>
        </div>
        <div id="searchResults" class="search-results"></div>
      </div>
    </div>
  `;
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const performSearch = () => {
    const keyword = searchInput.value.toLowerCase().trim();
    if (!keyword) {
      document.getElementById("searchResults").innerHTML = "<p>Masukkan kata kunci.</p>";
      return;
    }
    const results = threads.filter(t => 
      t.title.toLowerCase().includes(keyword) || 
      t.content.toLowerCase().includes(keyword) ||
      t.excerpt.toLowerCase().includes(keyword)
    );
    if (results.length === 0) {
      document.getElementById("searchResults").innerHTML = "<p>Tidak ada thread yang cocok.</p>";
      return;
    }
    let html = "";
    results.forEach(t => {
      html += `
        <div class="search-item" data-id="${t.id}">
          <h3>${escapeHtml(t.title)}</h3>
          <div class="thread-meta">${formatDate(t.date)} • ${escapeHtml(t.category)}</div>
          <p>${escapeHtml(t.excerpt)}</p>
        </div>
      `;
    });
    document.getElementById("searchResults").innerHTML = html;
    document.querySelectorAll('.search-item').forEach(el => {
      el.addEventListener('click', () => {
        showThreadDetail(el.getAttribute('data-id'));
      });
    });
  };
  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => { if (e.key === "Enter") performSearch(); });
}

// Halaman Komunitas (chat global dengan Utterances)
function renderCommunity() {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <div class="community-page">
      <div class="container">
        <div class="section-header">
          <h2>💬 Ruang Chat <span class="accent">Komunitas</span></h2>
          <p>Ngobrol bebas seputar apapun. Gunakan akun GitHub-mu.</p>
        </div>
        <div class="community-container">
          <div id="global-chat"></div>
        </div>
      </div>
    </div>
  `;
  // Load utterances untuk chat global (satu issue khusus)
  const container = document.getElementById("global-chat");
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", "protocol404/protocol404.github.io"); // GANTI dengan repo kamu!
  script.setAttribute("issue-term", "title: Komunitas Chat Global"); // Pastikan issue ini ada di repo
  script.setAttribute("theme", "github-dark");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;
  container.appendChild(script);
}

// Navigasi antar halaman
function navigateTo(page, threadId = null) {
  currentPage = page;
  if (page === "home") {
    renderHome();
  } else if (page === "search") {
    renderSearch();
  } else if (page === "community") {
    renderCommunity();
  } else if (page === "detail" && threadId) {
    showThreadDetail(threadId);
  }
  updateActiveNav();
  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateActiveNav() {
  document.querySelectorAll(".nav-link").forEach(link => {
    const page = link.getAttribute("data-page");
    if ((page === currentPage) || (currentPage === "detail" && page === "home")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Utility escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
    return c;
  });
}

// ======================= VISITOR COUNTER (CountAPI) =======================
async function updateVisitorCounter() {
  const counterElement = document.getElementById("visitor-counter");
  if (!counterElement) return;
  // Gunakan CountAPI (gratis, tanpa login) - endpoint unik untuk blog ini
  const endpoint = "https://api.countapi.xyz/hit/protocol404-blog/visits";
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data && data.value) {
      counterElement.innerText = data.value;
    } else {
      counterElement.innerText = "?";
    }
  } catch (err) {
    console.warn("Visitor counter error", err);
    counterElement.innerText = "🤖";
  }
}

// ======================= INIT & EVENT LISTENERS =======================
document.addEventListener("DOMContentLoaded", () => {
  // Render home pertama
  renderHome();
  updateVisitorCounter();
  
  // Event listener navigasi
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      navigateTo(page);
    });
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
  
  // Handle browser back/forward (popstate)
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
      if (event.state.page === "detail" && event.state.id) {
        showThreadDetail(event.state.id);
      } else {
        navigateTo(event.state.page);
      }
    } else {
      navigateTo("home");
    }
  });
  
  // Push state saat navigasi (opsional)
  // Sederhananya, kita override function navigateTo untuk push state
  const originalNavigate = navigateTo;
  window.navigateTo = function(page, id) {
    if (page === "detail" && id) {
      history.pushState({ page: "detail", id: id }, "", `#/post/${id}`);
    } else {
      history.pushState({ page: page }, "", `#/${page}`);
    }
    originalNavigate(page, id);
  };
  window.navigateTo = window.navigateTo.bind(this);
  // replace agar fungsi asli tetap dipanggil
  window.navigateTo = function(page, id) {
    if (page === "detail" && id) {
      history.pushState({ page: "detail", id: id }, "", `#/post/${id}`);
    } else if (page !== "home") {
      history.pushState({ page: page }, "", `#/${page}`);
    } else {
      history.pushState({ page: "home" }, "", "#/");
    }
    originalNavigate(page, id);
  };
  // Override global navigateTo
  window.navigateTo = window.navigateTo.bind(this);
  // lalu panggil ulang event listener? Tidak usah, karena kita akan ganti cara klik nav
  // Agar mudah, kita timpa fungsi navigateTo asli dengan yang baru
  // Tapi biar simpel, kita langsung modifikasi event listener nav
  document.querySelectorAll(".nav-link").forEach(link => {
    link.removeEventListener("click", () => {});
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      window.navigateTo(page);
    });
  });
  // juga untuk thread card di home, nanti di renderHome kita harus panggil window.navigateTo
  // Kita ubah sedikit renderHome
  const originalRenderHome = renderHome;
  window.renderHome = function() {
    originalRenderHome();
    document.querySelectorAll('.thread-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        window.navigateTo("detail", id);
      });
    });
  };
  window.renderHome();
  // Untuk search item juga perlu navigateTo detail
  // Sudah di handle di renderSearch
  // Dan backHomeBtn juga perlu panggil window.navigateTo("home")
  // Kita override showThreadDetail juga
  const originalShowDetail = showThreadDetail;
  window.showThreadDetail = function(id) {
    originalShowDetail(id);
    const backBtn = document.getElementById("backHomeBtn");
    if (backBtn) {
      backBtn.onclick = () => window.navigateTo("home");
    }
  };
  window.showThreadDetail = window.showThreadDetail.bind(this);
  // Jalankan ulang home setelah semua override
  window.navigateTo("home");
});
