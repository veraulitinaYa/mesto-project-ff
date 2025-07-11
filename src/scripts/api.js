const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '7a2b94ee-f4e5-44ef-8aa6-61356f31bc2d',
    'Content-Type': 'application/json'
  }
}

function checkResponseReturnPromise(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
}

export function getUserInformationFromServer(){
return fetch(`${config.baseUrl}/users/me`, {
    headers: {
    authorization: config.headers.authorization
  }
})

    .then(checkResponseReturnPromise);
}

export function getCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
  headers: {
    authorization: config.headers.authorization
  }
  })

    .then(checkResponseReturnPromise);
}

export function setUserAvatarOnServer (avatarInput) {
fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: avatarInput.value
  })
})
      .then(checkResponseReturnPromise);
}

export function setUserData (customName, customJob) {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: customName,
    about: customJob,
  }) })
   .then(checkResponseReturnPromise);
}

export function postCardToServer (customCardName, customCardLink){
   return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: customCardName,
      link: customCardLink,
    })
  })
    .then(checkResponseReturnPromise);
}

export function deleteCardFromServer(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponseReturnPromise);
}

export function addLikeToCard(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
   .then(checkResponseReturnPromise);
}

export function removeLikeFromCard(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponseReturnPromise);
}
