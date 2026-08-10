import { LoaderCircle } from 'lucide-react'
import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-primary text-white shadow-[0_14px_34px_rgba(249,115,22,0.2)] hover:-translate-y-0.5 hover:bg-primary-hover active:translate-y-0',
  secondary:
    'bg-surface/90 text-ink ring-1 ring-stone-200/90 backdrop-blur hover:-translate-y-0.5 hover:ring-primary/30 hover:shadow-soft active:translate-y-0',
  accent:
    'bg-secondary text-white shadow-[0_14px_32px_rgba(245,158,11,0.2)] hover:-translate-y-0.5 hover:bg-secondary-hover active:translate-y-0',
  ghost: 'bg-transparent text-stone-600 hover:bg-surface/72 hover:text-ink',
  danger: 'bg-danger text-white shadow-[0_16px_35px_rgba(220,38,38,0.22)] hover:brightness-95',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
  icon: 'h-11 w-11 p-0',
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
        'cursor-pointer inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {RenderIcon && iconPosition === 'left' && (
        <RenderIcon className={cn(size === 'icon' ? 'h-5 w-5' : 'h-[18px] w-[18px]', loading && 'animate-spin')} />
      )}
      {children}
      {RenderIcon && iconPosition === 'right' && (
        <RenderIcon className={cn(size === 'icon' ? 'h-5 w-5' : 'h-[18px] w-[18px]', loading && 'animate-spin')} />
      )}
    </button>
  )
}

export default Button
