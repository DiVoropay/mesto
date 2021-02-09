export class Popup {
  constructor(selector) {
    this._selector = selector;
    this.close = this.close.bind(this);
    this._checkClickOverlay = this._checkClickOverlay.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  close() {
    this._selector.closest('.popup').classList.remove('popup_opened');
    this.removeEventListeners();
  }

  _checkClickOverlay(evt) {
    const isForm = evt.target.closest('.form');
    const isViewer = evt.target.closest('.viewer__container');
    if (!isForm & !isViewer) {
      this.close();
      this.removeEventListeners();
    };
  };

  _handleEscClose(key) {
    if (key.code === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close();
    };
  }

  open() {
    this._selector.closest('.popup').classList.add('popup_opened');
  }

  setEventListeners() {
    this._selector.querySelector('.popup__close').addEventListener('click', this.close);
    this._selector.closest('.popup').addEventListener('click', this._checkClickOverlay);
    window.addEventListener('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this._selector.querySelector('.popup__close').removeEventListener('click', this.close);
    this._selector.closest('.popup').removeEventListener('click', this._checkClickOverlay);
    window.removeEventListener('keydown', this._handleEscClose);
  }

}
