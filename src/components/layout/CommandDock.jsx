import { createElement } from 'react'
import {
  BarChart3,
  Bell,
  CreditCard,
  Home,
  ReceiptText,
  Settings,
  Users,
  WalletCards,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Rooms', href: '/rooms', icon: Users },
  { label: 'Spend', href: '/expenses', icon: ReceiptText },
  { label: 'Pay', href: '/payments', icon: CreditCard },
  { label: 'Wallet', href: '/wallet', icon: WalletCards },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Alerts', href: '/notifications', icon: Bell },
  { label: 'Setup', href: '/settings', icon: Settings },
]

const CommandDock = () => (
  <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 px-3">
    <nav className="animate-dock-in pointer-events-auto mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto rounded-[1.85rem] border border-white/12 bg-ink/95 p-2.5 shadow-[0_26px_80px_rgba(28,25,23,0.38)] backdrop-blur-2xl">
      <div className="hidden shrink-0 items-center gap-3 border-r border-white/10 px-3 pr-5 md:flex">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-base font-black text-white shadow-[0_12px_28px_rgba(234,88,12,0.28)]">
          RX
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-light">RoomMateX</p>
          <p className="text-[11px] font-bold text-white/38">Command dock</p>
        </div>
      </div>

      {navItems.map(({ label, href, icon }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            cn(
              'group flex min-w-16 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-black transition md:min-w-20',
              isActive
                ? 'bg-primary text-white shadow-[0_14px_34px_rgba(234,88,12,0.28)]'
                : 'text-white/58 hover:-translate-y-1 hover:bg-white/9 hover:text-white',
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  'grid h-8 w-8 place-items-center rounded-xl transition',
                  isActive
                    ? 'bg-primary-light text-primary-hover shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                    : 'bg-white/8 text-primary-light group-hover:bg-white/12',
                )}
              >
                {createElement(icon, { className: 'h-[18px] w-[18px]' })}
              </span>
              <span>{label}</span>
              {isActive && <span className="animate-soft-pulse absolute top-2 h-1.5 w-1.5 rounded-full bg-primary-light" />}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  </div>
)

export default CommandDock
