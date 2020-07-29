///////////////////////// ИМПОРТ МОДУЛЕЙ
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {openPopup,closePopup} from './Utils.js'
import {initialCards,validationData} from './DataFile.js'

///////////////////////// БЛОК ПЕРЕМЕННЫХ

// изначальный массив карточек

const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const profilePopup = document.querySelector(".popup_profile");
const cardsPopup = document.querySelector(".popup_cards");
export const figurePopup = document.querySelector(".popup_figure");
export const popupImage = document.querySelector(".popup__image");
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
const cardForm = document.querySelector(".popup__form-cards");
const profileForm = document.querySelector(".popup__form-profile");
export const cardValidator = new FormValidator(validationData,cardForm);
export const profileValidator = new FormValidator(validationData,profileForm);


/////////////////////////

/////////////////////////  БЛОК ФУНКЦИЙ

//заполняем карточки из шаблона
initialCards.forEach((element)=>{
  const card = new Card(element,'.cards-template')
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
})

cardValidator.enableValidation();
profileValidator.enableValidation();


//функция для слушателя формы
export function closeByOverlayOrEsc(evt){
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(openedPopup);
  }else if(openedPopup && evt.keyCode === 27) {
   closePopup(openedPopup);
}
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
  profileValidator.validate()
});

//открытие формы добавления нового места
addButton.addEventListener("click", function () {
  cardFormElement.reset();
  openPopup(cardsPopup);
  cardValidator.validate()

});

closeButtonProfile.addEventListener("click", function (evt) {
  closePopup(profilePopup);
  profileValidator.clearForm();
});
closeButtonCards.addEventListener("click", function () {
  closePopup(cardsPopup);
  cardValidator.clearForm();
});
closeButtonFigure.addEventListener("click", function () {
  closePopup(figurePopup);

});


