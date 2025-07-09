import {
  clearValidation
} from "./validation.js";

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseByEscape);
  popup.addEventListener("click", handleOverlayClick);
}

export function addCloseButtonListener(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
}

export function closePopup(popup) {
  clearValidation(popup);
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
