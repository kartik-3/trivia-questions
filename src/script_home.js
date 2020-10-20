const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

const heading = document.createElement("h1");
heading.classList.add("heading", "text-center");
heading.innerText = "Technology Quiz"
container.appendChild(heading);

const btn_div = document.createElement("div");
btn_div.classList.add("container", "btn-con");
container.appendChild(btn_div);

const play_button = document.createElement("button");
play_button.classList.add("homeButtons", "btn", "btn-primary");
play_button.setAttribute("id", "play");
play_button.innerText = "Play";
btn_div.appendChild(play_button);

play_button.addEventListener("click", () => {
    window.open("game.html", "_self");
})

const high_score_button = document.createElement("button");
high_score_button.classList.add("homeButtons", "btn", "btn-info");
high_score_button.setAttribute("id", "highScores");
high_score_button.innerText = "High Scores";
btn_div.appendChild(high_score_button);

high_score_button.addEventListener("click", () => {
    window.open("highscores.html", "_self");
})