import { cn } from '../../utils/cn'

const FormInput = ({
  label,
  error,
  hint,
  icon: Icon,
  className,
  inputClassName,
  id,
  ...props
}) => {
  const inputId = id || props.name

  return (
    <label className={cn('block', className)} htmlFor={inputId}>
      {label && <span className="mb-2 block text-sm font-bold text-ink">{label}</span>}
      <span
        className={cn(
          'flex items-center gap-2 rounded-sm bg-surface px-3 ring-1 ring-stone-200 transition focus-within:ring-2 focus-within:ring-primary',
          error && 'ring-danger/30 focus-within:ring-danger',
        )}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0 text-stone-400" />}
        <input
          id={inputId}
          className={cn(
            'w-full bg-transparent py-1.5 text-sm font-semibold text-ink outline-none placeholder:text-sm placeholder:text-stone-400 mb-0.5',
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
    </label>
  )
}

export default FormInput
