import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import RoomSetup from '../pages/Onboarding/RoomSetup'
import JoinRoom from '../pages/Onboarding/JoinRoom'
import RoomList from '../pages/Rooms/RoomList'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/room-setup" element={<RoomSetup />} />
    <Route path="/join-room" element={<JoinRoom />} />
    <Route
      path="/rooms"
      element={
        <AppLayout>
          <RoomList />
        </AppLayout>
      }
    />
    <Route
      path="/dashboard"
      element={
        <AppLayout>
          <Dashboard />
        </AppLayout>
      }
    />
  </Routes>
)

export default AppRoutes
