import { z } from 'zod'

export const walletTransactionSchema = z.object({
  type: z.enum(['credit', 'debit'], {
    error: 'Choose transaction type',
  }),
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(60, 'Title is too long'),
  amount: z.coerce
    .number({ error: 'Amount is required' })
    .positive('Amount must be greater than zero')
    .max(500000, 'Amount is too high'),
  category: z.string().min(1, 'Choose a category'),
  handledBy: z.string().min(1, 'Choose who handled it'),
  date: z.string().min(1, 'Choose a date'),
  note: z
    .string()
    .trim()
    .max(120, 'Note is too long')
    .optional(),
})

export const mapWalletErrors = (error) =>
  error.issues.reduce((errors, issue) => {
    errors[issue.path.join('.')] = issue.message
    return errors
  }, {})
