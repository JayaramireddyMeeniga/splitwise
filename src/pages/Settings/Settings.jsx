import { createElement } from 'react'
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Home,
  KeyRound,
  RotateCcw,
  Settings2,
  ShieldCheck,
  UserRound,
  WalletCards,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import { settingsSchema, mapSettingsErrors } from '../../schemas/settings.schema'
import { useSettingsStore } from '../../store/settings.store'
import { cn } from '../../utils/cn'

const splitOptions = ['Equal split', 'Selected members', 'Fixed amount', 'Percentage split', 'Attendance based']
const cycleOptions = ['Monthly', 'Bi-weekly', 'Weekly']

const setupCards = [
  { label: 'Room role', value: 'Maintainer', icon: ShieldCheck },
  { label: 'Invite code', value: 'RX-4A-8291', icon: KeyRound },
  { label: 'Members', value: '6 active', icon: UserRound },
  { label: 'Wallet target', value: 'INR 6,000', icon: WalletCards },
]

const ToggleRow = ({ label, description, checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2.5 text-left transition hover:border-primary/30 hover:bg-primary-light"
  >
    <span>
      <span className="block text-xs font-black text-ink">{label}</span>
      <span className="mt-0.5 block text-xs font-semibold leading-5 text-stone-500">
        {description}
      </span>
    </span>
    <span
      className={cn(
        'flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition',
        checked ? 'bg-primary' : 'bg-stone-300',
      )}
    >
      <span
        className={cn(
          'h-4 w-4 rounded-full bg-white transition',
          checked && 'translate-x-5',
        )}
      />
    </span>
  </button>
)

const Settings = () => {
  const {
    settings,
    errors,
    lastSaved,
    setSetting,
    toggleSetting,
    setErrors,
    saveSettings,
    resetSettings,
  } = useSettingsStore()

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = settingsSchema.safeParse(settings)

    if (!result.success) {
      setErrors(mapSettingsErrors(result.error))
      return
    }

    saveSettings()
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
            setup desk
          </p>
          <h1 className="mt-1 text-2xl font-black text-ink">Room settings</h1>
          <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
            Manage room identity, dues, approval rules, reminders, and wallet preferences.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">Maintainer controls</Badge>
          <Badge tone={lastSaved ? 'success' : 'info'}>
            {lastSaved ? `Saved ${lastSaved}` : 'Draft changes'}
          </Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-4">
        {setupCards.map(({ label, value, icon }) => (
          <Card key={label} className="p-3 shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-stone-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-black text-ink">{value}</p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary">
                {createElement(icon, { className: 'h-5 w-5' })}
              </div>
            </div>
          </Card>
        ))}
      </section>

      <form className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]" onSubmit={handleSubmit}>
        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="room profile">Identity</CardTitle>
            <Home className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="grid gap-3">
            <FormInput
              label="Room name"
              value={settings.roomName}
              onChange={(event) => setSetting('roomName', event.target.value)}
              placeholder="Bachelor Room 4A"
              icon={Home}
              error={errors.roomName}
            />
            <FormInput
              label="Maintainer name"
              value={settings.maintainerName}
              onChange={(event) => setSetting('maintainerName', event.target.value)}
              placeholder="Rahul Sharma"
              icon={UserRound}
              error={errors.maintainerName}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <FormInput
                label="Rent due day"
                type="number"
                value={settings.rentDueDay}
                onChange={(event) => setSetting('rentDueDay', event.target.value)}
                placeholder="5"
                icon={CalendarDays}
                error={errors.rentDueDay}
              />
              <FormInput
                label="Wallet target"
                type="number"
                value={settings.walletTarget}
                onChange={(event) => setSetting('walletTarget', event.target.value)}
                placeholder="6000"
                icon={WalletCards}
                error={errors.walletTarget}
              />
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="rules">Expense and settlement</CardTitle>
              <Settings2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <div className="grid gap-3 md:grid-cols-3">
              <FormSelect
                label="Default split"
                value={settings.defaultSplit}
                onChange={(event) => setSetting('defaultSplit', event.target.value)}
                options={splitOptions}
                error={errors.defaultSplit}
              />
              <FormSelect
                label="Settlement cycle"
                value={settings.settlementCycle}
                onChange={(event) => setSetting('settlementCycle', event.target.value)}
                options={cycleOptions}
                error={errors.settlementCycle}
              />
              <FormInput
                label="Approval limit"
                type="number"
                value={settings.approvalLimit}
                onChange={(event) => setSetting('approvalLimit', event.target.value)}
                placeholder="1000"
                icon={CircleDollarSign}
                error={errors.approvalLimit}
              />
            </div>
          </Card>

          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="toggles">Automation</CardTitle>
              <Bell className="h-4 w-4 text-primary" />
            </CardHeader>
            <div className="grid gap-2 md:grid-cols-2">
              <ToggleRow
                label="Bill reminders"
                description="Notify room before rent and utilities are due."
                checked={settings.remindersEnabled}
                onChange={() => toggleSetting('remindersEnabled')}
              />
              <ToggleRow
                label="Payment proof"
                description="Require screenshot or reference for collections."
                checked={settings.paymentProofRequired}
                onChange={() => toggleSetting('paymentProofRequired')}
              />
              <ToggleRow
                label="Reimbursement approval"
                description="Maintainer verifies personal purchases."
                checked={settings.reimbursementApproval}
                onChange={() => toggleSetting('reimbursementApproval')}
              />
              <ToggleRow
                label="Guest expense tracking"
                description="Track temporary guest costs separately."
                checked={settings.guestExpenseTracking}
                onChange={() => toggleSetting('guestExpenseTracking')}
              />
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center xl:col-span-2">
          <Button type="button" variant="secondary" className="rounded-xl" icon={RotateCcw} onClick={resetSettings}>
            Reset setup
          </Button>
          <Button type="submit" className="min-w-52 rounded-xl px-8" icon={CheckCircle2}>
            Save setup
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Settings
