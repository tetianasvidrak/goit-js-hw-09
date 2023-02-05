import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.getElementById('datetime-picker');
const btnRef = document.querySelector('button[data-start');
const daysRef = document.querySelector('.value[data-days]');
const hoursRef = document.querySelector('.value[data-hours]');
const minRef = document.querySelector('.value[data-minutes]');
const secRef = document.querySelector('.value[data-seconds]');

btnRef.disabled = true;
let timerId = null;
let selectedTimeMs;
let currentTimeMs;

const addLeadingZero = value => {
  return String(value).length < 2 ? String(value).padStart(2, '0') : value;
};

const onCloseDateHandler = selectedDates => {
  currentTimeMs = new Date().getTime();
  selectedTimeMs = new Date(selectedDates[0]).getTime();
  if (currentTimeMs > selectedTimeMs) {
    btnRef.disabled = true;
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    btnRef.disabled = false;
  }
};

const flatpicker = flatpickr(inputRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseDateHandler,
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const onStartBtnHandler = () => {
  btnRef.disabled = true;
  let timeDifference = null;
  timerId = setInterval(() => {
    timeDifference = selectedTimeMs - new Date().getTime();
    if (timeDifference <= 0) {
      clearInterval(timerId);
      return Notiflix.Notify.success('Time is out!');
    }
    const data = convertMs(timeDifference);
    daysRef.textContent = addLeadingZero(data.days);
    hoursRef.textContent = addLeadingZero(data.hours);
    minRef.textContent = addLeadingZero(data.minutes);
    secRef.textContent = addLeadingZero(data.seconds);
  }, 1000);
};

btnRef.addEventListener('click', onStartBtnHandler);
