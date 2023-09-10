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
});