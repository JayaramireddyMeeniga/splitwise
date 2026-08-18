import { create } from 'zustand'

const initialProfile = {
  fullName: 'Rahul Sharma',
  email: 'rahul@example.com',
  phone: '9876543210',
  role: 'Maintainer',
  upiId: 'rahul@upi',
}

const initialSecurity = {
  currentPassword: '',
  newPassword: '',
}

export const useProfileStore = create((set) => ({
  profile: initialProfile,
  security: initialSecurity,
  profileErrors: {},
  securityErrors: {},
  lastSaved: null,
  setProfileField: (field, value) =>
    set((state) => ({
      profile: {
        ...state.profile,
        [field]: value,
      },
      profileErrors: {
        ...state.profileErrors,
        [field]: undefined,
      },
    })),
  setSecurityField: (field, value) =>
    set((state) => ({
      security: {
        ...state.security,
        [field]: value,
      },
      securityErrors: {
        ...state.securityErrors,
        [field]: undefined,
      },
    })),
  setProfileErrors: (profileErrors) => set({ profileErrors }),
  setSecurityErrors: (securityErrors) => set({ securityErrors }),
  saveProfile: () =>
    set({
      lastSaved: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      profileErrors: {},
    }),
  saveSecurity: () =>
    set({
      security: initialSecurity,
      securityErrors: {},
    }),
  resetProfile: () =>
    set({
      profile: initialProfile,
      profileErrors: {},
      lastSaved: null,
    }),
}))
