import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._viewerTitle = this._popup.querySelector('.viewer__title');
    this._viewerImage = this._popup.querySelector('.viewer__image');
  }

  open(imageName, imageSrc) {

    this._viewerTitle.textContent = imageName;
    this._viewerImage.src = imageSrc;
    this._viewerImage.alt = `Фотография ${imageName}`;

    super.open();
  }

}
