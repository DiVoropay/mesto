import './index.css';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Передаем классы в переменные
const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const editProfileName = editProfileForm.querySelector('.popup__edit-name');
const editProfileDescr = editProfileForm.querySelector('.popup__edit-description');

const addCardBtn = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userInfoSelector: '.profile__description' })

// Функция формирования карточки
function createCard(placeName, linkImage) {
  const card = new Card({
    handleCardClick: (imageName, imageSrc) => {
      viewerCard.open(imageName, imageSrc);
    }
  },
    placeName, linkImage, '#element-template',
  );
  return card.makeNewElement();
}

const arrElements = initialCards.map(function (item) {
  return createCard(item.name, item.link);
});

const sectionElements = new Section(
  {
    items: arrElements,
    renderer: (sectionPage, newElement) => {
      sectionPage.prepend(newElement);
    }
  },
  '.elements'
);

const formEditPrifile = new PopupWithForm(
  {
    submitForm: (formValues) => {
      userInfo.setUserInfo(formValues['firstname'], formValues['about']);

      formEditPrifile.close();
    }
  },
  '.form_edit-profile'
);
formEditPrifile.setEventListeners();

const formAddCard = new PopupWithForm(
  {
    submitForm: (formValues) => {
      const makedElement = createCard(formValues['place-name'], formValues['link-image']);

      sectionElements.addItem(makedElement);

      formAddCard.close();
    }
  },
  '.form_add-card'
);
formAddCard.setEventListeners();

const viewerCard = new PopupWithImage('.viewer');
viewerCard.setEventListeners();

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
  const formInstances = [];

  formList.forEach(function (formElement) {
    const form = new FormValidator(settings, formElement);
    form.enableValidation();

    formInstances[formElement.name] = form;
  });

  return formInstances;
};

// Получаем именнованный массив объектов валидированных форм
const arrayFormValidator = enableValidationAll(settingsPage);

//
sectionElements.addArrItems();

// Заполняем поля формы редактирования профиля текущими данными
function fillPopup() {
  editProfileName.value = userInfo.getUserInfo().userName;
  editProfileDescr.value = userInfo.getUserInfo().userInfo;
};

// Слушаем клики по кнопкам
editProfileBtn.addEventListener('click', function () {
  fillPopup();
  formEditPrifile.open();
  arrayFormValidator['edit-profile'].validationOpeningForm();
});

addCardBtn.addEventListener('click', function () {
  formAddCard.open();
  arrayFormValidator['add-card'].validationOpeningForm();
});
