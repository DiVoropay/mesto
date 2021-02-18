export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo(data) {
    return { userName: data.name , userInfo: data.about };
  }

  setUserInfo(editName, editInfo) {
    this._userNameElement.textContent = editName;
    this._userInfoElement.textContent = editInfo;
  }
}
