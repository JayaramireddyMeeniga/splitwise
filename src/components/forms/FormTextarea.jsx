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
          'w-full resize-none rounded-2xl bg-surface px-4 py-3 text-sm font-semibold text-ink outline-none ring-1 ring-stone-200 transition placeholder:text-stone-400 focus:ring-2 focus:ring-primary',
          error && 'ring-danger/30 focus:ring-danger',
          textareaClassName,
        )}
        {...props}
      />
      {(error || hint) && (
        <span className={cn('mt-2 block text-xs font-semibold', error ? 'text-danger' : 'text-stone-500')}>
          {error || hint}
        </span>
      )}
    </label>
  )
}

export default FormTextarea
