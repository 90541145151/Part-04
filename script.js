const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "2005"],
    answer: "1995"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size"],
    answer: "font-size"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = option;
    div.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
    });
    optionsEl.appendChild(div);
  });
}

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = `Your score: ${score} / ${quizData.length}`;
}

nextBtn.addEventListener('click', () => {
  const selectedOption = document.querySelector('.option.selected');
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  if (selectedOption.textContent === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
});
