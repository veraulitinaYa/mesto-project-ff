import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import { createCard, deleteCard, likeCallback, openCardCallback } from "./scripts/card.js";
import {
  handleFormProfileSubmit,
  handleCardFormSubmit,
  openPopup,
  closePopup,
} from "./scripts/popup.js";

const buttonEditPopup = document.querySelector(".profile__edit-button");
const windowEditPopup = document.querySelector(".popup_type_edit");
const buttonNewCard = document.querySelector(".profile__add-button");
const windowNewCard = document.querySelector(".popup_type_new-card");
const windowImage = document.querySelector(".popup_type_image");
const formProfile = document.querySelector(".form__profile");
const formCard = document.querySelector(".form__card");
const personNameInput = document.querySelector(".popup__input_type_name");
const personJobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");

formProfile.addEventListener("submit", handleFormProfileSubmit);

formCard.addEventListener("submit", handleCardFormSubmit);

buttonEditPopup.addEventListener("click", function () {
  openPopup(windowEditPopup);
  closePopup(windowEditPopup);
});

buttonNewCard.addEventListener("click", function () {
  openPopup(windowNewCard);
  closePopup(windowNewCard);
});

initialCards.forEach(function (item) {
  placesList.append(
    createCard(item.name, item.link, deleteCard, likeCallback, openCardCallback)
  );
});


