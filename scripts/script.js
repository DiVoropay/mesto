// Вводим в первоначальный массив с элементами
const initialCards = [
  {
      name: 'Гостиница "Таганрог"',
      link: './images/element/taganrog-hotel.jpg'
  },
  {
      name: 'Лицей имени А.П.Чехова',
      link: './images/element/taganrog-licey-chehova.jpg'
  },
  {
      name: 'Таганрогский универмаг',
      link: './images/element/taganrog-tum.jpg'
  },
  {
      name: 'Кинотеатр "Юность"',
      link: './images/element/taganrog-cinema-unost.jpg'
  },
  {
      name: 'Парк имени М.Горького',
      link: './images/element/taganrog-park-gorkogo.jpg'
  },
  {
      name: 'Балка смерти',
      link: './images/element/taganrog-balka-smerti.jpg'
  }
];

// Передаем классы в переменные
const elements=document.querySelector('.elements');

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const editProfileClose = editProfileForm.querySelector('.popup__close');
const editNameProfile = editProfileForm.querySelector('.popup__edit-name');
const editDescrProfile = editProfileForm.querySelector('.popup__edit-description');

const nameProfile = document.querySelector('.profile__name');
const descrProfile = document.querySelector('.profile__description');

const addCardBtn = document.querySelector('.profile__add-button');
const addCardForm = document.forms['add-card'];
const addCardClose = addCardForm.querySelector('.popup__close');

const viewerPopup = document.querySelector('.viewer');
const viewerClose = viewerPopup.querySelector('.popup__close');

// Создаем новую карточку по наименованию ссылке на изображение
function addElement(nameValue, linkValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__title').textContent = nameValue;
  element.querySelector('.element__title').title = nameValue;
  element.querySelector('.element__image').alt = nameValue;
  element.querySelector('.element__image').src = linkValue;

  element.querySelector('.element__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
  });

  element.querySelector('.element__image').addEventListener('click', function(evt){
    viewImage(nameValue, linkValue);
  });

  element.querySelector('.element__trash').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  });

  elements.prepend(element);
}

// Для певроначального массива карточек запускаем функцию генерации кода
initialCards.forEach(function(item){
  addElement (item.name, item.link);
});

// Открываем и закрываем форму редактирования профиля
function renderPopup() {
  editProfileForm.parentElement.classList.toggle('popup_opened');
}

// Открываем и закрываем форму добавления карточки
function renderPopupCard() {
  addCardForm.parentElement.classList.toggle('popup_opened');
}

//  Открываем и закрываем окно просмотра элементов
function renderPopupViewer() {
  viewerPopup.parentElement.classList.toggle('popup_opened');
}

// Заполняем поля текущими данными
function fillPopup() {
  editNameProfile.value = nameProfile.textContent;
  editDescrProfile.value = descrProfile.textContent;

  renderPopup();
}

// Сохраняем новые данные пользователя
function saveEdit(evt) {
  evt.preventDefault();

  nameProfile.textContent = editNameProfile.value;
  descrProfile.textContent = editDescrProfile.value;

  renderPopup();
}

// Сохраняем новый элемент
function saveCard(evt) {
  evt.preventDefault();

  const addName = addCardForm.querySelector('.popup__edit-name');
  const addLink = addCardForm.querySelector('.popup__edit-description');

  addElement(addName.value, addLink.value);

  addName.value='';
  addLink.value='';

  renderPopupCard();
}

// Заполняем окно просмотра данными
function viewImage(imageTitle, imageLink) {

  viewerPopup.querySelector('.viewer__title').textContent = imageTitle;
  viewerPopup.querySelector('.viewer__image').src = imageLink;
  viewerPopup.querySelector('.viewer__image').alt = imageTitle;

  viewerClose.addEventListener('click', renderPopupViewer);
  renderPopupViewer();
}

// Слушаем клики по кнопкам
editProfileBtn.addEventListener('click', fillPopup);
editProfileClose.addEventListener('click', renderPopup);
editProfileForm.addEventListener('submit', saveEdit);

addCardBtn.addEventListener('click', renderPopupCard);
addCardClose.addEventListener('click', renderPopupCard);
addCardForm.addEventListener('submit', saveCard);
