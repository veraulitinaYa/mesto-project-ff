export function clearValidation(popup) {
    const currentFormToClear = popup.querySelector('.popup__form');
  if (!currentFormToClear) return;

  const errorElements = currentFormToClear.querySelectorAll('.popup__input_error_text');
  const errorInputs = currentFormToClear.querySelectorAll('.popup__input_error');

  errorElements.forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input_error_text');
  });

  errorInputs.forEach(inputElement => {
    inputElement.classList.remove('popup__input_error');
  });


  const button = currentFormToClear.querySelector('.popup__button');
  if (button) {
    button.classList.add('popup__button-inactive');
  }

  // Сброс валидации формы (если нужно)
  currentFormToClear.reset();
}

// export function enableValidation () {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();

//     });
// const fieldsetList = Array.from(formElement.querySelectorAll('.popup__input'));

// fieldsetList.forEach((fieldSet) => {
//   setEventListeners(formElement);
// });

//   });
// }


