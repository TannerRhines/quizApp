
const questions = [
  // Your questions and answers go here
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
  question: "What is lettuce?",
  answers: [
      { text: 'fruit', correct: false },
      { text: 'vegetable', correct: true },
      { text: 'rock', correct: false },
      { text: 'animal', correct: false }
  ]
},
{
  question: "What is the capital of Russia?",
  answers: [
      { text: 'Paris', correct: false },
      { text: 'London', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Moscow', correct: true }
  ]
},

];





const initialCountdown = 70;
const timePenalty = 10;

let timer;
let score;
let currentQuestionIndex;
let intervalId;

var startBtn = document.getElementById('start');
var quiz = document.getElementById('quiz');
var questionContainer = document.getElementById('question-container');
var countdownEl = document.getElementById('countdown');
var currentScoreEl = document.getElementById('current-score');
var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');
var finalScoreEl = document.getElementById('final-score');
var resultEl = document.getElementById('result');
var initialsEl = document.getElementById('initials');
var saveScoreBtn = document.getElementById('save-score');
var timeOutMessageEl = document.getElementById('time-out-message');
var highscoresLink = document.getElementById('highscores-link');
var highscoresDisplay = document.getElementById('highscores-display');
var highscoresListEl = document.getElementById('highscores-list');
var feedbackEl = document.getElementById('feedback');
var backLink = document.getElementById('back-link');

startBtn.addEventListener('click', startQuiz);
saveScoreBtn.addEventListener('click', saveScore);
highscoresLink.addEventListener('click', toggleHighscores);


function startQuiz() {
  timer = initialCountdown;
  score = 0;
  currentQuestionIndex = 0;

  startBtn.style.display = 'none';
  finalScoreEl.style.display = 'none';
  countdownEl.textContent = timer;
  currentScoreEl.textContent = score;
  questionContainer.style.display = 'block';

  intervalId = setInterval(updateTimer, 1000);

  showNextQuestion();
}


function updateTimer() {
  timer--;
  countdownEl.textContent = timer;

  if (timer <= 0) {
      endQuiz();
  }
}

function showNextQuestion() {
  if (currentQuestionIndex >= questions.length) {
      endQuiz();
      return;
  }

  const question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;

  answersEl.innerHTML = '';
  question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.addEventListener('click', selectAnswer);
      answersEl.appendChild(button);
  });
}


function selectAnswer(event) {
  const selectedButton = event.target;
  const answerText = selectedButton.textContent;
  const question = questions[currentQuestionIndex];

  const answer = question.answers.find(answer => answer.text === answerText);

  if (answer.correct) {
      score += 10;
      feedbackEl.textContent = 'Correct!';
  } else {
      timer -= timePenalty;
      feedbackEl.textContent = 'Incorrect!';
  }

  currentScoreEl.textContent = score;
  currentQuestionIndex++;
  showNextQuestion();
}





function endQuiz() {
  clearInterval(intervalId);
  questionContainer.style.display = 'none';
  resultEl.textContent = score;
  finalScoreEl.style.display = 'block';

  if (timer <= 0) {
      timeOutMessageEl.style.display = 'block';
  }
}


function saveScore() {
  const initials = initialsEl.value;
  if (initials === '') return;

  let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscores.push({ initials, score });
  localStorage.setItem('highscores', JSON.stringify(highscores));

  initialsEl.value = '';
  startBtn.style.display = 'block';
  finalScoreEl.style.display = 'none';
}



  
  
  
  backLink.addEventListener('click', () => {
      quiz.style.display = 'block';
      highscoresDisplay.style.display = 'none';
      highscoresLink.textContent = 'High Scores';
      backLink.style.display = 'none';
  });