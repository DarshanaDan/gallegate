const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function changeSlide() {
  if (!slides.length) return;
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 5000);
