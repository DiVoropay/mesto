import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submitForm }, selector) {
    super(selector);
    this._submit = submitForm;
    this._form = this._popup.querySelector('.form');
    this._submitBtn = this._popup.querySelector('.form__button-submit');
    this._baseTextBtn = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues(), this._submitBtn)
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
    this._submitBtn.textContent = this._baseTextBtn;
  }
}
