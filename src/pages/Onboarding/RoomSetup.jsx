import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Home,
  Mail,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import FormInput from '../../components/forms/FormInput'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import { roomSetupSchema, roommateInviteSchema, mapZodErrors } from '../../schemas/room.schema'
import { useRoomSetupStore } from '../../store/room.store'

const RoomSetup = () => {
  const navigate = useNavigate()
  const {
    roomName,
    maintainerName,
    inviteName,
    inviteContact,
    invites,
    errors,
    setField,
    setErrors,
    addInvite,
    removeInvite,
  } = useRoomSetupStore()

  const handleAddInvite = () => {
    const result = roommateInviteSchema.safeParse({
      name: inviteName,
      contact: inviteContact,
    })

    if (!result.success) {
      const inviteErrors = mapZodErrors(result.error)
      setErrors({
        ...errors,
        inviteName: inviteErrors.name,
        inviteContact: inviteErrors.contact,
      })
      return
    }

    addInvite(result.data)
  }

  const handleCreateRoom = (event) => {
    event.preventDefault()
    const result = roomSetupSchema.safeParse({
      roomName,
      maintainerName,
      invites,
    })

    if (!result.success) {
      setErrors(mapZodErrors(result.error))
      return
    }

    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Create room"
      subtitle="Set up the room first, then add roommates. Dashboard starts after the room exists."
    >
      <form className="grid gap-3" onSubmit={handleCreateRoom}>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">Maintainer</Badge>
          <Badge tone="info">{invites.length} roommates added</Badge>
        </div>

        <Card className="p-3 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="room">Basic details</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput
              label="Room name"
              name="roomName"
              value={roomName}
              onChange={(event) => setField('roomName', event.target.value)}
              placeholder="Bachelor Room 4A"
              icon={Home}
              error={errors.roomName}
            />
            <FormInput
              label="Maintainer"
              name="maintainerName"
              value={maintainerName}
              onChange={(event) => setField('maintainerName', event.target.value)}
              placeholder="Rahul Sharma"
              icon={UserRound}
              error={errors.maintainerName}
            />
          </div>
        </Card>

        <Card className="p-3 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="people">Add roommates</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <FormInput
                label="Name"
                name="inviteName"
                value={inviteName}
                onChange={(event) => setField('inviteName', event.target.value)}
                placeholder="Naveen"
                icon={UserRound}
                error={errors.inviteName}
              />
              <FormInput
                label="Email or phone"
                name="inviteContact"
                value={inviteContact}
                onChange={(event) => setField('inviteContact', event.target.value)}
                placeholder="naveen@example.com"
                icon={Mail}
                error={errors.inviteContact}
              />
              <Button
                type="button"
                className="self-end rounded-lg"
                size="sm"
                variant="accent"
                icon={Plus}
                onClick={handleAddInvite}
              >
                Add
              </Button>
            </div>

            {errors.invites && (
              <p className="rounded-lg bg-danger-light px-3 py-2 text-xs font-semibold text-danger">
                {errors.invites}
              </p>
            )}

            <div className="grid gap-2">
              {invites.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/70 px-3 py-4 text-center">
                  <p className="text-xs font-black text-ink">No roommates added yet</p>
                  <p className="mt-1 text-xs font-semibold text-stone-500">
                    Add at least one person to create the room.
                  </p>
                </div>
              ) : (
                invites.map((member) => (
                  <div
                    key={member.contact}
                    className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-light text-primary">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-ink">{member.name}</p>
                        <p className="truncate text-xs font-semibold text-stone-500">{member.contact}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg text-stone-500"
                      icon={Trash2}
                      onClick={() => removeInvite(member.contact)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>

        <Button className="mx-auto min-w-52 rounded-xl px-8" icon={ArrowRight} iconPosition="right" type="submit">
          Create room
        </Button>

        <p className="text-center text-xs font-semibold text-stone-500">
          Joining instead?{' '}
          <Link to="/join-room" className="text-primary hover:text-primary-hover">
            Use an invite code
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default RoomSetup
