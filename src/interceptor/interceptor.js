export const createAuthRequestInterceptor = (tokenStorage) => (config) => {
  const token = tokenStorage.getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

export const createAuthResponseInterceptor = (tokenStorage) => async (response) => {
  if (response.status === 401) {
    tokenStorage.clear()
    window.dispatchEvent(new CustomEvent('roommatex:unauthorized'))
  }

  return response
}
