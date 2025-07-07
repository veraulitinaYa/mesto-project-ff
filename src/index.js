import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import {
  openPopup,
  closePopup,
  handleCloseByEscape,
  handleOverlayClick,
  addCloseButtonListener,
} from "./scripts/modal.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";

const buttonEditPopup = document.querySelector(".profile__edit-button");
const windowEditPopup = document.querySelector(".popup_type_edit");
const buttonNewCard = document.querySelector(".profile__add-button");
const windowNewCard = document.querySelector(".popup_type_new-card");
const windowImage = document.querySelector(".popup_type_image");
const formProfile = document.querySelector(".form__profile");
const formCard = document.querySelector(".form__card");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const cardOriginalImage = document.querySelector(".popup__image");
const cardOriginalName = document.querySelector(".popup__caption");

const personNameInput = document.querySelector(".popup__input_type_name");
const personJobInput = document.querySelector(".popup__input_type_description");
const jobProfileInfo = document.querySelector(".profile__description");
const nameProfileInfo = document.querySelector(".profile__title");

//-----------------------------------------------showInputError

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error_text');
};

//-------------------------------hideInputError

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__input_error_text');
  errorElement.textContent = '';
};
//-----------------------------toggleButton

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.classList.add('popup__button-inactive')
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button-inactive');
  }
};


//------------------------------------------------- check Input Validity
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
//-----------------------------------------------------------
//---------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------
//--------------------------------------- set event listeners
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

//----------------------------------------------------------------- enable validation and create fieldList

const enableValidation = () => {
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
};

//-----------------------------------------------------------

enableValidation();

//----------------------------------------------------------------- has invalid input


function hasInvalidInput (inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

//----------------------------------------------------------------------------------------------


addCloseButtonListener(windowEditPopup);
addCloseButtonListener(windowImage);
addCloseButtonListener(windowNewCard);

formProfile.addEventListener("submit", handleProfileFormSubmit);

formCard.addEventListener("submit", function (evt) {
  const cardData = extractCardInputValues(evt);

  if (cardData) {
    const newCard = createCard(
      cardData.nameFromInput,
      cardData.linkFromInput,
      deleteCard,
      likeCard,
      openCard
    );
    placesList.prepend(newCard);
    closePopup(windowNewCard);
    formCard.reset();
  }
});

buttonEditPopup.addEventListener("click", function () {
  openPopup(windowEditPopup);

  personJobInput.value = jobProfileInfo.textContent;
  personNameInput.value = nameProfileInfo.textContent;
});

buttonNewCard.addEventListener("click", function () {
  openPopup(windowNewCard);
});

initialCards.forEach(function (item) {
  placesList.append(
    createCard(item.name, item.link, deleteCard, likeCard, openCard)
  );
});

function openCard(cardName, cardLink) {
  cardOriginalImage.src = cardLink;
  cardOriginalImage.alt = cardName;
  cardOriginalName.textContent = cardName;
  openPopup(windowImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const jobInputValue = personJobInput.value;
  const nameInputValue = personNameInput.value;
  jobProfileInfo.textContent = jobInputValue;
  nameProfileInfo.textContent = nameInputValue;

  closePopup(windowEditPopup);
  this.reset();
}

function extractCardInputValues(evt) {
  evt.preventDefault();

  const nameFromInput = cardNameInput.value;
  const linkFromInput = cardImageLinkInput.value;

  return { nameFromInput, linkFromInput };
}
