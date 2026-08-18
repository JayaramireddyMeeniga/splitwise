import { useNavigate } from 'react-router-dom'
import { ArrowRight, KeyRound, UserRound } from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import FormInput from '../../components/forms/FormInput'
import { joinRoomSchema, mapZodErrors } from '../../schemas/room.schema'
import { useRoomSetupStore } from '../../store/room.store'

const JoinRoom = () => {
  const navigate = useNavigate()
  const { memberName, inviteCode, errors, setField, setErrors } = useRoomSetupStore()

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = joinRoomSchema.safeParse({ memberName, inviteCode })

    if (!result.success) {
      setErrors(mapZodErrors(result.error))
      return
    }

    setErrors({})
    navigate('/rooms/room-4a')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <section className="mb-4 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)]">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">join room</p>
        <h1 className="mt-1 text-2xl font-black text-ink">Enter invite code</h1>
        <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
          Roommates join after a maintainer shares the room invite code.
        </p>
      </section>

      <Card className="p-4 shadow-none">
        <CardHeader className="mb-3">
          <CardTitle eyebrow="roommate">Join details</CardTitle>
          <Badge tone="warning">Invite required</Badge>
        </CardHeader>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <FormInput label="Your name" value={memberName} onChange={(e) => setField('memberName', e.target.value)} placeholder="Arun Kumar" icon={UserRound} error={errors.memberName} />
          <FormInput label="Invite code" value={inviteCode} onChange={(e) => setField('inviteCode', e.target.value)} placeholder="RX-4A-8291" icon={KeyRound} error={errors.inviteCode} />
          <div className="flex justify-center">
            <Button className="min-w-52 rounded-xl px-8" icon={ArrowRight} iconPosition="right" type="submit">Join room</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default JoinRoom
