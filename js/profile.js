        
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

let profileData = null; // Переменная для хранения данных профиля

// Функция для обновления отображения профиля
function updateProfileDisplay() {
    if (profileData) {
        profileImage.src = profileData.photoURL || ''; // Отображаем фото, проверяем на null
        profileName.textContent = profileData.name || '';   // Отображаем имя, проверяем на null
        profileContainer.style.display = 'block';      // Отображаем контейнер
        loginLink.style.display = 'none';           // Скрываем кнопку "Войти"
        //  Применяем цвет рамки, если есть
        profileCircle.addEventListener('click', function() {
            if (profileData) { // Открываем окно редактирования, только если профиль уже создан
                openProfileModal();
            }
        });
        if (profileData.world === 'series' && profileData.color) {
            document.querySelector('.profile-circle').style.borderColor = profileData.color;
        }

    } else {
        profileContainer.style.display = 'none';      // Скрываем контейнер
        loginLink.style.display = 'inline';          // Отображаем кнопку "Войти"
        document.querySelector('.profile-circle').style.borderColor = 'transparent';
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
if (world === '' ) {
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
            character: character
        };

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
    updateProfileDisplay();
});

// Загрузка профиля при загрузке страницы (убрал localStorage)
window.addEventListener('load', function() {
    updateProfileDisplay(); // Инициализируем отображение
});
localStorage.setItem('userProfile', JSON.stringify(profileData));
window.addEventListener('load', function() {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
        profileData = JSON.parse(storedProfile);
        updateProfileDisplay();
    } else {
        updateProfileDisplay(); // Инициализируем отображение в любом случае
    }
});
window.addEventListener('load', function() {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
        profileData = JSON.parse(storedProfile);
        updateProfileDisplay();
    } else {
        updateProfileDisplay(); // Инициализируем отображение в любом случае
    }
});
localStorage.removeItem('userProfile');
const downloadProfileButton = document.getElementById('download-profile');

downloadProfileButton.addEventListener('click', function() {
    if (profileData) {
        downloadProfile(profileData);
    } else {
        alert('Нет данных профиля для скачивания.');
    }
});