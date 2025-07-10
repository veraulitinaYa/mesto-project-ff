import {
  createCard,
  deleteCard,
  likeCard
} from "./card.js";

export function getUserInformationFromServer(profileName, profileJob, userAvatar, userID){
fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
    headers: {
    authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d'
  }
})
  .then(response => {
      if (response.ok) {
        return response.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  .then(result => {
    // data — распарсенный JSON (например, { name: "John" })
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
      userAvatar.style.backgroundImage = `url('${result.avatar}')`;
      userID = result._id;
  });

}

export function getCardsFromServer(listOfPlaces, openCardFunction, userID) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
    headers: {
      authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d'
    }
  })

    .then(response => {
      if (response.ok) {
        return response.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  .then(cards => {

    cards.forEach(card => {
        listOfPlaces.append(
          createCard(
            card.name,
            card.link,
            deleteCard,
            likeCard,
            openCardFunction,
            card.likes,
            card.owner._id,
            userID,
            card._id

          ))
  });

});

}
export function setUserData (customName, customJob) {
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

export function postCardToServer (customCardName, customCardLink){
   return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
    method: 'POST',
    headers: {
      authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: customCardName,
      link: customCardLink,
    })
  })
}
