import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Передаем классы в переменные
const elements = document.querySelector('.elements');

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const editProfileClose = editProfileForm.querySelector('.popup__close');
const editProfileName = editProfileForm.querySelector('.popup__edit-name');
const editProfileDescr = editProfileForm.querySelector('.popup__edit-description');

const nameProfile = document.querySelector('.profile__name');
const descrProfile = document.querySelector('.profile__description');

const addCardBtn = document.querySelector('.profile__add-button');
const addCardForm = document.forms['add-card'];
const addCardClose = addCardForm.querySelector('.popup__close');
const addCardName = addCardForm.querySelector('.popup__edit-name');
const addCardLink = addCardForm.querySelector('.popup__edit-description');

const viewerPopup = document.querySelector('.viewer');
const viewerClose = viewerPopup.querySelector('.popup__close');
const viewerTitle = viewerPopup.querySelector('.viewer__title');
const viewerImage = viewerPopup.querySelector('.viewer__image');

// Описываем настройки необходимые для валидации форм
const settingsPage = {
  formSelector: '.form', // класс форм на странице
  inputSelector: '.form__input', // класс полей ввода внутри форм
  submitButtonSelector: '.form__button-submit', // класс кнопок сабмита внутри форм
  inactiveButtonClass: 'popup__save-button_inactive', // класс со стилями неактивной кнопки сабмита
  inputErrorClass: 'form__input_error', // класс со стилями поля ввода с ошибкой
  errorClass: 'form__tip_active' // класс активной подсказки об ошибке
};

// Проверка всех форм страницы на валидность
function enableValidationAll(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(function(formElement) {
    const form = new FormValidator (settings, formElement);
    form.enableValidation();
  });
};

// Вызываем функцию валидации с передачей настроек
enableValidationAll(settingsPage);

// Универсальная функция добавления переданного элемента в начало переданной секции
function addElementToSection(sectionPage, newElement) {
  sectionPage.prepend(newElement);
};

// Для каждого элемента певроначального массива карточек запускаем функции формирования и добавления кода
initialCards.forEach(function(item){
  const card = new Card(item.name, item.link, '#element-template');
  const makedElement = card.makeNewElement();

  addElementToSection(elements, makedElement);
});

// Открываем попапы
function renderPopup(activeForm) {
  activeForm.closest('.popup').classList.add('popup_opened');

  activeForm.closest('.popup').addEventListener('click', checkClickOverlay);
  window.addEventListener('keydown', checkPressEsc);
};

// Закрываем попапы
function hidePopup(activeForm) {
  activeForm.closest('.popup').classList.remove('popup_opened');

  activeForm.closest('.popup').removeEventListener('click', checkClickOverlay);
  window.removeEventListener('keydown', checkPressEsc);
};

//Проверяем клик был за пределами формы или по форме.
function checkClickOverlay(evt) {
  const isForm = evt.target.closest('.form');
  if (!isForm) {
    hidePopup(evt.target);
  };
};

// Проверяем нажатие Escape
function checkPressEsc(key) {
  if (key.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    hidePopup(openedPopup);
  };
};

// Заполняем поля формы редактирования профиля текущими данными
function fillPopup(activeForm) {
  editProfileName.value = nameProfile.textContent;
  editProfileDescr.value = descrProfile.textContent;

  renderPopup(activeForm);
};

// Сохраняем новые данные пользователя
function saveEdit(evt) {
  evt.preventDefault();

  nameProfile.textContent = editProfileName.value;
  descrProfile.textContent = editProfileDescr.value;

  hidePopup(evt.target);
};

// Сохраняем новый элемент
function saveCard(evt) {
  evt.preventDefault();

  const card = new Card(addCardName.value, addCardLink.value, '#element-template');
  const makedElement = card.makeNewElement();

  addElementToSection(elements, makedElement); // добавляем в секцию elements сфомированный элемент

  evt.target.reset(); // очищаем поля формы

  hidePopup(evt.target);
};

// Слушаем клики по кнопкам
editProfileBtn.addEventListener('click',function () {
  fillPopup(editProfileForm);


  new FormValidator(settingsPage, editProfileForm).validationOpeningForm();
});

editProfileClose.addEventListener('click',  function () {
  hidePopup(editProfileForm)
});

editProfileForm.addEventListener('submit', saveEdit);


addCardBtn.addEventListener('click', function () {
  renderPopup(addCardForm);

  new FormValidator(settingsPage, addCardForm).validationOpeningForm();
});

addCardClose.addEventListener('click', function () {
  hidePopup(addCardForm)
});

addCardForm.addEventListener('submit', saveCard);


viewerClose.addEventListener('click', function () {
  hidePopup(viewerPopup)
});
