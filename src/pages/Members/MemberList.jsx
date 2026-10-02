import { createElement, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  Clock3,
  Copy,
  Crown,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserRound,
  Users,
} from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import AddMember from './AddMember'

const initialMembers = [
  {
    id: 1,
    name: 'Rahul Verma',
    avatar: 'RV',
    email: 'rahul@example.com',
    phone: '+91 98765 12210',
    role: 'Manager',
    status: 'Active',
    monthlyShare: 3000,
    paid: 3500,
    joined: 'Aug 1',
  },
  {
    id: 2,
    name: 'Arun Kumar',
    avatar: 'AK',
    email: 'arun@example.com',
    phone: '+91 98765 43210',
    role: 'Roommate',
    status: 'Pending',
    monthlyShare: 3000,
    paid: 2500,
    joined: 'Aug 2',
  },
  {
    id: 3,
    name: 'Sai Reddy',
    avatar: 'SR',
    email: 'sai@example.com',
    phone: '+91 98670 33120',
    role: 'Roommate',
    status: 'Settled',
    monthlyShare: 3000,
    paid: 3000,
    joined: 'Aug 3',
  },
  {
    id: 4,
    name: 'Naveen Rao',
    avatar: 'NR',
    email: 'naveen@example.com',
    phone: '+91 98120 55440',
    role: 'Roommate',
    status: 'Pending',
    monthlyShare: 3000,
    paid: 1200,
    joined: 'Aug 5',
  },
]

const filters = ['All', 'Active', 'Pending', 'Settled']
const avatarPalette = [
  'bg-ink text-white',
  'bg-primary text-white',
  'bg-primary-hover text-white',
  'bg-charcoal text-white',
  'bg-secondary text-white',
]

const formatAmount = (amount) => `INR ${Number(amount || 0).toLocaleString('en-IN')}`

const getStatusTone = (status) => {
  if (status === 'Settled' || status === 'Active') return 'success'
  if (status === 'Pending' || status === 'Invited') return 'warning'
  return 'neutral'
}

