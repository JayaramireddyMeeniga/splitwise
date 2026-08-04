import { cn } from '../../utils/cn'

const FormTextarea = ({
  label,
  error,
  hint,
  className,
  textareaClassName,
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || props.name

  return (
    <label className={cn('block', className)} htmlFor={textareaId}>
      {label && <span className="mb-2 block text-sm font-bold text-ink">{label}</span>}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full resize-none rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-mint',
          error && 'ring-rose-300 focus:ring-rose-400',
          textareaClassName,
        )}
        {...props}
      />
      {(error || hint) && (
        <span className={cn('mt-2 block text-xs font-semibold', error ? 'text-rose-600' : 'text-slate-500')}>
          {error || hint}
        </span>
      )}
    </label>
  )
}

export default FormTextarea
