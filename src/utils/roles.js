export const ROLES = {
  MAINTAINER: 'maintainer',
  MEMBER: 'member',
}

export const ROLE_COPY = {
  [ROLES.MAINTAINER]: {
    title: 'Maintainer',
    description:
      'Create rooms, invite members, approve expenses, manage wallet collections, and generate settlements.',
    badge: 'Manager access',
  },
  [ROLES.MEMBER]: {
    title: 'Roommate',
    description:
      'Join rooms, track dues, upload payment proof, add expenses, and request reimbursements.',
    badge: 'Member access',
  },
}

export const AUTH_ROLE_COPY = {
  login: {
    [ROLES.MAINTAINER]: {
      title: 'Maintainer login',
      subtitle: 'Open your room control desk for approvals, wallet, dues, and monthly settlement checks.',
      badge: 'Manager access',
    },
    [ROLES.MEMBER]: {
      title: 'Roommate login',
      subtitle: 'View dues, upload payment proof, add personal expenses, and follow your settlement status.',
      badge: 'Member access',
    },
  },
  register: {
    [ROLES.MAINTAINER]: {
      title: 'Create maintainer account',
      subtitle: 'Set up a room, invite members, manage wallet collections, and generate settlements.',
      badge: 'Create room access',
    },
    [ROLES.MEMBER]: {
      title: 'Create roommate account',
      subtitle: 'Join an existing room, track your dues, upload payment proof, and request reimbursements.',
      badge: 'Join room access',
    },
  },
}

export const getRoleCopy = (role, context) =>
  context
    ? AUTH_ROLE_COPY[context]?.[role] || AUTH_ROLE_COPY[context]?.[ROLES.MEMBER]
    : ROLE_COPY[role] || ROLE_COPY[ROLES.MEMBER]

export const isMaintainer = (role) => role === ROLES.MAINTAINER
