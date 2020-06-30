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
  const cardImage = card.querySelector(".cards__image");
  cardImage.addEventListener("click",function (evt){
    const eventTarget = evt.target;
    const newImage = eventTarget.src;
    const newCaption = eventTarget.alt;
    figurePopup.querySelector(".popup__image").src = newImage;
    figurePopup.querySelector(".popup__caption").textContent = newCaption;
    figurePopup.classList.add("popup_opened");
    popupImage.alt = figurePopup.querySelector(".popup__caption").textContent;
  })
  card.querySelector(".cards__delete-button").addEventListener("click",deleteCard);
  return card;
}

//заполняем страницу из шаблона карточек
initialCards.forEach((element) => {
  cardsList.append(addCards(element.name,element.link))
});

//функция удаления карточки
function deleteCard(ev){
  const card = ev.target.closest(".cards__item");
  card.remove();
}
//функция открытия формы
 function openPopup(popup){
   popup.classList.add("popup_opened");
 }

//функция закрытия формы
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
/////////////////////////

///////////////////////// СЛУШАТЕЛИ КНОПОК

//отправка формы profile
profileFormElement.addEventListener("submit", function(evt){
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileTitle.textContent = popupInputTitle.value;
  closePopup(document.querySelector(".popup_opened"))
});

//отправка формы card
cardFormElement.addEventListener("submit", function(evt){
  evt.preventDefault();
  const name = popupInputCardName.value;
  const link = popupInputLink.value;
  cardsList.prepend(addCards(name, link));
  popupInputCardName.value="";
  popupInputLink.value="";
  closePopup(document.querySelector(".popup_opened"))
});

//открытие формы редактирования
editButton.addEventListener("click", function(){
  openPopup(document.querySelector(".popup_profile"))
  popupInputProfileName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
});

//открытие формы добавления нового места
addButton.addEventListener("click", function(){
  openPopup(document.querySelector(".popup_cards"));
  popupInputCardName.value = "";
  popupInputLink.value = "";
});

closeButtonProfile.addEventListener("click", function(){
  closePopup(document.querySelector(".popup_opened"))
});
closeButtonCards.addEventListener("click", function(){
  closePopup(document.querySelector(".popup_opened"))
});
closeButtonFigure.addEventListener("click",function(){
  closePopup(document.querySelector(".popup_opened"))
});
