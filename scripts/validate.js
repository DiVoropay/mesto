function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__tip_active');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_error');
  errorElement.classList.remove('form__tip_active');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
  }
  else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
};

function hasInvalidInput(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid
  });
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button-submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);

  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'popup__input-error'
});
