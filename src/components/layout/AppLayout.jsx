import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const AppLayout = ({ children, title }) => (
  <div className="ledger-grid min-h-screen bg-canvas text-ink">
    <div className="relative flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Navbar title={title} />
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:py-8">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  </div>
)

export default AppLayout
