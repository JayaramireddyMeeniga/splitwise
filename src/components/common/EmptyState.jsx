import { createElement } from 'react'
import { ReceiptText } from 'lucide-react'
import Button from '../ui/Button'

const EmptyState = ({
  icon = ReceiptText,
  title = 'Nothing here yet',
  description = 'Once activity starts, your room finances will appear here.',
  actionLabel,
  onAction,
  actionIcon,
}) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-mint/16 text-mint-dark">
      {createElement(icon, { className: 'h-8 w-8' })}
    </div>
    <h3 className="mt-5 text-xl font-black text-ink">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    {actionLabel && (
      <Button className="mt-6" icon={actionIcon} onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
)

export default EmptyState
