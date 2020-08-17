export class UserInfo {
  constructor(object) {
    this._userName = document.querySelector(object.userName);
    this._userTitle = document.querySelector(object.userTitle);
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userTitle: this._userTitle.textContent,
    };
  }
  setUserInfo(obj) {
    this._userName.textContent = obj.userName;
    this._userTitle.textContent = obj.userTitle;
  }
}
