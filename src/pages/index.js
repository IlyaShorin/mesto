///////////////////////// ИМПОРТ МОДУЛЕЙ
import { Card } from "../components/Card.js";
import { validationData } from "../scripts/dataFile.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupDeleteCard } from "../components/PopupDeleteCard.js";
import "./index.css";

/////////////////////////
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "7d44fa7e-04ef-41d7-b07e-efc6bd06cf53",
    "Content-Type": "application/json",
  },
});
const profileInputName = document.querySelector(".popup__input-profile-name");
const profileInputTitle = document.querySelector(".popup__input-title");
const cardsList = document.querySelector(".cards");
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const cardForm = document.querySelector(".form-cards");
const profileForm = document.querySelector(".form-profile");
const avatarForm = document.querySelector(".form-avatar");
const myId = "1b81c76ad53f2077d54f3c61";
const myAvatar = document.querySelector(".profile__avatar");
const editAvatarButton = document.querySelector(".profile__avatar-overlay");
const deleteSubmitButton = document
  .querySelector(".popup_delete-card")
  .querySelector(".popup__button-save");
const newCardSubmitButton = document
  .querySelector(".popup_cards")
  .querySelector(".popup__button-save");
const profileSubmitButton = document
  .querySelector(".popup_profile")
  .querySelector(".popup__button-save");
const updateAvatarSubmitButton = document
  .querySelector(".popup_avatar")
  .querySelector(".popup__button-save");

api
  .getUserInfo()
  .then((data) => {
    myAvatar.style.background = `url('${data.avatar}') 0 0 / 100% 100% no-repeat`;
    myAvatar.style.backgroundSize = "cover";
  })
  .catch((res) => {
    console.log(res);
  });

function newCard(obj) {
  const card = new Card(
    {
      data: obj,
      handleCardClick: () => {
        popupWithImage.open(obj.link, obj.name);
        popupWithImage.setEventListeners();
      },
      handleLikeClick: () => {
        if (
          !cardElement
            .querySelector(".cards__button")
            .classList.contains("cards__button_active")
        ) {
          api
            .likeCard(obj._id)
            .then((data) => {
              cardElement.querySelector(".cards__counter").textContent =
                data.likes.length;
            })
            .catch((res) => {
              console.log(res);
            });
          cardElement
            .querySelector(".cards__button")
            .classList.add("cards__button_active");
        } else {
          api
            .unLikeCard(obj._id)
            .then((data) => {
              cardElement.querySelector(".cards__counter").textContent =
                data.likes.length;
            })
            .catch((res) => {
              console.log(res);
            });
          cardElement
            .querySelector(".cards__button")
            .classList.remove("cards__button_active");
        }
      },
      handleDeleteIconClick: () => {
        deletePopup.id = obj._id;
        deletePopup.cardElement = cardElement;
        deletePopup.open();
      },
    },
    ".cards-template"
  );
  const cardElement = card.generateCard();
  if (obj.owner._id !== myId) {
    cardElement.querySelector(".cards__delete-button").remove();
  }

  if (obj.likes.find((item) => item._id === myId)) {
    cardElement
      .querySelector(".cards__button")
      .classList.add("cards__button_active");
  }
  defaultSection.addItem(cardElement);
  cardElement.querySelector(".cards__counter").textContent = obj.likes.length;
}

let defaultSection = {};

api
  .getInitialCards()
  .then((data) => {
    defaultSection = new Section(
      {
        data: data.reverse(),
        renderer: (item) => {
          newCard(item);
        },
      },
      cardsList
    );
    defaultSection.renderItems();
  })
  .catch((res) => {
    console.log(res);
  });
const deletePopup = new PopupDeleteCard(".popup_delete-card", () => {
  // попап подтверждения удаления карточки
  deleteSubmitButton.textContent = "Удаляю...";
  api
    .deleteCard(deletePopup.id)
    .then(() => {
      deletePopup.close();
      deletePopup.cardElement.remove();
      deletePopup.cardElement = null;
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      deleteSubmitButton.textContent = "Да";
    });
});

const profilePopup = new PopupWithForm(".popup_profile", (obj) => {
  // попап редактирования профиля
  profileSubmitButton.textContent = "Сохранение...";
  api
    .updateUserInfo(obj)
    .then((obj) => {
      userInfo.setUserInfo({
        name: obj.name,
        title: obj.about,
      });
      profilePopup.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
});

const cardPopup = new PopupWithForm(".popup_cards", (obj) => {
  // попап добавления карточки
  newCardSubmitButton.textContent = "Сохранение...";
  api
    .addNewCard(obj)
    .then((obj) => {
      newCard(obj);
      cardPopup.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      newCardSubmitButton.textContent = "Создать";
    });
});
const avatarPopup = new PopupWithForm(".popup_avatar", (obj) => {
  // попап смены аватара
  updateAvatarSubmitButton.textContent = "Сохранение...";
  api
    .updateAvatar(obj.link)
    .then(() => {
      avatarPopup.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      updateAvatarSubmitButton.textContent = "Сохранить";
    });
  myAvatar.style.background = `url('${obj.link}') 0 0 / 100% 100% no-repeat`;
  myAvatar.style.backgroundSize = "cover";
});

const avatarValidator = new FormValidator(validationData, avatarForm);
const cardValidator = new FormValidator(validationData, cardForm);
const profileValidator = new FormValidator(validationData, profileForm);
const popupWithImage = new PopupWithImage(".popup_figure");
const userInfo = new UserInfo({
  userName: ".profile__name",
  userTitle: ".profile__title",
  userAvatar: ".profile__avatar",
});
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      title: data.about,
      avatar: data.avatar,
    });
  })
  .catch((res) => {
    console.log(res);
  });
avatarPopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
deletePopup.setEventListeners();

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();

editButton.addEventListener("click", () => {
  profilePopup.open();
  const actualUserName = userInfo.getUserInfo();
  profileInputName.value = actualUserName.userName;
  profileInputTitle.value = actualUserName.userTitle;
  profileValidator.validate();
  profileValidator.clearForm();
});

editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarValidator.validate();
  avatarValidator.clearForm();
});

//открытие формы добавления нового места
addButton.addEventListener("click", () => {
  cardPopup.open();
  cardValidator.validate();
  cardValidator.clearForm();
});
