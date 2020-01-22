document.querySelector(".hamburger").addEventListener("click", toggleMenu);

function toggleMenu() {
  const nav = document.querySelector(".nav");

  if (!document.querySelector(".menu-active")) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "auto";
  }

  nav.classList.toggle("menu-active");
}
