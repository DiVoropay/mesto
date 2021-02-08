class Card {
  constructor({ handleCardClick }, nameValue, linkValue, templateClass) {
    this._title = nameValue;
    this._linkImage = linkValue;
    this._templateClass = templateClass;
    this._handleCardClick = handleCardClick; // записываем внешнюю функцию отрисовки попапа
  }

  // Получаем разметку карточки по наименованию классу тега
  _getMarkupElement() {
    const elementTemplate = document.querySelector(this._templateClass).content;

    return elementTemplate.cloneNode(true);
  };

  // Переключаем лайк на карточке
  _toggleLikeElement(evt) {
    evt.target.classList.toggle('element__like_active');
  };

  // Удаляем карточку
  _removeElement(evt) {
    evt.target.closest('.element').remove();
  };

  // Цепляем слушателей событий на кнопки элемента
  _setEventListeners() {
    const elementTrashBtn = this._element.querySelector('.element__trash'); // находим кнопку корзины/удаления
    const elementLikeBtn = this._element.querySelector('.element__like'); // находим кнопку лайка
    const elementImage = this._element.querySelector('.element__image'); // находим в полученной разметке изображение

    elementLikeBtn.addEventListener('click', (evt) => {
      this._toggleLikeElement(evt);
    });

    elementImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._linkImage);
    });

    elementTrashBtn.addEventListener('click', (evt) => {
      this._removeElement(evt);
    });
  }

  // Внешний метод заполнения новой карточки по наименованию и ссылке на изображение
  makeNewElement() {
    this._element = this._getMarkupElement(); // получаем разметку элемента
    this._setEventListeners();

    const elementTitle = this._element.querySelector('.element__title'); // находим в полученной разметке заголовок
    const elementImage = this._element.querySelector('.element__image'); // находим в полученной разметке изображение

    elementTitle.textContent = this._title; // записываем заголовок нового элемента
    elementTitle.title = this._title; // накидываем всплывающий тайтл для случаев длинных заголовков
    elementImage.alt = `Фотография ${this._title}`; // накидываем альт изображению
    elementImage.src = this._linkImage; // записываем путь к изображению

    return this._element;
  };
}

export { Card };
