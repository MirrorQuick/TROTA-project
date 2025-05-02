const container = document.getElementById('telegram-posts');
const channel = 'TROTA_fandom';
const postsPerPage = 6;

// **ВАЖНО: массив списка номеров постов**
const availablePosts = [
    184, 183, 181, 180, 179, 178, 177, 175, 174, 173, 172, 171, 170, 169, 168, 167, 166, 165, 164, 
    162, 161, 160, 159, 158, 157, 156, 155, 154, 153, 149, 148, 147, 146, 145, 144, 143, 142, 
    140, 138, 137, 136, 133, 132, 129, 127, 126, 122, 121, 120, 119, 118, 117, 116, 115, 114, 
    113, 112, 110, 109, 108, 95, 87, 85, 83, 82, 81, 78, 73, 71, 70, 68, 57, 49, 40, 39, 33, 
    31, 28, 20, 17, 14, 12, 11, 9, 7
];

const paginationContainer = document.querySelector('.pagination');
let totalPages = Math.ceil(availablePosts.length / postsPerPage); // Общее количество страниц

function createPostScripts(postNumber) {
const postScript = document.createElement('script');
postScript.async = true;
postScript.src = "https://telegram.org/js/telegram-widget.js?22";
postScript.dataset.telegramPost = `${channel}/${postNumber}`;
postScript.dataset.width = "60%";
postScript.dataset.color = "8596CF";
postScript.dataset.dark = "1";

const discussionScript = document.createElement('script');
discussionScript.async = true;
discussionScript.src = "https://telegram.org/js/telegram-widget.js?22";
discussionScript.dataset.telegramDiscussion = `${channel}/${postNumber}`;
discussionScript.dataset.commentsLimit = "5";
discussionScript.dataset.color = "8596CF";
discussionScript.dataset.dark = "1";

return [postScript, discussionScript];
}

function loadPage(pageNumber) {
container.innerHTML = ''; // Очищаем контейнер

const startIndex = (pageNumber - 1) * postsPerPage;
const endIndex = Math.min(startIndex + postsPerPage, availablePosts.length);

// Отображаем посты в прямом порядке (с начала массива)
for (let i = startIndex; i < endIndex; i++) {
const postNumber = availablePosts[i];

// Создаем контейнер для поста
const postContainer = document.createElement('div');
postContainer.classList.add('post-container'); // Добавляем класс для стилизации

const [postScript, discussionScript] = createPostScripts(postNumber);
postContainer.appendChild(postScript);
postContainer.appendChild(discussionScript);

container.appendChild(postContainer); // Добавляем контейнер поста в главный контейнер
}
}

function createPaginationButtons() {
paginationContainer.innerHTML = ''; // Очищаем кнопки пагинации

for (let i = 1; i <= totalPages; i++) {
const button = document.createElement('button');
button.innerText = i;
button.addEventListener('click', () => {
loadPage(i);
});
paginationContainer.appendChild(button);
}
}

// Инициализация:
createPaginationButtons(); // Создаем кнопки пагинации
loadPage(1); // Загружаем первую страницу