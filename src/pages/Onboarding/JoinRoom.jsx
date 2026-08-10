import { Link } from 'react-router-dom'
import { ArrowRight, KeyRound, UserRound } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import FormInput from '../../components/forms/FormInput'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'

const JoinRoom = () => (
  <AuthLayout
    title="Join a room"
    subtitle="Roommates join only after a Maintainer creates the room and shares an invite code."
  >
    <div className="mb-4 flex flex-wrap gap-2">
      <Badge tone="info">Roommate access</Badge>
      <Badge tone="warning">Invite required</Badge>
    </div>

    <Card className="shadow-none">
      <CardHeader>
        <CardTitle eyebrow="roommate setup">Enter invite details</CardTitle>
        <KeyRound className="h-5 w-5 text-primary" />
      </CardHeader>
      <div className="grid gap-3">
        <FormInput label="Your name" placeholder="Arun Kumar" icon={UserRound} />
        <FormInput label="Invite code" placeholder="RX-4A-8291" icon={KeyRound} />
        <Link to="/dashboard">
          <Button className="w-full rounded-xl" size="lg" icon={ArrowRight} iconPosition="right">
            Join room as Roommate
          </Button>
        </Link>
      </div>
    </Card>

    <p className="mt-4 text-center text-xs font-semibold text-stone-500">
      Creating the room?{' '}
      <Link to="/room-setup" className="text-primary hover:text-primary-hover">
        Continue as Maintainer
      </Link>
    </p>
  </AuthLayout>
)

export default JoinRoom
