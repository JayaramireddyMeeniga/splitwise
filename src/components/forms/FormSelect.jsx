import { useId, useMemo, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

const normalizeOption = (option) =>
  typeof option === 'object'
    ? option
    : {
      label: option,
      value: option,
    }

const FormSelect = ({
  label,
  error,
  hint,
  options = [],
  placeholder = 'Select option',
  className,
  id,
  name,
  value,
  defaultValue = '',
  onChange,
  disabled = false,
}) => {
  const generatedId = useId()
  const selectId = id || name || generatedId
  const normalizedOptions = useMemo(() => options.map(normalizeOption), [options])
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value ?? internalValue
  const selectedOption = normalizedOptions.find((option) => option.value === currentValue)

  const handleSelect = (nextValue) => {
    setInternalValue(nextValue)
    setOpen(false)
    onChange?.({
      target: {
        name,
        value: nextValue,
      },
    })
  }

  return (
    <div className={cn('relative block', className)}>
      {label && (
        <label className="mb-2 block text-sm font-bold text-ink" htmlFor={selectId}>
          {label}
        </label>
      )}

      <button
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        className={cn(
          'cursor-pointer flex w-full items-center justify-between gap-3 rounded-sm bg-surface px-3.5 py-2 text-left text-sm font-semibold text-ink shadow-[0_8px_24px_rgba(28,25,23,0.045)] ring-1 ring-stone-200 transition hover:ring-primary/35 focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60',
          open && 'ring-2 ring-primary',
          error && 'ring-danger/30 focus:ring-danger',
        )}
      >
        <span className={cn('truncate', !selectedOption && 'text-stone-400')}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200',
            open && 'rotate-180 text-primary',
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-stone-200 bg-surface p-1.5 shadow-[0_18px_50px_rgba(28,25,23,0.16)]">
          <div className="max-h-64 overflow-y-auto" role="listbox">
            {placeholder && (
              <button
                type="button"
                role="option"
                aria-selected={currentValue === ''}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect('')}
                className={cn(
                  'cursor-pointer flex w-full items-center justify-between rounded-sm px-3 py-1.5 text-left text-sm font-semibold transition',
                  currentValue === ''
                    ? 'bg-primary-light text-primary'
                    : 'text-stone-500 hover:bg-stone-50 hover:text-ink',
                )}
              >
                {placeholder}
                {currentValue === '' && <Check className="h-4 w-4" />}
              </button>
            )}

            {normalizedOptions.map((option) => {
              const isSelected = option.value === currentValue

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'cursor-pointer flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm font-semibold transition',
                    isSelected
                      ? 'bg-primary-light text-primary'
                      : 'text-ink hover:bg-stone-50 hover:text-primary',
                  )}
                >
                  {option.label}
                  {isSelected && <Check className="h-4 w-4" />}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {name && <input type="hidden" name={name} value={currentValue} />}

      {(error || hint) && (
        <span className={cn('mt-2 block text-xs font-semibold', error ? 'text-danger' : 'text-stone-500')}>
          {error || hint}
        </span>
      )}
    </div>
  )
}

export default FormSelect
