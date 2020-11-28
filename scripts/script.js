// Передаем классы в переменные
let editProfileBtn = document.querySelector('.profile__edit-button');
let editProfileForm = document.querySelector('.popup__container');
let editProfileClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name');
let descrProfile = document.querySelector('.profile__description');
let editNameProfile = popup.querySelector('.popup__edit-name');
let editDescrProfile = popup.querySelector('.popup__edit-description');


// Открываем и закрываем форму редактирования профиля
function renderPopup() {
  popup.classList.toggle('popup_opened');
}

// Заполняем поля текущими данными
function fillPopup() {
  editNameProfile.value = nameProfile.textContent;
  editDescrProfile.value = descrProfile.textContent;

  renderPopup()
}

// Сохраняем новые данные пользователя
function saveEdit(evt) {
  evt.preventDefault();

  nameProfile.textContent = editNameProfile.value;
  descrProfile.textContent = editDescrProfile.value;

  renderPopup()
}

// Слушаем клики по кнопкам
editProfileBtn.addEventListener('click', fillPopup);
editProfileForm.addEventListener('submit', saveEdit);
editProfileClose.addEventListener('click', renderPopup);
