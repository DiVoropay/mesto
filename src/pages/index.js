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

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userInfoSelector: '.profile__description' })

const addCardBtn = document.querySelector('.profile__add-button');
const addCardForm = document.forms['add-card'];
const addCardName = addCardForm.querySelector('.popup__edit-name');
const addCardLink = addCardForm.querySelector('.popup__edit-description');

const arrElements = initialCards.map(function (item) {
  const card = new Card({
    handleCardClick: (imageName, imageSrc) => {
      viewerCard.open(imageName, imageSrc);
      viewerCard.setEventListeners();
    }
  },
    item.name, item.link, '#element-template',

  );
  return card.makeNewElement();
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
    submitForm: (evt) => {
      evt.preventDefault();

      userInfo.setUserInfo(editProfileName.value, editProfileDescr.value);

      formEditPrifile.close();
      formEditPrifile.removeEventListeners();
    }
  },
  editProfileForm
);

const formAddCard = new PopupWithForm(
  {
    submitForm: (evt) => {
      evt.preventDefault();

      const card = new Card({
        viewerCard: (imageName, imageSrc) => {
          viewerCard.open(imageName, imageSrc);
          viewerCard.setEventListeners();
        }
      },
        addCardName.value, addCardLink.value, '#element-template',
      );
      const makedElement = card.makeNewElement();

      sectionElements.addItem(makedElement);

      formAddCard.close();
      formAddCard.removeEventListeners();
    }
  },
  addCardForm
);
const viewerCard = new PopupWithImage(document.querySelector('.viewer'));

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

  formEditPrifile.open();
  formEditPrifile.setEventListeners();
};

// Слушаем клики по кнопкам
editProfileBtn.addEventListener('click', function () {
  fillPopup();
  arrayFormValidator['edit-profile'].validationOpeningForm();
});

addCardBtn.addEventListener('click', function () {
  formAddCard.open();
  formAddCard.setEventListeners();
  arrayFormValidator['add-card'].validationOpeningForm();
});
