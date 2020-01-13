const urlInput = document.getElementById("js-urlToShorten");
let lastCopiedBtn = null;

//-> EventListeners
document.getElementById("js-form").addEventListener("submit", handelFormSubmit);

//-> functions
function handelFormSubmit(e) {
  e.preventDefault();

  fetchAlink(urlInput.value);
  urlInput.value = "";
}

function fetchAlink(originalUrl) {
  const relInkAPIResponse = fetch("https://rel.ink/api/links/", {
    method: "POST",
    body: JSON.stringify({
      url: originalUrl,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  relInkAPIResponse
    .then(res => res.json())
    .then(res => {
      createLinkItem(res);
    });
}

function createNodeWithClassname(element, eleClassName) {
  const newElement = document.createElement(element);
  if (eleClassName !== "") newElement.className = eleClassName;

  return newElement;
}

function append(parent, el) {
  return parent.appendChild(el);
}

function createLinkItem(data) {
  const { url, hashid } = data;
  const domainName = "https://rel.ink/";
  const li = createNodeWithClassname("li", "link__wrapper");

  const oriUrl = createNodeWithClassname("a", "original__url");
  oriUrl.innerText = oriUrl.href = url;
  append(li, oriUrl);

  const shortenedUrl = createNodeWithClassname("a", "shortened__url");
  shortenedUrl.innerText = shortenedUrl.href = domainName + hashid;
  append(li, shortenedUrl);

  const copyBtn = createNodeWithClassname("button", "btn");
  copyBtn.dataset.link = shortenedUrl.href;
  copyBtn.addEventListener("click", handelCopyBtn);
  append(li, copyBtn);

  document.getElementById("js-links").prepend(li);
}

function handelCopyBtn(e) {
  let currentBtn = e.target;
  const link = currentBtn.dataset.link;

  if (currentBtn === lastCopiedBtn) return;
  navigator.clipboard.writeText(link);

  if (lastCopiedBtn !== null) {
    lastCopiedBtn.classList.remove("btn--copied");
  }

  currentBtn.classList.add("btn--copied");
  lastCopiedBtn = currentBtn;
}

// const linksList = [
//   {
//     originalUrl: "",
//     shortenedUrl: "",
//   }
// ];

// if (localStorage.getItem("linksList")) {
// }

// localStorage.setItem("linksList", linksList);
