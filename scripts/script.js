// в файле initialCards.js задаем первоначальный массив initialCards с элементами карточек

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

// // Получаем разметку карточки по наименованию идентификатору тега
// function getMarkupElement() {
//   const elementTemplate = document.querySelector('#element-template').content;

//   return elementTemplate.cloneNode(true);
// };

// // Переключаем лайк на карточке
// function toggleLikeElement(evt) {
//   evt.target.classList.toggle('element__like_active');
// };

// // Удаляем карточку
// function removeElement(evt) {
//   evt.target.closest('.element').remove();
// };

// // Заполняем новую карточку по наименованию и ссылке на изображение
// function makeNewElement(nameValue, linkValue) {
//   const element = getMarkupElement(); // получаем разметку элемента
//   const elementTitle = element.querySelector('.element__title'); // находим в полученной разметке заголовок
//   const elementImage = element.querySelector('.element__image'); // находим в полученной разметке изображение
//   const elementTrashBtn = element.querySelector('.element__trash'); // находим в полученной разметке изображение
//   const elementLikeBtn = element.querySelector('.element__like'); // находим в полученной разметке изображение

//   elementTitle.textContent = nameValue; // записываем заголовок нового элемента
//   elementTitle.title = nameValue; // накидываем всплывающий тайтл для случаев длинных заголовков
//   elementImage.alt = nameValue; // накидываем альт изображению
//   elementImage.src = linkValue; // записываем путь к изображению

//   // Цепляем слушателей событий на кнопки элемента
//   elementLikeBtn.addEventListener('click', toggleLikeElement);

//   elementImage.addEventListener('click', function(){
//     viewImage(nameValue, linkValue);
//   });

//   elementTrashBtn.addEventListener('click', removeElement);

//   return element;
// };

// Универсальная функция добавления переданного элемента в начало переданной секции
function addElementToSection(sectionPage, newElement) {
  sectionPage.prepend(newElement);
};

// Для каждого элемента певроначального массива карточек запускаем функции формирования и добавления кода
initialCards.forEach(function(item){
  //const makedElement = makeNewElement(item.name, item.link);
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

  //const makedElement = makeNewElement(addCardName.value, addCardLink.value); // формируем элемент из инпутов формы добавления элемента
  const card = new Card(addCardName.value, addCardLink.value, '#element-template');
  const makedElement = card.makeNewElement();

  addElementToSection(elements, makedElement); // добавляем в секцию elements сфомированный элемент

  evt.target.reset(); // очищаем поля формы

  hidePopup(evt.target);
};

// // Заполняем окно просмотра данными
// function viewImage(imageTitle, imageLink) {

//   viewerTitle.textContent = imageTitle;
//   viewerImage.src = imageLink;
//   viewerImage.alt = imageTitle;

//   renderPopup(viewerPopup);
// };

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
