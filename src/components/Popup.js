export class Popup {
  constructor (selector) {
    this._selector = selector;
  }


  close () {
    this._selector.closest('.popup').classList.remove('popup_opened');
  }

  _clickToClose(evt) {
    this.close();
  };

  _checkClickOverlay(evt) {
    const isForm = evt.target.closest('.form');
    const isViewer = evt.target.closest('.viewer__container');
    if (!isForm & !isViewer) {
      this.close();
    };
  };

  _handleEscClose (key) {
    if (key.code === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close();
    };
  }

  open () {
    this._selector.closest('.popup').classList.add('popup_opened');
  }

  setEventListeners () {
    this._selector.querySelector('.popup__close').addEventListener('click',  this.close.bind(this));
    this._selector.closest('.popup').addEventListener('click', this._checkClickOverlay.bind(this));
    window.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  removeEventListeners () {
    this._selector.querySelector('.popup__close').removeEventListener('click',  this.close.bind(this));
    this._selector.closest('.popup').removeEventListener('click', this._checkClickOverlay.bind(this));
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
  }



}
