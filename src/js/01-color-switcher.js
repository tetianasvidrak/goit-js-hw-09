const bodyRef = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onStartClickHandler = () => {
  startBtn.disabled = true;
  stoptBtn.disabled = false;
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStopClickHandler = () => {
  stoptBtn.disabled = true;
  startBtn.disabled = false;
  clearTimeout(timerId);
};

startBtn.addEventListener('click', onStartClickHandler);

stoptBtn.addEventListener('click', onStopClickHandler);
