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
