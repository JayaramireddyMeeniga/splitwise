import { useId, useRef } from 'react'
import { CalendarDays } from 'lucide-react'
import { cn } from '../../utils/cn'

const FormDateInput = ({
  label = 'Date',
  error,
  hint,
  className,
  inputClassName,
  id,
  name,
  value,
  onChange,
  onClick,
  ...props
}) => {
  const generatedId = useId()
  const inputId = id || name || generatedId
  const inputRef = useRef(null)

  const openDatePicker = () => {
    const input = inputRef.current

    if (!input || input.disabled || input.readOnly) return

    input.focus({ preventScroll: true })

    try {
      if (typeof input.showPicker === 'function') {
        input.showPicker()
      }
    } catch {
      input.click()
    }
  }

  const handleInputClick = (event) => {
    event.stopPropagation()
    onClick?.(event)

    if (!event.defaultPrevented) {
      openDatePicker()
    }
  }

  return (
    <div className={cn('block', className)}>
      {label && (
        <label className="mb-2 block text-sm font-bold text-ink" htmlFor={inputId}>
          {label}
        </label>
      )}
      <span
        role="presentation"
        onClick={openDatePicker}
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-sm bg-surface px-3 ring-1 ring-stone-200 transition focus-within:ring-2 focus-within:ring-primary',
          error && 'ring-danger/30 focus-within:ring-danger',
        )}
      >
        <CalendarDays className="h-4 w-4 shrink-0 text-stone-400" />
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          onClick={handleInputClick}
          className={cn(
            'w-full cursor-pointer bg-transparent py-1.5 text-sm font-semibold text-ink outline-none placeholder:text-sm placeholder:text-stone-400 mb-0.5 [color-scheme:light]',
            inputClassName,
          )}
          {...props}
        />
      </span>
      {(error || hint) && (
        <span className={cn('mt-2 block text-xs font-semibold', error ? 'text-danger' : 'text-stone-500')}>
          {error || hint}
        </span>
      )}
    </div>
  )
}

export default FormDateInput
