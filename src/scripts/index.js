const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = card.name;
          
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', function(evt) {
        deleteCard(cardElement);
    })

    return cardElement;
}

function deleteCard (element) {
    element.remove();
}

initialCards.forEach(function(item) {
    cardsList.append(createCard(item, deleteCard));
})