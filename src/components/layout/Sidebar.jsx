import { createElement } from 'react'
import {
  BarChart3, Bell, CreditCard, Home, ReceiptText, Settings, Sparkles, Users, WalletCards,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'

const navGroups = [
  {
    label: 'Operate',
    items: [
      { label: 'Dashboard', href: '/', icon: Home, code: '01' },
      { label: 'Rooms', href: '/rooms', icon: Users, code: '02' },
      { label: 'Expenses', href: '/expenses', icon: ReceiptText, code: '03' },
    ],
  },
  {
    label: 'Money Flow',
    items: [
      { label: 'Payments', href: '/payments', icon: CreditCard, code: '04' },
      { label: 'Wallet', href: '/wallet', icon: WalletCards, code: '05' },
      { label: 'Reports', href: '/reports', icon: BarChart3, code: '06' },
    ],
  },
  {
    label: 'Control',
    items: [
      { label: 'Alerts', href: '/notifications', icon: Bell, code: '07' },
      { label: 'Settings', href: '/settings', icon: Settings, code: '08' },
    ],
  },
]

const Sidebar = ({ className }) => (
  <aside
    className={cn(
      'hidden min-h-screen w-80 shrink-0 bg-gray-600 p-4 text-white lg:block',
      className,
    )}
  >
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-mint text-lg font-black text-ink">
              RX
            </div>
            <div>
              <p className="text-lg font-black">RoomMateX</p>
              <p className="text-xs font-bold text-white/45">room finance OS</p>
            </div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/8 text-mint">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-black/18">
          <div className="p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Room</p>
            <p className="mt-1 text-sm font-black">4A</p>
          </div>
          <div className="border-x border-white/10 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">People</p>
            <p className="mt-1 text-sm font-black">6</p>
          </div>
          <div className="p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Due</p>
            <p className="mt-1 text-sm font-black">Aug 5</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5 last:mb-0">
            <div className="space-y-2">
              {group.items.map(({ label, href, icon, code }) => (
                <NavLink
                  key={href}
                  to={href}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-lg border px-3 py-3 transition duration-200',
                      isActive
                        ? 'border-mint/60 bg-mint text-ink shadow-[0_18px_40px_rgba(30,213,151,0.24)]'
                        : 'border-white/8 bg-white/[0.035] text-white/70 hover:border-white/18 hover:bg-white/[0.08] hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          'grid h-10 w-10 shrink-0 place-items-center rounded-lg',
                          isActive ? 'bg-ink text-white' : 'bg-white/8 text-mint',
                        )}
                      >
                        {createElement(icon, { className: 'h-5 w-5' })}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black">{label}</span>
                        <span
                          className={cn(
                            'mt-0.5 block text-[10px] font-black uppercase tracking-[0.18em]',
                            isActive ? 'text-ink/55' : 'text-white/28',
                          )}
                        >
                          RoomMateX
                        </span>
                      </span>
                      <span
                        className={cn(
                          'h-2.5 w-2.5 rounded-full',
                          isActive ? 'bg-ink' : 'bg-white/18 group-hover:bg-mint',
                        )}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4">
        <div className="overflow-hidden rounded-lg border border-mint/24 bg-mint/12">
          <div className="flex items-center justify-between border-b border-mint/18 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-mint">wallet pulse</p>
            <span className="h-2 w-2 rounded-full bg-mint" />
          </div>
          <div className="p-4">
            <p className="text-3xl font-black">INR 6,080</p>
            <p className="mt-2 text-xs leading-5 text-white/50">
              Common fund is ready for groceries, cleaning supplies, and emergency repairs.
            </p>
          </div>
        </div>
      </div>
    </div>
  </aside>
)

export default Sidebar
