let slideImages = document.querySelectorAll("img");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
let dots = document.querySelectorAll(".dot");

var counter = 0;

nextBtn.addEventListener("click", slideNext);
function slideNext() {
  slideImages[counter].style.animation = "next-1 0.5s ease-in forwards";

  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].style.animation = "next-2 0.5s ease-in forwards";
  indicators();
}

prevBtn.addEventListener("click", slidePrev);
function slidePrev() {
  slideImages[counter].style.animation = "prev-1 0.5s ease-in forwards";

  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev-2 0.5s ease-in forwards";
  indicators();
}

let deleteInterval;
function autoSliding() {
  deleteInterval = setInterval(timer, 2000);
  function timer() {
    slideNext();
    indicators();
  }
}
autoSliding();

const container = document.querySelector(".slide-container");
container.addEventListener("mouseover", function () {
  clearInterval(deleteInterval);
});

container.addEventListener("mouseout", autoSliding);

function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

function switchImage(currentImage) {
  currentImage.classList.add("active");
  var imageId = currentImage.getAttribute("attr");
  if (imageId > counter) {
    slideImages[counter].style.animation = "next-1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "next-2 0.5s ease-in forwards";
  } else if (imageId == counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev-1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "prev-2 0.5s ease-in forwards";
  }
}
