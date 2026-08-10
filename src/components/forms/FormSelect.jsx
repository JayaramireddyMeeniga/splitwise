import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

const FormSelect = ({
  label,
  error,
  hint,
  options = [],
  placeholder = 'Select option',
  className,
  id,
  ...props
}) => {
  const selectId = id || props.name

  return (
    <label className={cn('block', className)} htmlFor={selectId}>
      {label && <span className="mb-2 block text-sm font-bold text-ink">{label}</span>}
      <span
        className={cn(
          'relative flex items-center rounded-sm bg-surface px-3.5 ring-1 ring-stone-200 transition focus-within:ring-2 focus-within:ring-primary',
          error && 'ring-danger/30 focus-within:ring-danger',
        )}
      >
        <select
          id={selectId}
          className="w-full appearance-none bg-transparent py-2 pr-9 text-sm font-semibold text-ink outline-none"
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-stone-400" />
      </span>
      {(error || hint) && (
        <span className={cn('mt-2 block text-xs font-semibold', error ? 'text-danger' : 'text-stone-500')}>
          {error || hint}
        </span>
      )}
    </label>
  )
}

export default FormSelect
