const prevBtn = document.querySelector('.icon-circle-left');
const nextBtn = document.querySelector('.icon-circle-right');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let intervalId;
function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }

    slides[index].classList.add('active');
    currentIndex = index;
}
function showNextSlide() {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}
function startAutoSlide() {
    intervalId = setInterval(showNextSlide, 6000);
}
function stopAutoSlide() {
    clearInterval(intervalId);
}
prevBtn.addEventListener('click', function () {
    stopAutoSlide();
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    showSlide(newIndex);
    startAutoSlide();
});
nextBtn.addEventListener('click', function () {
    stopAutoSlide();
    showNextSlide();
    startAutoSlide();
});
showSlide(currentIndex);
startAutoSlide();
