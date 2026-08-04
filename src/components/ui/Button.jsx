import { LoaderCircle } from 'lucide-react'
import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-ink text-white shadow-[0_18px_45px_rgba(16,24,40,0.22)] hover:-translate-y-0.5 hover:bg-charcoal',
  secondary:
    'bg-white text-ink ring-1 ring-slate-200 hover:-translate-y-0.5 hover:ring-ink/20 hover:shadow-soft',
  accent:
    'bg-mint text-ink shadow-[0_16px_35px_rgba(30,213,151,0.28)] hover:-translate-y-0.5',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-ink',
  danger: 'bg-rose-600 text-white shadow-[0_16px_35px_rgba(225,29,72,0.25)] hover:bg-rose-700',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
  icon: 'h-10 w-10 p-0',
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const RenderIcon = loading ? LoaderCircle : Icon

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {RenderIcon && iconPosition === 'left' && (
        <RenderIcon className={cn('h-4 w-4', loading && 'animate-spin')} />
      )}
      {children}
      {RenderIcon && iconPosition === 'right' && (
        <RenderIcon className={cn('h-4 w-4', loading && 'animate-spin')} />
      )}
    </button>
  )
}

export default Button
