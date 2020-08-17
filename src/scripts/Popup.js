export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("mousedown", (evt) => {
      this._handleOverlayClose(evt);
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("mousedown", (evt) => {
      this._handleOverlayClose(evt);
    });
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
  _handleEscClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup && evt.keyCode === 27) {
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
