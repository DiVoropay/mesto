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

const removeCardForm = document.forms['remove-card'];
const removeCardId = removeCardForm.querySelector('.popup__edit-name');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '41f72902-7107-4ed8-b788-31083cbaf2ac',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__avatar'
})

function createCard(item, profileId) {
  const card = new Card({
    handleCardClick: (imageName, imageSrc) => {
      viewerCard.open(imageName, imageSrc);
    },
    handleRemoveClick: (id, action) => {
      removeCardId.value = id;
      formRemoveCard.open(action);
      arrayFormValidator['remove-card'].validationOpeningForm();
    },
    handleLikeClick: (id, isLiked) => {
      console.log(isLiked);
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

const sectionElements = new Section(
  {
    renderer: (sectionPage, newElement) => {
      sectionPage.prepend(newElement);
    }
  },
  '.elements'
);

sectionElements.addArrItems();

api.getInitialCards()
  .then((data) => {
    api.getPrifile()
      .then((profile) => {
        const arrElements = data.map(function (item) {
          return createCard(item, profile._id);
        });
        arrElements.sort((prev, next) =>
          prev.createdAt < next.createdAt ? 1 : -1
        );

        arrElements.forEach(item => sectionElements.addItem(item));


      })
      .catch((err) => { console.log(`Ошибка: ${err}`) })


  })
  .catch((err) => { console.log(`Ошибка: ${err}`) });
//

api.getPrifile()
  .then((data) => {
    userInfo.setUserInfo(data);
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
    submitForm: (formValues, button) => {
      button.textContent = 'Сохранение...';
      api.editPrifile({ name: formValues['firstname'], about: formValues['about'] })
        .then((data) => {
          button.textContent = 'Сохранено';
          userInfo.setUserInfo(data);
          formEditPrifile.close();
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
    submitForm: (formValues, button) => {
      button.textContent = 'Сохранение...';
      api.editAvatar({ avatar: formValues['link-avatar'] })
        .then((data) => {
          button.textContent = 'Сохранено';
          userInfo.setUserInfo(data);
          formEditAvatar.close();
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

const formAddCard = new PopupWithForm(
  {
    submitForm: (formValues, button) => {
      button.textContent = 'Сохранение...';
      api.addCard({ name: formValues['place-name'], link: formValues['link-image'] })
        .then((data) => {
          api.getPrifile()
            .then((profile) => {
              const makedElement = createCard(data, profile._id);

              sectionElements.addItem(makedElement);
            })
            .catch((err) => { console.log(`Ошибка: ${err}`) });

          button.textContent = 'Сохранено';
          formAddCard.close();

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

const formRemoveCard = new PopupWithForm(
  {
    submitForm: (formValues, button) => {
      button.textContent = 'Удаление...';
      api.removeCard(formValues['card-id'])
        .then(() => {
          button.textContent = 'Карточка удалена';
          formRemoveCard.close();
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
