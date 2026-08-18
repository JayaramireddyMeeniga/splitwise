import { create } from 'zustand'

const currentMonth = new Date().toISOString().slice(0, 7)

const initialFilters = {
  month: currentMonth,
  reportType: 'Monthly summary',
  format: 'PDF',
}

const categoryBreakdown = [
  { category: 'Rent', amount: 12000, percent: 65 },
  { category: 'Groceries', amount: 3200, percent: 17 },
  { category: 'Utilities', amount: 1900, percent: 10 },
  { category: 'Household', amount: 1320, percent: 8 },
]

const memberReports = [
  { member: 'Rahul', paid: 3500, share: 3000, status: 'Receive' },
  { member: 'Arun', paid: 2500, share: 3000, status: 'Pay' },
  { member: 'Sai', paid: 3000, share: 3000, status: 'Settled' },
  { member: 'Naveen', paid: 2800, share: 3000, status: 'Pay' },
]

const monthlyTrend = [
  { month: 'Apr', amount: 16400 },
  { month: 'May', amount: 17100 },
  { month: 'Jun', amount: 15800 },
  { month: 'Jul', amount: 17650 },
  { month: 'Aug', amount: 18420 },
]

export const useReportStore = create((set) => ({
  filters: initialFilters,
  errors: {},
  categoryBreakdown,
  memberReports,
  monthlyTrend,
  lastExport: null,
  setFilter: (field, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [field]: value,
      },
      errors: {
        ...state.errors,
        [field]: undefined,
      },
    })),
  setErrors: (errors) => set({ errors }),
  markExported: () =>
    set((state) => ({
      lastExport: `${state.filters.reportType} exported as ${state.filters.format}`,
      errors: {},
    })),
}))
