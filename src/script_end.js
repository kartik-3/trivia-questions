const final_score = sessionStorage.getItem("score");

const container = document.createElement("div");
container.classList.add("container");
container.setAttribute("id", "end-container")
document.body.appendChild(container);

const score = document.createElement("p");
score.classList.add("final-score");
score.innerText = final_score;
container.appendChild(score);

const name = document.createElement("input");
name.classList.add("name");
name.setAttribute("type", "text");
container.appendChild(name);

const save = document.createElement("button");
save.classList.add("save", "btn", "btn-warning");
save.innerText = "Save";
save.disabled = true;
container.appendChild(save);

const high_score_button = document.createElement("button");
high_score_button.classList.add("homeButtons", "btn", "btn-success");
high_score_button.setAttribute("id", "highScores");
high_score_button.innerText = "High Scores";
container.appendChild(high_score_button);

const play_again = document.createElement("button");
play_again.classList.add("play-again", "btn", "btn-primary");
play_again.innerText = "Play Again";
container.appendChild(play_again);

const home = document.createElement("button");
home.classList.add("home", "btn", "btn-primary");
home.innerText = "Go Home";
container.appendChild(home);

name.addEventListener("keyup", () => {
  if (name.value === "") {
    save.disabled = true;
  } else {
    save.disabled = false;
  }
});

save.addEventListener("click", () => {
  localStorage.setItem(name.value, final_score);
  sessionStorage.setItem("score", 0);
  save.disabled = true;
});

play_again.addEventListener("click", () => {
  window.open("game.html", "_self");
});

high_score_button.addEventListener("click", () => {
    window.open("highscores.html", "_self");
})

home.addEventListener("click", () => {
  window.open("index.html", "_self");
});
