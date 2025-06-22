import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import {
  handleProfileFormSubmit,
  handleCardFormSubmit,
  openPopup,
  closePopup,
  handleCloseByEscape,
  handleOverlayClick,
  getCloseButton,
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
const closeButton = document.querySelector(".popup__close");

formProfile.addEventListener("submit", handleProfileFormSubmit);

formCard.addEventListener("submit", function (evt) {
  const cardData = handleCardFormSubmit(evt);

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
  //closePopup(windowEditPopup);
});

buttonNewCard.addEventListener("click", function () {
  openPopup(windowNewCard);
  //closePopup(windowNewCard);
});

initialCards.forEach(function (item) {
  placesList.append(
    createCard(item.name, item.link, deleteCard, likeCard, openCard)
  );
});

//document.addEventListener("keydown", handleCloseByEscape);

// windowEditPopup.addEventListener("click", handleOverlayClick);

// windowNewCard.addEventListener("click", handleOverlayClick);

function openCard(cardName, cardLink) {
  cardOriginalImage.src = cardLink;
  cardOriginalName.textContent = cardName;
  openPopup(windowImage);
  //  closePopup(windowImage);
}
