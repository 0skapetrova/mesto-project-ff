// Токен: 8fbe9b57-b101-4d39-9a96-f458ef7d7562
// Идентификатор группы: wff-cohort-19
// Адрес сервера проекта Mesto: https://mesto.nomoreparties.co.

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/wff-cohort-19',
  headers: {
    authorization: '8fbe9b57-b101-4d39-9a96-f458ef7d7562',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const sendCardInfo = (info) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
      body: JSON.stringify({
        name: info.name,
        link: info.link,
      }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const updateProfileInfo = (info) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

const updateAvatar = (info) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        avatar: info.avatar,
      }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

const likeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`,  
    {
    headers: config.headers,
    method: 'PUT',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

const unlikeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export { getUserInfo, getInitialCards, sendCardInfo, updateProfileInfo, updateAvatar, likeCard, unlikeCard, deleteCard }
  