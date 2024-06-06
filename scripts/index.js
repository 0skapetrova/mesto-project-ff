function createCard(card, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = card.name;
    
    const cardsList = document.querySelector('.places__list');
    cardsList.append(cardElement);
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', function(evt) {
        deleteCard(evt.target);
    })

    return cardElement;
}

function deleteCard (eventTarget) {
    const listItem = eventTarget.closest('.places__item');
    listItem.remove();
}

initialCards.forEach(function(item) {
    createCard(item, deleteCard);
})