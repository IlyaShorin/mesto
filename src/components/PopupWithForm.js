import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector(".popup__form");
    this._userName = this._form.querySelector(".popup__input-profile-name");
    this._userTitle = this._form.querySelector(".popup__input-title");
    this._cardName = this._form.querySelector(".popup__input-card-name");
    this._cardLink = this._form.querySelector(".popup__input-link");
  }
  _getInputValues() {
    const obj = {};
    const _inputList = this._form.querySelectorAll(".popup__input");
    _inputList.forEach((el) => {
      obj[el.name] = el.value;
    });
    return obj;
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
}
