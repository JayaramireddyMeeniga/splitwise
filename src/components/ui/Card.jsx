import { cn } from '../../utils/cn'

const Card = ({ children, className, tone = 'plain', ...props }) => {
  const tones = {
    plain: 'bg-surface/90 ring-1 ring-stone-200/80',
    glass: 'bg-surface/74 ring-1 ring-white/70 backdrop-blur-xl',
    ink: 'bg-ink text-white',
    warm: 'bg-primary-light ring-1 ring-primary/20',
  }

  return (
    <section
      className={cn('rounded-2xl p-5 shadow-soft', tones[tone], className)}
      {...props}
    >
      {children}
    </section>
  )
}

export const CardHeader = ({ children, className }) => (
  <div className={cn('mb-4 flex items-start justify-between gap-4', className)}>
    {children}
  </div>
)

export const CardTitle = ({ children, eyebrow, className }) => (
  <div className={className}>
    {eyebrow && (
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
    )}
    <h3 className="text-lg font-bold text-ink">{children}</h3>
  </div>
)

export default Card
