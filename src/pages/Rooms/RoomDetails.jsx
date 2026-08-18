import { createElement } from 'react'
import { CalendarDays, Copy, Home, ShieldCheck, Users, WalletCards } from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import { mapZodErrors, roomDetailsSchema } from '../../schemas/room.schema'
import { useRoomSetupStore } from '../../store/room.store'

const splitOptions = ['Equal split', 'Selected members', 'Fixed amount', 'Percentage split', 'Attendance based']
const members = [
  { name: 'Rahul Sharma', role: 'Maintainer', status: 'Owner' },
  { name: 'Arun Kumar', role: 'Roommate', status: 'Active' },
  { name: 'Sai Teja', role: 'Roommate', status: 'Active' },
]

const RoomDetails = () => {
  const { rooms, rentAmount, dueDay, defaultSplit, errors, setField, setErrors, updateRoomDetails } = useRoomSetupStore()
  const room = rooms[0]

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = roomDetailsSchema.safeParse({ rentAmount, dueDay, defaultSplit })

    if (!result.success) {
      setErrors(mapZodErrors(result.error))
      return
    }

    updateRoomDetails(room.id, result.data)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">room details</p>
          <h1 className="mt-1 text-2xl font-black text-ink">{room.name}</h1>
          <p className="mt-1 text-xs font-semibold text-stone-500">Maintained by {room.maintainer}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">{room.members} members</Badge>
          <Badge tone="info">{room.inviteCode}</Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-4">
        {[
          { label: 'Rent', value: `INR ${room.rentAmount.toLocaleString('en-IN')}`, icon: WalletCards },
          { label: 'Due day', value: `${room.dueDay}th`, icon: CalendarDays },
          { label: 'Split', value: room.defaultSplit, icon: ShieldCheck },
          { label: 'Invite', value: room.inviteCode, icon: Copy },
        ].map(({ label, value, icon }) => (
          <Card key={label} className="p-3 shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-stone-400">{label}</p>
                <p className="mt-1 text-sm font-black text-ink">{value}</p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary">{createElement(icon, { className: 'h-5 w-5' })}</div>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="settings">Room rules</CardTitle>
            <Home className="h-4 w-4 text-primary" />
          </CardHeader>
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <FormInput label="Monthly rent" type="number" value={rentAmount} onChange={(e) => setField('rentAmount', e.target.value)} placeholder="12000" icon={WalletCards} error={errors.rentAmount} />
            <FormInput label="Due day" type="number" value={dueDay} onChange={(e) => setField('dueDay', e.target.value)} placeholder="5" icon={CalendarDays} error={errors.dueDay} />
            <FormSelect label="Default split" value={defaultSplit} onChange={(e) => setField('defaultSplit', e.target.value)} options={splitOptions} error={errors.defaultSplit} />
            <Button className="rounded-xl" icon={ShieldCheck} type="submit">Save room rules</Button>
          </form>
        </Card>

        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="people">Members</CardTitle>
            <Badge tone="neutral">{members.length} shown</Badge>
          </CardHeader>
          <div className="grid gap-2">
            {members.map((member) => (
              <div key={member.name} className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-light text-primary"><Users className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs font-black text-ink">{member.name}</p>
                    <p className="text-xs font-semibold text-stone-500">{member.role}</p>
                  </div>
                </div>
                <Badge tone={member.status === 'Owner' ? 'dark' : 'success'}>{member.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}

export default RoomDetails
