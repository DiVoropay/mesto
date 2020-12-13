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

// Получаем разметку карточки по наименованию идентификатору тега
function getMarkupElement() {
  const elementTemplate = document.querySelector('#element-template').content;

  return elementTemplate.cloneNode(true);
}

// Заполняем новую карточку по наименованию и ссылке на изображение
function makeNewElement(nameValue, linkValue) {
  const element = getMarkupElement(); // получаем разметку элемента
  const elementTitle = element.querySelector('.element__title'); // находим в полученной разметке заголовок
  const elementImage = element.querySelector('.element__image'); // находим в полученной разметке изображение
  const elementTrashBtn = element.querySelector('.element__trash'); // находим в полученной разметке изображение
  const elementLikeBtn = element.querySelector('.element__like'); // находим в полученной разметке изображение

  elementTitle.textContent = nameValue; // записываем заголовок нового элемента
  elementTitle.title = nameValue; // накидываем всплывающий тайтл для случаев длинных заголовков
  elementImage.alt = nameValue; // накидываем альт изображению
  elementImage.src = linkValue; // записываем путь к изображению

  // Цепляем слушателей событий на кнопки элемента
  elementLikeBtn.addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
  });
  elementImage.addEventListener('click', function(){
    viewImage(nameValue, linkValue);
  });
  elementTrashBtn.addEventListener('click', function(evt){
    evt.target.closest('.element').remove();
  });

  return element;
}

// Универсальная функция добавления переданного элемента в начало переданной секции
function addElementToSection(sectionPage, newElement) {
  sectionPage.prepend(newElement);
}

// Для каждого элемента певроначального массива карточек запускаем функции формирования и добавления кода
initialCards.forEach(function(item){
  const makedElement = makeNewElement(item.name, item.link);

  addElementToSection(elements, makedElement);
});

// Открываем и закрываем попапы
function renderPopup(activeForm) {
  activeForm.parentElement.classList.add('popup_opened');
}
function hidePopup(activeForm) {
  activeForm.parentElement.classList.remove('popup_opened');
}


// Заполняем поля формы редактирования профиля текущими данными
function fillPopup(activeForm) {
  editProfileName.value = nameProfile.textContent;
  editProfileDescr.value = descrProfile.textContent;

  renderPopup(activeForm);
}

// Сохраняем новые данные пользователя
function saveEdit(evt) {
  evt.preventDefault();

  nameProfile.textContent = editProfileName.value;
  descrProfile.textContent = editProfileDescr.value;

  hidePopup(editProfileForm);
}

// Сохраняем новый элемент
function saveCard(evt) {
  evt.preventDefault();

  const makedElement = makeNewElement(addCardName.value, addCardLink.value); // формируем элемент из инпутов формы добавления элемента

  addElementToSection(elements, makedElement); // добавляем в секцию elements сфомированный элемент

  addCardName.value = ''; // очищаем поля формы
  addCardLink.value = ''; // очищаем поля формы

  hidePopup(addCardForm);
}

// Заполняем окно просмотра данными
function viewImage(imageTitle, imageLink) {

  viewerTitle.textContent = imageTitle;
  viewerImage.src = imageLink;
  viewerImage.alt = imageTitle;

  renderPopup(viewerPopup);
}

// Слушаем клики по кнопкам
editProfileBtn.addEventListener('click',function () {
  fillPopup(editProfileForm)
});

editProfileClose.addEventListener('click',  function () {
  hidePopup(editProfileForm)
});

editProfileForm.addEventListener('submit', saveEdit);


addCardBtn.addEventListener('click', function () {
  renderPopup(addCardForm)
});

addCardClose.addEventListener('click', function () {
  hidePopup(addCardForm)
});

addCardForm.addEventListener('submit', saveCard);


viewerClose.addEventListener('click', function () {
  hidePopup(viewerPopup)
});