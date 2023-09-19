const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

let startTime;
let running = false;
let laps = [];

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  return date.toISOString().substr(11, 8);
}

function updateDisplay() {
  const elapsed = running ? Date.now() - startTime : 0;
  display.textContent = formatTime(elapsed);
}

function toggleStartStop() {
  if (running) {
    running = false;
    startStopButton.textContent = 'Start';
  } else {
    running = true;
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((sum, lap) => sum + lap, 0) : 0);
    startStopButton.textContent = 'Stop';
  }
}

function reset() {
  running = false;
  startTime = null;
  laps = [];
  startStopButton.textContent = 'Start';
  display.textContent = formatTime(0);
  lapsList.innerHTML = '';
}

function lap() {
  if (running) {
    const elapsed = Date.now() - startTime;
    laps.push(elapsed);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsed)}`;
    lapsList.appendChild(lapItem);
  }
}

startStopButton.addEventListener('click', toggleStartStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

setInterval(updateDisplay, 10);