import {
deleteCardFromServer
} from "./api.js";

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
    likeCallback(cardLikeButton, likeCount, cardID); // Передаем кнопку лайка в колбэк
  });

  if ((currentUserID !== cardOwnerID) && deleteButton) {
    deleteButton.remove();
  }

// const isLiked = cardLikes.some(like => { like._id === currentUserID});
//   if (isLiked) {
//     likeButton.classList.add('card__like-button_is-active');
//   }

const isLiked = Array.isArray(cardLikes) &&
                cardLikes.some(like => like && like._id === currentUserID);

if (isLiked) {
  likeButton.classList.add('card__like-button_is-active');
}



  return cardUnit;
}

export function deleteCard(cardElement, cardID) {

   deleteCardFromServer(cardID)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error('Ошибка при удалении карточки:', err);
    });
}

export function likeCard(heartButton, likeCountElement, cardID) {
  const isLiked = heartButton.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? removeLikeFromCard(cardID) : addLikeToCard(cardID);

  likeAction
    .then(updatedCard => {
      heartButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch(err => {
      console.error('Ошибка при обновлении лайка:', err);
    });
}


