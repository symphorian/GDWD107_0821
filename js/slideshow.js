let currentSlideIndex = 0;
showSlide(currentSlideIndex);

function showNextSlide() {
  currentSlideIndex += 1;
  showSlide(currentSlideIndex);
}

function showPreviousSlide() {
  currentSlideIndex -= 1;
  showSlide(currentSlideIndex);
}

function showSlide(index) {
  debugger;
  let slides = document.getElementsByClassName("slideshowImage");

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  for(let i = 0; i < slides.length; i++) {
    if (i != currentSlideIndex) {
      slides[i].style.display = 'none';
    } else {
      slides[i].style.display = 'block';
    }
  }
}
