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
          'flex min-h-12 items-center gap-3 rounded-2xl bg-white px-4 ring-1 ring-slate-200 transition focus-within:ring-2 focus-within:ring-mint',
          error && 'ring-rose-300 focus-within:ring-rose-400',
        )}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0 text-slate-400" />}
        <input
          id={inputId}
          className={cn(
            'w-full bg-transparent py-3 text-sm font-semibold text-ink outline-none placeholder:text-slate-400',
            inputClassName,
          )}
          {...props}
        />
      </span>
      {(error || hint) && (
        <span className={cn('mt-2 block text-xs font-semibold', error ? 'text-rose-600' : 'text-slate-500')}>
          {error || hint}
        </span>
      )}
    </label>
  )
}

export default FormInput
