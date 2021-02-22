export class Section {
  constructor({ renderer }, selector) {

    this._renderer = renderer;
    this._sectionDOM = document.querySelector(selector);
  }

  addItem(newElement) {
    this._renderer(this._sectionDOM, newElement);
  }

}
