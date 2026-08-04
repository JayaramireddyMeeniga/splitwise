export const ENDPOINTS = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyOtp: '/auth/verify-otp',
  },
  rooms: {
    root: '/rooms',
    details: (roomId) => `/rooms/${roomId}`,
    join: '/rooms/join',
    members: (roomId) => `/rooms/${roomId}/members`,
    invite: (roomId) => `/rooms/${roomId}/invite`,
  },
  expenses: {
    root: '/expenses',
    details: (expenseId) => `/expenses/${expenseId}`,
    approve: (expenseId) => `/expenses/${expenseId}/approve`,
  },
  payments: {
    root: '/payments',
    details: (paymentId) => `/payments/${paymentId}`,
    verify: (paymentId) => `/payments/${paymentId}/verify`,
  },
  wallet: {
    root: '/wallet',
    transactions: '/wallet/transactions',
  },
  reimbursements: {
    root: '/reimbursements',
    details: (reimbursementId) => `/reimbursements/${reimbursementId}`,
    approve: (reimbursementId) => `/reimbursements/${reimbursementId}/approve`,
  },
  settlements: {
    root: '/settlements',
    generate: '/settlements/generate',
    details: (settlementId) => `/settlements/${settlementId}`,
  },
  reports: {
    root: '/reports',
    monthly: '/reports/monthly',
    yearly: '/reports/yearly',
  },
  notifications: {
    root: '/notifications',
    markRead: (notificationId) => `/notifications/${notificationId}/read`,
  },
}

export default ENDPOINTS
