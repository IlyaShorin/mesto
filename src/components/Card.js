export class Card {
  constructor(data, cardSelector) {
    this._name = data.data.name;
    this._link = data.data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = data.handleCardClick;
    this._handleLikeClick = data.handleLikeClick;
    this._handleDeleteIconCLick = data.handleDeleteIconClick;
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
        this._handleLikeClick();
      });
    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIconCLick()
      });
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

}
