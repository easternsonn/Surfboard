//* Products-section

const slider = $('.products').bxSlider({
    pager: false,
    controls: false,
    touchEnabled: false
});

$('.products-slider__arrow--left').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})

$('.products-slider__arrow--right').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})

//* Team-section

const btn_names = document.querySelectorAll('.member__name');

btn_names.forEach(item => {

    item.addEventListener('click', function (Event) {
        const parentEl = event.target.parentElement.parentElement;
        const memberDescription = parentEl.querySelector('.member__description');
        const triangle = parentEl.querySelector('.member__name-triangle');

        if (triangle.classList.contains('member__name-triangle_rotated')) {
            triangle.classList.remove('member__name-triangle_rotated');
        } else {
            triangle.classList.add('member__name-triangle_rotated');
        }

        if (memberDescription.classList.contains('member__description_visible')) {
            memberDescription.classList.remove('member__description_visible');
        } else {
            memberDescription.classList.add('member__description_visible');
        }

    })

})

//* Menu-section

const list = $('.menu-acco');
list.on('click', '.menu-acco__line', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('menu-acco__content')) return
    $(this).siblings('li').removeClass('menu-acco__line_active')
    $(this).toggleClass('menu-acco__line_active')
})

//* Rewiews-section

const findBlockByAlias = (alias) => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") === alias;
    });
};

$(".interactive-avatar__link").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".rewiews__switcher-item")

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
});

//* Player-section

let video;
let durationControl;
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function () {
    video = document.getElementById("player");

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click', soundOf)

    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener('click', setVideoDuration);
    durationControl.addEventListener('onmousemove', setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.min = 0;
    durationControl.value = 0;

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;

});

/*
 Воспроизведение видео
*/
function playStop() {
    // показывает или скрывает белую кнопку play
    $(".video__player-img").toggleClass("video__player-img--active");

    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused) {
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration, 1)
        // video.webkitRequestFullScreen(); возможность открыть в полноэкранном режиме
    } else {
        // останавливаем видео
        video.pause();
        clearInterval(intervalId);
        // document.webkitExitFullscreen(); выйти из полноэкранного режима
    }
}

/*
    Управление звуком
*/
function soundOf() {
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
    } else {
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}

function stopInterval() {
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration() {
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000 / 66);
}

/*
    Управление звуком видео
*/
function changeSoundVolume() {
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
    */
    video.volume = soundControl.value / 10;
}

/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration() {
    durationControl.value = video.currentTime;
}

//* Order-section


//* Map-section

let center = [55.75202524683003, 37.57603644047548];

function init() {
    let map = new ymaps.Map('map-test', {
        center: center,
        zoom: 16
    });

    let placemark = new ymaps.Placemark(center, {}, {
        iconLayout: 'default#image',
        iconImageHref: "./img/marker.svg",
        iconImageSize: [58, 73],
        iconImageOffset: [-25, -72]
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    map.geoObjects.add(placemark);
}

ymaps.ready(init);