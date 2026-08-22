import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import ErrorMessage from '../../components/common/ErrorMessage'
import FormInput from '../../components/forms/FormInput'
import RoleSwitch from '../../components/forms/RoleSwitch'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import useAuthStore from '../../store/auth.store'
import { ROLES, getRoleCopy, isMaintainer } from '../../utils/roles'

const Login = () => {
  const [role, setRole] = useState(ROLES.MAINTAINER)
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: true,
  })
  const navigate = useNavigate()
  const { error, isLoading, login, clearError } = useAuthStore()
  const copy = getRoleCopy(role, 'login')

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (error) clearError()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await login({
        email: form.email,
        password: form.password,
        role,
      })
      navigate(isMaintainer(user?.role) ? '/room-setup' : '/join-room')
    } catch {
      // The store keeps the displayable error message.
    }
  }

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge tone={isMaintainer(role) ? 'dark' : 'info'}>{copy.badge}</Badge>
        <Link to="/register" className="text-sm font-bold text-primary hover:text-primary-hover">
          Create account
        </Link>
      </div>

      <RoleSwitch value={role} onChange={setRole} />

      <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        {error && <ErrorMessage title="Login failed" message={error} />}
        <FormInput
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={isMaintainer(role) ? 'Enter manager email' : 'Enter your email'}
          icon={Mail}
          autoComplete="email"
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={LockKeyhole}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-600 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="h-4 w-4 accent-primary cursor-pointer"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-xs font-bold text-primary hover:text-primary-hover">
            Forgot password?
          </Link>
        </div>

        <Button
          className="mt-3 w-full rounded-lg"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          type="submit"
          loading={isLoading}
        >
          Login as {isMaintainer(role) ? 'Maintainer' : 'Roommate'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Login
