import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submitForm }, selector) {
    super(selector);
    this._selector = selector;
    this._submit = submitForm;
  }

  _getInputValues() {
    const arrInputs = this._selector.elements;
    console.log(arrInputs);
  }

  setEventListeners() {
    this._selector.addEventListener('submit', this._submit);
    super.setEventListeners();
  }

  close() {
    this._selector.reset();
    super.close();
  }
}
