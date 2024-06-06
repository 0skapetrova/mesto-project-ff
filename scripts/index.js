function createCard(i) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        cardElement.querySelector('.card__image').src = initialCards[i].link;
        cardElement.querySelector('.card__image').alt = initialCards[i].name;
    const cardsList = document.querySelector('.places__list');
        cardsList.append(cardElement);
    const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', function (evt) {
            const eventTarget = evt.target;
            const listItem = eventTarget.closest('.places__item');
            listItem.remove();
        });
    return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
    createCard(i);
}
