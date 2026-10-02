import { useState } from 'react'
import {
  AtSign,
  BadgeIndianRupee,
  CheckCircle2,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserPlus,
  UserRound,
} from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'

const roles = ['Roommate', 'Manager', 'Guest']
const statuses = ['Active', 'Invited']

const initialDraft = {
  name: '',
  email: '',
  phone: '',
  role: 'Roommate',
  status: 'Active',
  monthlyShare: '',
}

const AddMember = ({ mode = 'page', onClose, onAddMember }) => {
  const [draft, setDraft] = useState(initialDraft)
  const [errors, setErrors] = useState({})

  const setDraftField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const resetDraft = () => {
    setDraft(initialDraft)
    setErrors({})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!draft.name.trim()) nextErrors.name = 'Enter a member name'
    if (!draft.email.trim()) nextErrors.email = 'Enter an email address'
    if (draft.email && !/^\S+@\S+\.\S+$/.test(draft.email)) nextErrors.email = 'Enter a valid email'
    if (!draft.monthlyShare || Number(draft.monthlyShare) <= 0) nextErrors.monthlyShare = 'Enter a monthly share'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    onAddMember?.({
      id: Date.now(),
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim() || 'Not added',
      role: draft.role,
      status: draft.status,
      monthlyShare: Number(draft.monthlyShare),
      paid: draft.status === 'Active' ? Math.min(Number(draft.monthlyShare), 2400) : 0,
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      avatar: draft.name
        .trim()
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    })

    resetDraft()
    onClose?.()
  }

  const shellClass =
    mode === 'dialog'
      ? 'grid h-full grid-rows-[auto_1fr] bg-surface'
      : 'mx-auto max-w-3xl'

  return (
    <div className={shellClass}>
      <section className={mode === 'dialog' ? 'border-b border-stone-200 bg-stone-50/80 px-4 py-4' : 'mb-4'}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary ring-1 ring-primary/15">
              <Sparkles className="h-3 w-3" />
              People desk
            </div>
            <h1 id="add-member-title" className="text-xl font-black text-ink md:text-2xl">
              Add a room member
            </h1>
            <p className="mt-1 max-w-xl text-xs font-semibold leading-5 text-stone-500">
              Add contact details, assign a role, and set their monthly contribution for settlement tracking.
            </p>
          </div>
          {mode === 'dialog' && (
            <Button variant="secondary" size="sm" className="rounded-lg" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </section>

      <section className={mode === 'dialog' ? 'overflow-y-auto p-4' : ''}>
        <Card className="overflow-hidden p-4 shadow-none">
          <CardHeader className="mb-4">
            <CardTitle eyebrow="new member">Invite details</CardTitle>
            <Badge tone="info">RoomMateX</Badge>
          </CardHeader>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <FormInput
              label="Member name"
              value={draft.name}
              onChange={(event) => setDraftField('name', event.target.value)}
              placeholder="Priya Sharma"
              icon={UserRound}
              error={errors.name}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                label="Email"
                type="email"
                value={draft.email}
                onChange={(event) => setDraftField('email', event.target.value)}
                placeholder="priya@example.com"
                icon={AtSign}
                error={errors.email}
              />
              <FormInput
                label="Phone"
                value={draft.phone}
                onChange={(event) => setDraftField('phone', event.target.value)}
                placeholder="+91 98765 43210"
                icon={Phone}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <FormSelect
                label="Role"
                value={draft.role}
                onChange={(event) => setDraftField('role', event.target.value)}
                options={roles}
              />
              <FormSelect
                label="Status"
                value={draft.status}
                onChange={(event) => setDraftField('status', event.target.value)}
                options={statuses}
              />
              <FormInput
                label="Monthly share"
                type="number"
                min="0"
                value={draft.monthlyShare}
                onChange={(event) => setDraftField('monthlyShare', event.target.value)}
                placeholder="3000"
                icon={BadgeIndianRupee}
                error={errors.monthlyShare}
              />
            </div>

            <div className="grid gap-2 rounded-xl bg-stone-50/80 p-3 ring-1 ring-stone-200">
              {[
                'Member is visible in expense splits immediately.',
                'Invited members can be filtered separately from active roommates.',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-bold text-stone-600">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" className="rounded-xl" icon={RotateCcw} onClick={resetDraft}>
                Reset
              </Button>
              <Button type="submit" className="rounded-xl" icon={UserPlus}>
                Add member
              </Button>
            </div>
          </form>
        </Card>

        {mode !== 'dialog' && (
          <div className="mt-4 rounded-xl bg-ink px-4 py-3 text-white shadow-[0_18px_45px_rgba(28,25,23,0.14)]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black">Ready for shared expenses</p>
                <p className="text-xs font-semibold text-stone-300">
                  New members can be added to selected splits and payment tracking.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default AddMember
