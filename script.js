var sliderContainer = document.querySelector(".slider-container");
var slider = document.querySelector(".slider");
var slides = document.querySelectorAll(".card");
var sliderDots = document.querySelector(".slider-dots");
var dots = [];

var currentSlideIndex = 0;
var slideWidth = slides[0].offsetWidth;

function isMobileView() {
  return window.matchMedia("(max-width: 600px)").matches;
}

// Dynamic slider dots
for (var i = 0; i < slides.length; i++) {
  var dot = document.createElement("span");
  dot.classList.add("slider-dot");
  dot.addEventListener("click", function () {
    var dotIndex = Array.prototype.indexOf.call(sliderDots.children, this);
    changeSlide(dotIndex);
  });
  sliderDots.appendChild(dot);
  dots.push(dot);
}

dots[currentSlideIndex].classList.add("active");

function changeSlide(index) {
  currentSlideIndex = index;
  var newPosition = -currentSlideIndex * slideWidth;
  slider.style.transform = "translateX(" + newPosition + "px)";
  updateActiveDot();
}

function updateActiveDot() {
  dots.forEach(function (dot, index) {
    if (index === currentSlideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Handle mobile swipe gestures
var startX = 0;
var distX = 0;

function handleTouchStart(e) {
  startX = e.changedTouches[0].clientX;
  document.body.style.overflow = "hidden";
}

sliderContainer.addEventListener("touchstart", handleTouchStart);

function handleTouchMove(e) {
  distX = e.changedTouches[0].clientX - startX;
  e.preventDefault();
}
sliderContainer.addEventListener("touchmove", handleTouchMove);

function handleTouchEnd(e) {
  var threshold = slideWidth / 4;
  if (distX > threshold && currentSlideIndex > 0) {
    changeSlide(currentSlideIndex - 1);
  } else if (distX < -threshold && currentSlideIndex < slides.length - 1) {
    changeSlide(currentSlideIndex + 1);
  }
  distX = 0;
}

sliderContainer.addEventListener("touchend", handleTouchEnd);

function updateSlideWidth() {
  if (isMobileView()) {
    slideWidth = slides[0].offsetWidth;
    var newPosition = -currentSlideIndex * slideWidth;
    slider.style.transform = "translateX(" + newPosition + "px)";
  } else {
    currentSlideIndex = 0;
    slider.style.transform = "translateX(0)";
  }
  updateActiveDot();
}

window.addEventListener("resize", updateSlideWidth);

updateSlideWidth();
