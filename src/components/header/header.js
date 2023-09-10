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
}