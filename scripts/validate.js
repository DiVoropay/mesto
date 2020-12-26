// Скрипт "живой" валидации форм страницы

// Отображем поле с текстом ошибки поля ввода
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__tip_active');
};

// Скрываем поле с текстом ошибки поля ввода
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_error');
  errorElement.classList.remove('form__tip_active');
  errorElement.textContent = '';
};

// Проверяем валидность поля ввода и вызываем функции обображения подсказок
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Меняем активность кнопки сабмита
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.disabled = false;
  }
};

// Возвращаем валидность формы на основе валидности её полей
function hasInvalidInput(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid
  });
};

// Перебераем поля ввода формы и вешаем слушатель валидации и блокировки сабмита
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

// Проверка всех форм страницы на валидность
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);

  });
};

// Вызываем функцию влаидации с передачей настроек
.enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__tip_active'
});
