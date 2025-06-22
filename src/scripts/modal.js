const personNameInput = document.querySelector(".popup__input_type_name");
const personJobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = document.querySelector(".popup__input_type_url");

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const jobInputValue = personJobInput.value;
  const nameInputValue = personNameInput.value;
  const currentPopup = document.querySelector(".popup");
  const jobProfileInfo = document.querySelector(".profile__description");
  const nameProfileInfo = document.querySelector(".profile__title");

  jobProfileInfo.textContent = jobInputValue;
  nameProfileInfo.textContent = nameInputValue;

  closePopup(currentPopup);
  this.reset();
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameFromInput = cardNameInput.value;
  const linkFromInput = cardImageLinkInput.value;

  return { nameFromInput, linkFromInput };
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseByEscape);
  popup.addEventListener("click", handleOverlayClick);
  getCloseButton(popup); // Добавляем обработчик для крестика
}

function getCloseButton(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEscape);
  popup.removeEventListener("click", handleOverlayClick);
}

export function handleCloseByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function handleOverlayClick(evt) {
  if (evt.target === this) {
    closePopup(this);
  }
}
