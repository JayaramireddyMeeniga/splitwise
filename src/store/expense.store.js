import { create } from 'zustand'

const today = new Date().toISOString().slice(0, 10)

const initialDraft = {
  title: '',
  amount: '',
  category: '',
  paidBy: '',
  splitMethod: '',
  date: today,
  notes: '',
}

const initialExpenses = [
  {
    id: 'exp-1',
    title: 'Vegetables and milk',
    amount: 1200,
    category: 'Groceries',
    paidBy: 'Rahul',
    splitMethod: 'Equal split',
    status: 'Approved',
  },
  {
    id: 'exp-2',
    title: 'Internet bill',
    amount: 999,
    category: 'Internet',
    paidBy: 'Arun',
    splitMethod: 'Equal split',
    status: 'Pending',
  },
  {
    id: 'exp-3',
    title: 'Cleaning supplies',
    amount: 640,
    category: 'Household',
    paidBy: 'Sai',
    splitMethod: 'Selected members',
    status: 'Approved',
  },
]

export const useExpenseStore = create((set) => ({
  draft: initialDraft,
  expenses: initialExpenses,
  errors: {},
  setDraftField: (field, value) =>
    set((state) => ({
      draft: {
        ...state.draft,
        [field]: value,
      },
      errors: {
        ...state.errors,
        [field]: undefined,
      },
    })),
  setErrors: (errors) => set({ errors }),
  addExpense: (expense) =>
    set((state) => ({
      expenses: [
        {
          id: `exp-${Date.now()}`,
          status: Number(expense.amount) > 1000 ? 'Pending' : 'Approved',
          ...expense,
          amount: Number(expense.amount),
        },
        ...state.expenses,
      ],
      draft: initialDraft,
      errors: {},
    })),
  resetDraft: () => set({ draft: initialDraft, errors: {} }),
}))
