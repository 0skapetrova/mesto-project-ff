//открывает попап и добавляет слушатели закрытия для оверлея и Esc
function openPopup (popup) {
    popup.classList.add('popup_is-animated');
    const open = (popup) => {
        popup.classList.add('popup_is-opened');
        document.addEventListener('click', handleOverlayClick);
        document.addEventListener('keydown', handleEsc);
    };        
    setTimeout(open, 1, popup);
};

//закрывает попап и снимает слушатели
function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    const notAnimated = (popup) => {
        popup.classList.remove('popup_is-animated');
    };
    setTimeout(notAnimated, 600, popup);
    document.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEsc);
};

//обработчик клика по оверлею
function handleOverlayClick (evt) {
    const closestPopup = evt.target.parentElement.closest('.popup');
    const popupIsOpened = document.querySelector('.popup_is-opened');
    const closestForm = popupIsOpened.querySelector('.popup__form');
        //проверяем, что клик был вне попапа и что есть открытый попап
        if (!closestPopup && popupIsOpened) {
          closePopup(popupIsOpened);    
          closestForm.reset();      
        };
};

//обработчик нажатия Escape
function handleEsc (evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    const closestForm = popupIsOpened.querySelector('.popup__form');
    if (evt.code === "Escape") {         
        closePopup(popupIsOpened);   
        closestForm.reset();     
      };
};

export { openPopup, closePopup };