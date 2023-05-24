


var startBtn = document.querySelector("#startQuiz");

var headerText = document.querySelector("h1");

var question = document.querySelector("#question");

var answers = document.querySelector("#answer-btn");



startBtn.addEventListener("click", function() {
    let timeLeft = 10;
    const timeElement = document.getElementById("time");
    startBtn.style.display = "none";
    headerText.style.display = "none";

    question.style.display = "block";
    answers.style.display = "block";

  
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
  });










