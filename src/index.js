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
import {
   enableValidation
} from "./scripts/validation.js";

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

const profileAvatar = document.querySelector(".profile__image");

//-----------------------------------------------showInputError


addCloseButtonListener(windowEditPopup);
addCloseButtonListener(windowImage);
addCloseButtonListener(windowNewCard);

enableValidation();


document.addEventListener('DOMContentLoaded', () => {
getUserInformationFromServer();
});

function getUserInformationFromServer(){
fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
    headers: {
    authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d'
  }
})
  .then(response => {
    // response — сырой ответ, но не данные!
    //console.log(response.status); // 200
    //console.log(response.ok); // true
    return response.json(); // Парсим JSON (возвращает новый промис!)
  })
  .then(result => {
    // data — распарсенный JSON (например, { name: "John" })
      nameProfileInfo.textContent = result.name;
      jobProfileInfo.textContent = result.about;
      profileAvatar.style.backgroundImage = `url('${result.avatar}')`;
  });

}



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
