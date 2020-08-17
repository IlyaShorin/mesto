import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector(".popup__form");
    this._userName = document.querySelector(".popup__input-profile-name");
    this._userTitle = document.querySelector(".popup__input-title");
    this._cardName = document.querySelector(".popup__input-card-name");
    this._cardLink = document.querySelector(".popup__input-link");
  }
  _getInputValues() {
    return {
      userName: this._userName.value,
      userTitle: this._userTitle.value,
      name: this._cardName.value,
      link: this._cardLink.value,
    };
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
  open() {
    super.open();
  }
}
