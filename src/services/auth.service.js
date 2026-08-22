import api, { tokenStorage } from './api'
import ENDPOINTS from './endpoints'

const unwrapAuthResponse = (response) => response?.data || response

export const authService = {
  register: async (payload) => {
    const authData = unwrapAuthResponse(await api.post(ENDPOINTS.auth.register, payload))
    tokenStorage.setTokens({ accessToken: authData.accessToken })
    return authData
  },

  login: async (payload) => {
    const authData = unwrapAuthResponse(await api.post(ENDPOINTS.auth.login, payload))
    tokenStorage.setTokens({ accessToken: authData.accessToken })
    return authData
  },

  me: async () => {
    const response = await api.get(ENDPOINTS.auth.me)
    return unwrapAuthResponse(response)
  },

  logout: async () => {
    try {
      await api.post(ENDPOINTS.auth.logout)
    } finally {
      tokenStorage.clear()
    }
  },
}

export default authService
