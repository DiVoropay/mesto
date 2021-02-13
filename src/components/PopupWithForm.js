import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submitForm }, selector) {
    super(selector);
    this._submit = submitForm;
  }

  _getInputValues() {
    this._inputList = this._popupInclude.querySelectorAll('.form__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    this._popupInclude.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    this._popupInclude.reset();
    super.close();
  }
}
