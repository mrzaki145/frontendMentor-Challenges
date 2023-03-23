import reports from "./data.json" assert { type: "json" };

const DOM = {
  timeFramesList: document.querySelector("#time-frames-list"),
  reportsEL: document.querySelector("#reports"),
  reportTemplate: document.querySelector("#reportTemplate"),
};
let selectedTimeFrameEl;

document.addEventListener("DOMContentLoaded", init);
DOM.timeFramesList.addEventListener("click", updateReports);

function init() {
  selectedTimeFrameEl = document.querySelector(
    '.filter-list__btn[aria-pressed="true"]'
  );

  showReports();
}

function updateReports({ target }) {
  if (
    !target.matches("button") ||
    target.matches('button[aria-pressed="true"]')
  )
    return;

  selectedTimeFrameEl.removeAttribute("aria-pressed");
  selectedTimeFrameEl = target;
  selectedTimeFrameEl.setAttribute("aria-pressed", "true");

  showReports();
}

function showReports() {
  const reportsFrag = document.createDocumentFragment();
  const { timeFrame } = selectedTimeFrameEl.dataset;

  reports.forEach((report) => {
    const reportEL = document.importNode(DOM.reportTemplate.content, true);

    reportEL.querySelector(".card").classList.add(report.title.toLowerCase());
    reportEL.querySelector(".card__title").textContent = report.title;
    reportEL.querySelector(
      ".card__current-time"
    ).textContent = `${report.timeframes[timeFrame].current}hrs`;
    reportEL.querySelector(
      ".card__previous-time"
    ).textContent = `Last week - ${report.timeframes[timeFrame].previous}hrs`;

    reportsFrag.append(reportEL);
  });

  DOM.reportsEL.innerHTML = "";
  DOM.reportsEL.append(reportsFrag);
}
