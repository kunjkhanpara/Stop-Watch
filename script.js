let timer;
let startTime;
let elapsedTime = 0;
let running = false;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resumeBtn = document.querySelector('.resume'); // Added resume button
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
  const date = new Date(ms);
  return date.toISOString().substr(11, 8);
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pauseTimer() {
  running = false;
  clearInterval(timer);
}

function resumeTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function lapTimer() {
  if (running) {
    const lapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(lapTime)}`;
    lapsList.prepend(lapItem);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer); // Added event listener for resume button
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
