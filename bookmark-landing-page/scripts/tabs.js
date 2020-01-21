const tabs = document.querySelectorAll(".js-tab");

tabs.forEach(tab => {
  tab.addEventListener("click", action);
});

function action(e) {
  const tab = e.target;
  const id = tab.dataset.panelId;
  const targetPanel = document.querySelector(`#${id}`);
  const activePanel = document.querySelector(".tabs__panel--selected");
  const activeTab = document.querySelector(".tab--active");

  if (targetPanel == activePanel) return;

  tab.classList.add("tab--active");
  activeTab.classList.remove("tab--active");
  activePanel.classList.remove("tabs__panel--selected");
  targetPanel.classList.add("tabs__panel--selected");
  targetPanel.animate(
    [
      { opacity: 0, transform: "translateY(6rem)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 500,
      easing: "ease-out",
    },
  );
}
