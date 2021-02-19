export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo(data) {
    return { userName: data.name , userInfo: data.about };
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userInfoElement.textContent = data.about;
    this._userAvatarElement.src = data.avatar;

  }
}
