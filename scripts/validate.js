// Скрипт "живой" валидации форм страницы

// Отображем поле с текстом ошибки поля ввода
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Скрываем поле с текстом ошибки поля ввода
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// Проверяем валидность поля ввода и вызываем функции отображения подсказок
function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Меняем активность кнопки сабмита
function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList, settings)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
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
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach(function(inputElement) {
    hideInputError(formElement, inputElement, settings); // скрываем ошибки до начала ввода в поля

    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

// Проверка всех форм страницы на валидность
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);

  });
};

const settingsPage = {
  formSelector: '.form', // класс форм на странице
  inputSelector: '.form__input', // класс полей ввода внутри форм
  submitButtonSelector: '.form__button-submit', // класс кнопок сабмита внутри форм
  inactiveButtonClass: 'popup__save-button_inactive', // класс со стилями неактивной кнопки сабмита
  inputErrorClass: 'form__input_error', // класс со стилями поля ввода с ошибкой
  errorClass: 'form__tip_active' // класс активной подсказки об ошибке
};

// Вызываем функцию влаидации с передачей настроек
enableValidation(settingsPage);
