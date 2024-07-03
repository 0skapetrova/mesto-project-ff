import './pages/index.css';
import { createCard, deleteCard, like } from './components/card';
import { initialCards } from './components/cards';
import { openPopup, closePopup } from './components/modal';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_new-card');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const closeBtnArr = document.querySelectorAll('.popup__close');

//слушатель для кнопки редактирования профиля
editBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  openPopup(popupTypeEdit);
});

//слушатель для кнопки добавления карточки
addBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  openPopup(popupTypeAdd);
});

//слушатель для всех кнопок закрытия попапа
closeBtnArr.forEach((closeBtn) => {
  closeBtn.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    const parent = evtTarget.closest('.popup');
    const closestForm = parent.querySelector('.popup__form');
    closePopup(parent);
    closestForm.reset();
  });
});

//находим форму редактирования профиля  
const profileForm = document.querySelector('form[name="edit-profile"]');

//обработчик submit формы редактирования профиля
function handleProfileFormSubmit(evt, close) {
    evt.preventDefault(); 

    const nameInput = profileForm.querySelector('.popup__input_type_name');
    const jobInput = profileForm.querySelector('.popup__input_type_description');

    const profileName = nameInput.value;
    const job = jobInput.value;

    // находим контейнер с данными профиля
    const profileInfo = document.querySelector('.profile__info');
    const nameField = profileInfo.querySelector('.profile__title');
    const jobField = profileInfo.querySelector('.profile__description');

    nameField.textContent = profileName;
    jobField.textContent = job;

    close(popupTypeEdit);
    profileForm.reset();
};

//добавляем слушатель на кнопку сохранения
profileForm.addEventListener('submit', function(evt) {
    handleProfileFormSubmit(evt, closePopup);    
  });

//находим форму добавления карточки
const imageForm = document.querySelector('form[name="new-place"]');

//обработчик submit формы добавления карточки
function handleImageFormSubmit(evt, list, createCard, template, close) {
    evt.preventDefault(); 

    const nameInput = imageForm.querySelector('.popup__input_type_card-name');
    const urlInput = imageForm.querySelector('.popup__input_type_url');

    const cardName = nameInput.value;
    const url = urlInput.value;

    //объект, в котором хранятся данные для карточки
    const cardDescription = {
        link: url,
        name: cardName,
    };

    //добавляем новую карточку в начало списка
    list.prepend(createCard(template, cardDescription, deleteCard, like, openPopupImage));
    
    close(popupTypeAdd);
    imageForm.reset();
};

//добавляем слушатель на кнопку сохранения
imageForm.addEventListener('submit', function(evt) {
    handleImageFormSubmit(evt, cardsList, createCard, cardTemplate, closePopup);    
});

//открывает просмотр картинки
function openPopupImage ( cardImage ) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = popupTypeImage.querySelector('.popup__image');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    popupCaption.textContent = cardImage.alt;
    openPopup(popupTypeImage);
  };

//добавление карточек на основе переданного массива с данными при загрузке страницы
initialCards.forEach(function(item) {
  cardsList.append(createCard(cardTemplate, item, deleteCard, like, openPopupImage));
});
