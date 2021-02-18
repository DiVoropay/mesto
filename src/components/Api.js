export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getPrifile() {

    return fetch(`${this._baseUrl}/users/me `, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {return Promise.resolve(res.json())}
        else { return Promise.reject(res.status) }
      })
  }

  editPrifile(data) {

    return fetch(`${this._baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {return Promise.resolve(res.json())}
        else { return Promise.reject(res.status) }
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else { return Promise.reject(res.status) }
      })
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else { return Promise.reject(res.status) }
      });
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else { return Promise.reject(res.status) }
      });
  }

  likeCard(data) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else { return Promise.reject(res.status) }
      });
  }


}
