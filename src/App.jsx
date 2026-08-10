import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => (
  <BrowserRouter>
    <AppLayout>
      <Dashboard />
    </AppLayout>
  </BrowserRouter>
)

export default App
