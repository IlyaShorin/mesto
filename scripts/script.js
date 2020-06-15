const editButton = document.querySelector(".profile__button_edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__button-close");

function OpenPopup() {
  popup.classList.add("popup_opened");
}
function ClosePopup() {
  popup.classList.remove("popup_opened");
}
editButton.addEventListener("click", OpenPopup);

const formElement = document.querySelector(".popup__container"); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector(".popup__input-name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__input-title"); // Воспользуйтесь инструментом .querySelector()
let name = document.querySelector(".profile__name");
let title = document.querySelector(".profile__title");
nameInput.value = name.textContent;
jobInput.value = title.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  title.textContent = jobInput.value;
  ClosePopup();
}
formElement.addEventListener("submit", formSubmitHandler);
