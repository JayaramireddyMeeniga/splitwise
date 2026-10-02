import { createElement, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Bell, ChevronRight, LogOut, Plus, Search, Settings,
  ShieldCheck, UserCircle2, Users, WalletCards,
} from 'lucide-react'
import Button from '../ui/Button'
import logo from '../../assets/split-wise-logo.png'

const getLedgerMonth = () =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date())

const Navbar = () => {
  const ledgerMonth = getLedgerMonth()
  const navigate = useNavigate()
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)

  const handleNewEntry = () => {
    navigate('/expenses', {
      state: {
        openExpenseDialog: Date.now(),
      },
    })
  }

  const handleNavigate = (path) => {
    setProfileOpen(false)
    navigate(path)
  }

  const handleLogout = () => {
    setProfileOpen(false)
    navigate('/login')
  }

  const profileItems = [
    {
      label: 'Profile',
      detail: 'Personal info',
      path: '/profile',
      icon: UserCircle2,
    },
    {
      label: 'Members',
      detail: 'Room people',
      path: '/members',
      icon: Users,
    },
    {
      label: 'Settings',
      detail: 'Room setup',
      path: '/settings',
      icon: Settings,
    },
  ]

  return (
    <nav className="sticky top-0 z-30 px-3 pt-3 md:px-5">
      <div className="surface-glow animate-rise-in mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl bg-surface/90 p-3 shadow-[0_16px_46px_rgba(28,25,23,0.075)] ring-1 ring-white/80 backdrop-blur-2xl md:p-4 xl:flex-row xl:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center rounded-xl bg-surface p-2 shadow-[0_10px_28px_rgba(28,25,23,0.08)] ring-1 ring-stone-200/80">
            <img
              src={logo}
              alt="RoomMateX"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="min-w-0 border-l border-stone-200">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">RoomMateX live room</p>
            <h2 className="truncate uppercase text-md font-bold text-ink md:text-[17px]">
              {ledgerMonth} <span className="font-bold text-stone-500">room ledger</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center xl:justify-end">
          <div className="flex flex-1 items-center gap-3 rounded-md bg-stone-50/92 px-4 py-2.5 ring-1 ring-stone-200/80 transition focus-within:bg-surface focus-within:ring-2 focus-within:ring-primary md:max-w-md">
            <Search className="h-5 w-5 text-stone-400" />
            <input
              className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-stone-400"
              placeholder="Search expenses, people, bills..."
            />
          </div>

          {/* <div className="grid grid-cols-3 overflow-hidden rounded-lg bg-charcoal/92 text-white ring-1 ring-ink/10 md:w-[26rem]">
          <div className="px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-400">Room</p>
            <p className="text-sm font-black">4A</p>
          </div>
          <div className="border-x border-white/10 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-400">People</p>
            <p className="text-sm font-black">6 active</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-400">Wallet</p>
            <p className="text-sm font-black text-primary-light">INR 6,080</p>
          </div>
        </div> */}

          <div className="flex gap-2">
            <Button
              className="hidden rounded-lg md:inline-flex"
              variant="accent"
              icon={Plus}
              onClick={handleNewEntry}
            >
              New Entry
            </Button>
            <Button className="rounded-lg" aria-label="Wallet" size="icon" variant="secondary" icon={WalletCards} />
            <Button className="rounded-lg" aria-label="Notifications" size="icon" variant="secondary" icon={Bell} />
            <div className="relative">
              <Button
                className="rounded-lg"
                aria-label="Profile menu"
                size="icon"
                variant="secondary"
                icon={UserCircle2}
                onClick={() => setProfileOpen((open) => !open)}
              />
              {profileOpen && (
                <div className="animate-rise-in absolute right-0 top-13 z-50 w-[19rem] overflow-hidden rounded-2xl border border-white/80 bg-surface/95 p-2 shadow-[0_24px_70px_rgba(28,25,23,0.22)] ring-1 ring-stone-200/80 backdrop-blur-2xl">
                  <div className="surface-glow mb-2 rounded-xl bg-ink p-3 text-white">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-sm font-black shadow-[0_12px_24px_rgba(249,115,22,0.24)]">
                        RX
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">RoomMateX account</p>
                        <p className="mt-0.5 text-[11px] font-bold text-stone-300">6 active roommates</p>
                      </div>
                      <ShieldCheck className="ml-auto h-4 w-4 text-primary-light" />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    {profileItems.map(({ label, detail, path, icon }) => {
                      const active = location.pathname === path

                      return (
                        <button
                          key={path}
                          type="button"
                          onClick={() => handleNavigate(path)}
                          className={[
                            'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:-translate-y-0.5',
                            active
                              ? 'bg-primary-light text-primary ring-1 ring-primary/20'
                              : 'text-ink hover:bg-stone-50 hover:text-primary',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'grid h-9 w-9 shrink-0 place-items-center rounded-lg transition',
                              active
                                ? 'bg-primary text-white'
                                : 'bg-stone-100 text-stone-500 group-hover:bg-primary-light group-hover:text-primary',
                            ].join(' ')}
                          >
                            {createElement(icon, { className: 'h-4.5 w-4.5' })}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-black">{label}</span>
                            <span className="block text-[11px] font-bold text-stone-500">{detail}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                        </button>
                      )
                    })}
                  </div>

                  <div className="my-2 h-px bg-stone-200" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-ink transition hover:-translate-y-0.5 hover:bg-danger-light hover:text-danger"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-stone-100 text-stone-500 transition group-hover:bg-white group-hover:text-danger">
                      <LogOut className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-black">Logout</span>
                      <span className="block text-[11px] font-bold text-stone-500">End session</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-danger" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
