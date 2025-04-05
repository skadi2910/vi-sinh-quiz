import { quiz_data } from "./quiz_data.js";

let currentQuestionIndex = 0;
let score = 0;

const questions = quiz_data;

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-box").innerText = `${question.question_number}: ${question.question}`;
  
  const optionsBox = document.getElementById("options-box");
  optionsBox.innerHTML = "";
  
  question.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = `${opt.option}. ${opt.text}`;
    btn.onclick = () => handleAnswer(opt.option, btn, question.correct_answer);
    optionsBox.appendChild(btn);
  });

  document.getElementById("next-btn").style.display = "none";
}

function handleAnswer(selected, button, correct) {
  const allButtons = document.querySelectorAll("#options-box button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    allButtons.forEach(btn => {
      if (btn.innerText.startsWith(correct)) {
        btn.classList.add("correct");
      }
    });
  }

  document.getElementById("next-btn").style.display = "block";
  document.getElementById("next-btn").onclick = showNext;
}

function showNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("question-box").innerText = "🎉 Quiz Complete!";
  document.getElementById("options-box").innerHTML = `<p>You got ${score} out of ${questions.length} correct.</p>`;
  document.getElementById("next-btn").style.display = "none";
}


// Init the quiz on page load
document.addEventListener("DOMContentLoaded", () => {
    showQuestion();
  });