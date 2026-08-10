import { AlertTriangle } from 'lucide-react'

const ErrorMessage = ({ title = 'Action needed', message, children }) => (
  <div className="rounded-2xl border border-danger/20 bg-danger-light px-4 py-3 text-danger">
    <div className="flex gap-3">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="text-sm font-black">{title}</p>
        {message && <p className="mt-1 text-sm leading-6 text-danger">{message}</p>}
        {children}
      </div>
    </div>
  </div>
)

export default ErrorMessage
