export function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  const jobInputValue = personJobInput.value;
  const nameInputValue = personNameInput.value;
  const jobProfileInfo = document.querySelector(".profile__description");
  const nameProfileInfo = document.querySelector(".profile__title");

  jobProfileInfo.textContent = jobInputValue;
  nameProfileInfo.textContent = nameInputValue;

  windowEditPopup.classList.remove("popup_is-opened");
  formProfile.reset();
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardImageLinkInput.value;

  const newCard = createCard(
    name,
    link,
    deleteCard,
    likeCallback,
    openCardCallback
  );

  placesList.prepend(newCard);
  windowNewCard.classList.remove("popup_is-opened");
  formCard.reset();
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

export function closePopup(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    popup.classList.remove("popup_is-opened");
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");
    }
  });

  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      popup.classList.remove("popup_is-opened");
    }
  });
}
