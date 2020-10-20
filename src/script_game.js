let option = [],
  currScore = 0;

const container = document.createElement("div");
container.classList.add("container");
container.setAttribute("id", "game-container");
document.body.appendChild(container);

const row1 = document.createElement("div");
row1.classList.add("row");
container.appendChild(row1);

const row1_col1 = document.createElement("div");
row1_col1.classList.add("col-9");
row1.appendChild(row1_col1);

const progressText = document.createElement("p");
progressText.classList.add("progressText");
row1_col1.appendChild(progressText);

const row1_col2 = document.createElement("div");
row1_col2.classList.add("col-3");
row1.appendChild(row1_col2);

const scoreText = document.createElement("p");
scoreText.classList.add("scoreText");
scoreText.innerHTML = "Score";
row1_col2.appendChild(scoreText);

const score = document.createElement("p");
score.classList.add("score");
score.innerText = 0;
row1_col2.appendChild(score);

const row2 = document.createElement("div");
row2.classList.add("row");
container.appendChild(row2);

const question = document.createElement("h4");
question.classList.add("col");
question.classList.add("question");
row2.appendChild(question);

const choice_text = document.createElement("div");
choice_text.classList.add("choice-text");
container.appendChild(choice_text);

const next_question = document.createElement("button");
next_question.classList.add("next-question", "btn", "btn-secondary");
next_question.innerText = "Next Question";

const finish_button = document.createElement("button");
finish_button.classList.add("finish-button", "btn", "btn-dark");
finish_button.innerText = "Finish Quiz";

async function getQuestions() {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    );
    if (response.status === 200) {
      const data = await response.json();
      return data.results;
    } else {
      throw Error("Request failure");
    }
  } catch (e) {
    console.log(e.message);
  }
}

for (let i = 0; i < 4; i++) {
  option[i] = document.createElement("button");
  option[i].classList.add("option", "btn");
  option[i].setAttribute("id", "option" + i);
  choice_text.appendChild(option[i]);

  option[i].addEventListener("click", (e) => {
    e.preventDefault();
    let id = option[i].getAttribute("id");
    if (id === "correct_answer") {
      option[i].classList.add("btn-success");
      currScore += 10;
      score.innerText = currScore;
      sessionStorage.setItem("score", currScore);
    } else {
      option[i].classList.add("btn-danger");
      let corr_id = document.querySelector("#correct_answer");
      corr_id.classList.add("btn-success");
    }

    const btns = document.querySelectorAll(".option");
    for (let b of btns) {
      b.disabled = true;
    }
    next_question.disabled = false;
    finish_button.disabled = false;
  });
}

const addOption = (currQuestion, quesNum, answers, optNum) => {
  selectRandom(answers, optNum);
  if (currQuestion[quesNum].correct_answer == option[optNum].innerText) {
    option[optNum].setAttribute("id", "correct_answer");
  } else {
    option[optNum].setAttribute("id", "option" + optNum);
  }
};

const getAnswers = (currQuestion, quesNum) => {
  let answers = new Array();

  answers.push(currQuestion[quesNum].correct_answer);
  answers.push(currQuestion[quesNum].incorrect_answers[0]);
  answers.push(currQuestion[quesNum].incorrect_answers[1]);
  answers.push(currQuestion[quesNum].incorrect_answers[2]);

  addOption(currQuestion, quesNum, answers, 0);
  addOption(currQuestion, quesNum, answers, 1);
  addOption(currQuestion, quesNum, answers, 2);
  addOption(currQuestion, quesNum, answers, 3);
};

const selectRandom = (answers, optionNum) => {
  let choice = Math.floor(Math.random() * answers.length);
  option[optionNum].innerHTML = answers[choice];
  answers.splice(choice, 1);
};

const showQuestion = (currQuestion, quesNum) => {
  progressText.innerText = "Question " + (quesNum + 1) + "/10";
  question.innerHTML = currQuestion[quesNum].question;

  getAnswers(currQuestion, quesNum);

  quesNum++;
  if (quesNum < 10) {
    container.appendChild(next_question);
    next_question.disabled = true;
    next_question.addEventListener("click", (event) => {
      event.preventDefault();
      next_question.disabled = false;
      for (let i = 0; i < 4; i++) {
        option[i].classList.remove("btn-success", "btn-danger");
      }
      const btns = document.querySelectorAll(".option");
      for (let b of btns) {
        b.disabled = false;
      }
      showQuestion(currQuestion, quesNum);
    });
  } else {
    container.removeChild(next_question);
    container.appendChild(finish_button);
    finish_button.disabled = true;
    finish_button.addEventListener("click", () => {
      window.open("end.html", "_self");
    });
  }
};

(async () => {
  try {
    sessionStorage.setItem("score", 0);
    const ques = await getQuestions();
    showQuestion(ques, 0);
  } catch (e) {
    next_question.disabled = false;
    finish_button.disabled = false;
    console.warn(e.message);
  }
})();
