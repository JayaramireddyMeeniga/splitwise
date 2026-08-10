import { cn } from '../../utils/cn'

const tones = {
  neutral: 'bg-stone-100 text-stone-700 ring-stone-200',
  success: 'bg-completed-light text-primary-hover ring-primary/20',
  warning: 'bg-secondary-light text-secondary-hover ring-secondary/20',
  danger: 'bg-danger-light text-danger ring-danger/20',
  info: 'bg-primary-light text-primary ring-primary/20',
  dark: 'bg-ink text-white ring-ink',
}

const Badge = ({ children, tone = 'neutral', className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ring-1',
      tones[tone],
      className,
    )}
  >
    {children}
  </span>
)

export default Badge
