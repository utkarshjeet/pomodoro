let workMinutes = 30;
let breakMinutes = 5;
let isWorkTime = true;
let timer;
let secondsLeft = workMinutes * 60;
let isPaused = false;

const workInput = document.getElementById("workTime");
const breakInput = document.getElementById("breakTime");
const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const alarm = document.getElementById("alarmSound");

function updateDisplay() {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Pomodoro`;
}

function startTimer() {
  if (timer) return; // already running
  isPaused = false;
  timer = setInterval(() => {
    if (!isPaused) {
      secondsLeft--;
      updateDisplay();
      if (secondsLeft <= 0) {
        alarm.play();
        switchMode();
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = false;
  pauseBtn.textContent = "Pause";
  isWorkTime = true;
  secondsLeft = workMinutes * 60;
  modeDisplay.textContent = "Mode: Work";
  updateDisplay();
}

function switchMode() {
  isWorkTime = !isWorkTime;
  if (isWorkTime) {
    secondsLeft = workMinutes * 60;
    modeDisplay.textContent = "Mode: Work";
  } else {
    secondsLeft = breakMinutes * 60;
    modeDisplay.textContent = "Mode: Break";
  }
  updateDisplay();
}

startBtn.addEventListener("click", () => {
  workMinutes = parseInt(workInput.value) || 30;
  breakMinutes = parseInt(breakInput.value) || 5;
  if (!timer) {
    secondsLeft = isWorkTime ? workMinutes * 60 : breakMinutes * 60;
  }
  startTimer();
});

pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
