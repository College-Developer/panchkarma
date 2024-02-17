const menuToggleBtns = document.querySelectorAll(".mobile-menu span");
const mobileMenu = document.querySelector("ul.navbar-menu-mob");
console.log(menuToggleBtns);

menuToggleBtns.forEach((menuToggleBtn) => {
  menuToggleBtn.addEventListener("click", () => {
    menuToggleBtns[0].classList.toggle("hidden");
    menuToggleBtns[1].classList.toggle("hidden");
    console.log(menuToggleBtns[0].classList.contains("hidden"));
    if(menuToggleBtns[0].classList.contains("hidden")){
      // mobileMenu.style.display = "block";
      mobileMenu.style.transform = "translateX(0)";
    }
    else {
      mobileMenu.style.transform = "translateX(400px)";
    }
  });
});




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
