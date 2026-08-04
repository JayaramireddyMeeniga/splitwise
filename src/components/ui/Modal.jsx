import { X } from 'lucide-react'
import Button from './Button'
import { cn } from '../../utils/cn'

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) => {
  if (!open) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4 backdrop-blur-sm">
      <div
        className={cn(
          'max-h-[90vh] w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)]',
          sizes[size],
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            {title && <h2 className="text-xl font-black text-ink">{title}</h2>}
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
          <Button
            aria-label="Close modal"
            size="icon"
            variant="ghost"
            icon={X}
            onClick={onClose}
          />
        </div>
        <div className="max-h-[62vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="border-t border-slate-100 px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
