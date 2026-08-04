import { LoaderCircle } from 'lucide-react'
import { cn } from '../../utils/cn'

const Loader = ({ label = 'Loading RoomMateX...', fullScreen = false, className }) => (
  <div
    className={cn(
      'grid place-items-center',
      fullScreen ? 'min-h-screen bg-canvas' : 'min-h-48',
      className,
    )}
  >
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-white/80 px-8 py-7 text-center shadow-soft ring-1 ring-white/70 backdrop-blur-xl">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-mint/20 text-mint-dark">
        <LoaderCircle className="h-7 w-7 animate-spin" />
      </div>
      <p className="text-sm font-bold text-slate-600">{label}</p>
    </div>
  </div>
)

export default Loader
