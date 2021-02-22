export class UserInfo {
  constructor(selector) {
    this._userNameElement = document.querySelector(selector.name);
    this._userInfoElement = document.querySelector(selector.about);
    this._userAvatarElement = document.querySelector(selector.avatar);
    this._id = '';
    this._name = '';
    this._about = '';
    this._avatar = '';
  }

  getUserInfo() {
    return { userId: this._id, userName: this._name , userAbout: this._about , userAvatar: this._avatar };
  }

  setUserInfo(data) {
    this._id = data._id;
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
  }

  updateUserInfo() {
    this._userNameElement.textContent = this._name;
    this._userInfoElement.textContent = this._about;
    this._userAvatarElement.src = this._avatar;
  }
}
