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

