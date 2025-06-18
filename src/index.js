import { initialCards } from './cards.js';
import './pages/index.css';


const buttonEditPopup = document.querySelector('.profile__edit-button');
const windowEditPopup = document.querySelector('.popup_type_edit');

const buttonNewCard = document.querySelector('.profile__add-button');
const windowNewCard = document.querySelector('.popup_type_new-card');

const windowImage = document.querySelector('.popup_type_image');


buttonEditPopup.addEventListener ('click', function(){
openPopup(windowEditPopup);
closePopup(windowEditPopup);
 } );

buttonNewCard.addEventListener ('click', function(){
openPopup(windowNewCard);
closePopup(windowNewCard);
 } );



function openPopup(popup) {
popup.classList.add('popup_is-opened');
}

function closePopup (popup) {
const closeButton = popup.querySelector('.popup__close');
closeButton.addEventListener('click', function(){
popup.classList.remove('popup_is-opened');
});
document.addEventListener('keydown', function(evt){
  if (evt.key==='Escape'){
    popup.classList.remove('popup_is-opened');

  }


});

popup.addEventListener('click', function(evt){
  if ((evt.target ===popup)){
    popup.classList.remove('popup_is-opened');
  }
});

}

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

      openPopup(windowImage);
      closePopup(windowImage);
    });

  return cardUnit;
}

function deleteCard(cardItem) {
  cardItem.remove();
}

initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link, deleteCard));
});
