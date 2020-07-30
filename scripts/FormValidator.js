export class FormValidator {
  constructor(object, formElement) {
    this._object = object;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._object.inputSelector)
    );
    this._form = formElement;
    this._buttonElement = this._form.querySelector(
      this._object.submitButtonSelector
    );
  }
  validate() {
    this._toggleButtonState();
  }
  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._object.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._object.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._object.inputErrorClass);
    errorElement.classList.remove(this._object.errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  clearForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
