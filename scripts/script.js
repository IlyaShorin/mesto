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
const closeButtonProfile = document.querySelector(
  ".popup__button-close_profile"
);
const closeButtonCards = document.querySelector(".popup__button-close_cards");
const profileFormElement = document.querySelector(".popup__container_profile");
const cardFormElement = document.querySelector(".popup__container_card");
const cardsList = document.querySelector(".cards");
const cardsTemplate = document.querySelector(".cards-template");
let popupInputProfileName = document.querySelector(
  ".popup__input-profile-name"
);
let popupInputTitle = document.querySelector(".popup__input-title");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");
let popupInputCardName = document.querySelector(".popup__input-card-name");
let popupInputLink = document.querySelector(".popup__input-link");

/////////////////////////

/////////////////////////  БЛОК ФУНКЦИЙ

//функция добавления карточки
function addCards(name, link) {
  const card = cardsTemplate.content.cloneNode(true);
  card.querySelector(".cards__title").textContent = name;
  card.querySelector(".cards__image").src = link;
  card.querySelector(".cards__image").alt = name;
  const likeButton = card.querySelector(".cards__button");
  likeButton.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("cards__button_active");
  });
  card.querySelector(".cards__delete-button").addEventListener("click",deleteCard);
  cardsList.prepend(card);
}

//заполняем страницу из шаблона карточек
initialCards.forEach((element) => {
  addCards(element.name, element.link);
});
//функция удаления карточки
function deleteCard(ev){
  const card = ev.target.closest(".cards__item");
  card.remove();
}

//функция открытия формы
function openPopup() {
  function profilePopup() {
    document.querySelector(".popup_profile").classList.add("popup_opened");
    popupInputProfileName.value = profileName.textContent;
    popupInputTitle.value = profileTitle.textContent;
  }
  function cardPopup(){
    document.querySelector(".popup_cards").classList.add("popup_opened");
    popupInputCardName.value = "";
    popupInputLink.value = "";
  }
  event.target.classList.value.includes("edit")
    ? profilePopup()
    : cardPopup()
}

//функция закрытия формы
function closePopup() {
  let form = document.querySelector(".popup_opened");
  form.classList.remove("popup_opened");
}

//функция отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  function cardAction() {
    let name = popupInputCardName.value;
    let link = popupInputLink.value;
    addCards(name, link);
    popupInputCardName.value="";
    popupInputLink.value="";
  }
  function profileAction() {
    profileName.textContent = popupInputProfileName.value;
    profileTitle.textContent = popupInputTitle.value;
  }
  evt.target.classList.value.includes("container_profile")
    ? profileAction()
    : cardAction();
  closePopup();
}
/////////////////////////

///////////////////////// СЛУШАТЕЛИ КНОПОК
profileFormElement.addEventListener("submit", formSubmitHandler);
cardFormElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopup);
closeButtonProfile.addEventListener("click", closePopup);
closeButtonCards.addEventListener("click", closePopup);
