
const textArea = document.getElementById('text-area');
const choicesArea = document.getElementById('choices-area');
const mediaArea = document.getElementById('media-area'); // Объединяем imageArea и videoArea в mediaArea
const audioArea1 = document.getElementById('audio-area1');
const audioArea2 = document.getElementById('audio-area2');
let state = {};
let audio2Played = {};
let currentAudio1Source = null;
let currentMediaType = null; // Хранит тип текущего отображаемого медиа (image или video)
let currentMediaSource = null; // Хранит источник текущего медиа

function startGame() {
    state = {};
    audio2Played = {};
    currentAudio1Source = null;
    currentMediaType = null;
    currentMediaSource = null;
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textArea.innerText = textNode.text;

    // Отображение медиа (изображение или видео)
    if (textNode.image) {
        if (currentMediaType !== 'image' || currentMediaSource !== textNode.image) {
            mediaArea.innerHTML = `<img src="${textNode.image}" alt="${textNode.alt}">`;
            currentMediaType = 'image';
            currentMediaSource = textNode.image;
        }
    } else if (textNode.video) {
        if (currentMediaType !== 'video' || currentMediaSource !== textNode.video) {
             mediaArea.innerHTML = `<video width="720" height="480" autoplay loop muted playsinline>
                            <source src="${textNode.video}" type="video/mp4">
                            Your browser does not support the video tag.
                         </video>`;
            currentMediaType = 'video';
            currentMediaSource = textNode.video;

            const videoElement = mediaArea.querySelector('video');
            if(videoElement){
              videoElement.addEventListener('error', (e) => {
                console.error("Error playing video:", e);
              });
            }
        }

    }
     else {
        mediaArea.innerHTML = '';
        currentMediaType = null;
        currentMediaSource = null;
    }


    // Воспроизведение аудио 1 (фоновая музыка - повторяется)
    if (textNode.audio1) {
        if (currentAudio1Source !== textNode.audio1) {
            handleAudio(textNode.audio1, audioArea1, true);
            currentAudio1Source = textNode.audio1;
        } else {
            let audio1Element = audioArea1.querySelector('audio');
            if (audio1Element && audio1Element.paused) {
                audio1Element.play();
            }
        }
    } else {
        if (currentAudio1Source) {
            audioArea1.innerHTML = '';
            currentAudio1Source = null;
        }
    }

    // Воспроизведение аудио 2 (фраза - не повторяется)
    if (textNode.audio2 && !audio2Played[textNodeIndex]) {
        handleAudio(textNode.audio2, audioArea2, false);
        audio2Played[textNodeIndex] = true;
    }

    while (choicesArea.firstChild) {
        choicesArea.removeChild(choicesArea.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option));
            choicesArea.appendChild(button);
        }
    });
}

