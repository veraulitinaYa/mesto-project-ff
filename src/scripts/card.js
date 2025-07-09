const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardName,
  cardImageLink,
  deleteCallback,
  likeCallback,
  openCardCallback,
  cardLikes,
  cardOwnerID,
  currentUserID,
  cardID
) {
  const cardUnit = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardUnit.querySelector(".card__image");
  const cardTitle = cardUnit.querySelector(".card__title");
  const likeButton = cardUnit.querySelector('.card__like-button');
  const likeCount = cardUnit.querySelector('.card__like-information');
  const deleteButton = cardUnit.querySelector('.card__delete-button');

  cardImage.src = cardImageLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  likeCount.textContent = cardLikes.length;



  cardUnit
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCallback(cardUnit, cardID);
    });

  cardImage.addEventListener("click", function () {
    openCardCallback(cardName, cardImageLink);
  });

  const cardLikeButton = cardUnit.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", function () {
    likeCallback(cardLikeButton); // Передаем кнопку лайка в колбэк
  });

  if ((currentUserID !== cardOwnerID) && deleteButton) {
    deleteButton.remove();
  }



  return cardUnit;
}

export function deleteCard(cardElement, cardID) {
  //cardItem.remove();
   fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d'
      }
    })
     .then(() => {
      cardElement.remove();
    })
}

export function likeCard(heartButton) {
  heartButton.classList.toggle("card__like-button_is-active");
}
