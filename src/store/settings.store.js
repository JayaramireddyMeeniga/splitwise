import { create } from 'zustand'

const initialSettings = {
  roomName: 'Bachelor Room 4A',
  maintainerName: 'Rahul Sharma',
  rentDueDay: 5,
  approvalLimit: 1000,
  defaultSplit: 'Equal split',
  settlementCycle: 'Monthly',
  walletTarget: 6000,
  remindersEnabled: true,
  paymentProofRequired: true,
  reimbursementApproval: true,
  guestExpenseTracking: false,
}

export const useSettingsStore = create((set) => ({
  settings: initialSettings,
  errors: {},
  lastSaved: null,
  setSetting: (field, value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [field]: value,
      },
      errors: {
        ...state.errors,
        [field]: undefined,
      },
    })),
  toggleSetting: (field) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [field]: !state.settings[field],
      },
    })),
  setErrors: (errors) => set({ errors }),
  saveSettings: () =>
    set({
      lastSaved: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      errors: {},
    }),
  resetSettings: () =>
    set({
      settings: initialSettings,
      errors: {},
      lastSaved: null,
    }),
}))
