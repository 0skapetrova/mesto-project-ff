import { openPopupImage } from "../index";

//создает карточку на основе переданных данных из объекта, добавляет слушатели на кнопку закрытия, сердечко и на картинку
function createCard (cardTemplate, card, deleteCard, like, openPopupImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = card.name;
          
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', function() {
        deleteCard(cardElement);
    });

    const likeBtn = cardElement.querySelector('.card__like-button');

    likeBtn.addEventListener('click', function(evt) {
        like(evt.target);
    });

    cardImage.addEventListener('click', function(evt) {
      evt.stopPropagation();
      openPopupImage(cardImage);
    });

    return cardElement;
};

function deleteCard (element) {
    element.remove();
};

function like (button) {
  button.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, like };