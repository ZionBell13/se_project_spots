const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

const showInputError = (formEl, inputEl, errorMsg) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(config.inputErrorClass); 
     //TODO - Error Mesasges for rest of error messages. Video=part 3
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(config.inputErrorClass); 
};

const checkInputValidity = (formEl, inputEl, config) => {
    if (!inputEl.validity.valid) {
       showInputError(formEl, inputEl, inputEl.validationMessage);  
    } else {
        hideInputError(formEl, inputEl, config);
    }
};

const hasInvalidInput = (inputList) => {
     return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl, config) => {
   if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
   } else {
    enableButton(buttonEl,config)
    buttonEl.disabled = false;
   }
};

const disableButton = (buttonEl, config) => {
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
};

const enableButton = (buttonEl,config) => {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
}

const resetValidation = (formEl, inputList, config) => {
    inputList.forEach((input) => {
        hideInputError(formEl, input, config);
        toggleButtonState(formEl,inputList, config);
    });

};

const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);
  
toggleButtonState(inputList, buttonElement, config);
    
    inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
        setEventListeners(formEl, config);
    });
};

enableValidation(settings);