import { z } from 'zod'

export const paymentSchema = z.object({
  member: z.string().min(1, 'Choose a roommate'),
  amount: z.coerce
    .number({ error: 'Amount is required' })
    .positive('Amount must be greater than zero')
    .max(500000, 'Amount is too high'),
  method: z.string().min(1, 'Choose a payment method'),
  date: z.string().min(1, 'Choose a payment date'),
  reference: z
    .string()
    .trim()
    .max(60, 'Reference is too long')
    .optional(),
  note: z
    .string()
    .trim()
    .max(120, 'Note is too long')
    .optional(),
})

export const mapPaymentErrors = (error) =>
  error.issues.reduce((errors, issue) => {
    errors[issue.path.join('.')] = issue.message
    return errors
  }, {})
