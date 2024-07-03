import './pages/index.css';
import { initialCards, createCard, deleteCard, like } from './components/cards';
import { popupOpen, popupClose, popupImageOpen } from './components/modal';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const closeBtnArr = document.querySelectorAll('.popup__close');

//слушатель для кнопки редактирования профиля
editBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  popupOpen(popupEdit);
});


//слушатель для кнопки добавления карточки
addBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  popupOpen(popupAdd);
});


//слушатель для всех кнопок закрытия попапа
closeBtnArr.forEach((closeBtn) => {
  closeBtn.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    const parent = evtTarget.closest('.popup');
    popupClose(parent);
  });
});

//добавление карточек на основе переданного массива с данными при загрузке страницы
initialCards.forEach(function(item) {
  cardsList.append(createCard(cardTemplate, item, deleteCard, like, popupImageOpen ));
});

export { popupEdit, popupAdd, cardTemplate, cardsList }
