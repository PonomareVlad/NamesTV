function runSlideShow() {
    document.body.classList.toggle('loaded', true);
    const slides = document.querySelectorAll('body>img');
    const slidesCount = slides.length;
    let currentSlide = -1;
    let nextSlide = 0;

    function showSlide() {
        nextSlide = slides[currentSlide + 1] ? (currentSlide + 1) : 0;
        if (slides[nextSlide]) slides[nextSlide].style.setProperty('opacity', 1);
        if (slides[currentSlide]) slides[currentSlide].style.setProperty('opacity', 0);
        currentSlide = nextSlide;
    }

    showSlide();

    setInterval(showSlide, 15000);
}

function loadImage(src, i) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => resolve(true);
        // img.style.setProperty('--i', i);
        img.src = src;
        document.body.appendChild(img);
    })
}

fetch('https://script.google.com/macros/s/AKfycbxOt0XDe9im0w1RYcWl-xs3QnVhw0K9Zwr9-kXDif_t1hTO7MF8/exec', {mode: 'cors'})
    .then(r => r.json()).then(slides => slides.map(slide => loadImage(slide, slides.indexOf(slide) + 1))).then(runSlideShow);