class Api {

  constructor(cohortId, token) {
    this._cohortId = cohortId;
    this._token = token;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getAuthorInfo = () => {
    //Запрос данных с сервера
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._getResponseData(res));

  }

  getCards = () => {
    //Запрос карточек с сервера
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._getResponseData(res));
  }

  setUserInfo = (data) => {
    const { name, about } = data;
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => this._getResponseData(res));
  }

  addNewCard = (data) => {
    const { name, link } = data;
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => this._getResponseData(res));
  }

  removeCard = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._getResponseData(res));
  }

  addLike = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._getResponseData(res));
  }

  removeLike = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._getResponseData(res));
  }

  setAvatar = (avatar) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => this._getResponseData(res));
  }
}

const api = new Api("cohort-42", "d74ffdad-4b6e-4d97-9e8c-b8d87caa6667");
export default api;