const headerLangs = document.querySelectorAll('.header__lang');

if (headerLangs.length > 0) {
    headerLangs.forEach((headerLang) => {
        const headerLangBody = headerLang.querySelector('.header__lang_body');

        headerLang.addEventListener('click', () => {
            headerLangBody.classList.toggle('open');
        });
        document.body.addEventListener('click', (e) => {
            if (!e.target.closest('.header__lang')) {
                headerLangBody.classList.remove('open');
            }
        });
    });
}

const header = document.querySelector('.js_header');

if (header) {
    toggleHeaderBg();
    window.addEventListener('scroll', toggleHeaderBg);

    function toggleHeaderBg() {
        if (window.pageYOffset > 0) {
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    }

    const headerBurger = header.querySelector('.header__burger');
    const headerNav = header.querySelector('.header__menu');

    headerBurger.addEventListener('click', () => {
        header.classList.toggle('menu-opened');
        headerNav.classList.toggle('show');
        headerBurger.classList.toggle('active');
        document.body.classList.toggle('this--overflow');
    });

    let menuLinks = header.querySelectorAll('.js_anchor');
    let menuAnchors = document.querySelectorAll('.js_menu_anchor');
    let offsetPositions = [];
    let offsetPositionsEnd = [];
    const topCorrect = document.querySelector('.header').offsetHeight + 20;
    window.onload = function () {
        for (let i = 0; i < menuLinks.length; i++) {
            let scrollTarget = menuAnchors[i];
            const elementPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset;
            const elementPositionEnd = elementPosition + scrollTarget.offsetHeight;
            const offsetPosition = elementPosition - topCorrect;
            const offsetPositionEnd = elementPositionEnd - topCorrect;
            offsetPositions.push(offsetPosition);
            offsetPositionsEnd.push(offsetPositionEnd);
        }
    }
    window.addEventListener('resize', () => {
        offsetPositions = [];
        offsetPositionsEnd = [];
        for (let i = 0; i < menuLinks.length; i++) {
            let scrollTarget = menuAnchors[i];
            const elementPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset;
            const elementPositionEnd = elementPosition + scrollTarget.offsetHeight;
            const offsetPosition = elementPosition - topCorrect;
            const offsetPositionEnd = elementPositionEnd - topCorrect;
            offsetPositions.push(offsetPosition);
            offsetPositionsEnd.push(offsetPositionEnd);
        }
    });

    window.addEventListener('scroll', () => {
        let centerOfWindow = window.pageYOffset + 200;
        for (let i = 0; i <= offsetPositions.length; i++) {
            if (centerOfWindow >= offsetPositions[i] && centerOfWindow < offsetPositionsEnd[i]) {
                if (!menuLinks[i].classList.contains('active')) {
                    menuLinks[i].classList.add('active');
                }
            } else if (centerOfWindow >= offsetPositionsEnd[i] || centerOfWindow < offsetPositions[i]) {
                menuLinks[i].classList.remove('active');
            }
        }
    });

    menuLinks.forEach(link => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            headerNav.classList.remove('show');
            headerBurger.classList.remove('active');
            document.body.classList.remove('this--overflow');
            header.classList.remove('menu-opened');
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            let topOffset = header.offsetHeight + 20;
            if (window.innerWidth < 960) {
                topOffset = header.offsetHeight;
            }
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
};
new Swiper('.gallery__slider', {
    speed: 400,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    navigation: {
        nextEl: ".gallery__slider_next",
        prevEl: ".gallery__slider_prev",
    },
    pagination: {
        el: '.gallery__slider_pagination',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        768: {
            spaceBetween: 20,
            slidesPerView: 3,
        },
        1024: {
            spaceBetween: 40,
            slidesPerView: 3,
        },
    },
});;
const accordionHeads = document.querySelectorAll('.js_accordion_head');

if (accordionHeads.length > 0) {
    accordionHeads.forEach((accordionHead) => {
        accordionHead.addEventListener('click', () => {
            accordionHead.classList.toggle('open');
            if (accordionHead.classList.contains('open')) {
                accordionHead.nextElementSibling.style.maxHeight = accordionHead.nextElementSibling.scrollHeight + 'px';
            } else {
                accordionHead.nextElementSibling.style.maxHeight = 0;
            }
       });
    });
};

const openPopupBtns = document.querySelectorAll('.js_open_popup');

if (openPopupBtns.length > 0) {
    const callbackPopup = document.querySelector('.callback');
    const callbackClose = callbackPopup.querySelectorAll('.js_callback_close');
    const callbackContents = callbackPopup.querySelectorAll('.callback__content');

    openPopupBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            callbackPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
            callbackContents.forEach((content) => {
                if (content.dataset.content === 'form') {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        })
    })
    callbackClose.forEach((close) => {
        close.addEventListener('click', () => {
            callbackPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
        });
    });
    callbackPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.callback__body')) {
            callbackPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
        }
    });

    const callbackForm = callbackPopup.querySelector('.callback__form');
    const inputTel = callbackForm.querySelector('.js_input_tel');

    $('.js_input_tel').inputmask('+9999999999[9][9][9][9]');

    callbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let valid = true;
        if (inputTel.value.indexOf('_') !== -1 || inputTel.value === '') {
            inputTel.classList.add('error');
            valid = false;
        }
        if (valid) {
            let response = await fetch('form-action.php', {
                method: 'POST',
                body: new FormData(callbackForm)
            });
            if (response.ok) {
                callbackForm.reset();
                callbackContents.forEach((content) => {
                    if (content.dataset.content === 'thanks') {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            } else {
                alert('Произошла ошибка отправки, попробуйте еще раз!');
            }
        }
    });

    inputTel.addEventListener('focus', () => {
        inputTel.classList.remove('error');
    });
}
;
const openVideoPopupBtns = document.querySelectorAll('.js_open_video');

if (openVideoPopupBtns.length > 0) {
    const videoPopup = document.querySelector('.video_popup');
    const videoPopupClose = videoPopup.querySelectorAll('.video_popup__close');
    const videoPopupVideos = videoPopup.querySelectorAll('.video_popup__video');

    openVideoPopupBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            videoPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
            videoPopupVideos.forEach((content) => {
                let iFrame = content.querySelector('iframe');
                if (content.dataset.video === this.dataset.video) {
                    content.classList.add('active');
                    iFrame.src = iFrame.dataset.src;
                } else {
                    content.classList.remove('active');
                    iFrame.src = '';
                }
            });
        })
    })
    videoPopupClose.forEach((close) => {
        close.addEventListener('click', () => {
            videoPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
            videoPopupVideos.forEach((content) => {
                let iFrame = content.querySelector('iframe');
                iFrame.src = '';
            });
        });
    });
    videoPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.callback__body')) {
            videoPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
            videoPopupVideos.forEach((content) => {
                let iFrame = content.querySelector('iframe');
                iFrame.src = '';
            });
        }
    });
};
