import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import CommandDock from './CommandDock'

const AppLayout = ({ children, title }) => (
  <div className="ledger-grid min-h-screen bg-canvas text-ink">
    <Navbar title={title} />
    <main className="animate-rise-in mx-auto w-full max-w-7xl px-4 pb-36 pt-4 md:px-6 lg:pt-5">
      {children || <Outlet />}
    </main>
    <CommandDock />
  </div>
)

export default AppLayout
