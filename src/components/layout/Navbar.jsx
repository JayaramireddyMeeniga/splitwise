import { Bell, Plus, Search, UserCircle2, WalletCards } from 'lucide-react'
import Button from '../ui/Button'
import logo from '../../assets/split-wise-logo.png'

const getLedgerMonth = () =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date())

const Navbar = () => {
  const ledgerMonth = getLedgerMonth()

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
            <h2 className="truncate uppercase text-md font-bold text-ink md:text-lg">
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
            <Button className="hidden rounded-lg md:inline-flex" variant="accent" icon={Plus}>
              New Entry
            </Button>
            <Button className="rounded-lg" aria-label="Wallet" size="icon" variant="secondary" icon={WalletCards} />
            <Button className="rounded-lg" aria-label="Notifications" size="icon" variant="secondary" icon={Bell} />
            <Button className="rounded-lg" aria-label="Profile" size="icon" variant="secondary" icon={UserCircle2} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
