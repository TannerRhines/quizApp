var startBtn = document.querySelector("#startQuiz");
var headerText = document.querySelector("h1");
var question = document.querySelector("#question");
var answerButtonsElement = document.getElementById('answer-btn');






startBtn.addEventListener("click", function() {
  let timeLeft = 70;
  const timeElement = document.getElementById("time");
  startBtn.style.display = "none";
  headerText.style.display = "none";
  question.style.display = "block";
  answerButtonsElement.style.display = "block";

  function countdown() {
    timeLeft--;
    timeElement.innerHTML = String(timeLeft);
    if (timeLeft > 0) {
      setTimeout(countdown, 1000);
    } else {
      headerText.innerHTML = "Time is up!";
    }
  }

  setTimeout(countdown, 1000);
  showQuestion();
});

















const questions = [
  {
    question: "What is an apple?",
    answers: [
      { text: 'fruit', correct: true },
      { text: 'vegetable', correct: false },
      { text: 'rock', correct: false },
      { text: 'animal', correct: false }
    ]
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: 'Paris', correct: true },
      { text: 'London', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false }
    ]
  }
];



