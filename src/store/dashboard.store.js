import { create } from 'zustand'
import dashboardService from '../services/dashboard.service'

const initialState = {
  dashboard: null,
  isLoading: false,
  error: '',
}

export const useDashboardStore = create((set) => ({
  ...initialState,

  clearError: () => set({ error: '' }),

  fetchDashboard: async () => {
    set({ isLoading: true, error: '' })

    try {
      const dashboard = await dashboardService.getDashboard()
      set({ dashboard, isLoading: false, error: '' })
      return dashboard
    } catch (error) {
      set({ isLoading: false, error: error.message })
      throw error
    }
  },

  resetDashboard: () => set(initialState),
}))

export default useDashboardStore
