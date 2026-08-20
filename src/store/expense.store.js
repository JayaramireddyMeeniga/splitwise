import { create } from 'zustand'

const today = new Date().toISOString().slice(0, 10)

const initialDraft = {
  title: '',
  amount: '',
  category: '',
  paidBy: '',
  splitMethod: '',
  date: today,
  members: ['Rahul', 'Arun', 'Sai', 'Naveen'],
  notes: '',
  receiptName: '',
}

const initialExpenses = [
  {
    id: 'exp-1',
    title: 'Vegetables and milk',
    amount: 1200,
    category: 'Groceries',
    paidBy: 'Rahul',
    splitMethod: 'Equal split',
    members: ['Rahul', 'Arun', 'Sai', 'Naveen'],
    date: '2026-08-12',
    notes: 'Weekly produce and dairy restock.',
    receiptName: 'grocery-receipt.jpg',
    status: 'Approved',
  },
  {
    id: 'exp-2',
    title: 'Internet bill',
    amount: 999,
    category: 'Internet',
    paidBy: 'Arun',
    splitMethod: 'Equal split',
    members: ['Rahul', 'Arun', 'Sai', 'Naveen'],
    date: '2026-08-08',
    notes: 'Monthly fiber bill.',
    receiptName: 'internet-aug.pdf',
    status: 'Pending',
  },
  {
    id: 'exp-3',
    title: 'Cleaning supplies',
    amount: 640,
    category: 'Household',
    paidBy: 'Sai',
    splitMethod: 'Selected members',
    members: ['Rahul', 'Sai', 'Naveen'],
    date: '2026-08-02',
    notes: 'Kitchen and bathroom supplies.',
    receiptName: '',
    status: 'Approved',
  },
]

export const useExpenseStore = create((set, get) => ({
  draft: initialDraft,
  expenses: initialExpenses,
  errors: {},
  editingExpenseId: null,
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
  toggleDraftMember: (member) =>
    set((state) => {
      const members = state.draft.members.includes(member)
        ? state.draft.members.filter((name) => name !== member)
        : [...state.draft.members, member]

      return {
        draft: {
          ...state.draft,
          members,
        },
        errors: {
          ...state.errors,
          members: undefined,
        },
      }
    }),
  setReceiptName: (receiptName) =>
    set((state) => ({
      draft: {
        ...state.draft,
        receiptName,
      },
    })),
  setErrors: (errors) => set({ errors }),
  beginEditExpense: (expenseId) =>
    set((state) => {
      const expense = state.expenses.find((item) => item.id === expenseId)

      if (!expense) return state

      return {
        draft: {
          title: expense.title || '',
          amount: String(expense.amount || ''),
          category: expense.category || '',
          paidBy: expense.paidBy || '',
          splitMethod: expense.splitMethod || '',
          date: expense.date || today,
          members: expense.members?.length ? expense.members : initialDraft.members,
          notes: expense.notes || '',
          receiptName: expense.receiptName || '',
        },
        errors: {},
        editingExpenseId: expenseId,
      }
    }),
  addExpense: (expense) =>
    set((state) => {
      const savedExpense = {
        id: `exp-${Date.now()}`,
        status: Number(expense.amount) > 1000 ? 'Pending' : 'Approved',
        ...expense,
        amount: Number(expense.amount),
        members: expense.members?.length ? expense.members : initialDraft.members,
      }

      return {
        expenses: [
          savedExpense,
          ...state.expenses,
        ],
        draft: initialDraft,
        errors: {},
        editingExpenseId: null,
        lastAddedExpenseId: savedExpense.id,
      }
    }),
  updateExpense: (expenseId, expense) =>
    set((state) => ({
      expenses: state.expenses.map((item) =>
        item.id === expenseId
          ? {
            ...item,
            ...expense,
            amount: Number(expense.amount),
            members: expense.members?.length ? expense.members : initialDraft.members,
            status: Number(expense.amount) > 1000 ? 'Pending' : 'Approved',
          }
          : item,
      ),
      draft: initialDraft,
      errors: {},
      editingExpenseId: null,
    })),
  getExpenseById: (expenseId) =>
    get().expenses.find((expense) => expense.id === expenseId),
  removeExpense: (expenseId) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== expenseId),
    })),
  duplicateExpense: (expenseId) =>
    set((state) => {
      const expense = state.expenses.find((item) => item.id === expenseId)

      if (!expense) return state

      return {
        expenses: [
          {
            ...expense,
            id: `exp-${Date.now()}`,
            title: `${expense.title} copy`,
            status: 'Pending',
          },
          ...state.expenses,
        ],
      }
    }),
  resetDraft: () => set({ draft: initialDraft, errors: {}, editingExpenseId: null }),
}))
