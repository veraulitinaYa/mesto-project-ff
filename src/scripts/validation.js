export function clearValidation(popup) {
    const currentFormToClear = popup.querySelector('.popup__form');
  if (!currentFormToClear) return;

  const errorElements = currentFormToClear.querySelectorAll('.popup__input_error_text');
  const errorInputs = currentFormToClear.querySelectorAll('.popup__input_error');

  errorElements.forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input_error_text');
  });

  errorInputs.forEach(inputElement => {
    inputElement.classList.remove('popup__input_error');
  });


  const button = currentFormToClear.querySelector('.popup__button');
  if (button) {
    button.classList.add('popup__button-inactive');
  }

  currentFormToClear.reset();
}

export function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

    });
const fieldsetList = Array.from(formElement.querySelectorAll('.popup__input'));

fieldsetList.forEach((fieldSet) => {
  setEventListeners(formElement);
});

  });
}


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error_text');
};


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__input_error_text');
  errorElement.textContent = '';
};


const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button-inactive')
  } else {
    buttonElement.classList.remove('popup__button-inactive');
  }
};

const checkInputValidity = (formElement, inputElement) => {
  inputElement.setCustomValidity("");



  if (inputElement.pattern && (inputElement.type !== 'url')) {
     const regex = new RegExp(inputElement.pattern);
    if (!regex.test(inputElement.value)) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
 }



  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


function hasInvalidInput (inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

