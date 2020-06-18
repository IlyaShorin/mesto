const editButton = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__button-close");
const formElement = document.querySelector(".popup__container"); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector(".popup__input_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__input_title"); // Воспользуйтесь инструментом .querySelector()
let name = document.querySelector(".profile__name");
let title = document.querySelector(".profile__title");

function openPopup() {
  nameInput.value = name.textContent;
  jobInput.value = title.textContent;
  popup.classList.add("popup_opened");
}
function closePopup() {
  popup.classList.remove("popup_opened");
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  title.textContent = jobInput.value;
  closePopup();
}
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
