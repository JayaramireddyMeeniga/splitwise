import { createElement } from 'react'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  Mail,
  Plus,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import FormInput from '../../components/forms/FormInput'
import { mapZodErrors, roommateInviteSchema, roomSetupSchema } from '../../schemas/room.schema'
import { useRoomSetupStore } from '../../store/room.store'

const roomSteps = [
  { label: 'Create room', icon: Building2 },
  { label: 'Add people', icon: Users },
  { label: 'Open ledger', icon: CheckCircle2 },
]

const RoomList = () => {
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

    setErrors({})
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
            room setup
          </p>
          <h1 className="mt-1 text-2xl font-black text-ink">Create and manage room</h1>
          <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
            Maintainer creates the room first, then adds roommates for shared expenses.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">Maintainer</Badge>
          <Badge tone="info">{invites.length} roommates</Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-3">
        {roomSteps.map(({ label, icon }, index) => (
          <Card key={label} className="p-3 shadow-none">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary">
                {createElement(icon, { className: 'h-5 w-5' })}
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-stone-400">
                  Step {index + 1}
                </p>
                <p className="text-sm font-black text-ink">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <form className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]" onSubmit={handleCreateRoom}>
        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="room details">Basic info</CardTitle>
            <Home className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="grid gap-3">
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
              label="Maintainer name"
              name="maintainerName"
              value={maintainerName}
              onChange={(event) => setField('maintainerName', event.target.value)}
              placeholder="Rahul Sharma"
              icon={UserRound}
              error={errors.maintainerName}
            />
            <div className="rounded-xl bg-primary-light px-3 py-3">
              <p className="text-xs font-black text-ink">Maintainer role</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-stone-600">
                This person can add roommates, approve payments, and generate settlements.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="roommates">Add persons</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
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
                size="sm"
                variant="accent"
                className="self-end rounded-lg"
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

            <div className="grid max-h-56 gap-2 overflow-y-auto pr-1">
              {invites.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/70 px-3 py-5 text-center">
                  <p className="text-xs font-black text-ink">No persons added</p>
                  <p className="mt-1 text-xs font-semibold text-stone-500">
                    Add at least one roommate to create the room.
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
                        <p className="truncate text-xs font-semibold text-stone-500">
                          {member.contact}
                        </p>
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

        <div className="xl:col-span-2">
          <Button className="w-full rounded-xl" icon={ArrowRight} iconPosition="right" type="submit">
            Create room
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RoomList
