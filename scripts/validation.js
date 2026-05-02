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
    inputEl.classList.add("modal__input_type_error"); 
     //TODO - Error Mesasges for rest of error messages. Video=part 3
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove("modal__input_type_error"); 
};

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
       showInputError(formEl, inputEl, inputEl.validationMessage);  
    } else {
        hideInputError(formEl, inputEl);
    }
};

const hasInvalidInput = () => {
     return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl) => {
   if (hasInvalidInput(inputList)) {
    disableButton(buttonEl);
   } else {
    buttonEl.disabled = false;
   }
   // TODO - add a modifier class to buttonEl to make it grey, also in CSS
   // TODO - Remove the disabled class
};

const disableButton = (buttonEl, config) => {
    buttonEl.disabled = true;
    // TODO - add a modifier class to buttonEl to make it grey, also in CSS
   // TODO - Remove the disabled class
};

const resetValidation = (formEl, inputEl, inputList) => {
    inputList.forEach((input) => {
        hideInputError(formEl, input)
    });

};

// TO DO - Use settings object in all functions instead of hardcoded strings.

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