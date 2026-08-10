import { createElement } from 'react'
import { ShieldCheck, UserRound } from 'lucide-react'
import { cn } from '../../utils/cn'

const roles = [
  {
    value: 'maintainer',
    label: 'Room Maintainer',
    description: 'Create rooms, approve expenses, settle dues.',
    icon: ShieldCheck,
  },
  {
    value: 'member',
    label: 'Roommate',
    description: 'Pay dues, add expenses, track settlements.',
    icon: UserRound,
  },
]

const RoleSwitch = ({ value, onChange }) => (
  <div className="grid gap-2 sm:grid-cols-2">
    {roles.map(({ value: roleValue, label, description, icon }) => {
      const selected = value === roleValue

      return (
        <button
          key={roleValue}
          type="button"
          onClick={() => onChange(roleValue)}
          className={cn(
            'cursor-pointer group rounded-lg border p-3 text-left transition hover:-translate-y-0.5',
            selected
              ? 'border-primary bg-primary-light shadow-[0_14px_34px_rgba(249,115,22,0.12)]'
              : 'border-stone-200 bg-stone-50/70 hover:border-primary/30 hover:bg-surface',
          )}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                'grid p-2.5 shrink-0 place-items-center rounded-lg transition',
                selected ? 'bg-primary text-white' : 'bg-gray-200 text-stone-500 group-hover:text-primary',
              )}
            >
              {createElement(icon, { className: 'h-4 w-4' })}
            </span>
            <span>
              <span className="block text-xs font-black text-ink">{label}</span>
              <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-stone-500">
                {description}
              </span>
            </span>
          </div>
        </button>
      )
    })}
  </div>
)

export default RoleSwitch
