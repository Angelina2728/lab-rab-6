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

// ==================== ФИЛЬТРЫ ФОТОГРАФИЙ ====================
const filterBtns = document.querySelectorAll('.filters button');
const galleryImgs = document.querySelectorAll('.gallery img');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        galleryImgs.forEach(img => {
            if (category === 'all' || img.dataset.category === category) {
                img.classList.remove('hidden');
            } else {
                img.classList.add('hidden');
            }
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

const randomGallery = document.querySelector('.random-gallery');

if (randomGallery) {
    for (let i = 0; i < 6; i++) {
        const img = document.createElement('img');
        img.src = 'https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}';
        img.alt = 'Рандомное фото';
        randomGallery.appendChild(img);
    }
}
function showReview(index) {
    reviewIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (i === index) el.classList.add('active');
        else el.classList.remove('active');
    });
}

document.getElementById('prev-review').addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex - 1 + reviewIds.length) % reviewIds.length;
    showReview(currentReviewIndex);
});

document.getElementById('next-review').addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex + 1) % reviewIds.length;
    showReview(currentReviewIndex);
});
async function loadReview(id) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        el.textContent = "Загрузка...";
        const res = await fetch('https://api.quotable.io/random');
        if (!res.ok) throw new Error('Ошибка сервера');
        const data = await res.json();
        el.textContent = data.content; // реальная цитата
    } catch (error) {
        el.textContent = "Ошибка загрузки";
        console.error('Ошибка при получении цитаты:', error);
    }
}

// Загружаем все отзывы
['review1', 'review2', 'review3'].forEach(loadReview);