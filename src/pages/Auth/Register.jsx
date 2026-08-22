import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Home, LockKeyhole, Mail, UserRound } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import ErrorMessage from '../../components/common/ErrorMessage'
import FormInput from '../../components/forms/FormInput'
import RoleSwitch from '../../components/forms/RoleSwitch'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import useAuthStore from '../../store/auth.store'
import { ROLES, getRoleCopy, isMaintainer } from '../../utils/roles'

const Register = () => {
  const [role, setRole] = useState(ROLES.MAINTAINER)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    roomName: '',
    inviteCode: '',
  })
  const navigate = useNavigate()
  const { error, isLoading, register, clearError } = useAuthStore()
  const copy = getRoleCopy(role, 'register')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
    if (error) clearError()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const authPayload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role,
      ...(isMaintainer(role)
        ? { roomName: form.roomName }
        : { inviteCode: form.inviteCode }),
    }

    try {
      const { user } = await register(authPayload)
      navigate(isMaintainer(user?.role) ? '/room-setup' : '/join-room')
    } catch {
      // The store keeps the displayable error message.
    }
  }

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge tone={isMaintainer(role) ? 'dark' : 'info'}>{copy.badge}</Badge>
        <Link to="/login" className="text-sm font-bold text-primary hover:text-primary-hover">
          Login instead
        </Link>
      </div>

      <RoleSwitch value={role} onChange={setRole} />

      <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        {error && <ErrorMessage title="Signup failed" message={error} />}
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            icon={UserRound}
            autoComplete="name"
            minLength={2}
            maxLength={40}
            required
          />
          <FormInput
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={Mail}
            autoComplete="email"
            required
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput
            label={isMaintainer(role) ? 'Room name' : 'Invite code'}
            name={isMaintainer(role) ? 'roomName' : 'inviteCode'}
            value={isMaintainer(role) ? form.roomName : form.inviteCode}
            onChange={handleChange}
            placeholder={isMaintainer(role) ? 'Enter room name' : 'Enter invite code'}
            icon={Home}
            maxLength={isMaintainer(role) ? 50 : 20}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            icon={LockKeyhole}
            autoComplete="new-password"
            minLength={6}
            maxLength={80}
            required
          />

        </div>
        <Button
          className="mt-3 w-full rounded-lg"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          type="submit"
          loading={isLoading}
        >
          {isMaintainer(role) ? 'Create room as Maintainer' : 'Join room as Roommate'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Register
