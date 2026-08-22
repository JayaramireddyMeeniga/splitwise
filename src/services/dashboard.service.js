import api from './api'
import ENDPOINTS from './endpoints'

const unwrapDashboardResponse = (response) => response?.data || response

export const dashboardService = {
  getDashboard: async () => unwrapDashboardResponse(await api.get(ENDPOINTS.dashboard.root)),
}

export default dashboardService
