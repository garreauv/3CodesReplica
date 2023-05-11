const carousel = document.querySelector(".carousel");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const circles = document.querySelectorAll(".circle");
const circleMouse = document.getElementById("circleMouse");
const pointer = document.getElementById("pointer");
const logo = document.getElementById("logo");

let isDragging = false;
let prevPageX, prevScrollLeft, delta;


// Carousel scroll
const startDragging = (e) => {
  isDragging = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return;
    e.preventDefault();
    delta = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - delta;
}

const stopDragging = () => {
  isDragging = false;
  // Wait for scroll to finish
  setTimeout(() => {
    const index = getCurrentIndex();
    fillCircle(index);
  }, 500);
}

carousel.addEventListener("mousedown", startDragging);  
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", stopDragging);


arrowLeft.addEventListener("click", () => {
  carousel.scrollLeft -= 768;
  // Wait for scroll to finish
  setTimeout(() => {
    const index = getCurrentIndex();
    fillCircle(index);
  }, 500);
});

arrowRight.addEventListener("click", () => {
  carousel.scrollLeft += 768;
  // Wait for scroll to finish
  setTimeout(() => {
    const index = getCurrentIndex();
    fillCircle(index);
  }, 500);
});


// Circle fill
circles[0].classList.add("filled");
const fillCircle = (index) => {
  circles.forEach((circle, i) => {
      if(i === index) {
          circle.classList.add("filled");
      } else {
          circle.classList.remove("filled");
      }
  });
}

const getCurrentIndex = () => {
  return Math.round(carousel.scrollLeft / 768);
}
