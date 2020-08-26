export class UserInfo {
  constructor(object) {
    this._userName = document.querySelector(object.userName);
    this._userTitle = document.querySelector(object.userTitle);
    this._userAvatar = document.querySelector(object.userAvatar);
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userTitle: this._userTitle.textContent,
      userAvatar: this._userAvatar.style.background,
    };
  }
  setUserInfo(obj) {
    this._userName.textContent = obj.name;
    this._userTitle.textContent = obj.title;
    this._userAvatar.style.background = obj.avatar
  }
}
