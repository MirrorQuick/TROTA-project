
// Получаем элемент canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Получаем размеры контейнера, а не канваса, для адаптивности
const gameContainer = document.getElementById('game-container');
let canvasWidth = gameContainer.offsetWidth;
let canvasHeight = gameContainer.offsetHeight;

// Устанавливаем размеры канваса
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Загрузка изображений
const dragonImage = new Image();
dragonImage.src = 'images/icons/merch.gif'; // Замените на путь к GIF-анимации дракона

const backgroundImage = new Image();
backgroundImage.src = 'images/games/dragon_game/background.png'; // Замените на путь к фоновому изображению

const mitaImage = new Image();
mitaImage.src = 'images/mita.png'; // Замените на путь к изображению Миты

const candyImage = new Image();
candyImage.src = 'images/games/dragon_game/candy.png'; // Замените на путь к изображению конфеты

const lifeDragonImage = new Image();
lifeDragonImage.src = 'images/icons/merch.gif'; // Замените на путь к изображению дракончика жизни

// Игровые объекты
const dragon = {
    x: 50,
    y: canvasHeight / 2,
    width: 50,
    height: 50,
    speed: 5,
    collisionWidth: 30,
    collisionHeight: 30,
    collisionOffsetX: 10,
    collisionOffsetY: 10
};

const mitas = []; // Массив для хранения экземпляров Миты
let maxMitas = 1;
let mitaSpeedMultiplier = 1; // Множитель скорости Мит

const candies = []; // Массив для хранения конфет

let score = 0;
let candyScore = 0; // Добавляем переменную для отслеживания количества конфет
let lives = 3; // Начальное количество жизней
let level = 1;

let gameOver = false;

let mitaCounter = 0; // Счетчик для отслеживания количества Мит для появления дракончика жизни

// Обработчик касания для управления драконом
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Предотвращаем прокрутку страницы
    const touch = event.touches[0];
    handleTouch(touch);
}, false);

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleTouch(touch);
}, false);

function handleTouch(touch) {
    const rect = canvas.getBoundingClientRect();
    dragon.x = touch.clientX - rect.left - dragon.width / 2;
    dragon.y = touch.clientY - rect.top - dragon.height / 2;

    // Ограничиваем движение дракона, чтобы не выходил за пределы экрана
    dragon.x = Math.max(0, Math.min(dragon.x, canvasWidth - dragon.width));
    dragon.y = Math.max(0, Math.min(dragon.y, canvasHeight - dragon.height));
}

// Отслеживание движения мыши для управления драконом (если играют на компьютере)
canvas.addEventListener('mousemove', (event) => {
const rect = canvas.getBoundingClientRect();
dragon.x = event.clientX - rect.left - dragon.width / 2;
dragon.y = event.clientY - rect.top - dragon.height / 2;

// Ограничиваем движение дракона, чтобы не выходил за пределы экрана
dragon.x = Math.max(0, Math.min(dragon.x, canvasWidth - dragon.width));
dragon.y = Math.max(0, Math.min(dragon.y, canvasHeight - dragon.height));
});

// Функция для проверки столкновения
function checkCollision(rect1, rect2) {
const rect1Collision = {
x: rect1.x + rect1.collisionOffsetX,
y: rect1.y + rect1.collisionOffsetY,
width: rect1.collisionWidth,
height: rect1.collisionHeight
};

return (
rect1Collision.x < rect2.x + rect2.width &&
rect1Collision.x + rect1Collision.width > rect2.x &&
rect1Collision.y < rect2.y + rect2.height &&
rect1Collision.y + rect1Collision.height > rect2.y
);
}

// Функция для создания новой Миты
function createMita() {
const mita = {
x: canvasWidth + Math.random() * 200,
y: Math.random() * (canvasHeight - 50),
width: 30,
height: 30,
speedX: (-2 - Math.random() * 3) * mitaSpeedMultiplier, // Рандомная скорость по X
speedY: (Math.random() - 0.5) * 2 * mitaSpeedMultiplier, // Рандомная скорость по Y (движение вверх-вниз)
image: mitaImage // Используем одну и ту же картинку Миты
};
mitas.push(mita);
mitaCounter++;
}

