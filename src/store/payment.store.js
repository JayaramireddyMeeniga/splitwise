import { create } from 'zustand'

const today = new Date().toISOString().slice(0, 10)

const initialDraft = {
  member: '',
  amount: '',
  method: '',
  date: today,
  reference: '',
  note: '',
}

const initialPayments = [
  {
    id: 'pay-1',
    member: 'Rahul',
    amount: 3500,
    method: 'UPI',
    date: today,
    reference: 'UPI-8432',
    status: 'Verified',
  },
  {
    id: 'pay-2',
    member: 'Arun',
    amount: 2500,
    method: 'Cash',
    date: today,
    reference: 'Cash handover',
    status: 'Pending',
  },
  {
    id: 'pay-3',
    member: 'Sai',
    amount: 3000,
    method: 'Bank transfer',
    date: today,
    reference: 'NEFT-2049',
    status: 'Verified',
  },
]

export const usePaymentStore = create((set) => ({
  draft: initialDraft,
  payments: initialPayments,
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
  addPayment: (payment) =>
    set((state) => ({
      payments: [
        {
          id: `pay-${Date.now()}`,
          status: Number(payment.amount) >= 3000 ? 'Verified' : 'Pending',
          ...payment,
          amount: Number(payment.amount),
        },
        ...state.payments,
      ],
      draft: initialDraft,
      errors: {},
    })),
  verifyPayment: (paymentId) =>
    set((state) => ({
      payments: state.payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: 'Verified' } : payment,
      ),
    })),
  resetDraft: () => set({ draft: initialDraft, errors: {} }),
}))
