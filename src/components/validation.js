const validationConfig = {  
    formSelector: '.popup__form',
    inputSelector: '.popup__input',  
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',  
    inputErrorClass: 'popup__input-type-error',
    errorClass: 'popup__input-error_active',
  };

const showInputError = (formElement, inputElement, validationConfig, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return!inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);  
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

function clearValidation (formElement, validationConfig) {  
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    
    inputs.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);  
    });
        toggleButtonState(
            inputs,
            formElement.querySelector(validationConfig.submitButtonSelector),
            validationConfig
    );
};
  


export { validationConfig, enableValidation, clearValidation }