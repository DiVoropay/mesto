class Card {
  constructor({ handleCardClick, handleRemoveClick, handleLikeClick, profileId }, item, templateClass) {
    this._id = item._id;
    this._title = item.name;
    this._linkImage = item.link;
    this._likes = item.likes;

    this._ownerId = item.owner._id;

    this._templateClass = templateClass;

    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
    this._profileId = profileId;

    this._isLiked = false;
    this._elementLikeBtn;
    this._elementLikeCount;

  }

  _getMarkupElement() {
    const elementTemplate = document.querySelector(this._templateClass).content;

    return elementTemplate.cloneNode(true);
  };

  _removeElement(evt) {
    evt.target.closest('.element').remove();
  };

  _getLikes(likes) {
    if (likes.find((item) => item._id === this._profileId)) {
      this._isLiked = true;
      this._elementLikeBtn.classList.add('element__like_active');
    } else {
      this._isLiked = false;
      this._elementLikeBtn.classList.remove('element__like_active');
    }
    this._elementLikeCount.title = likes.reduce((list, item) => { return list + item.name + '\n' }, '');
    this._elementLikeCount.textContent = likes.length;
  }

  _setEventListeners() {
    const elementTrashBtn = this._element.querySelector('.element__trash');
    this._elementLikeBtn = this._element.querySelector('.element__like');
    const elementImage = this._element.querySelector('.element__image');

    this._elementLikeCount = this._element.querySelector('.element__like-count');

    this._elementLikeBtn.addEventListener('click', (evt) => {
      this._handleLikeClick(this._id, this._isLiked).
        then((likes) => { this._getLikes(likes) })
    });

    elementImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._linkImage);
    });

    elementTrashBtn.addEventListener('click', (evt) => {
      this._handleRemoveClick(this._id);
      this._removeElement(evt);
    });
  }


  makeNewElement() {
    this._element = this._getMarkupElement();
    this._setEventListeners();

    const elementTrashBtn = this._element.querySelector('.element__trash');
    if (this._profileId === this._ownerId) {
    } else {
      elementTrashBtn.remove();
    }

    this._getLikes(this._likes);

    const elementTitle = this._element.querySelector('.element__title');
    const elementImage = this._element.querySelector('.element__image');

    elementTitle.textContent = this._title;
    elementTitle.title = this._title;
    elementImage.alt = `Фотография ${this._title}`;
    elementImage.src = this._linkImage;

    return this._element;
  };
}

export { Card };
