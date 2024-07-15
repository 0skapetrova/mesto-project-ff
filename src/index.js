import './pages/index.css';
import { createCard, deleteCard, like } from './components/card';
import { initialCards } from './components/cards';
import { openPopup, closePopup } from './components/modal';
import { validationConfig, enableValidation, clearValidation } from './components/validation';



const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_new-card');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const closeBtnArr = document.querySelectorAll('.popup__close');

//находим форму редактирования профиля  
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const inputNameFormEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputJobFormEditProfile = formEditProfile.querySelector('.popup__input_type_description');

// находим контейнер с данными профиля
const profileInfo = document.querySelector('.profile__info');
const nameField = profileInfo.querySelector('.profile__title');
const jobField = profileInfo.querySelector('.profile__description');

//находим форму добавления карточки
const formAddNewCard = document.querySelector('form[name="new-place"]');
const inputNameFormAddNewCard = formAddNewCard.querySelector('.popup__input_type_card-name');
const inputUrlFormAddNewCard = formAddNewCard.querySelector('.popup__input_type_url');

//Добавляем класс для анимации всем попапам
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.classList.add('popup_is-animated')
});

//обработчик submit формы редактирования профиля
function handleProfileFormSubmit(evt, close) {
    evt.preventDefault(); 

    nameField.textContent = inputNameFormEditProfile.value;
    jobField.textContent = inputJobFormEditProfile.value;

    close(popupTypeEdit);
    formEditProfile.reset();
};

//обработчик submit формы добавления карточки
function handleImageFormSubmit(evt, list, createCard, template, close) {
    evt.preventDefault();   

    const cardName = inputNameFormAddNewCard.value;
    const url = inputUrlFormAddNewCard.value;

    //объект, в котором хранятся данные для карточки
    const cardDescription = {
        link: url,
        name: cardName,
    };

    //добавляем новую карточку в начало списка
    list.prepend(createCard(template, cardDescription, deleteCard, like, openPopupImage));
    
    close(popupTypeAdd);
};

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

//слушатель для кнопки редактирования профиля
editBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  clearValidation(formEditProfile, validationConfig);
  inputNameFormEditProfile.value = nameField.textContent;
  inputJobFormEditProfile.value = jobField.textContent;
  openPopup(popupTypeEdit);
});

//слушатель для кнопки добавления карточки
addBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  formAddNewCard.reset();
  clearValidation(formAddNewCard, validationConfig);
  openPopup(popupTypeAdd);
});

//слушатель для всех кнопок закрытия попапа
closeBtnArr.forEach((closeBtn) => {
  closeBtn.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    const closestPopup = evtTarget.closest('.popup');
    closePopup(closestPopup);
})});

//добавляем слушатель на кнопку сохранения
formEditProfile.addEventListener('submit', function(evt) {
  handleProfileFormSubmit(evt, closePopup);    
});

//добавляем слушатель на кнопку сохранения
formAddNewCard.addEventListener('submit', function(evt) {
  handleImageFormSubmit(evt, cardsList, createCard, cardTemplate, closePopup);    
});


//добавление карточек на основе переданного массива с данными при загрузке страницы
initialCards.forEach(function(item) {
  cardsList.append(createCard(cardTemplate, item, deleteCard, like, openPopupImage));
});

enableValidation();