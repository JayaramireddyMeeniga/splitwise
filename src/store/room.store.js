import { create } from 'zustand'

const initialRoomDraft = {
  roomName: '',
  maintainerName: '',
  inviteName: '',
  inviteContact: '',
  invites: [],
  errors: {},
}

export const useRoomSetupStore = create((set) => ({
  ...initialRoomDraft,
  setField: (field, value) =>
    set((state) => ({
      [field]: value,
      errors: {
        ...state.errors,
        [field]: undefined,
      },
    })),
  setErrors: (errors) => set({ errors }),
  addInvite: (invite) =>
    set((state) => ({
      invites: [...state.invites, invite],
      inviteName: '',
      inviteContact: '',
      errors: {
        ...state.errors,
        inviteName: undefined,
        inviteContact: undefined,
        invites: undefined,
      },
    })),
  removeInvite: (contact) =>
    set((state) => ({
      invites: state.invites.filter((invite) => invite.contact !== contact),
    })),
  resetRoomSetup: () => set(initialRoomDraft),
}))
