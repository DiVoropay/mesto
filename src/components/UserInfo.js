export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return { userName: this._userNameElement.textContent, userInfo: this._userInfoElement.textContent };
  }

  setUserInfo(editName, editInfo) {
    this._userNameElement.textContent = editName;
    this._userInfoElement.textContent = editInfo;
  }
}
