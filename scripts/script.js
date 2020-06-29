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
const figurePopup = document.querySelector(".popup__figure");
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
  const cardImage = card.querySelector(".cards__image");
  cardImage.addEventListener("click",function (evt){
    eventTarget = evt.target;
    const newImage = eventTarget.src;
    const newCaption = eventTarget.alt;
    figurePopup.querySelector(".popup__image").src = newImage;
    figurePopup.querySelector(".popup__caption").textContent = newCaption;
    figurePopup.classList.add("popup_opened");
    popupImage.src = figurePopup.querySelector(".popup__image").src;
    popupImage.alt = figurePopup.querySelector(".popup__caption").textContent;
  })
  card.querySelector(".cards__delete-button").addEventListener("click",deleteCard);
  cardsList.prepend(card);
}
// <section class="popup popup_figure">
// <form name="popup-container" class="popup__container popup__container_figure">
//   <button type="button" class="popup__button-close popup__button-close_cards"></button>
//   <figure class="">
//     <img src="#" alt="#" class="popup__image">
//     <figcaption class="popup__caption"></figcaption>
//   </figure>
// </form>
// </section>
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
function openPopup(){
 if (event.target.classList.value.includes("edit")){
    document.querySelector(".popup_profile").classList.add("popup_opened");
    popupInputProfileName.value = profileName.textContent;
    popupInputTitle.value = profileTitle.textContent;
 }
 else if (event.target.classList.value.includes("add")){
     document.querySelector(".popup_cards").classList.add("popup_opened");
     popupInputCardName.value = "";
     popupInputLink.value = "";
 }
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
  evt.target.classList.value.includes("form-profile")
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
closeButtonFigure.addEventListener("click",closePopup);
