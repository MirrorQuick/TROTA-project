
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input[type="text"]');
    const replicsElement = document.querySelector('p'); // Находим первый <p> на странице

    // Если <p> не найден, выходим из функции, чтобы не было ошибок
    if (!replicsElement) {
        console.warn("Не найден элемент <p> для отображения реплик.");
        return;
    }

    const theoReplics = [
        "Иногда мне кажется, что он ещё где-то рядом...",
        "Время лечит, но шрамы остаются.",
        "Он любил звёзды...",
        "Я помню его улыбку...",
        "Не стоит зацикливаться на прошлом.",
        "Жизнь продолжается, несмотря ни на что.",
        "Он всегда верил в меня...",
        "Я стараюсь жить так, чтобы он гордился мной."
    ];

    const gravityFallsReplics = [
        "Что-то здесь не так...",
        "Хотите разгадать тайну?",
        "Реальность - иллюзия, вселенная - голограмма, скупай золото! ПОКА!",
        "Не доверяйте никому!",
        "В Хижине Чудес всегда что-то происходит.",
        "Помните, гравитация не всегда на вашей стороне.",
        "Что-то подсказывает, что мы в Гравити Фолз.",
        "Этот мир полон загадок, как и дневник Диппера."
    ];

    const hazbinHotelReplics = [
        `<span style="color: red;">Добро пожаловать в Ад, детка!</span>`,
        `<span style="color: red;">Хочешь искупления? Обратись к Чарли!</span>`,
        `<span style="color: red;">Я просто люблю хаос!</span>`,
        `<span style="color: red;">У нас тут свой Hazbin Hotel... только кукольный.</span>`,
        `<span style="color: red;">В аду всегда весело!</span>`,
        `<span style="color: red;">Здесь правят демоны... и куклы.</span>`,
        `<span style="color: red;">Ангелы и демоны... вечный конфликт.</span>`,
        `<span style="color: red;">В аду каждый найдёт себе место.</span>`
    ];

    const doctorWhoReplics = [
        "Времени всегда мало, как говорил Доктор.",
        "Тардис прибыла! Или это просто кукольный домик?",
        "Донна Ноубл! Я спасла вселенную!",
        "В каждом из нас живёт Доктор.",
        "Не моргайте!",
        "Экстерминировать!",
        "Далек рядом...",
        "Время - это просто линия... иногда запутанная."
    ];

    const undertaleReplics = [
        "Оставайтесь решительными.",
        "В этом мире или ты убиваешь, или тебя убивают.",
        "Ты наполнен решимостью.",
        "Хотите немного спагетти от Папируса?",
        "Я - Санс. Санс скелет.",
        "В Подземелье всегда есть место для друзей.",
        "Берегись Чары...",
        "Этот мир полон тайн, как и Подземелье."
    ];

    const projectRelatedReplics = [
        "Арбузный чай? Звучит интересно...",
        "Куклы - это не просто игрушки, это искусство.",
        "Компьютеры и куклы? Технологии и творчество!",
        "Мита из Технического городка всегда что-то изобретает.",
        "Этот код выглядит... сложновато.",
        "Нужно отладить эту программу.",
        "Давай создадим свой кукольный мир!",
    ];

    const limReplics = [
        "Зелёный чай с жасмином, пожалуйста.",
        "День для куклотерапии и чая!",
        "Нужно заварить чай...",
        "Сложные клиенты... Нужен чай.",
        "Чашка чая решит проблемы.",
        "Чай - медитация в чашке.",
        "Чай и куклы - лучшее лекарство.",
        "Чай - это магия."
    ];

    const ninaReplics = [
        "Где мой молоток? Надо подправить.",
        "Починю всё: от сердец до кукол.",
        "Нужны новые инструменты.",
        "Куклы не слушаются... Смазать?",
        "Инструменты - мои друзья.",
        "Мир лучше с куклами!",
        "Куклы и инструменты - счастье!"
    ];

  const mitaReplics = {
      "мита": [
          "Да чё сразу Мита?!",
          "Я не Мита, я - Митаэлла!",
          "Опять я виновата?!",
          "Не хочу!",
          "Это всё он!",
          "Меня не понимают!",
          "Я права!"
      ],
      "миха": ["Йо, это я!", "Бубубу!"],
      "митаэлла": ["Йо, это я!", "Бубубу!"],
      "митаэла": ["С двумя л, умник", "ну"],
      "михаэла": ["Я терь медведь", "Хахахах"],
      "митэланджело": ["", "Хахахах"],
      "мисайд": ["Я НЕ МИСАЙД!", "Отвали!"],
      "митёк": ["Митёк? Это я!", "Только свои так зовут..."],
      "гена": ["Сам ты крокодил!", "Я Геннадий!"]
  };

    const adaReplics = [
        "По уставу!",
        "Помогаем подросткам.",
        "Митаэлла - интересный случай.",
        "Мальвина всегда права.",
        "Я знаю лучше.",
        "Следуем правилам.",
        "Mercy School заботится.",
        "Всё по расписанию."
    ];

    const malvinaReplics = [
        "Дисциплина - успех!",
        "Не спорь, я знаю.",
        "Не трать время.",
        "В Mercy School строим будущее.",
        "Дети под контролем.",
        "Не потерплю!",
        "Раскрой потенциал.",
        "Идеальный порядок - жизнь!"
    ];

    const polinaReplics = [
        "Поддержу тебя, Мита!",
        "Всё будет хорошо!",
        "Вместе мы сила!",
        "Что случилось?",
        "Я на твоей стороне.",
        "Справимся вместе.",
        "Не унывай!",
        "Я рядом."
    ];

    const dragonReplics = [
        "Р-р-р! Я дракон!",
        "Не обожгись!",
        "Люблю летать!",
        "Драконы любят чай.",
        "Следую правилам.",
        "Я - огонь!",
        "Берегись!",
        "Не сдаюсь!"
    ];

    const reptileReplics = [
        "Ящерка греюсь.",
        "Не трогай хвост!",
        "Хладнокровный друг.",
        "Я люблю мух!",
        "Повелитель камней.",
        "Ш-ш-ш!",
        "Меняю цвет!",
        "Маленький, но смелый."
    ];

    const crocodileReplics = [
        "Тик-так... Я иду.",
        "Люблю плавать и охотиться.",
        "Близко к воде!",
        "Король болот.",
        "Пасть на замке.",
        "Зубы - моё оружие!",
        "Долго жду.",
        "Берегись челюстей!"
    ];

    const trinketReplics = [
        "Блестяшки! Моя прелесть!",
        "Люблю красивые вещи!",
        "Цветной камушек!",
        "Безделушки ярче.",
        "Сверкает!",
        "Это сокровище!",
        "Не трогай!",
        "Они - часть меня."
    ];

    const energyDrinkReplics = [
        "Энергетик! Бодрость!",
        "Больше энергии!",
        "Взбодрись!",
        "Энергетик - друг.",
        "Держитесь!",
        "Вжух!",
        "Заряд!",
        "Энергия!"
    ];

    const coffeeReplics = [
        "Кофе - жизнь.",
        "Нужен кофе.",
        "Топливо гениев.",
        "Без кофе - не я.",
        "Аромат кофе!",
        "Кофе - ритуал.",
        "Кофе - вдохновение.",
        "Ещё чашку!"
    ];

    const lokiReplics = [
        "Мяу! Я - Локи!",
        "Мур-р-р... Люблю спать.",
        "Не трогай хвост!",
        "Локи получит.",
        "Я - королева!",
        "Мяу!",
        "Не мешай спать!",
        "Ты заряжен!"
    ];

    const teamSpecterReplics = [
        "Команда Спектр на страже!",
        "Мы непобедимы!",
        "Максим - наша сила!",
        "Веня гениален!",
        "Тома - красавица!",
        "Защищаем мир!",
        "Вместе мы сила!",
        "Не сдаёмся!"
    ];

    const animeReplics = [
        "Аниме? Что это?",
        "Это мультики!",
        "Я не смотрю!",
        "Аниме - искусство.",
        "Японская анимация.",
        "Не знаю.",
        "Предпочитаю другое.",
        "Интересно?"
    ];

    const trotaReplics = [
        "TROTA - это магия!",
        "The Rules of the Abyss",
        "TROTA: The rules of the abyss",
        "TROTA - моя книга...",
        "TROTA - это куклы",
        "TROTA - мои правила."
    ];

    const campReplics = [
        "Шатёр для друзей",
        "Шатёр - мой дом."
    ];

    const drakonHillReplics = [
        "Драконья гора - весело!",
        "Моя любовь.",
        "Покорю гору."
    ];

    const mitaBdayReplics = [
        "С ДНЁМ РОЖДЕНИЯ! Обманул?",
        "13 февраля!"
    ];

    const ninaQuestionReplics = {
        "злая": [
            "Мир жесток.",
            "Люди разочаровывают.",
            "Нет времени.",
            "Кто-то должен быть сильным.",
            "Мне так легче.",
            "Не твоё дело.",
            "Хватит вопросов!",
            "Ты достал?",
            "Потеряла важного...",
            "Не умею иначе."
        ],
        "плохая": [
            "Плохие рулят!",
            "Что вижу, то пою!",
            "Не про меня.",
            "Просто играю.",
            "Это жизнь.",
            "Иногда нужно.",
            "Завидуешь?",
            "Так интереснее?",
            "А что ты хотел?",
            "Мне весело."
        ],
        "грубая": [
            "Сказано - сделано",
            "Не сюсюкаюсь.",
            "Говорю, что думаю.",
        ]
    };

    function getRandomReplica(replics) {
        return replics[Math.floor(Math.random() * replics.length)];
    }

    function updateReplics() {
        const searchTerm = searchInput.value.toLowerCase();
        let easterEggText = null;

         if (searchTerm.startsWith("нина, почему ты")) {
              const questionType = searchTerm.split("нина, почему ты")[1].trim();
              let replics = [];

              if (Object.keys(ninaQuestionReplics).some(key => questionType.includes(key))) {
                  const key = Object.keys(ninaQuestionReplics).find(key => questionType.includes(key));
                  replics = ninaQuestionReplics[key];
              }
              if (replics.length > 0) {
                  easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(replics)}</span>`;
              }
          }  else if (Object.keys(mitaReplics).some(key => searchTerm === key)) {
              const key = Object.keys(mitaReplics).find(key => searchTerm === key);
              easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(mitaReplics[key])}</span>`;
          } else if (searchTerm.includes("лим")) {
              easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(limReplics)}</span>`;
          } else if (searchTerm.includes("нина")) {
             easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(ninaReplics)}</span>`;
         } else if (searchTerm.includes("ада") || searchTerm.includes("аделаида")) {
             easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(adaReplics)}</span>`;
         } else if (searchTerm.includes("мальви") || searchTerm.includes("malvina")) {
             easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(malvinaReplics)}</span>`;
         }  else if (searchTerm.includes("поля") || searchTerm.includes("полина")) {
             easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(polinaReplics)}</span>`;
         } else if (searchTerm.includes("дракон")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(dragonReplics)}</span>`;
         } else if (searchTerm.includes("рептил")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(reptileReplics)}</span>`;
         } else if (searchTerm.includes("крокодил")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(crocodileReplics)}</span>`;
         } else if (searchTerm.includes("безделушк")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(trinketReplics)}</span>`;
         } else if (searchTerm.includes("энергет")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(energyDrinkReplics)}</span>`;
         } else if (searchTerm.includes("кофе")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(coffeeReplics)}</span>`;
         } else if (searchTerm.includes("локи")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(lokiReplics)}</span>`;
         } else if (searchTerm.includes("спектр")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(teamSpecterReplics)}</span>`;
         } else if (searchTerm.includes("аним")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(animeReplics)}</span>`;
         } else if (searchTerm.includes("trota")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(trotaReplics)}</span>`;
         } else if (searchTerm.includes("лагерь")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(campReplics)}</span>`;
         } else if (searchTerm.includes("драконья гора")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(drakonHillReplics)}</span>`;
         } else if (searchTerm.includes("день рождения")) {
            easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(mitaBdayReplics)}</span>`;
         } else if (searchTerm.includes("тео")) { // Добавляем Тео
           easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(theoReplics)}</span>`;
         } else if (searchTerm.includes("gravity falls")||searchTerm.includes("гравити фолз")||searchTerm.includes("билл шифр")||searchTerm.includes("мейбл")||searchTerm.includes("диппер")) { // Добавляем Gravity Falls
           easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(gravityFallsReplics)}</span>`;
         } else if (searchTerm.includes("hazbin hotel")||searchTerm.includes("отель хазбин")) { // Добавляем Hazbin Hotel
           easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(hazbinHotelReplics)}</span>`;
         } else if (searchTerm.includes("доктор кто")||searchTerm.includes("doctor who")) { // Добавляем Доктора Кто
           easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(doctorWhoReplics)}</span>`;
         } else if (searchTerm.includes("undertale")||searchTerm.includes("андертейл")) { // Добавляем Undertale
           easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(undertaleReplics)}</span>`;
         }  else if (searchTerm.includes("арбузный чай") || searchTerm.includes("кукла") || searchTerm.includes("компьютер") || searchTerm.includes("мита")) { // Добавляем Project Related
           easterEggText = `<span style="color: #8bc34a; font-style: italic;">${getRandomReplica(projectRelatedReplics)}</span>`;
         }

        replicsElement.innerHTML = easterEggText; // Отображаем реплику в элементе или очищаем его
    }

    searchInput.addEventListener('keydown', function(event) {  // Обновление при нажатии Enter
        if (event.key === 'Enter') {
            updateReplics();
            event.preventDefault(); // Предотвращение отправки формы (если есть)
        }
    });

    searchInput.addEventListener('input', function() {  // Обновляем реплики при каждом вводе
        updateReplics();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
});

const questionButtons = document.querySelectorAll('.question-button');

questionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.parentNode.nextElementSibling;
        if (answer.style.display === 'none') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

