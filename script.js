// ==================== КНОПКА "НАВЕРХ" ====================
const scrollBtn = document.querySelector("#scrollTopBtn");
if (scrollBtn) {
    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ==================== АККОРДЕОН ====================
const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach(item => {
    const title = item.querySelector(".accordion-title");
    title.addEventListener("click", () => {
        accordionItems.forEach(i => { if (i !== item) i.classList.remove("active"); });
        item.classList.toggle("active");
    });
});

// ==================== ФИЛЬТРЫ ФОТО ====================
const filterBtns = document.querySelectorAll('.filters button');
const galleryImgs = document.querySelectorAll('.gallery img');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        galleryImgs.forEach(img => {
            img.classList.toggle('hidden', category !== 'all' && img.dataset.category !== category);
        });
    });
});

// ==================== МОДАЛЬНОЕ ОКНО ====================
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modalImg');
const closeBtn = document.querySelector('.close');

galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// ==================== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ====================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.classList.toggle('dark', savedTheme === 'dark');

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// ==================== РАНДОМНАЯ ГАЛЕРЕЯ ====================
const randomGallery = document.querySelector('.random-gallery');

if (randomGallery) {
    for (let i = 0; i < 6; i++) {
        const img = document.createElement('img');
        img.src = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
        img.alt = 'Рандомное фото';
        randomGallery.appendChild(img);
    }
}

// ==================== ОТЗЫВЫ ====================
const reviewIds = ["rev1", "rev2", "rev3"];
let currentReviewIndex = 0;

function showReview(index) {
    reviewIds.forEach((id, i) => {
        const el = document.getElementById(id);
        el.classList.toggle("active", i === index);
    });
}

// ЗАГРУЗКА ОТЗЫВОВ
// ====== ЗАГРУЗКА ОТЗЫВОВ ======
async function loadReview(id) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        el.textContent = "Загрузка...";

        const res = await fetch("https://dummyjson.com/quotes/random");
        if (!res.ok) throw new Error("Ошибка загрузки");

        const data = await res.json();
        // В DummyJSON цитата лежит в поле quote
        el.textContent = data.quote;
    } catch {
        el.textContent = "Ошибка загрузки данных";
    }
}

// Загрузка всех отзывов
reviewIds.forEach(id => loadReview(id));


loadReview("rev1");
loadReview("rev2");
loadReview("rev3");
showReview(0);

// ==================== КАРУСЕЛЬ ОТЗЫВОВ ====================
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const total = 3;

function updateCarousel() {
    const offset = -index * 300;
    track.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateCarousel();
});