function handleAudio(audioSource, audioArea, loop) {
    if (audioSource) {
        audioArea.innerHTML = `<audio autoplay ${loop ? 'loop' : ''}>
                                    <source src="${audioSource}" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>`;

        const audio = audioArea.querySelector('audio');
        if(audio){
            audio.addEventListener('play', () => {
            }, { once: true });

            audio.addEventListener('pause', () => {
            });

            audio.addEventListener('ended', () => {
            });

            audio.addEventListener('error', (e) => {
                console.error("Error playing audio:", e);
            });
        }

    } else {
        audioArea.innerHTML = '';
    }
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: "Я родилась на свет... Мне дали милое имя: Митаэлла. Вот и начинается моя жизнь в среднестатической семье добытчика руды и учительницы начальных классов, в крохотном техническом городке... Драгогорье.",
        options: [
            {
                text: "Начать воспоминания",
                nextText: 3
            }
        ],
        image: 'images/2.png',
        audio1: "audio/mitata.mp3"
    },
    {
        id: 3,
        text: "Беззаботное детство! Чудесный солнечный денек! Мой отец клеит обои в комнате и скоро отправится на свою тяжелую работу. Чем бы заняться?",
        options: [
            {
                text: "Вспомнить любимый мультик",
                nextText: 3.5
            },
            {
                text: "Порисовать!",
                nextText: 3.6
            },
            {
                text: "Создать митарабль!",
                nextText: 3.7
            }
        ],
        image: 'images/mitata_day.png',
        alt: "Мита с синими волосами",
        audio1: "audio/mitata.mp3"
    },
    {
        id: 3.5,
        text: "Спектр!! Дружба это круто!! Мой любимый мультсериал про галактических путешественников и исследователей, что спасают разные планеты!! Что бы поделать сейчас?",
        options: [
            {
                text: "Порисовать себя в космосе!",
                nextText: 3.6
            },
            {
                text: "Создать галактический митарабль!",
                nextText: 3.7
            },
            {
                text: "Отдохнуть!",
                nextText: 3.8
            }
        ],
        image: 'images/spectrum.jpg',
        alt: "Мита с синими волосами",
        audio1: "audio/spectrum.mp3"
    },
    {
        id: 3.6,
        text: "Вау! У меня теперь столько чудесных рисунков!!! Всю комнату ими обвешаю!",
        options: [
            {
                text: "Вспомнить любимый мультик",
                nextText: 3.5
            },
            {
                text: "Создать митарабль!",
                nextText: 3.7
            },
            {
                text: "Отдохнуть!",
                nextText: 3.8
            }
        ],
        audio1: "audio/mitata.mp3",
        image: 'images/paint.png',
        alt: "Мита с синими волосами",
    },
    {
        id: 3.7,
        text: "Митараблик готов!!! Отправляемся в полет! ВРррр! Космический стол вас приветствует! Вернее, пх, Мираблестол!",
        options: [
            {
                text: "Вспомнить любимый мультик",
                nextText: 3.5
            },
            {
                text: "Продолжить рисовать!",
                nextText: 3.6
            },
            {
                text: "Отдохнуть!",
                nextText: 3.8
            }
        ],
        audio1: "audio/mitata.mp3",
        image: 'images/mitarabl.png',
    },
    {
        id: 3.8,
        text: "Мммм... вот быыы... оказаться в волшебном мире, где можно гулять ночью и летать на драконах... Я бы любила своего дракона!.. А он бы меня катал!",
        options: [
            {
                text: "Вечер",
                nextText: 4
            },
        ],
        audio1: "audio/mitata.mp3",
        video: 'video/dragon_world.mp4'
    },
    {
        id: 4,
        text: "Папа пришел. А уже вечер?",
        options: [
            {
                text: "Лечь спать",
                nextText: 4.1
            },
            {
                text: "Пойти за ним",
                nextText: 4.11
            }
        ],
        audio1: "audio/mitata.mp3",
        audio2: "audio/1.sleep.mp3",
        image: 'images/mitata_hight.png'
    },
    {
        id: 4.1,
        text: "Мм... и как тут уснешь?",
        options: [
            {
                text: "Попробовать уснуть",
                nextText: 4.12
            },
            {
                text: "Пойти и выяснить в чем дело",
                nextText: 4.11
            },
            {
                text: "Играть по тихому...",
                nextText: 4.111
            }
        ],
        audio1: "audio/doctor.mp3",
        image: 'images/how.png'
    },
    {
        id: 4.12,
        text: "мм... у меня не получается ><",
        options: [
            {"text": "Буду слушаться папу", "nextText": 37},
            {
                text: "Пойти и выяснить в чем дело",
                nextText: 4.11
            },
            {
                text: "Играть по тихому...",
                nextText: 4.111
            }
        ],
        audio1: "audio/doctor.mp3",
        image: 'images/how.png'
    },
    {
        id: 4.111,
        text: "Пока никто не видит...",
        options: [
            {
                text: "Продолжить",
                nextText: 4.1111
            }
        ],
        audio1: "audio/doctor.mp3",
        image: 'images/secret.png'
    },
    {
        id: 4.1111,
        text: "ДА ЧТО ТЕБЕ НАДО ТО!! ЗАЧЕМ ХВАТАТЬ! СМОТРЕЛ БЫ И СМОТРЕЛ Доктора... один... *вы заплакали*!!",
        options: [
            {
                text: "Продолжить",
                nextText: 4.312
            }
        ],
        audio1: "audio/doctor.mp3",
        audio2: "audio/not_sleep.mp3",
        image: 'images/secret.png'
    },
    {
        id: 4.11,
        text: "Вот я и здесь...ВААА! ОН СМОТРИТ ДОКТОРА КТО!!!",
        options: [
            {
                text: "ХОЧУ С ТОБОЙ!!!",
                nextText: 4.333
            },
            {
                text: "Попросить его выключить, чтобы было честно и мы все спали!",
                nextText: 4.2
            }
        ],
        audio1: "audio/doctor.mp3",
        image: 'images/wow.png'
    },
    {
        id: 4.333,
        text: "А воть и я! Можна с тобой??",
        options: [
            {
                text: "Продолжить :>",
                nextText: 4.3
            }
        ],
        audio1: "audio/doctor.mp3",
        video: 'video/can_i.mp4'
    },
    {
        id: 4.3,
        text: "Я только спросила можно ли с ним!! А он как схватил!!! Больно!",
        options: [
            {"text": "Буду слушаться папу", "nextText": 37},
            {
                text: "Слабовато! (Показать язык)",
                nextText: 4.312
            },
            {
                text: "твердо уйти спать",
                nextText: 4.31
            }
            ,
            {
                text: "Сказать, что не могу уснуть",
                nextText: 4.2
            }
        ],
        audio1: "audio/doctor.mp3",
        audio2: "audio/2.agry.mp3",
        image: 'images/br.png'
    },
    {
        id: 4.2,
        text: "Я только попросила проявить ко мне уважение! И дать поспать!!! А он как схватил!!! Больно!",
        options: [
            {"text": "Буду слушаться папу", "nextText": 37},
            {
                text: "Ты нечестный!!!",
                nextText: 4.312
            },
            {
                text: "твердо уйти спать",
                nextText: 4.31
            }
        ],
        audio1: "audio/doctor.mp3",
        audio2: "audio/2.agry.mp3",
        image: 'images/br.png'
    },
    {
        id: 4.312,
        text: "Он меня ударил... Да за что! Боже *я расплакалась*",
        options: [
            {
                text: "попытаться уснуть...",
                nextText: 4.31
            }
        ],
        audio1: "audio/doctor.mp3",
        audio2: "audio/2.agry2.mp3"
    },
    {
        id: 4.31,
        text: "Я не смогла уснуть, поэтому проплакала пока не отрубилась...",
        options: [
            {
                text: "Следующий год...",
                nextText: 4.338
            }
        ],
        audio1: "audio/doctor.mp3",
    },
    {
        id: 4.338,
        text: "Мне шесть лет! Шесть!!! Скоро я пойду в школу!!!",
        options: [
            {
                text: "Дальше",
                nextText: 4.4
            }
        ],
        audio1: "audio/8b2.mp3",
        image: 'images/3.png'
    },
    {
        id: 4.4,
        text: "Чеем же тут занимается папа? ОН ИГРАЕТ В ТАНКИ!! Я тоже хочу с ним! Он давно обещал меня научить!! Пошли спросим его!!",
        options: [
            {
                text: "ПАааааа!!! Научишь так же??",
                nextText: 4.41
            },
            {
                text: "Вау! Можна я посмотрю!!",
                nextText: 4.41
            }
        ],
        audio1: "audio/8b2.mp3",
        image: 'images/dad_play.png'
    },
    {
        id: 4.41,
        text: "Мм... блин...",
        options: [
            {
                text: "Прокрасться и посмотреть...",
                nextText: 4.412
            }
        ],
        audio1: "audio/8b2.mp3",
        audio2: "audio/last.mp3",
        image: 'images/tank.png'
    },
    {
        id: 4.412,
        text: "Хмх... Как же мне...",
        options: [
            {
                text: "Просто не мешаться и смотреть",
                nextText: 4.4123
            },
            {
                text: "Сказать, что папа молодец!! :>",
                nextText: 4.4124
            }
        ],
        audio1: "audio/8b2.mp3",
        image: 'images/watch.png'
    },
    {
        id: 4.4123,
        text: "Я смотрю как он играет... это так интересно... но грустно, что... мы никогда не играем вместе... я все еще помню как он впервые забрал меня из садика вчера... хаха, я была в одних лишь шлепках! Это было весело... м... *от чего-то я стала очень грустной*",
    
        options: [
            {
                text: "Следующий год...",
                nextText: 5
            }
        ],
        audio1: "audio/8b2.mp3",
        image: 'images/watch.png'
    },
    {
        id: 4.4124,
        text: "Вааа! Паапа! Ты такой молодец! Ты их всех прихлопнул!! *радостно подпрыгиваю*",
        options: [
            {
                text: "Дальше",
                nextText: 4.5
            }
        ],
        audio1: "audio/8b2.mp3",
        image: 'images/super.png'
    },
    {
        id: 4.5,
        text: "А?.. Что не так?...",
        options: [
            {
                text: "Дальше",
                nextText: 4.6
            }
        ],
        audio1: "audio/8b2.mp3",
        audio2: "audio/4.i_say.mp3",
        image: 'images/no.png'
    },
    {
        id: 4.6,
        text: "?!?!?!!!",
        options: [
            {
                text: "ЧТО!?! НЕТ!",
                nextText: 4.7
            }
        ],
        audio1: "audio/8b2.mp3",
        audio2: "audio/4.i_say_01.mp3",
        image: 'images/nono.png'
    },
    {
        id: 4.7,
        text: "дрлять... *я заплакала*",
        options: [
            {
                text: "Следующий год...",
                nextText: 5
            },
            {"text": "Быть плохой девочкой", "nextText": 38}
        ],
        image: 'images/ff.png'
    },
    {
        id: 5,
        text: "Пригласила папу посмотреть на мою супер чудесную расчудесную игру!",
        options: [
            {
                text: "Дальше!",
                nextText: 5.1
            }
        ],
        image: 'images/1.png',
        audio1: "audio/8b4.mp3",
    },
    {
        id: 5.1,
        text: "Вот! Любуйся! Это дракончик и ему надо поймать меня! Или мне его! Пхехехехех. Щаас...",
        options: [
            {
                text: "Дальше!",
                nextText: 5.12
            }
        ],
        image: 'images/4.png',
        audio1: "audio/8b4.mp3",
    },
    {
        id: 5.12,
        text: "ДРля!! В смысли!!",
        options: [
            {
                text: "Дальше!",
                nextText: 5.2
            }
        ],
        image: 'images/5.png',
        audio2: "audio/8b42.mp3",
    },
    {
        id: 5.2,
        text: "Чего блин?..",
        options: [
            {
                text: "ЧЕГО?! Я ТОЛЬКО ВЗЯЛА! НИЧЕГО ПОКАЗАТЬ НЕЛЬЗЯ! ДОСТАЛ!!!",
                nextText: 6
            },
            {
                text: "Извиниться?",
                nextText: 5.3
            }
        ],
        image: 'images/6.png',
        audio2: "audio/5.virus_hand.mp3"
    },
    {
        id: 5.3,
        text: "ВИРУСНЫЕ?!",
        options: [
            {
                text: "ЧЕГО?! Я ТОЛЬКО ВЗЯЛА! НИЧЕГО ПОКАЗАТЬ НЕЛЬЗЯ! ДОСТАЛ!!!",
                nextText: 6
            },
            {
                text: "ДА ЧТОБ ТЕБЯ ДРАКОН СОЖРАЛ!!!!!!!! >:0",
                nextText: 6
            }
        ],
        image: 'images/6.png',
        audio2: "audio/5.virus_hand2.mp3"
    },

        {
            id: 6,
            text: "Времени больше нет. Часы тикают, смена лет мелькает в глазах. 17:00... 17:00... Снова и снова. Одно и то же. Опять... и опять...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.1
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.1,
            text: "Вроде типа у всех такое... Типа бывают иногда ссоры. Но, знаете, сегодня я решила, что прощаю его слишком часто... А он всё мне припоминает. Это плохо? Я решила, что и я не забуду ни одной...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.2
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.2,
            text: "Мда... только я виновата... всегда только я!",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.3
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.3,
            text: "Плащ любимый не купили... ЕЩЕ И НА ВЕСЬ МАГАЗИН СКАЗАЛ ЧТО Я БОМЖИХА БЕЗ ВКУСА!",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.4
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.4,
            text: "И после всего этого?.. думает я поеду с ним на дачу? А костюм дракончика, что он видел И НЕ ВЗЯЛ!! ПОТОМУ ЧТО ОН ДЛЯ МАЛЬЧИКОВ!! ТЕПЕРЬ Я КАК ПРИНЦЕССА БЫЛА! Никогда! Никогда он ничего не исполняет! А еще такой типа говорит, что всегда держит слово! Щас...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.5
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.5,
            text: "Самое забавное, что он стал ставить пароль от меня... и там всегда одни комбинации: Павел, Павел 777, 1700... - его любимые числа, это очевидно",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.6
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.6,
            text: "Да, безусловно... было и хорошее. Много хорошего. Мы в парк аттракционов ездили.. ток он со мной никогда не катался... эм... мама вкусно готовит? Что еще сказать... как бы... у меня тоже есть позитивные события, но... блин...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.7
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.7,
            text: "Это ведь... это ведь не нормально, что я плачу каждый день, да?.. Или это я...забагованная просто?.. Может и правда мама права и надо просто типа соглашаться с ним... Но я... я хочу... быть собой? Неужели... нельзя?",
            options: [
                {
                    text: "Продолжить",
                    nextText: 6.8
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 6.8,
            text: "Знаете, я иногда мечтаю о... хах, стыдно сказать. О том, чтобы у меня была хоть и бедная семья, может вообще без денег, может и компа б у меня не было вообще и я кодить бы не умела... Но чтобы она. Понимаете... Просто любила меня за просто так. Чтобы... Если я сделаю что-то не так... Они просто купили мне мороженное и все спокойно объяснили... Чтобы... я просто...чувствовала... что я им нужна...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 7
                }
            ],
            video: "video/seria-1.mp4",
            audio1: "audio/seria-1.MP3", 
        },
        {
            id: 7,
            text: "У меня нет семьи.",
            options: [
                {
                    text: "Продолжить",
                    nextText: 7.1
                }
            ],
            video: "video/seria-2.mp4",
            audio1: "audio/seria-2.MP3", 
        },
        {
            id: 7.1,
            text: "Хм... Это я, Мита, которой 13. Ну, обычная. Я тут прочитала про один театр в интернете. Вот думаааю... Песенки у них прикольные. Мож взять билет?",
            options: [
                {
                    text: "Го",
                    nextText: 50
                },
                {
                    text: "Да фигня какая-то",
                    nextText: 8
                }
            ],
        },
        {
            id: 8,
            text: "Просыпаюсь. Солнце едва пробивается сквозь шторы. Ещё один день... в этом кошмаре. Нужно собраться в школу, хотя какая разница? ...Полина... моя лучшая подруга... только завтра с больничного придет",
            options: [
                {
                    text: "Собраться в школу",
                    nextText: 9
                }
            ],
            video: "video/seria-3.mp4",
            audio1: "audio/seria-3.MP3", 
        },
        {
            id: 9,
            text: "Весь день в школе был как в тумане. Учителя что-то говорили, одноклассники смеялись, но я ничего не слышала. В голове лишь эхом отдавались его слова. Скорее бы домой... в свою комнату. Там хотя бы можно спрятаться.",
            options: [
                {
                    text: "Вернуться домой",
                    nextText: 10
                }
            ],
            video: "video/seria-4.mp4",
            audio1: "audio/seria-4.MP3", 
        },
        {
            id: 10,
            text: "Открываю дверь и замираю в ужасе. Моя комната... она словно пережила войну. Обои сорваны, вещи разбросаны, любимые плакаты разорваны в клочья. Что... что здесь произошло?",
            options: [
                {
                    text: "В ужасе осмотреть комнату",
                    nextText: 11
                }
            ],
            video: "video/seria-5.mp4",
            audio1: "audio/seria-5.MP3", 
        },
        {
            id: 11,
            text: "Он стоит посреди этого хаоса, с безумным блеском в глазах. 'Я ИСПРАВИЛ ЕЁ!' - выплёвывает он эти слова, словно проклятие. Как он мог? Как он мог так поступить с моим миром, с моим убежищем?!",
            options: [
                {
                    text: "Закатить скандал",
                    nextText: 12
                },
            ],
            video: "video/seria-6.mp4",
            audio1: "audio/seria-6.MP3", 
        },
        {
            id: 12,
            text: "ТЫ СОВСЕМ ОДРАКОНЕЛ! ТЫ ПРОСТО ГАД!",
            options: [
                {
                    text: "Продолжить",
                    nextText: 13
                }
            ],
            video: "video/seria-7.mp4",
            audio1: "audio/seria-7.MP3",
        },
         {
            id: 13,
            text: "Его глаза наливаются кровью. Шаг вперёд, еще один. Его рука поднимается... В голове лишь одна мысль: бежать. Я отступаю, ЗАБЕГАЮ В!!! ванную. ОН ОРЕТ!!! Выхода НЕТ!!! Вода льётся из крана, наполняя пространство тревогой. Его крики становятся всё громче, а мое сердце колотится, все хаха есть... дом, и квартира и ... а я...как птица в клетке.",
            options: [
                {
                    text: "Сделать это.",
                    nextText: 15
                },
                {
                    text: "Не делать этого",
                    nextText: 14
                },
            ],
            video: "video/seria-7.mp4",
            audio1: "audio/seria-7.MP3", 
        },
        {
            id: 14,
            text: "Я не стала этого делать... но разве это что-то изменило бы? Боль внутри настолько сильна... Я плачу... я в истерике... Что Драклятье... делать с...этой? Болью?...Болью... Но...но так чешутся руки... УДАРИТЬ ЕГО! ИЛИ ХОТЯ БЫ СЕБЯ!!!!",
            options: [
                {
                    text: "Я... не хочу... себе вредить...",
                    nextText: 14.1
                }
            ],
            video: "video/seria-7.mp4",
            audio1: "audio/seria-7.MP3", 
        },
        {
            id: 14.1,
            text: "Боль... Это единственное, что я могу контролировать. Так тяжело внутри... я так не хочу выходить отсюда...Может быть, если бы я смогла хоть немного облегчить эту боль... может быть...",
            options: [
                {
                    text: "Обнимаю колени и плачу",
                    nextText: 14.2
                }
            ],
            video: "video/seria-7.mp4",
            audio1: "audio/seria-7.MP3", 
        },
        {
            id: 14.2,
            text: "Я не знаю как... Я в ванной, тут темно... тут нет ничего... ТОЛЬКО ЭТОТ СКЛЯНЧАТЫЙ КРИИИК!!",
            options: [
                {
                    text: "Захлебываться в слезах дальше...",
                    nextText: 14.3
                }
            ],
            video: "video/seria-7.mp4",
            audio1: "audio/seria-7.MP3", 
        },
        {
            id: 14.3,
            text: "ЭТОГО ПРИДУРКА!!!!!!! ААААААААААААААА!!! НЕНАВИЖУ НЕНАВИЖУ НЕНАВИЖУ!! ТЕ-БЯ!!!",
            options: [
                {
                    text: "...",
                    nextText: 14.4
                }
            ],
            video: "video/seria-7.mp4",
            audio1: "audio/seria-7.MP3", 
        },
        {
            id: 14.4,
            text: "ДА! Я СЛАБАЯ И Я НЕ МОГУ ЭТО ТЕРПЕТЬ! Я СТОЛЬКО ПЕРЕБРОВАЛА! СТОЛЬКО ПЫТАЛАСЬ СДЕЛАТЬ!!! НО!! ВСЕ!!! НИ К ЧЕРТУ! Я ПРОСТО НЕ ХОЧУ ЗДЕСЬ НАХОДИТЬСЯ!!!!",
            options: [
                {
                    text: "НЕ ХОЧУУУУУ!!!!!!",
                    nextText: 14.5
                }
            ],
            video: "video/seria-7.mp4",
            audio1: "audio/seria-7.MP3", 
        },
        {
            id: 14.5,
            text: " ...и я не могу... я уйду... и это... будет напоминанием",
            options: [
                {
                    text: "Что будет напоминанием?",
                    nextText: 14.6
                }
            ],
        },
        {
            id: 14.6,
            text: "Это. Напоминанием... о той боли, что здесь была... чтобы утром, когда мама скажет 'Доченька, чай готов...' я всё помнила... и я не вернулась...",
            options: [
                {
                    text: "Она все равно это сделает",
                    nextText: 14.7
                },
                {
                    text: "МИТА НЕ НАДО!!!",
                    nextText: 14.7
                }
            ],
        },
        {
            id: 14.7,
            text: "Прости.",
            options: [
                {
                    text: "Дальше",
                    nextText: 15
                },
            ],
        },
        {
            id: 15,
            text: "...это было тяжело... выйти оттуда... увидеть его красное лицо... зайти в комнату... услышать как он хлопнет дверью... как скажет столько гадких слов... можно мне исчезнуть?",
            options: [
                {
                    text: "Продолжить",
                    nextText: 15.2
                }
            ],
            video: "video/pain.mp4",
            audio1: "audio/pain.MP3", 
        },
        {
            id: 15.2,
            text: "Да может и я не права... но я... я больше не хочу делать больно... ни им, ни себе...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 15.3
                }
            ],
            video: "video/pain.mp4",
            audio1: "audio/pain.MP3", 
        },
        {
            id: 15.3,
            text: "И СНОВА! ЭТИ! 17:00...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 15.1
                }
            ],
            video: "video/pain.mp4",
            audio1: "audio/pain.MP3", 
        },
        {
            id: 15.1,
            text: "...ха-ха...ха.... это не закончится, верно? Никогда? Я всегда останусь овцой, тваарью... всем самым худшим...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 16
                }
            ],
            video: "video/seria-8.mp4",
            audio1: "audio/seria-8.MP3", 
        },
        {
            id: 16,
            text: "Смотрю в окно. Там весна, а для меня... Падает снег. Драконья гора, свет ее глаз... вот бы хоть разок там оказаться. Вокруг все... Словно в замедленной съемке. Я засыпаю? Медленно танцуют дождинки... превращаясь в снежинки... Это из-за меня? и грустная мелодия играет. Если бы могла я летать... если бы могла повыше стать... наверное тогда... наверное, могла б... и с тобой играть... Но каждый день одно и то же! Сколько можно тратить слезы?.. а я только хотела поиграть... с тобой... поиграть...Я закрываю глаза, и представляю, как улетаю отсюда, далеко-далеко...на сааамом большооом и сааааааааамом сильном дракончике...",
            options: [
                {
                    text: "Продолжить",
                    nextText: 16.1
                }
            ],
            video: "video/seria-8.mp4",
            audio1: "audio/seria-8.MP3", 
        },
        {
            id: 16.1,
            text: "Он всегда зовет к себе... И я так устала от этих обломов. Последние года я уж и не хожу к нему... Так зачем я здесь?",
            options: [
                {
                    text: "Продолжить",
                    nextText: 17
                }
            ],
            video: "video/seria-8.mp4",
            audio1: "audio/seria-8.MP3", 
        },
        {
            id: 17,
            text: "Рано утром, пока все спят, я решаю сбежать. Больше не могу здесь оставаться. Собираю рюкзак с самым необходимым и тихонько выхожу из дома. Куда идти? Не знаю. Главное - подальше отсюда.",
            options: [
                {
                    text: "Пойти вперед",
                    nextText: 18
                },
                {
                    text: "Осмотреться",
                    nextText: 18.1
                },
                {
                    text: "Написать подруге может...",
                    nextText: 18.5
                }
            ],
            video: "video/seria-9.mp4",
            audio1: "audio/seria-9.MP3", 
        },
    
        {
            id: 18,
            text: "Я стою на перекрёстке, жду зелёного света. Лес слева, город справа. Вперёд - неизвестность.",
            options: [
                {
                    text: "Пойти вперед",
                    nextText: 19
                }
            ],
            video: "video/seria-10.mp4",
            audio1: "audio/seria-10.MP3", 
        },
        {
            id: 18.1,
                    text: "Осмотревшись я заметила, что я ничего не замечаю",
            options: [
                {
                    text: "Пойти вперед",
                    nextText: 19
                },
                {
                    text: "Осмотреться еще раз",
                    nextText: 18.2
                }
            ],
        },
        {
            id: 18.2,
                    text: "При повторной попытке осмотреться я заметила, что я ничего не замечаю",
            options: [
                {
                    text: "Пойти вперед",
                    nextText: 19
                },
                {
                    text: "Осмотреться еще раз",
                    nextText: 18.3
                }
            ],
        },
        {
            id: 18.3,
                    text: "При повторной попытке осмотреться я заметила, что я ничего не замечаю. СНОВА.",
            options: [
                {
                    text: "Пойти вперед",
                    nextText: 19
                },
                {
                    text: "Осмотреться еще раз",
                    nextText: 18.4
                }
            ],
        },
        {
            id: 18.4,
                    text: "Эм? А!!!",
            options: [
                {
                    text: "Пойти вперед",
                    nextText: 19
                },
                {"text": "Дождаться зеленого!", "nextText": 39}
            ],
        },
        {
            id: 18.5,
            text: "Я написала лучшей подруге что со мной приключилось... Мх... Только Полинчик меня понимает....",
            options: [
                {
                    text: "Пойти вперед",
                    nextText: 19
                }
            ],
        },
        {
            id: 19,
            text: "Вперед... Подальше отсюда...",
            options: [
                {
                    text: "Дальше",
                    nextText: 19.1
                }
            ],
            video: "video/seria-10.mp4",
            audio1: "audio/seria-10.MP3", 
        },
        {
            id: 19.1,
            text: "Внезапно раздаётся визг тормозов. Я не успеваю ничего понять.",
            options: [
                {
                    text: "ААААААААААААААААААААААААА",
                    nextText: 20
                }
            ],
            video: "video/seria-11.mp4",
            audio1: "audio/seria-11.MP3", 
        },
        {
            id: 20,
            text: "Открываю глаза. Вокруг мягкий свет и незнакомая комната. Пахнет травами и чем-то сладким. Вокруг... все украшенно бусинами. Мило?",
            options: [
                {
                    text: "Блин! Кофта порвалась!",
                    nextText: 21
                }
            ],
            video: "video/seria-12.mp4",
            audio1: "audio/seria-12.MP3", 
        },
        {
            id: 21,
            text: "Вдруг в комнату заглядывают две пары глаз. Девушка с короткими волосами и в комбинезоне, и парень с дредами-солнышками. Они оба смотрят на меня с тревогой.",
            options: [
                {
                    text: "Что происходит?",
                    nextText: 22
                }
            ],
            video: "video/seria-13.mp4",
            audio1: "audio/seria-13.MP3", 
        },
        {
            id: 22,
            text: "'Ты в порядке?!' - спрашивает девушка, наклоняясь ко мне. Парень добавляет: 'Не звоните в полицию, пожалуйста.' И тут он замечает мои руки... в ужасе останавливается 'Моя дорогая!!! Что у тебя случилось??'. Я чувствую, как слёзы снова подступают к горлу, а ком к глазам.. стоп... или как там было...",
            options: [
                {
                    text: "Рассказать им, что случилось",
                    nextText: 23
                },
                {
                    text: "Пипец! Уйти скорее!",
                    nextText: 22.1
                }
            ],
            video: "video/seria-13.mp4",
            audio1: "audio/seria-13.MP3", 
        },
        {
            id: 22.1,
            text: "'Постой!' - кричит девушка. 'Ты не собираешься... умирать, правда? Пожалуйста, просто скажи, что ты в порядке!'.",
            options: [
                {
                    text: "Вздох. На расстоянии объяснить в чем дело.",
                    nextText: 23
                },
                {"text": "Уйти", "nextText": 80}
            ],
        },
        {
            id: 23,
            text: "Выслушав мою историю, они переглядываются. Парень берёт включает радужную колонку...И... ОНИ ПОЮТ ЧТОЛИ?!",
            options: [
                {
                    text: "Послушать",
                    nextText: 24
                },
                {
                    text: "Прервать представление",
                    nextText: 23.1
                }
            ],
            video: "video/seria-14.mp4",
            audio1: "audio/seria-14.MP3", 
        },
        {
            id: 23.1,
                text: "'О... они помогают людям...'",
            options: [
                {
                     text: "Попрошу их о помощи?",
                    nextText: 25
                },
                {
                    text: "Может получится?",
                    nextText: 25
                }
            ],
        },
    
        {
            id: 24,
            text: "О!! Так..они помогают людям...",
            options: [
                {
                    text: "И вы бы помогли мне?",
                    nextText: 25
                }
            ],
            video: "video/seria-14.mp4",
            audio1: "audio/seria-14.MP3", 
        },
        {
            id: 25,
            text: "Хм... Когда я смотрю на них иногда я думаю, через сколько пришлось пройти этой девушке, что она так измоталась... Вы видели сколько энергетиков у нее на кровати? Хотя и парню не позавидуешь.. много чая. Он не спокоен?",
            options: [
                {
                    text: "Дальше",
                    nextText: 27
                }
            ],
            video: "video/seria-15.mp4",
            audio1: "audio/seria-15.MP3", 
        },
        {
            id: 27,
            text: "'Мита... Чудненько', - повторяет парень. Какой у него. Милый? Голос? 'А я Лимавнсл...' чета такое там было. И Нина.",
            options: [
                {
                    text: "Дальше",
                    nextText: 28
                }
            ],
            video: "video/seria-17.mp4",
            audio1: "audio/seria-16.MP3", 
        },
        {
            id: 28,
            text: "'Я вот слушаю их и думаю... Помощи попросить или самой разобраться? М... Они милые вроде'",
            options: [
                {
                    text: "Подвезете?",
                    nextText: 29
                },
                {
                    text: "Можно с вами поехать?",
                    nextText: 29
                },
                {"text": "И все равно сбежать", "nextText": 80}
            ],
            video: "video/seria-18.mp4",
            audio1: "audio/seria-17.MP3", 
        },
        {
            id: 29,
            text: "Лим улыбается. 'Мы с радостью примем тебя в наш театр!' А Нина орет!",
            options: [
                {
                    text: "Не бесить Нину...",
                    nextText: 30
                },
                {
                    text: "ПФФФ.. А я с радостью поеду! А что за театр?",
                    nextText: 29.1
                },
                {"text": "Я хочу сбежать в лес", "nextText": 80}
            ],
            video: "video/seria-18.mp4",
            audio1: "audio/seria-17.MP3", 
        },
         {
            id: 29.1,
            text: "Нина злится, я прям вижу как она закипает и заворачивается в своем свитере... Но от чего-то молчит. 'Волшебный кукольный театр! TTROTA-a-a-a' - Он реально пропел",
            options: [
                {
                    text: "Звучит интересно",
                    nextText: 30
                },
                {
                    text: "Не люблю сцену...",
                    nextText: 30
                }
            ],
            video: "video/seria-18.mp4",
        },
        {
            id: 30,
            text: "'В жизни будет много неприятностей, Мита. Ты правда хочешь от каждого напастья убегать?'",
            options: [
                {
                    text: "Да. Что мне еще делать?",
                    nextText: 31
                },
                {
                    text: "А есть другие варианты?",
                    nextText: 30.1
                },
            ],
            video: "video/seria-19.mp4",
            audio1: "audio/seria-18.MP3",
        },
        {
            id: 30.1,
            text: "Лим и Нина посмотрели друг на друга, Лим снова стал включать колонку... Я ЧТО ДИСНЕЕВСКАЯ ПРИНЦЕЕ... ХОТЯ СКОРЕЕ ОН!!!'",
            options: [
                {
                    text: "Ладно я поняла!!!",
                    nextText: 31
                },
                {
                    text: "Спойте еще!",
                    nextText: 31
                }
            ],
            audio2: "audio/lim.mp3", 
        },
        {
            id: 31,
            text: "Лим смотрит прямо в глаза и смеется: 'Я мог бы научить тебя справляться с проблемами.'",
            options: [
                {
                    text: "Серьезно?",
                    nextText: 32
                },
                {
                    text: "Я не думаю, что это возможно...",
                    nextText: 31.1
                },
                {"text": "И все равно сбежать", "nextText": 80}
            ],
        },
        {
            id: 31.1,
            text: "Нина хмыкает: 'Не стоит тратить время, у нас куча дел'. Он ее снова перебивает... пх... 'Это твой выбор!! И мы тебе не мешаем решить самой!'",
            options: [
                {
                    text: "Ну окееей!",
                    nextText: 32
                },
                {
                    text: "Наверное, Нина права...",
                    nextText: 32
                }
            ],
        },
        {
            id: 32,
            text: "Лим вдруг сооружает какое-то произведение апликационного искусства из всего что попадется, хахахахах. 'Хорошо. Тогда так: Если у тебя получится - отлично. Если нет - поедешь с нами. Договорились?'",
            options: [
                {
                    text: "Договорились!",
                    nextText: 32.2
                },
                {
                    text: "Что это за листовка?",
                    nextText: 32.1
                }
            ],
            video: "video/seria-20.mp4",
            audio1: "audio/seria-19.MP3",
        },
         {
            id: 32.1,
            text: "Нина закатывает глаза. Лим: 'Хихихи! Мы приехали на экскурсию на твою гору! И можем встретиться там, пока мы не уехали!'",
            options: [
                {
                    text: "Взять листовку и выйти из фургона",
                    nextText: 32.2
                }
            ],
        },
        {
            id: 32.2,
            text: "Я вышла из фургона. Вот иду я такая и иду... А внутри столько чувств! Столько эмоций!!!... Прям отборные эмоциональные качели!!!",
            options: [
                {
                    text: "Написать Полине!",
                    nextText: 33
                },
            ],
        },  
        {
            id: 33,
            text: "ПОЛИНАААА!!!",
            options: [
                {
                    text: "Продолжить",
                    nextText: 34
                }
            ],
            video: "video/pol.mp4",
            audio1: "audio/pol.MP3",
        },
        {
            id: 34,
            text: "Я... все же пришла в школу :> Может... в этот раз все получится!",
            options: [
                {
                    text: "Продолжить",
                    nextText: 35
                }
            ],
            video: "video/seria-21.mp4",
            audio1: "audio/seria-20.MP3",
        },
        {
            id: 35,
            text: "В окне вижу гору... а на ней... где-то наверху... розовое пятно! :>  Я так и представляю там... музыку, перезвон колокольчиков и смех! Мой смех!",
            options: [
                {
                    text: "Принять решение?",
                    nextText: 36
                },
            ],
            video: "video/seria-22.mp4",
            audio1: "audio/seria-21.MP3",
        },
         {
            id: 36,
            text: "До скорых встреч! Скоро в игре появится больше концовок! Иии.. История станет длинее! Спасибо за тест драйв! :)",
            video: "video/seria-22.mp4",
            audio1: "audio/seria-21.MP3",
        },
        {"text": "Я вспомнила о театре", "nextText": 56}
    ]


