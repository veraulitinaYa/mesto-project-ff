function addCard (cardName, cardImageLink, deleteCallback) {
const cardTemplate = document.querySelector('#card-template').content;
const cardUnit = cardTemplate.querySelector('.card').cloneNode(true);
const placesList = document.querySelector('.places__list');

cardUnit.querySelector('.card__image').src = cardImageLink;
cardUnit.querySelector('.card__image').alt = cardName;
cardUnit.querySelector('.card__title').textContent = cardName;

cardUnit.querySelector('.card__delete-button').addEventListener('click', function () {
  deleteCallback(cardUnit);
});

placesList.append(cardUnit);
}

function deleteCard(cardItem) {
  cardItem.remove();
}

for (let i = 0; i < initialCards.length; i++) {
addCard(initialCards[i].name, initialCards[i].link, deleteCard);
}
