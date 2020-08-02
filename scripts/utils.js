export const figurePopup = document.querySelector(".popup_figure");
export const popupImage = document.querySelector(".popup__image");

//функция открытия формы
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("mousedown", (evt) => {
    closeByOverlay(evt);
  });
  document.addEventListener("keydown", (evt) => {
    closeByEsc(evt);
  });
}

//функция закрытия формы
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("mousedown", (evt) => {
    closeByOverlay(evt);
  });
  document.removeEventListener("keydown", (evt) => {
    closeByEsc(evt);
  });
}

function closeByOverlay(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(openedPopup);
  }
}

function closeByEsc(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup && evt.keyCode === 27) {
    closePopup(openedPopup);
  }
}
