class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getUser(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  changeUser({ userName, userOccupation }, token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name: userName,
        about: userOccupation,
      }),
    }).then(this._handleResponse);
  }

  changeAvatar({ avatar }, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then(this._handleResponse);
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }).then(this._handleResponse);
  }

  addLike(id, token) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then(this._handleResponse);
  }

  deleteLike(id, token) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(this._handleResponse);
  }
}

const BASE_URL = "https://api.aroundnation.students.nomoredomainssbs.ru";

const api = new Api({
  //baseUrl: "https://api.aroundnation.students.nomoredomainssbs.ru/",
  baseUrl: BASE_URL,
});

export default api;
