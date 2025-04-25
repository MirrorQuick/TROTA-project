
// js\profile.js

const loginLink = document.getElementById('login-link');
const profileModal = document.getElementById('profile-modal');
const profileModalClose = document.getElementById('profile-modal-close');
const profileForm = document.getElementById('profile-form');
const worldSelect = document.getElementById('world');
const booksOptions = document.getElementById('books-options');
const seriesOptions = document.getElementById('series-options');
const elementInput = document.getElementById('element');
const raceSpan = document.getElementById('race');
const saveProfileButton = document.getElementById('save-profile');
const loadProfileButton = document.getElementById('load-profile');
const profileContainer = document.getElementById('profile-container');
const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const logoutButton = document.getElementById('logout-button');
const profileCircle = document.querySelector('.profile-circle'); // Получаем элемент profile-circle
const downloadProfileButton = document.getElementById('download-profile'); // Получаем кнопку скачивания

let profileData = null; // Переменная для хранения данных профиля

// Функция для обновления отображения профиля
function updateProfileDisplay() {
    if (profileData) {
        profileImage.src = profileData.photoURL || 'images/default-profile.png'; // Отображаем фото, проверяем на null, дефолтное изображение
        profileName.textContent = profileData.name || 'Безымянный';   // Отображаем имя, проверяем на null
        profileContainer.style.display = 'block';      // Отображаем контейнер
        loginLink.style.display = 'none';           // Скрываем кнопку "Войти"
        profileCircle.style.display = 'block'; // Показываем кружок профиля
        logoutButton.style.display = 'inline-block'; // Показываем кнопку выхода

        // Применяем цвет рамки, если есть
        if (profileData.world === 'series' && profileData.color) {
            profileCircle.style.borderColor = profileData.color;
        } else {
            profileCircle.style.borderColor = 'transparent'; // Возвращаем прозрачность, если не серия
        }

          if (profileData && profileData.achievements) {
            document.getElementById('high-score').textContent = profileData.achievements.highScore || 0;
            document.getElementById('games-played').textContent = profileData.achievements.gamesPlayed || 0;
        } else {
            document.getElementById('high-score').textContent = 0;
            document.getElementById('games-played').textContent = 0;
        }

    } else {
        profileContainer.style.display = 'none';      // Скрываем контейнер
        loginLink.style.display = 'inline';          // Отображаем кнопку "Войти"
        profileCircle.style.display = 'none'; // Скрываем кружок профиля
        logoutButton.style.display = 'none'; // Скрываем кнопку выхода
        profileCircle.style.borderColor = 'transparent';
    }
}

function openProfileModal() {
    // Заполняем форму данными профиля, если они есть
    if (profileData) {
        document.getElementById('name').value = profileData.name || '';
        document.getElementById('age').value = profileData.age || '';
        document.getElementById('world').value = profileData.world || 'books'; // Установите значение по умолчанию
        document.getElementById('element').value = profileData.element || '';
        document.getElementById('color').value = profileData.color || '#000000';
        document.getElementById('character').value = profileData.character || 'Mitaella'; // Установите значение по умолчанию

        // Показываем/скрываем опции в зависимости от выбранного мира
        if (profileData.world === 'books') {
            booksOptions.style.display = 'block';
            seriesOptions.style.display = 'none';
        } else {
            booksOptions.style.display = 'none';
            seriesOptions.style.display = 'block';
        }

    } else {
        // Очищаем форму, если профиля нет
        document.getElementById('profile-form').reset();
    }
    profileModal.style.display = 'block';
}

// Открываем модальное окно профиля при клике на "Войти"
loginLink.addEventListener('click', function(event) {
    event.preventDefault();  // Предотвращаем переход по ссылке
    openProfileModal();
});

// Открываем модальное окно профиля при клике на кружок профиля
profileCircle.addEventListener('click', function(event) {
    openProfileModal();
});

// Закрываем модальное окно профиля
profileModalClose.addEventListener('click', function() {
    profileModal.style.display = 'none';
});

