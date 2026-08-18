import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Name is too long'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email'),
  phone: z
    .string()
    .trim()
    .min(10, 'Enter a valid phone number')
    .max(15, 'Phone number is too long'),
  role: z.string().min(1, 'Choose a role'),
  upiId: z
    .string()
    .trim()
    .min(3, 'UPI ID is required')
    .max(60, 'UPI ID is too long'),
})

export const securitySchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
})

export const mapProfileErrors = (error) =>
  error.issues.reduce((errors, issue) => {
    errors[issue.path.join('.')] = issue.message
    return errors
  }, {})
