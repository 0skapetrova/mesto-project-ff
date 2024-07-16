import './pages/index.css';
import { createCard } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfo, getInitialCards, sendCardInfo, updateProfileInfo, updateAvatar, deleteCard } from './components/api';

const myId = 'ac4375325414163f8c6ce413'

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupTypeDelete = document.querySelector('.popup_type_delete');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

//находим аватарку
const profileImage = document.querySelector('.profile__image');

const closeBtnArr = document.querySelectorAll('.popup__close');

//находим форму редактирования профиля  
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const inputNameFormEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputJobFormEditProfile = formEditProfile.querySelector('.popup__input_type_description');

// находим контейнер с данными профиля
const profileInfo = document.querySelector('.profile__info');
const nameField = profileInfo.querySelector('.profile__title');
const jobField = profileInfo.querySelector('.profile__description');

//находим форму изменения аватарки
const formEditAvatar = document.querySelector('form[name="edit-avatar"]')
const inputUrlFormEditAvatar = formEditAvatar.querySelector('.popup__input_type_avatar')

//находим форму добавления карточки
const formAddNewCard = document.querySelector('form[name="new-place"]');
const inputNameFormAddNewCard = formAddNewCard.querySelector('.popup__input_type_card-name');
const inputUrlFormAddNewCard = formAddNewCard.querySelector('.popup__input_type_url');

let cardToDeleteId
let cardToDelete

//Добавляем класс для анимации всем попапам
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.classList.add('popup_is-animated')
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',  
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',  
  inputErrorClass: 'popup__input-type-error',
  errorClass: 'popup__input-error_active',
};

//обработчик submit формы редактирования профиля
function handleProfileFormSubmit(evt, close) {
    evt.preventDefault(); 

    const profileName = inputNameFormEditProfile.value;
    const profileAbout = inputJobFormEditProfile.value;

    const profileInfo = {
      name: profileName,
      about: profileAbout,
    }

    updateProfileInfo(profileInfo)
      .then((data) => {
        renderProfile(data)
      })
    
    close(popupTypeEdit);
    formEditProfile.reset();
};

//обработчик submit формы изменения аватарки
function handleFormEditAvatarSubmit(evt, close) {
  evt.preventDefault(); 

  const avatarUrl = {
    avatar: inputUrlFormEditAvatar.value
  }

  updateAvatar(avatarUrl)
    .then((data) => {
      renderAvatar(data)
    })
    .catch((err) => {
      console.log(err)
    })

  profileImage.style.backgroundImage = `url(${inputUrlFormEditAvatar.value})`;

  close(popupTypeAvatar);
  formEditAvatar.reset();
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
  sendCardInfo(cardDescription)
    .then((res) => {
      list.prepend(createCard(myId, template, res, openPopupDeleteCard, openPopupImage));
    })
    .catch((err) => {
      console.log(err)
    })
  
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

function renderCards (data) {
  data.forEach(function(item) {
    cardsList.append(createCard(myId, cardTemplate, item, openPopupDeleteCard, openPopupImage));
  })
};
  
function renderProfile (data) {
  nameField.textContent = data.name;
  jobField.textContent = data.about;
  renderAvatar(data.avatar)
}
  
function renderAvatar (data) {
  profileImage.style.backgroundImage = `url(${data})`;
}

//слушатель для кнопки редактирования профиля
editBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  clearValidation(formEditProfile, validationConfig);
  inputNameFormEditProfile.value = nameField.textContent;
  inputJobFormEditProfile.value = jobField.textContent;
  openPopup(popupTypeEdit);
});

//слушатель для аватарки
profileImage.addEventListener('click', function(evt) {
  evt.stopPropagation();
  openPopup(popupTypeAvatar);
})

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
formEditAvatar.addEventListener('submit', function(evt) {
  handleFormEditAvatarSubmit(evt, closePopup);    
});

//добавляем слушатель на кнопку сохранения
formAddNewCard.addEventListener('submit', function(evt) {
  handleImageFormSubmit(evt, cardsList, createCard, cardTemplate, closePopup);    
});

//находим форму удаления карточки
const formDeleteCard = document.querySelector('form[name="delete"]');

function handleDeleteFormSubmit(card) {
  evt.preventDefault();
  deleteCard(card)
    .then(() => {
      card.remove()
      closePopup(popupTypeDelete)
})}

function openPopupDeleteCard (card) {
  cardToDelete = card
  openPopup(popupTypeDelete);
}

//добавляем слушатель на кнопку удаления
formDeleteCard.addEventListener('submit', function() {
  handleDeleteFormSubmit(card)
})

//добавление карточек на основе переданного массива с данными при загрузке страницы
// initialCards.forEach(function(item) {
//   cardsList.append(createCard(cardTemplate, item, deleteCardElement, like, openPopupImage));
// });

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([res1, res2]) => {
    renderProfile(res1)
    renderCards(res2)    
  })
  .catch((err) => {
    console.log(err)
  });
