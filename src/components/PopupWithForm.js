import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector(".form");
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
