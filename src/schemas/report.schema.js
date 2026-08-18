import { z } from 'zod'

export const reportFilterSchema = z.object({
  month: z.string().min(1, 'Choose a report month'),
  reportType: z.string().min(1, 'Choose report type'),
  format: z.string().min(1, 'Choose export format'),
})

export const mapReportErrors = (error) =>
  error.issues.reduce((errors, issue) => {
    errors[issue.path.join('.')] = issue.message
    return errors
  }, {})
