export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escClose = this._handleEscClose.bind(this);
    this._overlayClose = this._handleOverlayClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("mousedown", this._overlayClose);
    document.addEventListener("keydown", this._escClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escClose);
    document.removeEventListener("mousedown", this._overlayClose);
  }
  _handleEscClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup && evt.key === "Escape") {
      this.close();
    }
  }
  _handleOverlayClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.target === openedPopup) {
      this.close();
    }
  }
  setEventListeners() {
    this._popup
      .querySelector(".popup__button-close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
