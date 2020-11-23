// Передаем классы в переменные
let editProfileBtn = document.querySelector('.profile__edit-button');
let editProfileSaveBtn = document.querySelector('.popup__save-button');
let editProfileClose = document.querySelector('.popup__close');
let likeElement = document.querySelector('.element__like');

// Открываем и закрываем форму редактирования профиля
function renderPopup() {
  let popup = document.querySelector('.popup');

  popup.classList.toggle('popup_opened');
}

// Заполняем поля текущими данными
function fillPopup() {
  let nameProfile = document.querySelector('.profile__name');
  let descrProfile = document.querySelector('.profile__description');
  let editNameProfile = document.querySelector('.popup__edit-name');
  let editDescrProfile = document.querySelector('.popup__edit-description');

  editNameProfile.value = nameProfile.textContent;
  editDescrProfile.value = descrProfile.textContent;

  renderPopup()
}

// Сохраняем новые данные пользователя
function saveEdit() {
  let nameProfile = document.querySelector('.profile__name');
  let descrProfile = document.querySelector('.profile__description');
  let editNameProfile = document.querySelector('.popup__edit-name');
  let editDescrProfile = document.querySelector('.popup__edit-description');

  nameProfile.textContent = editNameProfile.value;
  descrProfile.textContent = editDescrProfile.value;

  renderPopup()
}

// Отмечаем лайк на элементе. Пока работает только с первым элементом, в планах доработка.
function markLike() {
  likeElement.classList.toggle('element__like_active');
}

// Слушаем клики по кнопкам
editProfileBtn.addEventListener('click', fillPopup);
editProfileSaveBtn.addEventListener('click', saveEdit);
editProfileClose.addEventListener('click', renderPopup);
likeElement.addEventListener('click', markLike);
