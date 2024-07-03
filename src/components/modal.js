import { deleteCard, like } from "./cards";
import { popupEdit, popupAdd, cardTemplate, cardsList } from "../index";
import { createCard } from "./cards";


function popupOpen (popup) {
    popup.classList.add('popup_is-animated');
    const open = (popup) => {
        popup.classList.add('popup_is-opened');
        document.addEventListener('click', handleOverlayClick);
        document.addEventListener('keydown', handleEsc);
    };        
    setTimeout(open, 1, popup);
};

function popupClose (popup) {
    popup.classList.remove('popup_is-opened');
    const notAnimated = (popup) => {
        popup.classList.remove('popup_is-animated');
    };
    setTimeout(notAnimated, 600, popup);
    document.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEsc);
};

function handleOverlayClick (evt) {
    const closestPopup = evt.target.parentElement.closest('.popup');
        const popupIsOpened = document.querySelector('.popup_is-opened');
        if (!closestPopup && popupIsOpened) {
          popupClose(popupIsOpened);          
        };
};

function handleEsc (evt) {
    if (evt.code === "Escape") {  
        const popupIsOpened = document.querySelector('.popup_is-opened');
        popupClose(popupIsOpened);        
      };
};

  
const profileForm = document.querySelector('form[name="edit-profile"]');
const profileInfo = document.querySelector('.profile__info');

function handleProfileFormSubmit(evt, close, popup) {
    evt.preventDefault(); 

    const nameInput = profileForm.querySelector('.popup__input_type_name');
    const jobInput = profileForm.querySelector('.popup__input_type_description');

    const profileName = nameInput.value;
    const job = jobInput.value;

    const nameField = profileInfo.querySelector('.profile__title');
    const jobField = profileInfo.querySelector('.profile__description');

    nameField.textContent = profileName;
    jobField.textContent = job;

    nameInput.value = '';
    jobInput.value = '';
    close(popup);
};

profileForm.addEventListener('submit', function(evt) {
    handleProfileFormSubmit(evt, popupClose, popupEdit)
  });


const imageForm = document.querySelector('form[name="new-place"]');

function handleImageFormSubmit(evt, list, createCard, template, close) {
    evt.preventDefault(); 

    const nameInput = imageForm.querySelector('.popup__input_type_card-name');
    const urlInput = imageForm.querySelector('.popup__input_type_url');

    const cardName = nameInput.value;
    const url = urlInput.value;

    const cardDescription = {
        link: url,
        name: cardName,
    };

    list.prepend(createCard(template, cardDescription, deleteCard, like, popupImageOpen));
    
    nameInput.value = '';
    urlInput.value = '';
    close(popupAdd);
};

imageForm.addEventListener('submit', function(evt) {
    handleImageFormSubmit(evt, cardsList, createCard, cardTemplate, popupClose);
});


function popupImageOpen( cardImage ) {
    const popupImage = document.querySelector('.popup_type_image');
    const image = popupImage.querySelector('.popup__image');
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    const popupCaption = popupImage.querySelector('.popup__caption');
    popupCaption.textContent = cardImage.alt;
    popupOpen(popupImage);
  };

export { popupOpen, popupClose, popupImageOpen };