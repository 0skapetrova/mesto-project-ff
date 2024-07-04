

//открывает попап и добавляет слушатели закрытия для оверлея и Esc
function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEsc);
};

//закрывает попап и снимает слушатели
function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEsc);
};

//обработчик клика по оверлею
function handleOverlayClick (evt) {
    evt.stopPropagation();
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup_is-opened')) {
        closePopup(evtTarget.closest('.popup'));
    };
};

//обработчик нажатия Escape
function handleEsc (evt) {
    evt.stopPropagation();
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.code === "Escape") {
        closePopup (popupIsOpened);
    };
};

export { openPopup, closePopup };