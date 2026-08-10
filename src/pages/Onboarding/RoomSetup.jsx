import { Link } from 'react-router-dom'
import { ArrowRight, Home, Mail, Plus, ShieldCheck, UserRound, Users } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import FormInput from '../../components/forms/FormInput'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'

const invitedMembers = [
  { name: 'Arun Kumar', contact: 'arun@example.com', role: 'Roommate' },
  { name: 'Sai Teja', contact: 'sai@example.com', role: 'Roommate' },
]

const RoomSetup = () => (
  <AuthLayout
    title="Create your room"
    subtitle="Only the Room Maintainer creates the room first. After that, roommates can be invited or added using an invite code."
  >
    <div className="mb-4 flex flex-wrap gap-2">
      <Badge tone="dark">Maintainer setup</Badge>
      <Badge tone="info">Room not created yet</Badge>
    </div>

    <div className="grid gap-3">
      <Card className="p-4 shadow-none">
        <CardHeader>
          <CardTitle eyebrow="step 1">Room details</CardTitle>
          <ShieldCheck className="h-5 w-5 text-primary" />
        </CardHeader>
        <div className="grid gap-3">
          <FormInput label="Room name" placeholder="Bachelor Room 4A" icon={Home} />
          <FormInput label="Maintainer name" placeholder="Rahul Sharma" icon={UserRound} />
        </div>
      </Card>

      <Card className="p-4 shadow-none">
        <CardHeader>
          <CardTitle eyebrow="step 2">Add roommates</CardTitle>
            <Button variant="secondary" size="sm" className="rounded-lg" icon={Plus}>
              Add person
            </Button>
        </CardHeader>
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <FormInput label="Person name" placeholder="Naveen" icon={UserRound} />
            <FormInput label="Email or phone" placeholder="naveen@example.com" icon={Mail} />
            <Button className="self-end rounded-lg" size="sm" variant="accent" icon={Plus}>
              Invite
            </Button>
          </div>

          <div className="grid gap-2">
            {invitedMembers.map((member) => (
              <div
                key={member.contact}
                className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-light text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-ink">{member.name}</p>
                    <p className="text-xs font-semibold text-stone-500">{member.contact}</p>
                  </div>
                </div>
                <Badge tone="neutral">{member.role}</Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Link to="/dashboard">
        <Button className="w-full rounded-xl" icon={ArrowRight} iconPosition="right">
          Create room and open dashboard
        </Button>
      </Link>
      <p className="text-center text-xs font-semibold text-stone-500">
        Joining instead?{' '}
        <Link to="/join-room" className="text-primary hover:text-primary-hover">
          Use an invite code
        </Link>
      </p>
    </div>
  </AuthLayout>
)

export default RoomSetup
