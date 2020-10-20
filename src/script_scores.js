let row = [],
  colName = [],
  colScore = [];

const container = document.createElement("div");
container.classList.add("container");
container.setAttribute("id", "scores-container");
document.body.appendChild(container);

const title = document.createElement("h1");
title.classList.add("score-title");
title.innerText = "High Scores";
container.appendChild(title);

const items = { ...localStorage };
const sorted_items = Object.entries(items).sort((a, b) => b[1] - a[1]);

const list = document.createElement("div");
list.classList.add("list");
container.appendChild(list);

for (let i in sorted_items) {
  let curr_item = sorted_items[i];
  row[i] = document.createElement("div");
  row[i].classList.add("row");
  list.appendChild(row[i]);

  colName[i] = document.createElement("div");
  colName[i].classList.add("col", "colName");
  colName[i].innerText = curr_item[0];
  row[i].appendChild(colName[i]);

  colScore[i] = document.createElement("div");
  colScore[i].classList.add("col", "colScore");
  colScore[i].innerText = curr_item[1];
  row[i].appendChild(colScore[i]);
}

const home = document.createElement("button");
home.classList.add("home", "btn", "btn-primary");
home.innerText = "Go Home";
container.appendChild(home);

home.addEventListener("click", () => {
  window.open("index.html", "_self");
});
