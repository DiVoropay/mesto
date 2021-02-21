export class Section {
  constructor({ items, renderer }, selector) {

    //this._items = items;
    this._renderer = renderer;
    this._sectionDOM = document.querySelector(selector);
  }

  addItem(newElement) {
    this._renderer(this._sectionDOM, newElement);
  }

  addArrItems() {
    //this._items.forEach((item) => this.addItem(item));
  }


}
