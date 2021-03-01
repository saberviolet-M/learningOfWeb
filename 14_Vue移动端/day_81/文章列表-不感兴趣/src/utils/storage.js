const tokenKey = 'mobile-token'

export const setToken = tokenObj => {
  localStorage.setItem(tokenKey, JSON.stringify(tokenObj))
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenKey)) || {}
}

export const delToken = () => {
  localStorage.removeItem(tokenKey)
}
