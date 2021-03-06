import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';


const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const editProfileName = editProfileForm.querySelector('.popup__edit-name');
const editProfileDescr = editProfileForm.querySelector('.popup__edit-description');

const editAvatarBtn = document.querySelector('.profile__edit-avatar');

const addCardBtn = document.querySelector('.profile__add-button');

const sectionElements = new Section(
  {
    renderer: (sectionPage, newElement) => {
      sectionPage.prepend(newElement);
    }
  },
  '.elements'
);

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__avatar'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '41f72902-7107-4ed8-b788-31083cbaf2ac',
    'Content-Type': 'application/json'
  }
});

api.getPrifile()
  .then((data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo();
  })
  .catch((err) => { console.log(`Ошибка: ${err}`) });
//


function createCard(item, profileId) {
  const card = new Card({
    handleCardClick: (imageName, imageSrc) => {
      viewerCard.open(imageName, imageSrc);
    },

    handleRemoveClick: (cardId, action) => {
      formRemoveCard.open(cardId, action);
      arrayFormValidator['remove-card'].validationOpeningForm();
    },

    handleLikeClick: (id, isLiked) => {
      return api.likeCard(id, isLiked)
        .then((item) => {
          return item.likes;
        })
        .catch((err) => { console.log(`Ошибка: ${err}`) })
    },

    profileId: profileId
  },
    item, '#element-template'
  );

  return card.makeNewElement();
}


api.getInitialCards()
  .then((data) => {
    const arrElements = data.map(function (item) {
      return createCard(item, userInfo.getUserInfo().userId);
    });
    arrElements.sort((prev, next) =>
      prev.createdAt < next.createdAt ? 1 : -1
    );

    arrElements.forEach(item => sectionElements.addItem(item));
  })
  .catch((err) => { console.log(`Ошибка: ${err}`) });
//

const formAddCard = new PopupWithForm({
  submitForm: ({ formValues, button }) => {
    button.textContent = 'Сохранение...';
    api.addCard({ name: formValues['place-name'], link: formValues['link-image'] })
      .then((item) => {
        const makedElement = createCard(item, userInfo.getUserInfo().userId);
        sectionElements.addItem(makedElement);

        button.textContent = 'Сохранено';
        formAddCard.close('500');
      })
      .catch((err) => {
        button.textContent = 'Ошибка. Попробуйте еще раз!';
        console.log(`Ошибка: ${err}`)
      })

  }
},
  '.popup_add-card'
);
formAddCard.setEventListeners();

editProfileBtn.addEventListener('click', function () {
  editProfileName.value = userInfo.getUserInfo().userName;
  editProfileDescr.value = userInfo.getUserInfo().userAbout;
  formEditPrifile.open();
  arrayFormValidator['edit-profile'].validationOpeningForm();
});

const formEditPrifile = new PopupWithForm(
  {
    submitForm: ({ formValues, button }) => {
      button.textContent = 'Сохранение...';
      api.editPrifile({ name: formValues['firstname'], about: formValues['about'] })
        .then((data) => {
          button.textContent = 'Сохранено';
          userInfo.setUserInfo(data);
          userInfo.updateUserInfo();
          formEditPrifile.close('500');
        })
        .catch((err) => {
          button.textContent = 'Ошибка. Попробуйте еще раз!';
          console.log(`Ошибка: ${err}`);
        });
    }
  },
  '.popup_edit-profile'
);
formEditPrifile.setEventListeners();

const formEditAvatar = new PopupWithForm(
  {
    submitForm: ({ formValues, button }) => {
      button.textContent = 'Сохранение...';
      api.editAvatar({ avatar: formValues['link-avatar'] })
        .then((data) => {
          button.textContent = 'Сохранено';
          userInfo.setUserInfo(data);
          userInfo.updateUserInfo();
          formEditAvatar.close('500');
        })
        .catch((err) => {
          button.textContent = 'Ошибка. Попробуйте еще раз!';
          console.log(`Ошибка: ${err}`);
        });
    }
  },
  '.popup_edit-avatar'
);
formEditAvatar.setEventListeners();


const formRemoveCard = new PopupWithForm(
  {
    submitForm: ({ button, action, cardId }) => {
      button.textContent = 'Удаление...';
      api.removeCard(cardId)
        .then(() => {
          button.textContent = 'Карточка удалена';
          action();
          formRemoveCard.close('500');
        })
        .catch((err) => {
          button.textContent = 'Ошибка. Попробуйте еще раз!';
          console.log(`Ошибка: ${err}`);
        });
    }
  },
  '.popup_remove-card'
);
formRemoveCard.setEventListeners();



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

editAvatarBtn.addEventListener('click', function () {
  formEditAvatar.open();
  arrayFormValidator['edit-avatar'].validationOpeningForm();
});
