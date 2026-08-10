import { Bell, Menu, Search, UserCircle } from 'lucide-react'
import Button from '../ui/Button'

const Navbar = ({ onMenuClick, title = 'Room finances' }) => (
  <nav className="sticky top-0 z-30 border-b border-white/60 bg-canvas/78 px-4 py-3 backdrop-blur-xl md:px-6">
    <div className="flex items-center gap-3">
      <Button
        aria-label="Open navigation"
        className="lg:hidden"
        size="icon"
        variant="secondary"
        icon={Menu}
        onClick={onMenuClick}
      />
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">RoomMateX</p>
        <h2 className="truncate text-lg font-black text-ink">{title}</h2>
      </div>
      <div className="ml-auto hidden py-1.5 min-w-72 items-center gap-2 rounded-sm bg-white px-4 ring-1 ring-slate-200 md:flex">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-slate-400"
          placeholder="Search expenses, people, bills..."
        />
      </div>
      <Button className="rounded-md p-2.5" aria-label="Notifications" size="icon" variant="secondary" icon={Bell} />
      <Button aria-label="Profile" size="icon" variant="ghost" icon={UserCircle} />
    </div>
  </nav>
)

export default Navbar
