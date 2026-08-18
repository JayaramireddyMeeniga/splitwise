import { z } from 'zod'

export const settingsSchema = z.object({
  roomName: z
    .string()
    .trim()
    .min(3, 'Room name must be at least 3 characters')
    .max(50, 'Room name is too long'),
  maintainerName: z
    .string()
    .trim()
    .min(2, 'Maintainer name must be at least 2 characters')
    .max(40, 'Maintainer name is too long'),
  rentDueDay: z.coerce
    .number({ error: 'Rent due day is required' })
    .min(1, 'Use day 1 to 28')
    .max(28, 'Use day 1 to 28'),
  approvalLimit: z.coerce
    .number({ error: 'Approval limit is required' })
    .min(0, 'Approval limit cannot be negative')
    .max(500000, 'Approval limit is too high'),
  defaultSplit: z.string().min(1, 'Choose default split'),
  settlementCycle: z.string().min(1, 'Choose settlement cycle'),
  walletTarget: z.coerce
    .number({ error: 'Wallet target is required' })
    .min(0, 'Wallet target cannot be negative')
    .max(500000, 'Wallet target is too high'),
})

export const mapSettingsErrors = (error) =>
  error.issues.reduce((errors, issue) => {
    errors[issue.path.join('.')] = issue.message
    return errors
  }, {})
