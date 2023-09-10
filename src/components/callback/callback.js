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
