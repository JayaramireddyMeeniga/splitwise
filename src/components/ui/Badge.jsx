import { cn } from '../../utils/cn'

const tones = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
  info: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
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
