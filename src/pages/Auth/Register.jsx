import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Home, LockKeyhole, Mail, UserRound } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import FormInput from '../../components/forms/FormInput'
import RoleSwitch from '../../components/forms/RoleSwitch'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const roleCopy = {
  maintainer: {
    title: 'Create maintainer account',
    subtitle: 'Set up a room, invite members, manage wallet collections, and generate settlements.',
    badge: 'Create room access',
  },
  member: {
    title: 'Create roommate account',
    subtitle: 'Join an existing room, track your dues, upload payment proof, and request reimbursements.',
    badge: 'Join room access',
  },
}

const Register = () => {
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
        <Link to="/login" className="text-sm font-bold text-primary hover:text-primary-hover">
          Login instead
        </Link>
      </div>

      <RoleSwitch value={role} onChange={setRole} />

      <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput
            label="Full name"
            name="name"
            placeholder="Enter your full name"
            icon={UserRound}
          />
          <FormInput
            label="Email address"
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput
            label={role === 'maintainer' ? 'Room name' : 'Invite code'}
            name={role === 'maintainer' ? 'roomName' : 'inviteCode'}
            placeholder={role === 'maintainer' ? 'Enter room name' : 'Enter invite code'}
            icon={Home}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            icon={LockKeyhole}
          />

        </div>
        <Button className="mt-3 w-full rounded-lg" size="lg" icon={ArrowRight} iconPosition="right" type="submit">
          {role === 'maintainer' ? 'Create room as Maintainer' : 'Join room as Roommate'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Register
