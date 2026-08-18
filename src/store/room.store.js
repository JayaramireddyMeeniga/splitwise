import { create } from 'zustand'

const initialRoomDraft = {
  roomName: '',
  maintainerName: '',
  inviteName: '',
  inviteContact: '',
  memberName: '',
  inviteCode: '',
  rentAmount: 12000,
  dueDay: 5,
  defaultSplit: 'Equal split',
  invites: [],
  errors: {},
  rooms: [
    {
      id: 'room-4a',
      name: 'Bachelor Room 4A',
      maintainer: 'Rahul Sharma',
      inviteCode: 'RX-4A-8291',
      members: 6,
      rentAmount: 12000,
      dueDay: 5,
      defaultSplit: 'Equal split',
    },
  ],
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
  createRoom: (room) =>
    set((state) => ({
      rooms: [
        {
          id: `room-${Date.now()}`,
          inviteCode: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
          members: state.invites.length + 1,
          ...room,
        },
        ...state.rooms,
      ],
      errors: {},
    })),
  updateRoomDetails: (roomId, updates) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId ? { ...room, ...updates } : room,
      ),
      errors: {},
    })),
  resetRoomSetup: () => set(initialRoomDraft),
}))
