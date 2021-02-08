class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector; // класс форм на странице
    this._inputSelector = settings.inputSelector; // класс полей ввода внутри форм
    this._submitButtonSelector = settings.submitButtonSelector; // класс кнопок сабмита внутри форм
    this._inactiveButtonClass = settings.inactiveButtonClass; // класс со стилями неактивной кнопки сабмита
    this._inputErrorClass = settings.inputErrorClass; // класс со стилями поля ввода с ошибкой
    this._errorClass = settings.errorClass; // класс активной подсказки об ошибке

    this._formElement = formElement; // Валидируемая форма
  }

  // Отображем поле с текстом ошибки поля ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрываем поле с текстом ошибки поля ввода
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Проверяем валидность поля ввода и вызываем функции отображения подсказок
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Меняем активность кнопки сабмита
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._getButtonForm().classList.add(this._inactiveButtonClass);
      this._getButtonForm().disabled = true;
    }
    else {
      this._getButtonForm().classList.remove(this._inactiveButtonClass);
      this._getButtonForm().disabled = false;
    }
  }

  // Возвращаем валидность формы на основе валидности её полей
  _hasInvalidInput() {
    return this._getInputsForm().some((input) => {
      return !input.validity.valid
    });
  }

  // Получаем инпуты формы
  _getInputsForm() {
    return Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  // Получаем кнопку формы
  _getButtonForm() {
    return this._formElement.querySelector(this._submitButtonSelector);
  }

  // Перебераем поля ввода формы и вешаем слушатель валидации и блокировки сабмита
  _setEventListeners() {

    this._toggleButtonState();

    this._getInputsForm().forEach((inputElement) => {
      this._hideInputError(inputElement); // скрываем ошибки до начала ввода в поля

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Внешний метод всех полей формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  // Внешний метод проверки валидности формы при открытии
  validationOpeningForm() {
    this._getInputsForm().forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  };
}

export { FormValidator };
