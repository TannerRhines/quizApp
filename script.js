var startBtn = document.querySelector("#startQuiz");
var headerText = document.querySelector("h1");
var question = document.querySelector("#question");
var answerButtonsElement = document.getElementById('answer-btn');
var currentQuestionIndex = 0;
var lastQA = document.querySelector("#lastQuestionAnswer");
var currentScore = document.querySelector("#currentScore");
var point = 10;
var timeLeft = 70; // Declare timeLeft as a global variable

startBtn.addEventListener("click", function() {
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

function showQuestion() {
  var questionText = document.getElementById("question");
  questionText.innerText = questions[currentQuestionIndex].question;

  var answerButtonsHTML = '';
  questions[currentQuestionIndex].answers.forEach(answer => {
    answerButtonsHTML += '<button class="btn">' + answer.text + '</button>';
  });
  answerButtonsElement.innerHTML = answerButtonsHTML;

  var answerButtons = answerButtonsElement.querySelectorAll('.btn');
  answerButtons.forEach(button => {
    button.addEventListener('click', selectAnswer);
  });
}


function selectAnswer(event) {
  var selectedButton = event.target;
  var correct = questions[currentQuestionIndex].answers.some(answer => answer.text === selectedButton.innerText && answer.correct);
  if (correct) {
    // Handle correct answer logic here
    lastQA.innerText = "Correct";
    currentScore.innerHTML = "Score: " + point;
  } else {
    // Handle wrong answer logic here
    lastQA.innerText = "Incorrect";
    timeLeft -= 10;
  }

  // Increase the currentQuestionIndex to move to the next question
  currentQuestionIndex++;

  // Display the next question
  showQuestion();
}

function quizOver() {
  // Quiz is completed, perform actions here
  headerText.innerHTML = "Quiz completed!";
  answerButtonsElement.innerHTML = ""; // Clear the answer buttons
  // You can calculate the final score or display a message, etc.
}



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
  },
  {
    question: "What is CSS?",
    answers: [
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Unsure', correct: false },
      { text: 'Machine Learning Language', correct: false },
      { text: 'AWS App', correct: false }
    ]
  },
  {
    question: "What is Javascript used for?",
    answers: [
      { text: 'web dev', correct: true },
      { text: 'gaming', correct: false },
      { text: 'styling', correct: false },
      { text: 'robotics', correct: false }
    ]
  }
];

