import { create } from 'zustand'
import { tokenStorage } from '../services/api'
import authService from '../services/auth.service'

const initialState = {
  user: null,
  roleCopy: null,
  isAuthenticated: Boolean(tokenStorage.getAccessToken()),
  isLoading: false,
  error: '',
}

export const useAuthStore = create((set) => ({
  ...initialState,

  clearError: () => set({ error: '' }),

  setUser: (user, roleCopy = null) =>
    set({
      user,
      roleCopy,
      isAuthenticated: Boolean(user || tokenStorage.getAccessToken()),
      error: '',
    }),

  register: async (payload) => {
    set({ isLoading: true, error: '' })

    try {
      const authData = await authService.register(payload)
      set({
        user: authData.user,
        roleCopy: authData.roleCopy || null,
        isAuthenticated: true,
        isLoading: false,
        error: '',
      })
      return authData
    } catch (error) {
      set({ isLoading: false, error: error.message })
      throw error
    }
  },

  login: async (payload) => {
    set({ isLoading: true, error: '' })

    try {
      const authData = await authService.login(payload)
      set({
        user: authData.user,
        roleCopy: authData.roleCopy || null,
        isAuthenticated: true,
        isLoading: false,
        error: '',
      })
      return authData
    } catch (error) {
      set({ isLoading: false, error: error.message })
      throw error
    }
  },

  loadCurrentUser: async () => {
    if (!tokenStorage.getAccessToken()) {
      set({ user: null, isAuthenticated: false })
      return null
    }

    set({ isLoading: true, error: '' })

    try {
      const authData = await authService.me()
      set({
        user: authData.user,
        roleCopy: authData.roleCopy || null,
        isAuthenticated: true,
        isLoading: false,
        error: '',
      })
      return authData.user
    } catch (error) {
      tokenStorage.clear()
      set({
        user: null,
        roleCopy: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message,
      })
      return null
    }
  },

  logout: async () => {
    set({ isLoading: true, error: '' })
    await authService.logout()
    set({ ...initialState, isAuthenticated: false, isLoading: false })
  },
}))

export default useAuthStore
