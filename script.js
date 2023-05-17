


var startBtn = document.querySelector("button");

var headerText = document.querySelector("h1");



startBtn.addEventListener("click", function() {
    let timeLeft = 10;
    const timeElement = document.getElementById("time");
  
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










