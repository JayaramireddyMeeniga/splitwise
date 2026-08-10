import { z } from 'zod'

export const roommateInviteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Name is too long'),
  contact: z
    .string()
    .trim()
    .min(5, 'Email or phone is required')
    .max(80, 'Contact is too long'),
})

export const roomSetupSchema = z.object({
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
  invites: z
    .array(roommateInviteSchema)
    .min(1, 'Add at least one roommate before creating the room'),
})

export const mapZodErrors = (error) =>
  error.issues.reduce((errors, issue) => {
    const key = issue.path.join('.')
    errors[key] = issue.message
    return errors
  }, {})
