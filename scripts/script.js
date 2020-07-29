///////////////////////// ИМПОРТ МОДУЛЕЙ
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

///////////////////////// БЛОК ПЕРЕМЕННЫХ

// изначальный массив карточек
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const profilePopup = document.querySelector(".popup_profile");
const cardsPopup = document.querySelector(".popup_cards");
const figurePopup = document.querySelector(".popup_figure");
const popupImage = document.querySelector(".popup__image");
const closeButtonFigure = document.querySelector(".popup__button-close_figure");
const closeButtonProfile = document.querySelector(
  ".popup__button-close_profile"
);
const closeButtonCards = document.querySelector(".popup__button-close_cards");
const profileFormElement = document.querySelector(".popup__form-profile");
const cardFormElement = document.querySelector(".popup__form-cards");
const cardsList = document.querySelector(".cards");
const cardsTemplate = document.querySelector(".cards-template");
const popupInputProfileName = document.querySelector(
  ".popup__input-profile-name"
);
const popupInputTitle = document.querySelector(".popup__input-title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupInputCardName = document.querySelector(".popup__input-card-name");
const popupInputLink = document.querySelector(".popup__input-link");
const validationData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
/////////////////////////

/////////////////////////  БЛОК ФУНКЦИЙ

//заполняем карточки из шаблона
initialCards.forEach((element)=>{
  const card = new Card(element,'.cards-template')
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
})

//включаем валидацию на формах
const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((form) => {
  const formValidator = new FormValidator(validationData, form);
  const formValidatorElement = formValidator.enableValidation();
});

//функция очистки формы после закрытия формы
function clearForm() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  const inputErrorClass = "form__input_type_error";
  const errorClass = "form__input_error_active";
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(inputErrorClass);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = "";
    });
  });
}

//функция открытия попапа с картинкой
export function openCard(cardImage) {
  cardImage.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    const newImage = eventTarget.src;
    const newCaption = eventTarget.alt;
    popupImage.src = newImage;
    popupImage.alt = newCaption;
    figurePopup.querySelector(".popup__caption").textContent = newCaption;
    openPopup(figurePopup);
  });
}

//функция удаления карточки
export function deleteCard(ev) {
  const card = ev.target.closest(".cards__item");
  card.remove();
}
//функция открытия формы
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//функция закрытия формы
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/////////////////////////

///////////////////////// СЛУШАТЕЛИ КНОПОК

//отправка формы profile
profileFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileTitle.textContent = popupInputTitle.value;
  closePopup(profilePopup);
});

//отправка формы card
cardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const cardObject = {
    name: popupInputCardName.value,
    link: popupInputLink.value
  };
  const card = new Card(cardObject,'.cards-template')
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
  closePopup(cardsPopup);
});

//открытие формы редактирования
editButton.addEventListener("click", function () {
  popupInputProfileName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
  openPopup(profilePopup);
  const inputList = Array.from(profilePopup.querySelectorAll(".popup__input"));
  const button = profilePopup.querySelector(".popup__button-save");
  new FormValidator(validationData,profilePopup).validate()
});

//открытие формы добавления нового места
addButton.addEventListener("click", function () {
  cardFormElement.reset();
  const inputList = Array.from(cardsPopup.querySelectorAll(".popup__input"));
  const button = cardsPopup.querySelector(".popup__button-save");
  openPopup(cardsPopup);
  new FormValidator(validationData,cardsPopup).validate()
});

//закрытие формы по клику на оверлей
document.addEventListener("mousedown", function (evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(openedPopup);
    clearForm();
  }
});

//закрытие формы по esc
document.addEventListener("keydown", function (evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && evt.keyCode === 27) {
    closePopup(openedPopup);
    clearForm();
  }
});

closeButtonProfile.addEventListener("click", function (evt) {
  closePopup(profilePopup);
  clearForm();
});
closeButtonCards.addEventListener("click", function () {
  closePopup(cardsPopup);
  clearForm();
});
closeButtonFigure.addEventListener("click", function () {
  closePopup(figurePopup);
  clearForm();
});