// Добавляем новые сюжетные ветки
textNodes.push(
    {
        id: 37,
        text: "Что будет, если я всегда буду слушаться папу? Ладно, давай попробуем... Папа, можно с тобой посмотреть Доктора Кто? Я буду делать всё, что ты скажешь.",
        options: [
            {
                text: "Согласиться на всё, что он скажет",
                nextText: 37.1
            }
        ],
        audio1: "audio/doctor.mp3"
    },
    {
        id: 37.1,
        text: "Папа сказал, что мне еще рано такое смотреть. Что я должна быть хорошей девочкой и идти спать. Ладно, пойду... Я не буду спорить.",
        options: [
            {
                text: "Смириться и лечь спать",
                nextText: 37.2
            }
        ],
        audio1: "audio/doctor.mp3"
    },
    {
        id: 37.2,
        text: "Проходят годы... Я всегда слушаюсь папу, делаю всё, что он говорит. Я забыла, что такое мои собственные желания. Я как будто кукла, которой управляют... Мне это совсем не нравится, но я ничего не могу с этим поделать.",
        options: [
            {
                text: "Продолжить...",
                nextText: 37.3
            }
        ],
    },
    {
        id: 37.3,
        text: "17:00... Снова этот день. Папа кричит, что я должна быть как все, что мои увлечения – это глупости. Я пытаюсь сказать что-то в ответ, но не могу. Я разучилась говорить... Я просто стою и молчу, а он кричит всё громче и громче.",
        options: [
            {
                text: "Сломаться...",
                nextText: 37.4
            }
        ],
        video: "video/seria-1.mp4",
        audio1: "audio/seria-1.MP3"
    },
    {
        id: 37.4,
        text: "Внутри меня всё рушится. Я больше не могу. Я просто хочу исчезнуть... Я не знаю, кто я такая. Я просто тень... (Игра окончена: Нервный срыв)",
        options: [
            {
                text: "Начать заново",
                nextText: 1
            }
        ],
    },
    {
        id: 38,
        text: "Что если я буду совсем плохой девочкой? Ха! Папа сказал, что если я еще раз буду себя плохо вести, он отправит меня в детский дом. Ну посмотрим... Я покажу ему, что такое быть по-настоящему плохой!",
        options: [
            {
                text: "Сделать что-то ужасное!",
                nextText: 38.1
            }
        ],
    },
    {
        id: 38.1,
        text: "Я разбила его любимую кружку с танками! И еще нарисовала на обоях! Да, я бунтарка! Он теперь точно разозлится! Я буду ждать последствий!",
        options: [
            {
                text: "Ждать последствий...",
                nextText: 38.2
            }
        ],
    },
    {
        id: 38.2,
        text: "Папа в ярости! Он кричит, что я не его дочь, что я чудовище! Он вызывает полицию... Я испугалась, но уже поздно.",
        options: [
            {
                text: "Плакать и умолять прощения",
                nextText: 38.3
            },
            {
                text: "Сказать, что он сам виноват!",
                nextText: 38.4
            }
        ],
    },
    {
        id: 38.3,
        text: "Поздно... Полиция уже здесь. Меня увозят в детский дом. Я плачу, но никто не слушает... (Игра окончена: Детский дом)",
        options: [
            {
                text: "Начать заново",
                nextText: 1
            }
        ],
    },
        {
        id: 38.4,
        text: "Я ору на него! Что ему всегда было плевать! И что я теперь буду жить где меня любят! И все. Увозят. (Игра окончена: Детский дом)",
        options: [
            {
                text: "Начать заново",
                nextText: 1
            }
        ],
    },
    {
        id: 39,
        text: "Так меня и сбить могли, пхахаха! Спасибо моя головная паранойа! Тут кстати проехал оч необычный фургон... По-моему как раз с ними я билет видела. Пф, не получите мои семь тыщ!",
        options: [
            {
                text: "Дождаться зеленого света",
                nextText: 39.1
            }
        ],
    },
    {
        id: 39.1,
        text: "Уф, наконец-то! Я побежала через дорогу, не оглядываясь. Этот фургон и правда странный... Мне нужно найти место, где я смогу спрятаться.",
        options: [
            {
                text: "Что дальше?",
                nextText: 40
            }
        ],
    },
    {
        id: 40,
        text: "Ох, и куда же теперь? Надо подумать, как выжить. Может, построить шалаш в лесу? Или попробовать найти кого-то, кто поможет? Я совсем одна...",
        options: [
            {
                text: "Построить шалаш",
                nextText: 41
            },
            {
                text: "Поискать помощь у людей",
                nextText: 45
            }
        ],
    },
    {
        id: 41,
        text: "Решено, строю шалаш! Сначала нужно найти подходящее место. И ветки, много веток! Я постараюсь сделать его самым уютным на свете.",
        options: [
            {
                text: "Искать место и ветки",
                nextText: 42
            }
        ],
    },
    {
        id: 42,
        text: "Нашла классное место! Тут тихо и есть много веток. Теперь нужно их сложить так, чтобы получился домик. Ох, это не так просто... Мои руки уже болят.",
        options: [
            {
                text: "Продолжить строительство",
                nextText: 43
            }
        ],
    },
    {
        id: 43,
        text: "Ура! Шалаш почти готов! Осталось только крышу сделать. И надо бы найти что-то, чем можно закрыть щели, чтобы не дуло. Я очень устала, но нужно закончить.",
        options: [
            {
                text: "Искать материалы для крыши",
                nextText: 44
            }
        ],
    },
    {
        id: 44,
        text: "Нашла листья и мох! Отлично, теперь мой шалаш будет теплым и уютным. Можно отдохнуть... Наконец-то я могу немного расслабиться.",
        options: [
            {
                text: "Отдохнуть в шалаше",
                nextText: 44.1
            }
        ],
    },
    {
        id: 80,
        text: "Ох, и куда же теперь? Надо подумать, как выжить. Может, построить шалаш в лесу? Или попробовать найти кого-то, кто поможет? Я совсем одна...",
        options: [
            {
                text: "Построить шалаш",
                nextText: 81
            }
        ],
    },
    {
        id: 81,
        text: "Решено, строю шалаш! Сначала нужно найти подходящее место. И ветки, много веток! Я постараюсь сделать его самым уютным на свете.",
        options: [
            {
                text: "Искать место и ветки",
                nextText: 82
            }
        ],
    },
    {
        id: 82,
        text: "Нашла классное место! Тут тихо и есть много веток. Теперь нужно их сложить так, чтобы получился домик. Ох, это не так просто... Мои руки уже болят.",
        options: [
            {
                text: "Продолжить строительство",
                nextText: 83
            }
        ],
    },
    {
        id: 83,
        text: "Ура! Шалаш почти готов! Осталось только крышу сделать. И надо бы найти что-то, чем можно закрыть щели, чтобы не дуло. Я очень устала, но нужно закончить.",
        options: [
            {
                text: "Искать материалы для крыши",
                nextText: 84
            }
        ],
    },
    {
        id: 84,
        text: "Нашла листья и мох! Отлично, теперь мой шалаш будет теплым и уютным. Можно отдохнуть... Наконец-то я могу немного расслабиться.",
        options: [
            {
                text: "Отдохнуть в шалаше",
                nextText: 44.5
            }
        ],
    },
        {
        id: 44.1,
        text: "Внезапно слышу голоса! Кто-то идет к моему шалашу... Мне страшно. Кто это может быть?",
        options: [
            {
                text: "Спрятаться",
                nextText: 44.2
            },
            {
                text: "Выйти навстречу",
                nextText: 44.31
            }
        ],
    },
    {
        id: 44.2,
        text: "Я спряталась в шалаше. Это Лим и Нина! Говорят, что слышали тут шерохи и хотят посмотреть на зайцев, АХахаххахха!!... Мож моркови у них попросить?? ",
        options: [
            {
                text: "Попросить морковку и спросить че у них такие дорогие билеты",
                nextText: 4.3 // Возвращаемся к выбору помощи от актеров
            }
        ],
    },
    {
        id: 44.3,
        text: "ВЯЯЯ! - АХАХАХАХ ВЫ БЫ СЛЫШАЛИ КАК ОНИ РАЗОРАЛИСЬ!!! Ахахахха. Я спросила где морковь, они посмотрели на меня ТАКИИИМИ глазами! Вот умора!!! Так вот, говоря о билете...",
        options: [
            {
                text: "Че так дорого??",
                nextText: 25 // Возвращаемся к выбору помощи от актеров
            }
        ],
    },
    {
        id: 44.31,
        text: "Здрасьте?",
        options: [
            {
                text: "Че так дорого??",
                nextText: 25 // Возвращаемся к выбору помощи от актеров
            }
        ],
    },
    {
        id: 44.4,
        text: "Они были в замешательстве... и долго не могли выйти со ступора. Они позвали на чашечку чая... ну... я...мы пообщались, думаю...",
        options: [
            {
                text: "Зайду к ним!",
                nextText: 25 // Возвращаемся к выбору помощи от актеров
            }
        ],
    },
    {
        id: 44.3,
        text: "Выхожу из шалаша. Это Лим и Нина! Оказывается, они не злятся, они волнуются! И говорят, что могут мне помочь... Что же мне делать? Может, они и правда хотят мне помочь?",
        options: [
            {
                text: "Поверить им и вернуться с ними",
                nextText: 25 // Возвращаемся к выбору помощи от актеров
            },
             {
                text: "Вежливо отказаться и настоять на своем выживании в лесу",
                nextText: 44.4 // Новый выбор - остаться в лесу
            }
        ],
    },
    {
        id: 44.4,
        text: "Спасибо, конечно, но я решила остаться здесь. Мне нужно время, чтобы прийти в себя. Вы идите, а я... я как-нибудь справлюсь. Я не хочу больше никому доверять.",
        options: [
            {
                text: "Продолжить выживание в лесу",
                nextText: 44.5
            }
        ],
    },
     {
        id: 44.5,
        text: "Дни проходят, я выживаю в лесу. Учусь добывать еду, разводить огонь. Становлюсь сильнее и независимее. Но иногда... иногда мне становится одиноко. И я начинаю скучать по дому... Может, мне стоит вернуться?",
        options: [
            {
                text: "Ни за что, лучше в город пойду",
                nextText: 44.6
            }
        ],
    },
     {
        id: 44.6,
        text: "Но я все равно смотрю в окно... и я иду гулять по лесу... каждый божий час... Зачем? Я не знаю, почему я это делаю.",
        options: [
            {
                text: "Топ топ...",
                nextText: 44.7
            }
        ],
    },
     {
        id: 44.7,
        text: "Я выхожу из лесу, я вижу тот самый фургон. Ох...",
        options: [
            {
                text: "Зайти к ним",
                nextText: 25
            },
            {
                text: "Остаться в лесу навсегда",
                nextText: 56.1
            }
        ],
    },
    {
        id: 45,
        text: "Может, кто-нибудь поможет? Я постою на дороге и буду просить о помощи. Вдруг кто-то остановится... Мне очень страшно, но я должна попробовать.",
        options: [
            {
                text: "Стоять на дороге и ждать попутчиков",
                nextText: 46
            }
        ],
    },
    {
        id: 46,
        text: "Машина останавливается! Это какая-то женщина. Она спрашивает, что случилось. Рассказать ей правду или придумать что-нибудь? Я не знаю, кому можно доверять.",
        options: [
            {
                text: "Рассказать правду",
                nextText: 47
            },
            {
                text: "Придумать историю",
                nextText: 48
            }
        ],
    },
    {
        id: 47,
        text: "Я рассказала ей всё, как есть. Она выслушала меня и предложила помочь куда-то доехать",
        options: [
            {
                text: "Согласиться",
                nextText: 49
            },
            {
                text: "Отказаться",
                nextText: 47.1
            }
        ],
    },
        {
        id: 47.1,
        text: "Простите, но я вам не верю... Лучше я одна в лесу.",
        options: [
            {
                text: "Продолжить выживание в лесу",
                nextText: 44.5
            }
        ],
    },
    {
        id: 48,
        text: "Я сказала, что я тут ягоды собираю. Из-за окна показался экстравагантный мужчина, что сказал, что тоже хочет их собирать! Женщина недовольно цокнула...",
        options: [
            {
                text: "Согласиться",
                nextText: 49
            },
            {
                text: "Отказаться",
                nextText: 47.1
            }
        ],
    },
    {
        id: 49,
        text: "Это было странно, но со мной стали собирать ягоды какие-то хиппи... я молчала, но скоро им все рассказала... И эти.. не представились... пофиг, позвали на чай.",
        options: [
            {
                text: "Чай!",
                nextText: 25
            },
            {
                text: "Чай!",
                nextText: 25
            }
        ],
    },
    {
        id: 50,
        text: "Так, нужно найти деньги на билет в этот театр! ЧТО?! 7000 рублей?!!!! ПИПЕЦ!! ЭТО СЛИШКОМ! очень много! Где же их взять? Может, поискать в комнате? Стоит ли вообще связываться с этим театром?",
        options: [
            {
                text: "Искать деньги в комнате",
                nextText: 50.1
            }
        ],
    },
    {
        id: 50.1,
        text: "Окей, в комнате много мест, где могут быть спрятаны деньги. Попробую поискать.",
        options: [
            {
                text: "За шкафом",
                nextText: 51
            },
            {
                text: "В старой копилке",
                nextText: 52
            },
            {
                text: "Под матрасом",
                nextText: 53
            },
            {
                text: "Вернуться",
                nextText: 8
            },
            {
                text: "Взломать все нафиг",
                nextText: 55
            }
        ],
    },
    {
        id: 51,
        text: "За шкафом нашла 1000 рублей!",
        options: [
            {
                text: "Попробовать еще раз (Старая копилка)",
                nextText: 52
            },
            {
                text: "Попробовать еще раз (Под матрасом)",
                nextText: 53
            }
        ],
        setState: {foundMoney: 1000, attempts: 1}
    },
    {
        id: 52,
        text: "В старой копилке всего 3 рубля...",
        options: [
            {
                text: "Попробовать еще раз (Под матрасом)",
                nextText: 53,
            },
    
        ],
        setState: {foundMoney: (state) => (state.foundMoney || 0) + 3, attempts: (state) => (state.attempts || 0) + 1 }
    },
    {
        id: 53,
        text: "Под матрасом нашла 1 рубль! Увы, не получилось собрать 7000.",
        options: [
            {
                text: "Начать заново",
                nextText: 50.1
            },
        ],
        setState: {foundMoney: (state) => (state.foundMoney || 0) + 1, attempts: (state) => (state.attempts || 0) + 1}
    },
    {
        id: 54,
        text: "Я, конечно, понимаю, что так нельзя... Но что если я просто взломаю код и получу деньги? Никто же не узнает... Или все-таки не стоит?",
        options: [
            {
                text: "Взломать код",
                nextText: 55
            }
        ],
    },
    {
        id: 55,
        text: "Хм... Вроде получилось! У меня есть 7000 рублей на билет! Но... я чувствую себя нечестно. И игра ругает за читы... (Игра окончена: Чит)",
        options: [
            {
                text: "Начать заново",
                nextText: 1
            }
        ],
    },
     {
        id: 56,
        text: "Внезапно вспоминаю о театре... Они так звали меня... А что если?.. Может, они и правда смогут мне помочь?",
        options: [
            {
                text: "Снова пойти к театру",
                nextText: 27
            },
            {
                text: "Так и остаться в лесу",
                nextText: 56.1
            }
        ],
    },
        {
        id: 56.1,
        text: "В лесу красиво, но так одиноко... Может, стоило согласиться на театр?... Может, я вернусь в свой дом?... Я совсем запуталась.",
        options: [
            {
                text: "Навсегда остаться в лесу",
                nextText: 56.2
            }
        ],
    },
    {
        id: 56.2,
        text: "Никто так и не нашел меня. Я выжила в лесу одна, превратилась в лесного отшельника... (Игра окончена: Выживание в лесу)",
        options: [
            {
                text: "Начать заново",
                nextText: 1
            }
        ],
    },

    
);


startGame();
