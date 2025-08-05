const API_KEY = "YOUR_API_KEY"; // Replace with your real API key
const API_URL = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=1`;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const correctEl = document.getElementById("correct-count");
const incorrectEl = document.getElementById("incorrect-count");

let correctAnswerKey = "";
let score = { correct: 0, incorrect: 0 };

async function loadQuestion() {
  nextBtn.disabled = true;
  questionEl.textContent = "Loading...";
  answersEl.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const question = data[0];

    questionEl.textContent = question.question;
    const correctKeys = Object.entries(question.correct_answers).filter(([key, val]) => val === "true");
    correctAnswerKey = correctKeys.length > 0 ? correctKeys[0][0].split("_")[0] : "";

    for (const [key, answer] of Object.entries(question.answers)) {
      if (answer) {
        const li = document.createElement("li");
        li.textContent = answer;
        li.classList.add("answer");
        li.dataset.key = key;
        li.addEventListener("click", () => handleAnswer(li, key));
        answersEl.appendChild(li);
      }
    }
  } catch (err) {
    questionEl.textContent = "Failed to load question. Try again.";
  }
}

function handleAnswer(selectedEl, selectedKey) {
  const isCorrect = selectedKey === correctAnswerKey;
  selectedEl.style.backgroundColor = isCorrect ? "#a8e6cf" : "#ff8b94";

  if (isCorrect) {
    score.correct++;
  } else {
    score.incorrect++;
  }

  updateScore();
  disableAnswers();
  nextBtn.disabled = false;
}

function disableAnswers() {
  document.querySelectorAll(".answer").forEach(el => {
    el.style.pointerEvents = "none";
  });
}

function updateScore() {
  correctEl.textContent = score.correct;
  incorrectEl.textContent = score.incorrect;
}

nextBtn.addEventListener("click", () => {
  loadQuestion();
});

loadQuestion();
