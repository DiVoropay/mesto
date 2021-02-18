import './index.css';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

// Передаем классы в переменные
const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const editProfileName = editProfileForm.querySelector('.popup__edit-name');
const editProfileDescr = editProfileForm.querySelector('.popup__edit-description');

const addCardBtn = document.querySelector('.profile__add-button');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '41f72902-7107-4ed8-b788-31083cbaf2ac',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description',
})



// Функция формирования карточки
function createCard(item) {
  const card = new Card({
    handleCardClick: (imageName, imageSrc) => {
      viewerCard.open(imageName, imageSrc);
    },
    removeCardApi: (id) => {
      return api.removeCard(id)
        .then(() => {})
        .catch((err) => { console.log(`Ошибка: ${err}`) });
    }
  },
    item, '#element-template'
  );
  return card.makeNewElement();
}

api.getInitialCards()
  .then((data) => {
    const arrElements = data.map(function (item) {
      return createCard(item);
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

    sectionElements.addArrItems();
  })
  .catch((err) => { console.log(`Ошибка: ${err}`) });
//

api.getPrifile()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
  })
  .catch((err) => { console.log(`Ошибка: ${err}`) });


editProfileBtn.addEventListener('click', function () {
  api.getPrifile()
    .then((data) => {
      editProfileName.value = userInfo.getUserInfo(data).userName;
      editProfileDescr.value = userInfo.getUserInfo(data).userInfo;
      formEditPrifile.open();
      arrayFormValidator['edit-profile'].validationOpeningForm();
    })

});



const formEditPrifile = new PopupWithForm(
  {
    submitForm: (formValues) => {
      api.editPrifile({name: formValues['firstname'], about: formValues['about']})
        .then((data) => {
          userInfo.setUserInfo(data.name, data.about);
        })
        .catch((err) => { console.log(`Ошибка: ${err}`) });

      formEditPrifile.close();
    }
  },
  '.popup_edit-profile'
);
formEditPrifile.setEventListeners();

const formAddCard = new PopupWithForm(
  {
    submitForm: (formValues) => {
      api.addCard({ name: formValues['place-name'], link: formValues['link-image'] })
        .then((data) => {
          const makedElement = createCard(data.name, data.link);

          sectionElements.addItem(makedElement);
        })
        .catch((err) => { console.log(`Ошибка: ${err}`) });

      formAddCard.close();
    }
  },
  '.popup_add-card'
);
formAddCard.setEventListeners();

const viewerCard = new PopupWithImage('.popup_viewer');
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

addCardBtn.addEventListener('click', function () {
  formAddCard.open();
  arrayFormValidator['add-card'].validationOpeningForm();
});
