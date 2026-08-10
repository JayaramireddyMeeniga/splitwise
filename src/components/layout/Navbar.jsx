import { Bell, Plus, Search, UserCircle, WalletCards } from 'lucide-react'
import Button from '../ui/Button'

const Navbar = ({ title = 'Room finances' }) => (
  <nav className="sticky top-0 z-30 px-3 pt-3 md:px-5">
    <div className="surface-glow animate-rise-in mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl bg-surface/78 p-3 shadow-[0_16px_46px_rgba(28,25,23,0.075)] ring-1 ring-white/80 backdrop-blur-2xl md:p-4 xl:flex-row xl:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid p-3 shrink-0 place-items-center rounded-lg bg-charcoal text-base font-black text-white shadow-[0_14px_34px_rgba(28,25,23,0.16)] ring-1 ring-white/10">
          RX
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">RoomMateX live room</p>
          <h2 className="truncate text-2xl font-semibold text-ink">{title}</h2>
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

        <div className="grid grid-cols-3 overflow-hidden rounded-lg bg-charcoal/92 text-white ring-1 ring-ink/10 md:w-[26rem]">
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
        </div>

        <div className="flex gap-2">
          <Button className="hidden md:inline-flex rounded-lg" variant="accent" icon={Plus}>
            New entry
          </Button>
          <Button className="rounded-lg" aria-label="Wallet" size="icon" variant="secondary" icon={WalletCards} />
          <Button className="rounded-lg" aria-label="Notifications" size="icon" variant="secondary" icon={Bell} />
          <Button className="rounded-lg" aria-label="Profile" size="icon" variant="ghost" icon={UserCircle} />
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
