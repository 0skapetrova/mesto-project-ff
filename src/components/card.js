import { likeCard, unlikeCard } from "./api";

//создает карточку на основе переданных данных из объекта, добавляет слушатели на кнопку закрытия, сердечко и на картинку
function createCard (myId, cardTemplate, card, openPopupDeleteCard, openPopupImage ) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = card.name;
        
  const likeBtn = cardElement.querySelector('.card__like-button');

  //отображение количества лайков карточки
  const countLikes = (info) => {
    const likeCounter = cardElement.querySelector('.card__like-button_counter');
    likeCounter.textContent = info
  };

  // проверка на айди для отображения моих лайков
  const isMyLike = card.likes.some(({_id}) => {
    return _id === myId
  });

  if (isMyLike) {
    likeBtn.classList.add('card__like-button_is-active')
  };

  const deleteButton = cardElement.querySelector('.card__delete-button');

  //проверка на айди для отображения иконки удаления только на своих карточках
  if (card.owner._id === myId) {
    deleteButton.addEventListener('click', () => {
      openPopupDeleteCard(card, cardElement)
    });
  } else {
    deleteButton.remove();
  }

  //слушатель открытия попапа картинки
  cardImage.addEventListener('click', function() {
    openPopupImage(cardImage);
  });

  //слушатель на лайк
  likeBtn.addEventListener('click', function(evt) {
    console.log(isMyLike)
    like(isMyLike, evt.target, card, countLikes);
  });

  countLikes(card.likes.length)

  return cardElement;
};

function like (isMyLike, button, card, countLikes) {
    if ( isMyLike && button.classList.contains('card__like-button_is-active')) {
      unlikeCard(card)
      .then ((data) => {
        button.classList.remove('card__like-button_is-active')
        countLikes(data.likes.length)
      })      
      .catch((err) => {
        console.log(err)
      })
    } else {
      likeCard(card)
      .then ((data) => {
        countLikes(data.likes.length)
        button.classList.add('card__like-button_is-active')
      })
      .catch((err) => {
        console.log(err)
      })
    }      
};

export { createCard };