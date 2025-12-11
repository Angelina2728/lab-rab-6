Лабораторная работа №6. Асинхронный JavaScript: API и хранилище

Скриншоты работы интерактивных элементов
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/5fb26aa4-e37b-47ac-ae28-b8afaf4e2e0c" />
<img width="1920" height="1200" alt="{F7911F22-6F96-405E-89EC-70939C72B768}" src="https://github.com/user-attachments/assets/d34f8695-9643-4a2a-9b55-94f4dce15c4c" />
<img width="1920" height="1140" alt="{5C6B628A-DAF2-4D66-9E35-F6835113180C}" src="https://github.com/user-attachments/assets/1eccffd1-3fc9-4e0d-bf5e-2192f8332fa5" />

Ответы на вопросы

1. Что делает fetch?

fetch() — это встроенный метод JavaScript, который отправляет HTTP-запросы на сервер и получает оттуда данные.
Он работает асинхронно и возвращает промис.

Пример:

const res = await fetch("https://api.quotable.io/random");

Что делает fetch:

отправляет запрос по указанному URL,

получает ответ сервера,

позволяет прочитать данные в формате JSON (res.json()).



---

2. Зачем нужны async/await?

Это современный удобный синтаксис для работы с промисами.

Они позволяют:

писать асинхронный код так, будто он синхронный,

уменьшить вложенность .then().then().catch(),

ловить ошибки через try...catch.


Пример:

async function loadData() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.error("Ошибка:", e);
    }
}


---

3. Как работает localStorage?

localStorage — это встроенное хранилище браузера.

Особенности:

хранит данные постоянно, даже после закрытия вкладки,

хранит только строки,

объём около 5–10 МБ.


Основные методы:

localStorage.setItem("theme", "dark");  // записать
localStorage.getItem("theme");          // прочитать
localStorage.removeItem("theme");       // удалить
localStorage.clear();                   // очистить всё

Если нужно сохранить объект — его надо превратить в строку:

localStorage.setItem("reviews", JSON.stringify(array));


---

4. Где помог ИИ, а где пришлось разбираться вручную?


ИИ помог:

составить структуру проекта,

написать базовый код для загрузки отзывов через fetch,

подсказать, как использовать async/await,

объяснить работу JSON и localStorage.


Пришлось разбираться вручную:

исправлять ошибки в консоли,

добавлять проверку элементов (if (el) …),

адаптировать код под свою HTML-структуру,

настраивать стили и подключение кнопок,

исправлять ситуацию, когда не работали события или не открывались секции.
