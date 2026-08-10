import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import FormInput from '../../components/forms/FormInput'
import RoleSwitch from '../../components/forms/RoleSwitch'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const roleCopy = {
  maintainer: {
    title: 'Maintainer login',
    subtitle: 'Open your room control desk for approvals, wallet, dues, and monthly settlement checks.',
    badge: 'Manager access',
  },
  member: {
    title: 'Roommate login',
    subtitle: 'View dues, upload payment proof, add personal expenses, and follow your settlement status.',
    badge: 'Member access',
  },
}

const Login = () => {
  const [role, setRole] = useState('maintainer')
  const navigate = useNavigate()
  const copy = roleCopy[role]

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(role === 'maintainer' ? '/room-setup' : '/join-room')
  }

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge tone={role === 'maintainer' ? 'dark' : 'info'}>{copy.badge}</Badge>
        <Link to="/register" className="text-sm font-bold text-primary hover:text-primary-hover">
          Create account
        </Link>
      </div>

      <RoleSwitch value={role} onChange={setRole} />

      <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        <FormInput
          label="Email address"
          name="email"
          type="email"
          placeholder={role === 'maintainer' ? 'Enter manager email' : 'Enter your email'}
          icon={Mail}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          icon={LockKeyhole}
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-600 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 accent-primary cursor-pointer" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-xs font-bold text-primary hover:text-primary-hover">
            Forgot password?
          </Link>
        </div>

        <Button className="mt-3 w-full rounded-lg" size="lg" icon={ArrowRight} iconPosition="right" type="submit">
          Login as {role === 'maintainer' ? 'Maintainer' : 'Roommate'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Login
