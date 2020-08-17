export class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    const cardsImage = this._element.querySelector(".cards__image");
    cardsImage.src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    cardsImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__button")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _likeCard() {
    this._element
      .querySelector(".cards__button")
      .classList.toggle("cards__button_active");
  }
}
