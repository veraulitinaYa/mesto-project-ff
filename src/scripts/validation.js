export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error_text",
};

export function clearValidation(config, popup) {
  const currentFormToClear = popup.querySelector(config.formSelector);
  if (!currentFormToClear) return;

  const errorElements = currentFormToClear.querySelectorAll(
    `.${config.errorClass}`
  );
  const errorInputs = currentFormToClear.querySelectorAll(
    `.${config.inputErrorClass}`
  );

  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  });

  errorInputs.forEach((inputElement) => {
    inputElement.classList.remove(config.inputErrorClass);
  });

  const button = currentFormToClear.querySelector(config.submitButtonSelector);
  if (button) {
    button.classList.add(config.inactiveButtonClass);
  }

  currentFormToClear.reset();
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(formElement, config);
    });
  });
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const checkInputValidity = (formElement, inputElement, config) => {
  inputElement.setCustomValidity("");

  if (inputElement.pattern && inputElement.type !== "url") {
    const regex = new RegExp(inputElement.pattern);
    if (!regex.test(inputElement.value)) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
