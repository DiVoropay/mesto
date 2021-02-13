export class Popup {
  constructor(selector) {
    this._popup  = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }

  _checkClickOverlay(evt) {
    const isForm = evt.target.closest('.form');
    const isViewer = evt.target.closest('.viewer__container');
    if (!isForm & !isViewer) {
      this.close();
    };
  };

  _handleEscClose(key) {
    if (key.code === 'Escape') {
      this.close();
    };
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._checkClickOverlay.bind(this));
  }


}
