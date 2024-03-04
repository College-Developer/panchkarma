const menuToggleBtns = document.querySelectorAll(".mobile-menu span");
const mobileMenu = document.querySelector("ul.navbar-menu-mob");
const firstSlide = document.querySelector(".first");
const secondSlide = document.querySelector(".second");
const thirdSlide = document.querySelector(".third");
const slides = [firstSlide, thirdSlide, secondSlide];
const circularDiscs = document.querySelectorAll(".circular-disc span");
console.log(circularDiscs);


menuToggleBtns.forEach((menuToggleBtn) => {
  menuToggleBtn.addEventListener("click", () => {
    menuToggleBtns[0].classList.toggle("hidden");
    menuToggleBtns[1].classList.toggle("hidden");
    console.log(menuToggleBtns[0].classList.contains("hidden"));
    if(menuToggleBtns[0].classList.contains("hidden")){
      mobileMenu.style.transform = "translateX(0)";
    }
    else {
      mobileMenu.style.transform = "translateX(400px)";
    }
  });
});



let counter = 0;

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

function slideMove() {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

function slideValue(val) {
  counter = val;
  circularDiscs.forEach((disc) => {
    disc.classList.remove("active");
  })
  circularDiscs[val].classList.add("active");
  slideMove();
}


slideMove();


var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 80,
      modifier: 2,
      slideShadows: true
    },
    autoplay: {
      delay: "4000"
    },
    spaceBetween: 60,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
});

const wrapper = document.querySelector(".therapy-wrapper");
const carousel = document.querySelector(".therapy-carousel");
const arrowBtns = document.querySelectorAll(".nav-btn");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];
// console.log(carousel.children)
console.log(carouselChildrens);
// console.log(arrowBtns);
// console.log(firstCardWidth);
let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth) 

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

function dragStart(e) {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

function dragging(e) {
    if(!isDragging) return;
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}


function infiniteScroll() {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }// If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    if(!wrapper.matches(":hover")) autoPlay();
}

function autoPlay() {
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth
    }, 2500);
}

autoPlay();

arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        scrollValue = btn.id === "left" ? -firstCardWidth : firstCardWidth;
        // console.log(scrollValue);
        // console.log(carousel.scrollLeft);
        carousel.scrollLeft += scrollValue;
        // console.log(carousel.scrollLeft);
    })
})

carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
