import { likeCard, unlikeCard } from "./api";

//создает карточку на основе переданных данных из объекта, добавляет слушатели на кнопку закрытия, сердечко и на картинку
function createCard (myId, cardTemplate, card, openPopupDeleteCard, openPopupImage ) {  
    console.log(card);
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = card.name;
          
    const likeBtn = cardElement.querySelector('.card__like-button');

    const countLikes = (info) => {
      const likeCounter = cardElement.querySelector('.card__like-button_counter');
      likeCounter.textContent = info
    }

    countLikes(card.likes.length)

    likeBtn.addEventListener('click', function(evt) {
      like(evt.target, card, countLikes);
    });

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (card.owner._id === myId) {
      deleteButton.addEventListener('click', () => {
        openPopupDeleteCard(card, cardElement)
      });
    } else {
      deleteButton.remove();
    }

    cardImage.addEventListener('click', function() {
      openPopupImage(cardImage);
    });

    return cardElement;
};

function like (button, card, countLikes) {
  if (button.classList.contains('card__like-button_is-active')) {
    unlikeCard(card)
    .then ((data) => {
      countLikes(data.likes.length)
      button.classList.remove('card__like-button_is-active')
  })
    } else {
      likeCard(card)
      .then ((data) => {
        countLikes(data.likes.length)
        button.classList.add('card__like-button_is-active')
      })
    }    
};

export { createCard };