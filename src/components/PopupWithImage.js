import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }
  open(imageLink, imageName) {
    super.open();
    this._image.src = imageLink;
    this._image.alt = imageName;
    this._caption.textContent = imageName;
  }
}