const MemberList = () => {
  const [members, setMembers] = useState(initialMembers)
  const [memberDialogOpen, setMemberDialogOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    if (!memberDialogOpen) return undefined

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [memberDialogOpen])

  const filteredMembers = useMemo(
    () => members.filter((member) => {
      const matchesFilter = activeFilter === 'All' || member.status === activeFilter
      const searchable = `${member.name} ${member.email} ${member.role}`.toLowerCase()
      return matchesFilter && searchable.includes(query.toLowerCase())
    }),
    [activeFilter, members, query],
  )

  const totals = useMemo(() => {
    const expected = members.reduce((sum, member) => sum + Number(member.monthlyShare || 0), 0)
    const collected = members.reduce((sum, member) => sum + Number(member.paid || 0), 0)

    return {
      expected,
      collected,
      pending: Math.max(expected - collected, 0),
      active: members.filter((member) => member.status !== 'Invited').length,
    }
  }, [members])

  const collectionRate = Math.min(Math.round((totals.collected / Math.max(totals.expected, 1)) * 100), 100)
  const pendingMembers = members.filter((member) => member.paid < member.monthlyShare)
  const stats = [
    { label: 'People', value: `${totals.active}`, icon: Users, detail: 'active in room' },
    { label: 'Collected', value: formatAmount(totals.collected), icon: CheckCircle2, detail: 'verified this month' },
    { label: 'Balance', value: formatAmount(totals.pending), icon: Clock3, detail: 'left to collect' },
  ]

  const handleAddMember = (member) => {
    setMembers((current) => [member, ...current])
    setActiveFilter('All')
    setQuery('')
  }

  const memberDialog = (
    <div
      className={[
        'fixed inset-0 z-[100] grid overscroll-contain place-items-center px-3 py-5 transition md:px-5',
        memberDialogOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
    >
      <button
        type="button"
        aria-label="Close add member dialog"
        onClick={() => setMemberDialogOpen(false)}
        className={[
          'absolute inset-0 bg-ink/50 backdrop-blur-[4px] transition-opacity duration-300',
          memberDialogOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-member-title"
        className={[
          'relative z-10 h-[min(39rem,calc(100vh-2rem))] w-full max-w-3xl overscroll-contain overflow-hidden rounded-2xl bg-surface shadow-[0_28px_90px_rgba(28,25,23,0.34)] ring-1 ring-white/80 transition-all duration-300',
          memberDialogOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-5 scale-95 opacity-0',
        ].join(' ')}
      >
        <AddMember
          mode="dialog"
          onClose={() => setMemberDialogOpen(false)}
          onAddMember={handleAddMember}
        />
      </div>
    </div>
  )

  return (
    <div className="mx-auto grid max-w-6xl gap-5">
      <section className="relative overflow-hidden rounded-2xl bg-surface/92 shadow-[0_22px_70px_rgba(28,25,23,0.10)] ring-1 ring-white/80 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,var(--color-ink),var(--color-primary),var(--color-secondary),var(--color-charcoal))]" />
        <div className="grid gap-5 p-4 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:p-6">
          <div className="flex min-w-0 flex-col justify-between gap-5">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_26px_rgba(28,25,23,0.18)]">
                <Sparkles className="h-3 w-3 text-primary-light" />
                Members studio
              </div>
              <h1 className="max-w-2xl text-3xl font-black leading-tight text-ink md:text-4xl">
                A cleaner way to manage the room crew.
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-stone-500">
                Track roles, contact info, collection progress, and reminders with a screen made for people, not rows.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {stats.map(({ label, value, icon, detail }, index) => (
                <div
                  key={label}
                  className="animate-rise-in rounded-xl bg-stone-50/90 p-3 ring-1 ring-stone-200/80"
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{label}</p>
                      <p className="truncate text-base font-black text-ink">{value}</p>
                      <p className="mt-0.5 text-[11px] font-bold text-stone-500">{detail}</p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface text-primary shadow-[0_10px_24px_rgba(28,25,23,0.07)] ring-1 ring-stone-200">
                      {createElement(icon, { className: 'h-4.5 w-4.5' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-2xl bg-ink p-4 text-white shadow-[0_18px_52px_rgba(28,25,23,0.18)]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute -bottom-16 left-12 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary-light">collection rate</p>
                  <p className="mt-1 text-4xl font-black">{collectionRate}%</p>
                </div>
                <Button className="h-10 rounded-lg px-3 text-xs" icon={Plus} onClick={() => setMemberDialogOpen(true)}>
                  Add Member
                </Button>
              </div>

              <div className="relative h-28">
                {members.slice(0, 5).map((member, index) => (
                  <span
                    key={member.id}
                    className={[
                      'animate-float-member absolute grid h-16 w-16 place-items-center rounded-2xl text-base font-black shadow-[0_18px_34px_rgba(0,0,0,0.24)] ring-4 ring-white/10',
                      avatarPalette[index % avatarPalette.length],
                    ].join(' ')}
                    style={{
                      left: `${index * 18}%`,
                      top: `${index % 2 === 0 ? 10 : 44}px`,
                      animationDelay: `${index * 260}ms`,
                    }}
                  >
                    {member.avatar}
                  </span>
                ))}
              </div>

              <div>
                <div className="h-2 overflow-hidden rounded-full bg-white/12">
                  <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${collectionRate}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-stone-300">
                  <span>{formatAmount(totals.collected)} collected</span>
                  <span>{formatAmount(totals.expected)} target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-31 z-20 rounded-2xl bg-surface/90 p-3 shadow-[0_16px_42px_rgba(28,25,23,0.07)] ring-1 ring-white/80 backdrop-blur-2xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-stone-50 px-3 py-2.5 ring-1 ring-stone-200 focus-within:bg-surface focus-within:ring-2 focus-within:ring-primary">
            <Search className="h-4.5 w-4.5 shrink-0 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm font-bold text-ink outline-none placeholder:text-stone-400"
              placeholder="Search name, email, or role"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <div className="inline-flex rounded-xl bg-stone-100 p-1 ring-1 ring-stone-200">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={[
                    'min-w-20 rounded-lg px-3 py-2 text-xs font-black transition',
                    activeFilter === filter
                      ? 'bg-ink text-white shadow-[0_10px_24px_rgba(28,25,23,0.16)]'
                      : 'text-stone-500 hover:bg-surface hover:text-ink',
                  ].join(' ')}
                >
                  {filter}
                </button>
              ))}
            </div>
            <Button className="rounded-xl lg:hidden" size="sm" icon={Plus} onClick={() => setMemberDialogOpen(true)}>
              Add
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_19rem]">
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">people board</p>
              <h2 className="text-xl font-black text-ink">Members</h2>
            </div>
            <Badge tone="info" className="px-2.5 py-1 text-[11px]">{filteredMembers.length} shown</Badge>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {filteredMembers.map((member, index) => {
              const progress = Math.min(Math.round((member.paid / Math.max(member.monthlyShare, 1)) * 100), 100)
              const balance = member.paid - member.monthlyShare
              const healthy = balance >= 0

              return (
                <article
                  key={member.id}
                  className="animate-rise-in group overflow-hidden rounded-2xl bg-surface/94 shadow-[0_16px_46px_rgba(28,25,23,0.065)] ring-1 ring-stone-200/85 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(28,25,23,0.11)] hover:ring-primary/35"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <div className="relative p-4">
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-secondary),var(--color-charcoal))] opacity-0 transition group-hover:opacity-100" />
                    <div className="flex items-start gap-3">
                      <span className={['grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-base font-black shadow-[0_14px_30px_rgba(28,25,23,0.14)]', avatarPalette[index % avatarPalette.length]].join(' ')}>
                        {member.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-2">
                              <h3 className="truncate text-base font-black text-ink">{member.name}</h3>
                              {member.role === 'Manager' && <Crown className="h-4 w-4 shrink-0 text-secondary-hover" />}
                            </div>
                            <p className="mt-0.5 text-[11px] font-bold text-stone-500">
                              Joined {member.joined} - {member.role}
                            </p>
                          </div>
                          <Button
                            aria-label={`More actions for ${member.name}`}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-stone-400 hover:text-primary"
                            icon={MoreHorizontal}
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <Badge tone={getStatusTone(member.status)} className="px-2 py-0.5 text-[10px]">
                            {member.status}
                          </Badge>
                          <Badge tone={healthy ? 'success' : 'warning'} className="px-2 py-0.5 text-[10px]">
                            {healthy ? 'On track' : 'Needs follow-up'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 rounded-xl bg-stone-50/80 p-3 ring-1 ring-stone-200">
                      <span className="inline-flex min-w-0 items-center gap-2 text-xs font-bold text-stone-600">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="truncate">{member.email}</span>
                      </span>
                      <span className="inline-flex min-w-0 items-center gap-2 text-xs font-bold text-stone-600">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="truncate">{member.phone}</span>
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-primary-light p-3 ring-1 ring-primary/15">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-primary">paid</p>
                        <p className="mt-1 text-sm font-black text-ink">{formatAmount(member.paid)}</p>
                      </div>
                      <div className="rounded-xl bg-surface p-3 ring-1 ring-stone-200">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-stone-400">
                          {healthy ? 'extra' : 'due'}
                        </p>
                        <p className={healthy ? 'mt-1 text-sm font-black text-primary-hover' : 'mt-1 text-sm font-black text-secondary-hover'}>
                          {formatAmount(Math.abs(balance))}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-[11px] font-black text-stone-500">
                        <span>Monthly collection</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className={healthy ? 'h-full rounded-full bg-primary-hover transition-all duration-1000' : 'h-full rounded-full bg-primary transition-all duration-1000'}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {filteredMembers.length === 0 && (
            <Card className="p-8 text-center shadow-none">
              <UserRound className="mx-auto h-9 w-9 text-primary" />
              <p className="mt-2 text-sm font-black text-ink">No members found</p>
              <p className="mt-1 text-xs font-semibold text-stone-500">Try another search or filter.</p>
            </Card>
          )}
        </div>

        <aside className="grid content-start gap-4">
          <Card className="overflow-hidden p-0 shadow-none">
            <div className="bg-ink p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary-light">quick actions</p>
                  <h3 className="mt-1 text-lg font-black">Room tools</h3>
                </div>
                <Send className="h-5 w-5 text-primary-light" />
              </div>
            </div>
            <div className="grid gap-2 p-3">
              {[
                { label: 'Send reminders', detail: `${pendingMembers.length} people pending`, icon: BellRing },
                { label: 'Copy invite', detail: 'Share room access', icon: Copy },
                { label: 'Review roles', detail: 'Manager controls', icon: ShieldCheck },
              ].map(({ label, detail, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="group flex items-center gap-3 rounded-xl bg-stone-50/80 px-3 py-2.5 text-left ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:bg-primary-light hover:ring-primary/25"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface text-primary ring-1 ring-stone-200 transition group-hover:bg-primary group-hover:text-white">
                    {createElement(icon, { className: 'h-4 w-4' })}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-black text-ink">{label}</span>
                    <span className="block text-[11px] font-bold text-stone-500">{detail}</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-stone-400 transition group-hover:text-primary" />
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4 shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">balance watch</p>
                <h3 className="mt-1 text-lg font-black text-ink">Needs attention</h3>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-3 grid gap-2">
              {pendingMembers.map((member) => {
                const due = member.monthlyShare - member.paid

                return (
                  <div key={member.id} className="flex items-center justify-between gap-3 rounded-xl bg-stone-50/80 px-3 py-2 ring-1 ring-stone-200">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-xs font-black text-ink ring-1 ring-stone-200">
                        {member.avatar}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-ink">{member.name}</p>
                        <p className="text-[11px] font-bold text-stone-500">{formatAmount(due)} due</p>
                      </div>
                    </div>
                    <BellRing className="h-4 w-4 shrink-0 text-secondary-hover" />
                  </div>
                )
              })}
              {pendingMembers.length === 0 && (
                <div className="rounded-xl bg-primary-light p-3 text-xs font-black text-primary ring-1 ring-primary/15">
                  Everyone is settled.
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-primary-light p-4 shadow-none ring-primary/20">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface text-primary ring-1 ring-primary/15">
                <UserCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-ink">Room health is {collectionRate >= 80 ? 'strong' : 'improving'}</p>
                <p className="mt-0.5 text-xs font-semibold text-stone-600">
                  {formatAmount(totals.pending)} still pending this month.
                </p>
              </div>
            </div>
          </Card>
        </aside>
      </section>

      {createPortal(memberDialog, document.body)}
    </div>
  )
}

export default MemberList
