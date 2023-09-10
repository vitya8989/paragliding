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
}