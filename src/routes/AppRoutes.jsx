import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import RoomSetup from '../pages/Onboarding/RoomSetup'
import JoinRoom from '../pages/Onboarding/JoinRoom'
import RoomList from '../pages/Rooms/RoomList'
import CreateRoom from '../pages/Rooms/CreateRoom'
import RoomsJoinRoom from '../pages/Rooms/JoinRoom'
import RoomDetails from '../pages/Rooms/RoomDetails'
import ExpenseList from '../pages/Expenses/ExpenseList'
import AddExpense from '../pages/Expenses/AddExpense'
import ExpenseDetails from '../pages/Expenses/ExpenseDetails'
import MemberList from '../pages/Members/MemberList'
import AddMember from '../pages/Members/AddMember'
import PaymentList from '../pages/Payments/PaymentList'
import Wallet from '../pages/Wallet/Wallet'
import Reports from '../pages/Reports/Reports'
import Settings from '../pages/Settings/Settings'
import Profile from '../pages/Profile/Profile'

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
      path="/rooms/create"
      element={
        <AppLayout>
          <CreateRoom />
        </AppLayout>
      }
    />
    <Route
      path="/rooms/join"
      element={
        <AppLayout>
          <RoomsJoinRoom />
        </AppLayout>
      }
    />
    <Route
      path="/rooms/:roomId"
      element={
        <AppLayout>
          <RoomDetails />
        </AppLayout>
      }
    />
    <Route
      path="/expenses"
      element={
        <AppLayout>
          <ExpenseList />
        </AppLayout>
      }
    />
    <Route
      path="/expenses/add"
      element={
        <AppLayout>
          <AddExpense />
        </AppLayout>
      }
    />
    <Route
      path="/expenses/:expenseId"
      element={
        <AppLayout>
          <ExpenseDetails />
        </AppLayout>
      }
    />
    <Route
      path="/members"
      element={
        <AppLayout>
          <MemberList />
        </AppLayout>
      }
    />
    <Route
      path="/members/add"
      element={
        <AppLayout>
          <AddMember />
        </AppLayout>
      }
    />
    <Route
      path="/payments"
      element={
        <AppLayout>
          <PaymentList />
        </AppLayout>
      }
    />
    <Route
      path="/wallet"
      element={
        <AppLayout>
          <Wallet />
        </AppLayout>
      }
    />
    <Route
      path="/reports"
      element={
        <AppLayout>
          <Reports />
        </AppLayout>
      }
    />
    <Route
      path="/settings"
      element={
        <AppLayout>
          <Settings />
        </AppLayout>
      }
    />
    <Route
      path="/profile"
      element={
        <AppLayout>
          <Profile />
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
