import { z } from 'zod'

export const expenseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Expense title must be at least 3 characters')
    .max(60, 'Expense title is too long'),
  amount: z.coerce
    .number({ error: 'Amount is required' })
    .positive('Amount must be greater than zero')
    .max(500000, 'Amount is too high'),
  category: z.string().min(1, 'Choose a category'),
  paidBy: z.string().min(1, 'Choose who paid'),
  splitMethod: z.string().min(1, 'Choose a split method'),
  date: z.string().min(1, 'Choose a date'),
  members: z.array(z.string()).min(1, 'Choose at least one roommate'),
  notes: z.string().max(180, 'Notes are too long').optional(),
  receiptName: z.string().optional(),
})

export const mapExpenseErrors = (error) =>
  error.issues.reduce((errors, issue) => {
    errors[issue.path.join('.')] = issue.message
    return errors
  }, {})
