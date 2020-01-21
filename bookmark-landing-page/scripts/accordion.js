const accordion = document.getElementById("accordion");
const accordionBtns = accordion.querySelectorAll(".js-accordion_btn");

//-> Event Listener
document.addEventListener("DOMContentLoaded", _ => {
  setHeight();
});

accordionBtns.forEach(btn => {
  btn.addEventListener("click", takeAction);
});

//-> Functions
function takeAction() {
  const accordionItem = this.parentElement;
  const accordionContent = accordionItem.querySelector(".js-accordion_content");
  const openedItem =
    accordion.querySelector(".accordion__item--is-open") || null;

  setHeight();

  if (openedItem === null) {
    showContent();
  } else {
    if (openedItem === accordionItem) {
      hideContent();
    } else {
      hideContent();
      showContent();
    }
  }

  function showContent() {
    accordionContent.style.height = `${accordionContent.dataset.height}px`;
    accordionItem.classList.add("accordion__item--is-open");
  }

  function hideContent() {
    openedItem.querySelector(".accordion__content").style.height = 0;
    openedItem.classList.remove("accordion__item--is-open");
  }
}

function setHeight() {
  accordion.querySelectorAll(".js-accordion_content").forEach(item => {
    const h = Math.max(item.clientHeight, item.offsetHeight, item.scrollHeight);
    item.dataset.height = h;
    item.style.height = 0;
  });
}
