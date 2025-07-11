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
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  getUserInformationFromServer,
  getCardsFromServer,
  setUserAvatarOnServer,
  setUserData,
  postCardToServer,
} from "./scripts/api.js";

const buttonEditPopup = document.querySelector(".profile__edit-button");
const windowEditPopup = document.querySelector(".popup_type_edit");
const windowNewAvatarPopup = document.querySelector(".popup_type_new-avatar");
const windowNewCard = document.querySelector(".popup_type_new-card");
const windowImage = document.querySelector(".popup_type_image");
const formProfile = document.querySelector(".form__profile");
const formCard = document.querySelector(".form__card");
const buttonNewCard = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".avatar__edit-button");
const formAvatar = document.querySelector(".form__avatar");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const cardOriginalImage = document.querySelector(".popup__image");
const cardOriginalName = document.querySelector(".popup__caption");

const personNameInput = document.querySelector(".popup__input_type_name");
const personJobInput = document.querySelector(".popup__input_type_description");
const avatarLinkInput = document.querySelector(".popup__input-avatar");
const jobProfileInfo = document.querySelector(".profile__description");
const nameProfileInfo = document.querySelector(".profile__title");

const profileAvatar = document.querySelector(".profile__image");
const currentCardLikeInformation = document.querySelector(
  ".card__like-information"
);
let clientSideUserID;
let currentCardID;

addCloseButtonListener(windowEditPopup);
addCloseButtonListener(windowImage);
addCloseButtonListener(windowNewCard);
addCloseButtonListener(windowNewAvatarPopup);

enableValidation(validationConfig);

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([getUserInformationFromServer(), getCardsFromServer()])
    .then(([userData, cards]) => {
      nameProfileInfo.textContent = userData.name;
      jobProfileInfo.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;

      clientSideUserID = userData._id;

      cards.forEach((card) => {
        placesList.append(
          createCard(
            card.name,
            card.link,
            deleteCard,
            likeCard,
            openCard,
            card.likes,
            card.owner._id,
            clientSideUserID,
            card._id
          )
        );
      });
    })
    .catch((err) => console.error("Ошибка загрузки данных:", err));
});

formProfile.addEventListener("submit", handleProfileFormSubmit);

formCard.addEventListener("submit", function (evt) {
  const submitButton = formCard.querySelector(".popup__button");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  submitButton.disabled = true;
  const cardData = extractCardInputValues(evt);

  if (cardData) {
    const newCard = createCard(
      cardData.nameFromInput,
      cardData.linkFromInput,
      deleteCard,
      likeCard,
      openCard,
      0,
      clientSideUserID,
      clientSideUserID
    );
    placesList.prepend(newCard);
    postCardToServer(cardData.nameFromInput, cardData.linkFromInput);
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }

  formCard.reset();
  closePopup(windowNewCard);
});

formAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const submitButton = formAvatar.querySelector(".popup__button");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  submitButton.disabled = true;

  setUserAvatarOnServer(avatarLinkInput)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closePopup(windowNewAvatarPopup);
      formAvatar.reset();
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});

buttonEditPopup.addEventListener("click", function () {
  openPopup(windowEditPopup);
  clearValidation(windowEditPopup, validationConfig);

  personJobInput.value = jobProfileInfo.textContent;
  personNameInput.value = nameProfileInfo.textContent;
});

buttonNewCard.addEventListener("click", function () {
  openPopup(windowNewCard);
  clearValidation(windowNewCard, validationConfig);
});

avatarEditButton.addEventListener("click", function () {
  openPopup(windowNewAvatarPopup);
  clearValidation(windowNewAvatarPopup, validationConfig);
});

function openCard(cardName, cardLink) {
  cardOriginalImage.src = cardLink;
  cardOriginalImage.alt = cardName;
  cardOriginalName.textContent = cardName;
  openPopup(windowImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = formAvatar.querySelector(".popup__button");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";

  submitButton.disabled = true;
  const jobInputValue = personJobInput.value;
  const nameInputValue = personNameInput.value;

  setUserData(nameInputValue, jobInputValue);
  submitButton.textContent = originalText;
  submitButton.disabled = false;

  closePopup(windowEditPopup);
  this.reset();
}

function extractCardInputValues(evt) {
  evt.preventDefault();

  const nameFromInput = cardNameInput.value;
  const linkFromInput = cardImageLinkInput.value;

  return { nameFromInput, linkFromInput };
}
