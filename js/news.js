                    const container = document.getElementById('telegram-posts');
                    const channel = 'TROTA_project';
                    const postsPerPage = 5;
                
                    // **ВАЖНО: массив списка номеров постов**
                    const availablePosts = [
                    1521, 1520, 1518, 1509, 1501, 1493, 1489, 1478, 1475, 1472, 1469, 1449,
  1445, 1440, 1435, 1430, 1427, 1426, 1414, 1406, 1405, 1404,
  1403, 1400, 1396, 1395, 1380, 1372, 1367, 1329, 1318, 1311,
  1310, 1305, 1304, 1303, 1301, 1298, 1295, 1290, 1289, 1280,
  1279, 1277, 1271, 1270, 1268, 1249, 1244, 1241, 1239, 1237,
  1235, 1234, 1231, 1229, 1228, 1226, 1224, 1221, 1219, 1212,
  1167, 1163, 1152, 1148, 1017, 987, 966, 964, 938, 936,
  931, 915, 909, 900, 896, 889, 881, 870, 868, 857
];
                
const paginationContainer = document.querySelector('.pagination');
    let totalPages = Math.ceil(availablePosts.length / postsPerPage); // Общее количество страниц

    function createPostScripts(postNumber) {
      const postScript = document.createElement('script');
      postScript.async = true;
      postScript.src = "https://telegram.org/js/telegram-widget.js?22";
      postScript.dataset.telegramPost = `${channel}/${postNumber}`;
      postScript.dataset.width = "100%";
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