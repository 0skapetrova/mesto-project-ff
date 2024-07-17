const config = {
  baseUrl: 'https://mesto.nomoreparties.co/wff-cohort-19',
  headers: {
    authorization: '8fbe9b57-b101-4d39-9a96-f458ef7d7562',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res)
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
    return checkResponse(res)
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
    return checkResponse(res)
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
    return checkResponse(res)
  })
}

const likeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`,  
    {
    headers: config.headers,
    method: 'PUT',
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const unlikeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/like/${card._id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then((res) => {
    return checkResponse(res)
  })
}

export { getUserInfo, getInitialCards, sendCardInfo, updateProfileInfo, updateAvatar, likeCard, unlikeCard, deleteCard }
  