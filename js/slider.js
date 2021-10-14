const slider = $('.products').bxSlider({
    pager: false,
    controls: false
});

$('.products-slider__arrow--left').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})

$('.products-slider__arrow--right').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})