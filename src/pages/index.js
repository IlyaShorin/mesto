///////////////////////// ИМПОРТ МОДУЛЕЙ
import { Card } from "../scripts/Card.js";
import { initialCards, validationData } from "../scripts/dataFile.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import './index.css';
/////////////////////////
const cardsList = document.querySelector(".cards");
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const cardForm = document.querySelector(".popup__form-cards");
const profileForm = document.querySelector(".popup__form-profile");
const defaultSection = new Section(
  {
    data: initialCards.reverse(),
    renderer: (item) => {
      const card = new Card(item, ".cards-template", (image, name) => {
        popupWithImage.open(image, name);
        popupWithImage.setEventListeners();
      });
      const cardElement = card.generateCard();
      defaultSection.addItem(cardElement);
    },
  },
  cardsList
);
const profilePopup = new PopupWithForm(".popup_profile", (obj) => {
  userinfo.setUserInfo(obj);
});
const cardPopup = new PopupWithForm(".popup_cards", (obj) => {
  const card = new Card(obj, ".cards-template", (image, name) => {
    popupWithImage.open(image, name);
    popupWithImage.setEventListeners();
  });
  const cardElement = card.generateCard();
  defaultSection.addItem(cardElement);
});
const cardValidator = new FormValidator(validationData, cardForm);
const profileValidator = new FormValidator(validationData, profileForm);
const popupWithImage = new PopupWithImage(".popup_figure");
let userinfo = new UserInfo({
  userName: ".profile__name",
  userTitle: ".profile__title",
});

cardPopup.setEventListeners();
profilePopup.setEventListeners();
defaultSection.renderItems();
cardValidator.enableValidation();
profileValidator.enableValidation();

editButton.addEventListener("click", () => {
  profilePopup.open();
  document.querySelector(
    ".popup__input-profile-name"
  ).value = userinfo.getUserInfo().userName;
  document.querySelector(
    ".popup__input-title"
  ).value = userinfo.getUserInfo().userTitle;
  profileValidator.validate();
  profileValidator.clearForm();
});

//открытие формы добавления нового места
addButton.addEventListener("click", function () {
  cardPopup.open();
  cardValidator.validate();
  cardValidator.clearForm();
});
