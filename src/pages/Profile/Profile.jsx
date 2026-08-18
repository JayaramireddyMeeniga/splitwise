import { createElement } from 'react'
import {
  BadgeCheck,
  CreditCard,
  KeyRound,
  Mail,
  Phone,
  RotateCcw,
  ShieldCheck,
  UserRound,
  WalletCards,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import { mapProfileErrors, profileSchema, securitySchema } from '../../schemas/profile.schema'
import { useProfileStore } from '../../store/profile.store'

const roleOptions = ['Maintainer', 'Roommate']

const profileStats = [
  { label: 'Role', value: 'Maintainer', icon: ShieldCheck },
  { label: 'Paid this month', value: 'INR 3,500', icon: WalletCards },
  { label: 'Reimbursements', value: 'INR 500', icon: CreditCard },
  { label: 'Status', value: 'Verified', icon: BadgeCheck },
]

const Profile = () => {
  const {
    profile,
    security,
    profileErrors,
    securityErrors,
    lastSaved,
    setProfileField,
    setSecurityField,
    setProfileErrors,
    setSecurityErrors,
    saveProfile,
    saveSecurity,
    resetProfile,
  } = useProfileStore()

  const handleProfileSubmit = (event) => {
    event.preventDefault()
    const result = profileSchema.safeParse(profile)

    if (!result.success) {
      setProfileErrors(mapProfileErrors(result.error))
      return
    }

    saveProfile()
  }

  const handleSecuritySubmit = (event) => {
    event.preventDefault()
    const result = securitySchema.safeParse(security)

    if (!result.success) {
      setSecurityErrors(mapProfileErrors(result.error))
      return
    }

    saveSecurity()
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-lg font-black text-white">
            RS
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
              profile desk
            </p>
            <h1 className="mt-1 text-2xl font-black text-ink">{profile.fullName}</h1>
            <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
              Manage your identity, payment contact, room role, and security.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">{profile.role}</Badge>
          <Badge tone={lastSaved ? 'success' : 'info'}>
            {lastSaved ? `Saved ${lastSaved}` : 'Profile draft'}
          </Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-4">
        {profileStats.map(({ label, value, icon }) => (
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

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="account">Personal details</CardTitle>
            <UserRound className="h-4 w-4 text-primary" />
          </CardHeader>
          <form className="grid gap-3" onSubmit={handleProfileSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormInput
                label="Full name"
                value={profile.fullName}
                onChange={(event) => setProfileField('fullName', event.target.value)}
                placeholder="Rahul Sharma"
                icon={UserRound}
                error={profileErrors.fullName}
              />
              <FormSelect
                label="Room role"
                value={profile.role}
                onChange={(event) => setProfileField('role', event.target.value)}
                options={roleOptions}
                error={profileErrors.role}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormInput
                label="Email"
                value={profile.email}
                onChange={(event) => setProfileField('email', event.target.value)}
                placeholder="rahul@example.com"
                icon={Mail}
                error={profileErrors.email}
              />
              <FormInput
                label="Phone"
                value={profile.phone}
                onChange={(event) => setProfileField('phone', event.target.value)}
                placeholder="9876543210"
                icon={Phone}
                error={profileErrors.phone}
              />
            </div>
            <FormInput
              label="UPI ID"
              value={profile.upiId}
              onChange={(event) => setProfileField('upiId', event.target.value)}
              placeholder="rahul@upi"
              icon={CreditCard}
              error={profileErrors.upiId}
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" className="rounded-xl" icon={RotateCcw} onClick={resetProfile}>
                Reset
              </Button>
              <Button type="submit" className="rounded-xl" icon={BadgeCheck}>
                Save profile
              </Button>
            </div>
          </form>
        </Card>

        <div className="grid gap-4">
          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="security">Password</CardTitle>
              <KeyRound className="h-4 w-4 text-primary" />
            </CardHeader>
            <form className="grid gap-3" onSubmit={handleSecuritySubmit}>
              <FormInput
                label="Current password"
                type="password"
                value={security.currentPassword}
                onChange={(event) => setSecurityField('currentPassword', event.target.value)}
                placeholder="Current password"
                icon={KeyRound}
                error={securityErrors.currentPassword}
              />
              <FormInput
                label="New password"
                type="password"
                value={security.newPassword}
                onChange={(event) => setSecurityField('newPassword', event.target.value)}
                placeholder="New password"
                icon={ShieldCheck}
                error={securityErrors.newPassword}
              />
              <Button type="submit" className="rounded-xl" icon={ShieldCheck}>
                Update password
              </Button>
            </form>
          </Card>

          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="activity">Room activity</CardTitle>
              <WalletCards className="h-4 w-4 text-primary" />
            </CardHeader>
            <div className="grid gap-2">
              {[
                ['Last payment', 'INR 3,500 verified'],
                ['Last expense', 'Vegetables and milk'],
                ['Settlement', 'Receive INR 500'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-stone-50/70 px-3 py-2">
                  <p className="text-xs font-black text-ink">{label}</p>
                  <p className="text-xs font-semibold text-stone-600">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Profile
