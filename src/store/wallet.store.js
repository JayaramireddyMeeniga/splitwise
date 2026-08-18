import { create } from 'zustand'

const today = new Date().toISOString().slice(0, 10)

const initialDraft = {
  type: 'debit',
  title: '',
  amount: '',
  category: '',
  handledBy: '',
  date: today,
  note: '',
}

const initialTransactions = [
  {
    id: 'wallet-1',
    type: 'credit',
    title: 'Monthly wallet collection',
    amount: 6000,
    category: 'Contribution',
    handledBy: 'Rahul',
    date: today,
  },
  {
    id: 'wallet-2',
    type: 'debit',
    title: 'Vegetables and groceries',
    amount: 1200,
    category: 'Groceries',
    handledBy: 'Sai',
    date: today,
  },
  {
    id: 'wallet-3',
    type: 'debit',
    title: 'Cleaning supplies',
    amount: 640,
    category: 'Household',
    handledBy: 'Arun',
    date: today,
  },
]

export const useWalletStore = create((set, get) => ({
  draft: initialDraft,
  transactions: initialTransactions,
  errors: {},
  emergencyFund: 2500,
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
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          id: `wallet-${Date.now()}`,
          ...transaction,
          amount: Number(transaction.amount),
        },
        ...state.transactions,
      ],
      draft: initialDraft,
      errors: {},
    })),
  resetDraft: () => set({ draft: initialDraft, errors: {} }),
  getBalance: () =>
    get().transactions.reduce((balance, transaction) => {
      const amount = Number(transaction.amount || 0)
      return transaction.type === 'credit' ? balance + amount : balance - amount
    }, 0),
}))
