import { ImagePlus, UploadCloud } from 'lucide-react'
import { cn } from '../../utils/cn'

const FileUpload = ({
  label = 'Upload receipt',
  error,
  hint = 'PNG, JPG or PDF up to 5MB',
  className,
  id,
  name,
  accept = 'image/*,.pdf',
  onChange,
  ...props
}) => {
  const inputId = id || name || 'file-upload'

  return (
    <label
      className={cn(
        'block rounded-xl border border-dashed border-stone-300 bg-surface/70 p-5 transition hover:border-primary hover:bg-primary-light',
        error && 'border-danger/30 bg-danger-light',
        className,
      )}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-xl bg-ink text-white">
          <UploadCloud className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-ink">{label}</p>
          <p className={cn('mt-1 text-xs font-semibold', error ? 'text-danger' : 'text-stone-500')}>
            {error || hint}
          </p>
        </div>
        <ImagePlus className="h-5 w-5 text-stone-400" />
      </div>
    </label>
  )
}

export default FileUpload
