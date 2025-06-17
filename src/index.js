import { initialCards } from './cards.js';
import './pages/index.css';


const buttonEditPopup = document.querySelector('.profile__edit-button');
const windowEditPopup = document.querySelector('.popup_type_edit');

const buttonNewCard = document.querySelector('.profile__add-button');
const windowNewCard = document.querySelector('.popup_type_new-card');

const windowImage = document.querySelector('.popup_type_image');


buttonEditPopup.addEventListener ('click', function(){
 windowEditPopup.classList.add('popup_is-opened');
});

buttonNewCard.addEventListener ('click', function(){
 windowNewCard.classList.add('popup_is-opened');
});

const placesList = document.querySelector(".places__list");

function createCard(cardName, cardImageLink, deleteCallback) {
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

    cardUnit
    .querySelector(".card__image")
    .addEventListener("click", function () {

      const img = windowImage.querySelector('.popup__image');
      img.src = cardImageLink;
      windowImage.classList.add('popup_is-opened');
    });

  return cardUnit;
}

function deleteCard(cardItem) {
  cardItem.remove();
}

initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link, deleteCard));
});
