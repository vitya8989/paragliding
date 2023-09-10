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
}