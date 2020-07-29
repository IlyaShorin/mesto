import {deleteCard} from './script.js'
import {openCard} from './script.js'
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
    this._element.querySelector('.cards__image').src = this._link;
    this._element.querySelector('.cards__title').textContent = this._name;
    this._element.querySelector('.cards__image').alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners(){
    this._element.querySelector('.cards__button').addEventListener('click', (evt) => {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('cards__button_active');
    })
    this._element.querySelector('.cards__delete-button').addEventListener('click',deleteCard)
    this._element.querySelector('.cards__image').addEventListener('click',openCard(this._element.querySelector('.cards__image')))
  }

}

