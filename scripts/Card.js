import {openPopup} from './Utils.js'
import {popupImage,figurePopup} from './script.js'
export class Card {
  constructor(item,cardSelector){
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector
  }
  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement
  }
  generateCard(){
    this._element = this._getTemplate();
    const cardsImage = this._element.querySelector('.cards__image')
    cardsImage.src = this._link;
    this._element.querySelector('.cards__title').textContent = this._name;
    cardsImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners(){
    this._element.querySelector('.cards__button').addEventListener('click', (evt) => {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('cards__button_active');
    })
    this._element.querySelector('.cards__delete-button').addEventListener('click',(evt)=>{
      this._deleteCard(evt)
    })
    this._element.querySelector('.cards__image').addEventListener('click',this._openCard(this._element.querySelector('.cards__image')))
  }

  _openCard(cardImage) {
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

  _deleteCard(ev) {
    const card = ev.target.closest(".cards__item");
    card.remove();
  }
}

