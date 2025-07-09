//import { initialCards } from "./scripts/cards.js";
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
   enableValidation
} from "./scripts/validation.js";

const buttonEditPopup = document.querySelector(".profile__edit-button");
const windowEditPopup = document.querySelector(".popup_type_edit");
const buttonNewCard = document.querySelector(".profile__add-button");
const windowNewCard = document.querySelector(".popup_type_new-card");
const windowImage = document.querySelector(".popup_type_image");
const formProfile = document.querySelector(".form__profile");
const formCard = document.querySelector(".form__card");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageLinkInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const cardOriginalImage = document.querySelector(".popup__image");
const cardOriginalName = document.querySelector(".popup__caption");

const personNameInput = document.querySelector(".popup__input_type_name");
const personJobInput = document.querySelector(".popup__input_type_description");
const jobProfileInfo = document.querySelector(".profile__description");
const nameProfileInfo = document.querySelector(".profile__title");

const profileAvatar = document.querySelector(".profile__image");

//-----------------------------------------------showInputError


addCloseButtonListener(windowEditPopup);
addCloseButtonListener(windowImage);
addCloseButtonListener(windowNewCard);

enableValidation();


document.addEventListener('DOMContentLoaded', () => {
Promise.all([getUserInformationFromServer(), getCardsFromServer()]);

   // .then(([userData, cards]) => {
      // Обновляем данные пользователя
      // nameProfileInfo.textContent = userData.name;
      // jobProfileInfo.textContent = userData.about;
      // profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;

      // // Очищаем текущие карточки
      // placesList.innerHTML = '';

      // Добавляем карточки с сервера

      // initialCards.forEach(function (item) {
//   placesList.append(
//     createCard(item.name, item.link, deleteCard, likeCard, openCard)
//   );
});





function getUserInformationFromServer(){
fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
    headers: {
    authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d'
  }
})
  .then(response => {
    // response — сырой ответ, но не данные!
    //console.log(response.status); // 200
    //console.log(response.ok); // true
    return response.json(); // Парсим JSON (возвращает новый промис!)
  })
  .then(result => {
    // data — распарсенный JSON (например, { name: "John" })
      nameProfileInfo.textContent = result.name;
      jobProfileInfo.textContent = result.about;
      profileAvatar.style.backgroundImage = `url('${result.avatar}')`;
  });

}

function getCardsFromServer() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
    headers: {
      authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d'
    }
  })

  .then(response => {
    return response.json(); // Парсим JSON - возвращает новый промис!
  })
  .then(cards => {

    cards.forEach(card => {
        placesList.append(
          createCard(
            card.name,
            card.link,
            deleteCard,
            likeCard,
            openCard,
            card._id, //ID карточки
            card._id, //ID пользователя
            card.likes // массив лайков
          ))



  });

});


}

function setUserData (customName, customJob) {
  fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: customName,
    about: customJob,
  })
});
}



//         cards.forEach(card => {
//         placesList.append(
//           createCard(
//             card.name,
//             card.link,
//             deleteCard,
//             likeCard,
//             openCard,
//             card._id, // передаем ID карточки
//             userData._id, // передаем ID пользователя
//             card.likes // передаем массив лайков
//           )
//         );
//       });
//     })
//     .catch(err => {
//       console.error('Ошибка при загрузке данных:', err);
//     });
// }


formProfile.addEventListener("submit", handleProfileFormSubmit);

formCard.addEventListener("submit", function (evt) {
  const cardData = extractCardInputValues(evt);

  if (cardData) {
    const newCard = createCard(
      cardData.nameFromInput,
      cardData.linkFromInput,
      deleteCard,
      likeCard,
      openCard,
      cardID,
      userDataID,
      cardLikes
    );
    placesList.prepend(newCard);
    closePopup(windowNewCard);
    formCard.reset();
  }
});

buttonEditPopup.addEventListener("click", function () {
  openPopup(windowEditPopup);

  personJobInput.value = jobProfileInfo.textContent;
  personNameInput.value = nameProfileInfo.textContent;
});

buttonNewCard.addEventListener("click", function () {
  openPopup(windowNewCard);
});

function openCard(cardName, cardLink) {
  cardOriginalImage.src = cardLink;
  cardOriginalImage.alt = cardName;
  cardOriginalName.textContent = cardName;
  openPopup(windowImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const jobInputValue = personJobInput.value;
  const nameInputValue = personNameInput.value;
  //jobProfileInfo.textContent = jobInputValue;
  //nameProfileInfo.textContent = nameInputValue;
setUserData(nameInputValue, jobInputValue);
  closePopup(windowEditPopup);
  this.reset();
}

function extractCardInputValues(evt) {
  evt.preventDefault();

  const nameFromInput = cardNameInput.value;
  const linkFromInput = cardImageLinkInput.value;

  return { nameFromInput, linkFromInput };
}
