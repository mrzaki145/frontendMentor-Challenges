const body = document.body;
const navList = body.querySelector(".nav__list");
const navBtn = body.querySelector(".nav__btn");

navBtn.addEventListener("click", (e) => {
  navList.classList.toggle("open");
  navBtn.classList.toggle("open");
});
