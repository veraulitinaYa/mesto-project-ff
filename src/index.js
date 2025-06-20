import { initialCards } from './cards.js';
import './pages/index.css';


const buttonEditPopup = document.querySelector('.profile__edit-button');
const windowEditPopup = document.querySelector('.popup_type_edit');

const buttonNewCard = document.querySelector('.profile__add-button');
const windowNewCard = document.querySelector('.popup_type_new-card');

const windowImage = document.querySelector('.popup_type_image');

const formProfile = document.querySelector('.form__profile');
const formCard = document.querySelector('.form__card');
const personNameInput = document.querySelector('.popup__input_type_name');
const personJobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardImageLinkInput = document.querySelector('.popup__input_type_url');




function handleFormProfileSubmit(evt) {
    evt.preventDefault();

//     const saveButton = windowEditPopup.querySelector('.popup__button');
// saveButton.addEventListener('click', function(){
// windowEditPopup.classList.remove('popup_is-opened');
// });

    const jobInputValue = personJobInput.value;
    const nameInputValue = personNameInput.value;

    const jobProfileInfo = document.querySelector('.profile__description');
    const nameProfileInfo = document.querySelector('.profile__title');


    jobProfileInfo.textContent = jobInputValue;
    nameProfileInfo.textContent = nameInputValue;

      windowEditPopup.classList.remove('popup_is-opened');
      formProfile.reset();


}

formProfile.addEventListener('submit', handleFormProfileSubmit);

//------------------------------------------------------------------------------------------------------------




function handleCardFormSubmit(evt) {
  evt.preventDefault();



  const name = cardNameInput.value;
  const link = cardImageLinkInput.value;

  // Создаем новую карточку и добавляем в начало контейнера
  const newCard = createCard(name, link, deleteCard);


 placesList.prepend(newCard);



windowNewCard.classList.remove('popup_is-opened');
  // Закрываем попап и очищаем форму



  formCard.reset();
}

// Добавляем обработчик события submit
formCard.addEventListener('submit', handleCardFormSubmit);

//---------------------------------------------------------------------------------------------------------------


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

  }});


popup.addEventListener('click', function(evt){
  if ((evt.target ===popup)){
    popup.classList.remove('popup_is-opened');
  }
});


// button.addEventListener('click', function(){
// popup.classList.remove('popup_is-opened');
// });







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