// Функция для создания конфеты
function createCandy() {
    const candy = {
        x: canvasWidth + Math.random() * 200,
        y: Math.random() * (canvasHeight - 50),
        width: 25,
        height: 25,
        speedX: -2 * mitaSpeedMultiplier,
        image: candyImage,
        type: 'candy'
    };
    candies.push(candy);
}

// Функция создания дракончика жизни
function createLifeDragon() {
    const lifeDragon = {
        x: canvasWidth + Math.random() * 200,
        y: Math.random() * (canvasHeight - 50),
        width: 35,
        height: 35,
        speedX: -1 * mitaSpeedMultiplier,
        image: lifeDragonImage,
        type: 'lifeDragon'
    };
    candies.push(lifeDragon)
}

// Функция для обновления Мит
function updateMitas() {
if (mitas.length < maxMitas && Math.random() < 0.1) {
createMita(); // Создаем новую Миту с небольшой вероятностью на каждом кадре
}

// Увеличиваем сложность в зависимости от количества Мит
if (score > 2 && level === 1) {
    level = 2;
    maxMitas = 3;
    mitaSpeedMultiplier = 1.2;
} else if (score > 10 && level === 2) {
    level = 3;
    maxMitas = 6;
    mitaSpeedMultiplier = 1.3;
} else if (score > 50 && level === 3) {
        level = 4;
        maxMitas = 10;
        mitaSpeedMultiplier = 1.5;
} else if (score > 200 && level === 4) {
    level = 5;
    maxMitas = 15;
    mitaSpeedMultiplier = 1.8;
} else if (score > 300 && level === 5) {
    level = 6;
    maxMitas = 20;
    mitaSpeedMultiplier = 2.3;
} else if (score > 500 && level === 6) {
    level = 7;
    maxMitas = 30;
    mitaSpeedMultiplier = 3;
}

for (let i = 0; i < mitas.length; i++) {
const mita = mitas[i];
mita.x += mita.speedX;
mita.y += mita.speedY;

// Отскок от верха и низа
if (mita.y < 0 || mita.y > canvasHeight - mita.height) {
mita.speedY = -mita.speedY;
}

// Если Мита ушла за экран, удаляем её
if (mita.x < -mita.width) {
mitas.splice(i, 1);
i--;
score++;
}
}
}

// Функция для обновления конфет и дракончиков жизни (теперь они вместе)
function updateCandies() {
    if (level >= 3 && Math.random() < 0.002) { // 0.2% шанс на появление конфетки
        createCandy();
    }
     if (level >= 4 && Math.random() < 0.001) { // 0.9% шанс на появление дракончика
        createLifeDragon();
    }

    for (let i = 0; i < candies.length; i++) {
        const candy = candies[i];
        candy.x += candy.speedX;

        if (candy.x < -candy.width) {
            candies.splice(i, 1);
            i--;
        }
    }
}

// Функция для отрисовки жизней
function drawLives() {
    for (let i = 0; i < lives; i++) {
        // Отражаем дракончика жизни по горизонтали
        ctx.save();
        ctx.translate(10 + i * 40 + 30 / 2, 50 + 30 / 2); // Перемещаем начало координат в центр дракончика
        ctx.scale(-1, 1); // Отражаем по горизонтали
        ctx.drawImage(lifeDragonImage, -30 / 2, -30 / 2, 30, 30); // Рисуем дракончика
        ctx.restore();
    }
}

