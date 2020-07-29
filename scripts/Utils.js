import {closeByOverlayOrEsc,cardValidator, profileValidator} from './script.js'

//функция открытия формы
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('mousedown',(evt)=>{
    closeByOverlayOrEsc(evt)
  })
  document.addEventListener('keydown',(evt)=>{
    closeByOverlayOrEsc(evt)
  })
}

//функция закрытия формы
export function closePopup(popup) {
  cardValidator.clearForm()
  profileValidator.clearForm()
  popup.classList.remove("popup_opened");
  document.removeEventListener('mousedown',(evt)=>{
    closeByOverlayOrEsc(evt)
  })
  document.removeEventListener('keydown',(evt)=>{
    closeByOverlayOrEsc(evt)
  })
}
