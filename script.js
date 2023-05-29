
const questions = [
  // these are the questions we're asking in our question index, true makes the correct answer 
  {
  question: "What is JavaScript primarily used for?",
  answers: [
      { text: 'web pages', correct: true },
      { text: 'machine learning', correct: false },
      { text: 'gaming', correct: false },
      { text: 'databases', correct: false }
  ]
},
{
  question: "What does .pop() do to an array?",
  answers: [
      { text: 'removes the last element', correct: true },
      { text: 'removes the first element', correct: false },
      { text: 'nothing', correct: false },
      { text: 'all of the above', correct: false }
  ]
},
{
  question: "What does CSS stand for?",
  answers: [
      { text: 'Cookie Software Style', correct: false },
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Cascade Super Style', correct: false },
      { text: 'Cascading Super Sheet', correct: false }
  ]
},
{
  question: "What is HTML",
  answers: [
      { text: 'Really Complicated', correct: false },
      { text: 'Gaming Language', correct: false },
      { text: 'ML language', correct: false },
      { text: 'Markup Language', correct: true }
  ]
},

];




// default time and penalty for a wrong question
const initialCountdown = 60;
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



// start the quiz, show questions and update timer
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

// updates value of timer and ends quiz if timer = 0 
function updateTimer() {
  timer--;
  countdownEl.textContent = timer;

  if (timer <= 0) {
      endQuiz();
  }
}
// shows next question in index of questions and button logic 
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

// if correct A is selected, add points, and show next question in Q index

// if A is incorrect, invoke time penalty
function selectAnswer(event) {
  const selectedButton = event.target;
  const answerText = selectedButton.textContent;
  const question = questions[currentQuestionIndex];

  const answer = question.answers.find(answer => answer.text === answerText);


  // feedback states if previous question was correct or incorrect
  if (answer.correct) {
      score += 10;
      feedbackEl.textContent = 'Correct!';
  } else {
      timer -= timePenalty;
      feedbackEl.textContent = 'Incorrect!';
  }

  currentScoreEl.textContent = score;
  // update score ^ 
  currentQuestionIndex++;
  
  showNextQuestion();
}




// ends quiz -- displays final score and hides question container
function endQuiz() {
  clearInterval(intervalId);
  questionContainer.style.display = 'none';
  resultEl.textContent = score;
  finalScoreEl.style.display = 'block';

  if (timer <= 0) {
      timeOutMessageEl.style.display = 'block';
  }
}

// saves score and pushes JSON to local storage
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

// logic to view high scores and pull scores from storage 
function toggleHighscores(event) {
  event.preventDefault();
  
  const isHighscores = highscoresLink.textContent === 'High Scores';
  highscoresLink.textContent = isHighscores ? 'Back' : 'High Scores';
  backLink.style.display = isHighscores ? 'block' : 'none';
  
  if (isHighscores) {
  clearInterval(intervalId);
  quiz.style.display = 'none';
  highscoresDisplay.style.display = 'block';
  
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscores.sort((a, b) => b.score - a.score);  
  // sorts the high scores from highest to lowest ^
  
  highscoresListEl.innerHTML = '';
  highscores.forEach(score => {
      const li = document.createElement('li');
      li.textContent = `${score.initials}: ${score.score}`;
      highscoresListEl.appendChild(li);
  });
  } else {
  quiz.style.display = 'block';
  highscoresDisplay.style.display = 'none';
  startBtn.style.display = 'block';
  finalScoreEl.style.display = 'none';
  }
  }



  
// back button to exit high scores and restart the quiz 
  
  backLink.addEventListener('click', () => {
      quiz.style.display = 'block';
      highscoresDisplay.style.display = 'none';
      highscoresLink.textContent = 'High Scores';
      backLink.style.display = 'none';
  });