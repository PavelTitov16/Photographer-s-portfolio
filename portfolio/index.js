console.log(` TOTAL: 77 / 85 \n
1. Смена изображений в секции portfolio +25 \n
    [x] при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20  \n
    [x] кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5 \n 
2. Перевод страницы на два языка +25 \n
    [x] при клике по надписи ru англоязычная страница переводится на русский язык +10 \n
    [x] при клике по надписи en русскоязычная страница переводится на английский язык +10 \n
    [x] надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5 \n
3. Переключение светлой и тёмной темы +25 \n
    [x] На страницу добавлен переключатель при клике по которому: \n
      - тёмная тема приложения сменяется светлой +10 \n
      - светлая тема приложения сменяется тёмной +10 \n
      - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5 \n
4. Дополнительный функционал: \n
    [/] выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +2 \n
    [] сложные эффекты для кнопок при наведении и/или клике +0 (секция Portfolio) \n
    
  `);

/* Adaptive Menu */
const buter_brodskiy = document.querySelector('.buter_brodskiy');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const shdwBox = document.querySelector('.shadow-box');

buter_brodskiy.addEventListener('click', () => {
    buter_brodskiy.classList.toggle('active');
    nav.classList.toggle('active');
    shdwBox.classList.toggle('active');
});

navLinks.forEach(navLink => navLink.addEventListener('click', () => {
    buter_brodskiy.classList.remove('active');
    nav.classList.remove('active');
    shdwBox.classList.remove('active');
}));

/* Change Images */
const seasonBtns = document.querySelectorAll('.season-button');
const seasonBtnsParent = document.querySelector('.season-buttons');
const seasonImages = document.querySelectorAll('.image');

function changeImage() {
    seasonBtnsParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('season-button')) {
            seasonImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
        }
    });
}
changeImage();

function changeClass() {
    seasonBtns.forEach(item => {
        item.addEventListener('click', () => {
            seasonBtns.forEach(button => {
                button.classList.remove('season-button_active');
            })
            item.classList.add('season-button_active');
        })
    })
}
changeClass();

function preloadImages(season) {
    for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `./assets/img/${season}/${i}.jpg`;
    }
}
['winter', 'summer', 'spring', 'autumn'].forEach(season => {
    preloadImages(season);
});

/* Translation / Перевод */
import i18Obj from './js/translate.js';
const ruButton = document.querySelector('.lang-ru');
const enButton = document.querySelector('.lang-en');
const langItems = document.querySelectorAll('[data-i18]');
let lang;

function getTranslate(language) {
    langItems.forEach(item => {
        item.textContent = i18Obj[language][item.dataset.i18];

        if (item.placeholder) {
            item.placeholder = i18Obj[language][item.dataset.i18];
            item.textContent = '';
        }
    })
};

ruButton.addEventListener('click', () => {
    getTranslate('ru');
    enButton.classList.remove('active');
    ruButton.classList.add('active');
    lang = "ru";
});

enButton.addEventListener('click', () => {
    getTranslate('en');
    ruButton.classList.remove('active');
    enButton.classList.add('active');
    lang = "en";
});

/* Swtich Theme */

const buttonLight = document.querySelector('.switch-button');
const bodyLight = document.querySelector('body');
const heroLight = document.querySelector('.hero-container');
const contactsLight = document.querySelector('.contact-container');
const logoLight = document.querySelector('.logo');
const iconsLight = document.querySelectorAll('.social-icon');

buttonLight.addEventListener('click', () => {
    buttonLight.classList.toggle('light');
    heroLight.classList.toggle('light');
    contactsLight.classList.toggle('light');
    bodyLight.classList.toggle('switch-theme');
    logoLight.classList.toggle('light');
    iconsLight.forEach(icon => {
        icon.classList.toggle('light');
    })
});

/* Local Storage */
function setLocalStorage() {
    localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslate(lang);
    }
}
window.addEventListener('load', getLocalStorage);

/* VIdeo Player */
const player = document.querySelector('.player');
const video = player.querySelector('.video');
const button = document.querySelector('.button_3');
const screenSaver = player.querySelector('.poster');
const btnPlay = player.querySelector('.play_button');
const muteBtn = player.querySelector('.volume_button');
const volume = document.querySelector('.volume');
const progress = document.querySelector('.progress');
const fullScreenBtn = document.querySelector('.fullscreen');
let lastVideoVolume = volume.value;
let progressId = null;
let wasPlaying = false;

window.addEventListener('load', function () {
    progress.max = video.duration;
})

/* Play - Pause */
function togglePlay() {
    if (video.paused) {
        progress.max = video.duration;
        video.play();
        progressId = setInterval(changeProgress, 100);
        screenSaver.classList.add('active');
        button.classList.toggle('active');
        btnPlay.classList.remove('play');
        btnPlay.classList.add('pause');
    } else {
        video.pause();
        clearInterval(progressId);
        button.classList.remove('active');
        btnPlay.classList.remove('pause');
        btnPlay.classList.add('play');
    }
}

button.addEventListener('click', togglePlay);
btnPlay.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('ended', () => {
    button.classList.toggle('active');
    btnPlay.classList.remove('pause');
    btnPlay.classList.add('play');
    clearInterval(progressId);
});
/* Play - Pause */

/* Volume - Mute */
function changeVolume() {
    volume.value = video.volume;
    lastVideoVolume = volume.value;
    changeVolumeColor();
}

volume.addEventListener('change', function () {
    video.volume = volume.value;
    if (volume.value != 0){
        lastVideoVolume = volume.value;
      }
    if (video.volume == 0) {
        onVideoMute();
    } else {
        onVideoVolume();
    }
})

function changeVolumeColor() {
    const max = volume.max;
    const value = (volume.value / max) * 100;
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #fff ${value}%, #fff 100%)`;
}

volume.addEventListener('input', changeVolumeColor);

function onVideoMute() {
    muteBtn.classList.remove('volume_on');
    muteBtn.classList.add('mute');
}
function onVideoVolume() {
    muteBtn.classList.remove('mute');
    muteBtn.classList.add('volume_on');
}
function videoMute() {
    if (video.volume == 0) {
        video.volume = lastVideoVolume;
        volume.value = video.volume;
        onVideoVolume();
        changeVolumeColor()
    } else {
        onVideoMute();
        video.volume = 0;
        volume.value = 0;
        changeVolumeColor()
    }
}

muteBtn.addEventListener('click', videoMute);
/* Volume - Mute */

/* Progress */
function changeProgress() {
    progress.value = video.currentTime;
    changeProgressColor();
}

function changeProgressColor() {
    const max = progress.max;
    const value = (progress.value / max) * 100;
    progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #fff ${value}%, #fff 100%)`;
}

progress.addEventListener('input', changeProgressColor);

progress.addEventListener('mousedown', function () {
    wasPlaying = !video.paused;
    if (wasPlaying) {
        video.pause();
        clearInterval(progressId);
    }
});

progress.addEventListener('change', function () {
    video.currentTime = progress.value;
    if (wasPlaying) {
        video.play();
        progressId = setInterval(changeProgress, 100);
    } else {
        changeProgress();
    }
});
/* Progress */

/* Fullscreen */
const openFullscreen = () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
};
fullScreenBtn.addEventListener('click', () => {
    openFullscreen();
});
/* Fullscreen */
