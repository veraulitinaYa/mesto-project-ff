export function createCard(
  cardName,
  cardImageLink,
  deleteCallback,
  likeCallback,
  openCardCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardUnit = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardUnit.querySelector(".card__image");
  const cardTitle = cardUnit.querySelector(".card__title");

  cardImage.src = cardImageLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  cardUnit
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCallback(cardUnit);
    });

  cardImage.addEventListener("click", function () {
    openCardCallback(cardName, cardImageLink);
  });

  const cardLikeButton = cardUnit.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", function () {
    likeCallback(cardLikeButton); // Передаем кнопку лайка в колбэк
  });

  return cardUnit;
}

export function deleteCard(cardItem) {
  cardItem.remove();
}

export function likeCard(heartButton) {
  heartButton.classList.toggle("card__like-button_is-active");
}
