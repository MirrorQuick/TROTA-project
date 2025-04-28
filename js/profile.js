
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
const profileCircle = document.querySelector('.profile-circle');
const downloadProfileButton = document.getElementById('download-profile');

let profileData = null;
const profileChannel = new BroadcastChannel('profile-channel');

// Функция для обновления отображения профиля
function updateProfileDisplay() {
    if (profileData) {
        profileImage.src = profileData.photoURL || '';
        profileName.textContent = profileData.name || '';
        profileContainer.style.display = 'block';
        profileImage.style.display = 'block';  // Make profile image visible
        logoutButton.style.display = 'inline-block'; // Make logout button visible
        downloadProfileButton.style.display = 'inline-block'; // Make download button visible
        loginLink.style.display = 'none';

        // Отображение игровых данных
        document.getElementById('games-played').textContent = profileData.gamesPlayed || 0;
        document.getElementById('best-score').textContent = profileData.bestScore || 0;
        document.getElementById('total-candies').textContent = profileData.totalCandies || 0;

        profileCircle.addEventListener('click', function() {
            if (profileData) {
                openProfileModal();
            }
        });
        if (profileData.world === 'series' && profileData.color) {
            profileCircle.style.borderColor = profileData.color;
        } else {
            profileCircle.style.borderColor = 'transparent';
        }
    } else {
        profileContainer.style.display = 'none';
        profileImage.style.display = 'none'; // Hide profile image
        logoutButton.style.display = 'none';    // Hide logout button
        downloadProfileButton.style.display = 'none'; // Hide download button
        loginLink.style.display = 'inline';
        profileCircle.style.borderColor = 'transparent';

        document.getElementById('games-played').textContent = 0;
        document.getElementById('best-score').textContent = 0;
        document.getElementById('total-candies').textContent = 0;
    }
}

function openProfileModal() {
    if (profileData) {
        document.getElementById('name').value = profileData.name || '';
        document.getElementById('age').value = profileData.age || '';
        document.getElementById('world').value = profileData.world || 'books';
        document.getElementById('element').value = profileData.element || '';
        document.getElementById('color').value = profileData.color || '#000000';
        document.getElementById('character').value = profileData.character || 'Mitaella';

        if (profileData.world === 'books') {
            booksOptions.style.display = 'block';
            seriesOptions.style.display = 'none';
        } else {
            booksOptions.style.display = 'none';
            seriesOptions.style.display = 'block';
        }
    } else {
        document.getElementById('profile-form').reset();
    }
    profileModal.style.display = 'block';
}

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    openProfileModal();
});

profileModalClose.addEventListener('click', function() {
    profileModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == profileModal) {
        profileModal.style.display = 'none';
    }
});

worldSelect.addEventListener('change', function() {
    if (worldSelect.value === 'books') {
        booksOptions.style.display = 'block';
        seriesOptions.style.display = 'none';
    } else {
        booksOptions.style.display = 'none';
        seriesOptions.style.display = 'block';
    }
});

elementInput.addEventListener('input', function() {
    if (elementInput.value.toLowerCase() === 'тьма') {
        raceSpan.textContent = 'Вед';
    } else {
        raceSpan.textContent = 'Стихиец';
    }
});

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
                    saveProfileAndBroadcast();
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

function broadcastProfileUpdate() {
    profileChannel.postMessage(profileData);
}

function saveProfileAndBroadcast() {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    broadcastProfileUpdate();
}

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
            gamesPlayed: profileData ? (profileData.gamesPlayed || 0) : 0,
            bestScore: profileData ? (profileData.bestScore || 0) : 0,
            totalCandies: profileData ? (profileData.totalCandies || 0) : 0
        };

        saveProfileAndBroadcast();

        profileModal.style.display = 'none';
        updateProfileDisplay();
    };

    reader.onerror = (error) => {
        alert('Ошибка при загрузке фото.');
        console.error(error);
    };

    reader.readAsDataURL(photoFile);
});

loadProfileButton.addEventListener('click', function() {
    loadProfileFromFile();
});

logoutButton.addEventListener('click', function() {
    profileData = null;
    localStorage.removeItem('userProfile');
    broadcastProfileUpdate();
    updateProfileDisplay();
});

downloadProfileButton.addEventListener('click', function() {
    if (profileData) {
        downloadProfile(profileData);
    } else {
        alert('Нет данных профиля для скачивания.');
    }
});

// Слушаем обновления профиля из других вкладок
profileChannel.onmessage = (event) => {
    profileData = event.data;
    updateProfileDisplay();
};

// Загрузка профиля при загрузке страницы
window.addEventListener('load', function() {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
        profileData = JSON.parse(storedProfile);
    }
    updateProfileDisplay(); // Вызываем только после загрузки из localStorage
});
