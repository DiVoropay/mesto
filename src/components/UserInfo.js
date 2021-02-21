export class UserInfo {
  constructor(selector) {
    this._userNameElement = document.querySelector(selector.name);
    this._userInfoElement = document.querySelector(selector.about);
    this._userAvatarElement = document.querySelector(selector.avatar);
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
