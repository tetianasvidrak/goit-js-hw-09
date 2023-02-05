import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve({ position, delay });
  } else {
    // Reject
    return Promise.reject({ position, delay });
  }
}

const formRef = document.querySelector('.form');
const btnRef = document.querySelector('button');

const onFormSubmitHandler = event => {
  event.preventDefault();
  btnRef.disabled = true;
  const [delay, step, amount] = event.target.elements;
  for (let position = 0; position < amount.value; position++) {
    setTimeout(() => {
      createPromise(position, delay.value)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `Fulfilled promise ${position + 1} in ${
              Number(delay) + position * Number(step.value)
            }ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `Rejected promise ${position + 1} in ${
              Number(delay) + position * Number(step.value)
            }ms`
          );
        });
      if (amount.value - position < 2) {
        btnRef.disabled = false;
      }
    }, Number(delay.value) + position * Number(step.value));
  }
};

formRef.addEventListener('submit', onFormSubmitHandler);
