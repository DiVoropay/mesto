import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submitForm }, selector) {
    super(selector);
    this._submit = submitForm;
    this._form = this._popup.querySelector('.form');
    this._submitBtn = this._popup.querySelector('.form__button-submit');
    this._baseTextBtn = this._submitBtn.textContent;
    this._afterSabmit;
    this._handleItemId;
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
      this._submit({
        formValues: this._getInputValues(),
        button: this._submitBtn,
        action: this._afterSabmit,
        cardId: this._handleItemId
      });
      this._afterSabmit = undefined;
      this._handleItemId = undefined;
    });
    super.setEventListeners();
  }

  open(cardId, action) {
    this._afterSabmit = action;
    this._handleItemId = cardId;
    super.open();
  }

  close(timeout) {
    this._form.reset();
    setTimeout(
      () => { super.close() },
      timeout
    );
    setTimeout(
      () => { this._submitBtn.textContent = this._baseTextBtn },
      timeout * 2
    );
  }
}