// Закрываем модальное окно при клике вне его
window.addEventListener('click', function(event) {
    if (event.target == profileModal) {
        profileModal.style.display = 'none';
    }
});

// Обработчик изменения выбора мира
worldSelect.addEventListener('change', function() {
    if (worldSelect.value === 'books') {
        booksOptions.style.display = 'block';
        seriesOptions.style.display = 'none';
    } else {
        booksOptions.style.display = 'none';
        seriesOptions.style.display = 'block';
    }
});

// Обработчик ввода стихии
elementInput.addEventListener('input', function() {
    if (elementInput.value.toLowerCase() === 'тьма') {
        raceSpan.textContent = 'Вед';
    } else {
        raceSpan.textContent = 'Стихиец';
    }
});

// Функция для сохранения профиля в файл
function downloadProfile(profile) {
    if (!profile) {
        alert('Нет данных для сохранения.');
        return;
    }

    const json = JSON.stringify(profile);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Функция для загрузки профиля из файла
function loadProfileFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    profileData = JSON.parse(e.target.result);
                    saveProfileToLocalStorage(profileData); // Сохраняем в localStorage
                    updateProfileDisplay();

                    profileModal.style.display = 'none';
                } catch (error) {
                    alert('Ошибка при разборе файла профиля.');
                    console.error(error);
                }
            };
            reader.onerror = (error) => {
                alert('Ошибка при чтении файла.');
                console.error(error);
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Функция для сохранения профиля в localStorage
function saveProfileToLocalStorage(profile) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
}

// Функция для загрузки профиля из localStorage
function loadProfileFromLocalStorage() {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
        profileData = JSON.parse(storedProfile);
    }
}

// Обработчик кнопки "Сохранить профиль"
saveProfileButton.addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const photoInput = document.getElementById('photo');
    const world = document.getElementById('world').value;
    const element = document.getElementById('element').value;
    const color = document.getElementById('color').value;
    const character = document.getElementById('character').value;

    if (!name) {
        alert('Пожалуйста, введите имя.');
        return;
    }

    const photoFile = photoInput.files[0];
    if (!photoFile) {
        alert('Пожалуйста, загрузите фото профиля.');
        return;
    }
    if (world === 'books' && !element) {
        alert('Пожалуйста, выберите стихию.');
        return;
    }
    if (world === '') {
        alert('Пожалуйста, выберите мир.');
        return;
    }


    // Читаем фото как URL
    const reader = new FileReader();

    reader.onload = function(e) {
        const photoURL = e.target.result;

        profileData = {
            name: name,
            age: age,
            photoURL: photoURL,
            world: world,
            element: element,
            color: color,
            character: character,
            achievements: profileData ? profileData.achievements : {}  // Сохраняем достижения!
        };

        saveProfileToLocalStorage(profileData); // Сохраняем в localStorage
        profileModal.style.display = 'none';  // Закрываем окно
        updateProfileDisplay();  // Обновляем отображение профиля
    };

    reader.onerror = (error) => {
        alert('Ошибка при загрузке фото.');
        console.error(error);
    };

    reader.readAsDataURL(photoFile); // Читаем данные как URL
});

// Обработчик кнопки "Загрузить профиль"
loadProfileButton.addEventListener('click', function() {
    loadProfileFromFile();
});

// Обработчик кнопки "Выйти"
logoutButton.addEventListener('click', function() {
    profileData = null;
    localStorage.removeItem('userProfile'); // Удаляем из localStorage
    updateProfileDisplay();
});

// Обработчик кнопки "Скачать профиль"
downloadProfileButton.addEventListener('click', function() {
    if (profileData) {
        downloadProfile(profileData);
    } else {
        alert('Нет данных профиля для скачивания.');
    }
});

// Загрузка профиля при загрузке страницы
window.addEventListener('load', function() {
    loadProfileFromLocalStorage(); // Пытаемся загрузить из localStorage
    updateProfileDisplay(); // Инициализируем отображение
});
