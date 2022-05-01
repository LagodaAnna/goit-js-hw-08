const throttle = require('lodash.throttle');

const FEEDBACK_FORM_KEY = 'feedback-form-state';
const storageFormValue = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[ name="email"]'),
  message: document.querySelector('[ name="message"]'),
};

refs.form.addEventListener('input', throttle(onInputForm, 500));
refs.form.addEventListener('submit', onSubmitForm);

populateForm();

function onSubmitForm(e) {
  e.preventDefault();
  console.log(storageFormValue);
  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_FORM_KEY);
}

function onInputForm(e) {
  e.target.name === 'email'
    ? (storageFormValue.email = e.target.value)
    : (storageFormValue.message = e.target.value);

  try {
    localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(storageFormValue));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function populateForm() {
  const saveData = localStorage.getItem(FEEDBACK_FORM_KEY);

  if (saveData) {
    try {
      const parseData = JSON.parse(saveData);
      refs.email.value = parseData.email;
      refs.message.value = parseData.message;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  }
}