// Функция для отрисовки игры
function drawGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Рисуем фон
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    // Адаптируем размер текста
    let fontSize = 20; // Размер шрифта по умолчанию
    let textMargin = 10; // Отступ от края по умолчанию

    if (canvasWidth < 400) {
        fontSize = 10; // Уменьшаем размер шрифта для маленьких экранов
        textMargin = 0.1; // Уменьшаем отступ
    } else if (canvasWidth < 600) {
        fontSize = 16; // Средний размер шрифта
    }

    ctx.fillStyle = 'white';
    ctx.font = fontSize + 'px Arial';
    ctx.fillText('Счет: ' + score, textMargin, 30);
    ctx.fillText('Уровень: ' + level, 150, 30);
    ctx.fillText('Конфеты: ' + candyScore, 300, 30); // Отображаем количество конфет

    // Рисуем жизни
    drawLives();

    // Рисуем дракона
    ctx.drawImage(dragonImage, dragon.x, dragon.y, dragon.width, dragon.height);

    // Обновляем и рисуем Мит
    updateMitas();
    for (let i = 0; i < mitas.length; i++) {
        const mita = mitas[i];
        ctx.drawImage(mita.image, mita.x, mita.y, mita.width, mita.height);

        // Проверяем столкновение с Митой
        if (checkCollision(dragon, mita) && mita.image === mitaImage) {
            lives--;
            mitas.splice(i, 1);
            i--;

            if (lives <= 0) {
                gameOver = true;
                document.getElementById('game-over').style.display = 'block';
                document.getElementById('score').textContent = score;
                document.getElementById('candies').textContent = candyScore; // Отображаем конфеты в конце игры

                // Получаем профиль из localStorage
                let storedProfile = localStorage.getItem('userProfile');
                if (storedProfile) {
                    storedProfile = JSON.parse(storedProfile);

                     // Обновляем данные профиля
                    storedProfile.gamesPlayed = (storedProfile.gamesPlayed || 0) + 1; // Инкремент игр
                    storedProfile.totalCandies = (storedProfile.totalCandies || 0) + candyScore; // Обновляем общее количество конфет
                    storedProfile.bestScore = Math.max(storedProfile.bestScore || 0, score); // Обновляем лучший счет

                    localStorage.setItem('userProfile', JSON.stringify(storedProfile));
                    // Отправляем сообщение об обновлении профиля в другие вкладки
                    const profileChannel = new BroadcastChannel('profile-channel');
                    profileChannel.postMessage(storedProfile);
                }
                profileChannel.close();
                // Конец игры
            }
        }
    }

    // Обновляем и рисуем конфеты
    updateCandies();
    for (let i = 0; i < candies.length; i++) {
        const candy = candies[i];
        ctx.drawImage(candy.image, candy.x, candy.y, candy.width, candy.height);

        // Проверяем столкновение с конфеткой или дракончиком жизни
        if (checkCollision(dragon, candy)) {
            if (candy.type === 'candy') {
                candyScore += 1; // Увеличиваем счетчик конфет
            } else if (candy.type === 'lifeDragon') {
                lives = Math.min(lives + 1, 10); // Максимум 5 жизней
            }
            candies.splice(i, 1); // Удаляем конфетку/дракончика
            i--;
        }
    }

    // Если игра не окончена, продолжаем отрисовку
    if (!gameOver) {
        requestAnimationFrame(drawGame);
    }
}

// Начинаем игру, только когда все изображения загружены
let imagesLoaded = 0;
const totalImages = 5; // Количество изображений для загрузки

function imageLoaded() {
imagesLoaded++;
if (imagesLoaded === totalImages) {
drawGame(); // Начинаем игру, когда все изображения загружены
}
}

dragonImage.onload = imageLoaded;
backgroundImage.onload = imageLoaded;
mitaImage.onload = imageLoaded;
candyImage.onload = imageLoaded;
lifeDragonImage.onload = imageLoaded;

// Обработчик кнопки "Играть снова"
document.getElementById('restart-button').addEventListener('click', () => {
    gameOver = false;
    score = 0;
    candyScore = 0; // Сбрасываем счетчик конфет
    lives = 3;
    level = 1;
    maxMitas = 1;
    mitaSpeedMultiplier = 1;
    dragon.x = 50;
    dragon.y = canvasHeight / 2;
    mitas.length = 0; // Очищаем массив Мит
    candies.length = 0; // Очищаем массив конфет
    mitaCounter = 0;
    document.getElementById('game-over').style.display = 'none';
    drawGame();
});

// Адаптация размеров канваса при изменении размера окна
function resizeCanvas() {
    canvasWidth = gameContainer.offsetWidth;
    canvasHeight = gameContainer.offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Обновляем начальную позицию дракона
    dragon.y = canvasHeight / 2;
}

window.addEventListener('resize', resizeCanvas);

// Инициализация размеров канваса
resizeCanvas();
loadProfileFromLocalStorage();
