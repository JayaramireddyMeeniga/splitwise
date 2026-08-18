import { createElement, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight, CalendarDays, CircleDollarSign, Plus, ReceiptText,
  Search, ShieldCheck, Sparkles, Users,
} from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import { useExpenseStore } from '../../store/expense.store'

const stats = [
  { label: 'Month spend', icon: ReceiptText },
  { label: 'Avg split', icon: Users },
  { label: 'Pending', icon: ShieldCheck },
]

const formatAmount = (amount) => `INR ${Number(amount || 0).toLocaleString('en-IN')}`

const ExpenseList = () => {
  const navigate = useNavigate()
  const expenses = useExpenseStore((state) => state.expenses)

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses],
  )

  const pendingTotal = useMemo(
    () => expenses
      .filter((expense) => expense.status === 'Pending')
      .reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses],
  )

  const statValues = [
    formatAmount(total),
    formatAmount(total / 4),
    formatAmount(pendingTotal),
  ]

  return (
    <div className="mx-auto grid max-w-6xl gap-4">
      <section className="surface-glow overflow-hidden rounded-xl bg-ink text-white shadow-[0_18px_50px_rgba(28,25,23,0.16)]">
        <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-orange-100 ring-1 ring-white/15">
              <Sparkles className="h-3 w-3" />
              Expense hub
            </div>
            <h1 className="text-xl font-black text-white md:text-2xl">Spend tracking, cleaned up.</h1>
            <p className="mt-1 max-w-xl text-xs font-semibold leading-5 text-stone-300">
              Add expenses in a focused page, scan recent room spending, and open details without heavy dialogs.
            </p>
          </div>
          <Button
            className="h-10 rounded-lg px-3 text-xs"
            icon={Plus}
            onClick={() => navigate('/expenses/add')}
          >
            Add Expense
          </Button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {stats.map(({ label, icon }, index) => (
          <Card
            key={label}
            className="animate-rise-in p-3 shadow-none"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{label}</p>
                <p className="mt-1 text-base font-black text-ink">{statValues[index]}</p>
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-light text-primary">
                {createElement(icon, { className: 'h-4 w-4' })}
              </span>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <Card className="p-3 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="filters" className="[&_h3]:text-base [&_p]:text-[10px]">
              Find spending
            </CardTitle>
            <Search className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2 ring-1 ring-stone-200 focus-within:ring-2 focus-within:ring-primary">
            <Search className="h-4 w-4 shrink-0 text-stone-400" />
            <input
              className="w-full bg-transparent text-xs font-bold text-ink outline-none placeholder:text-stone-400"
              placeholder="Search title, payer, category"
            />
          </div>
          <div className="mt-3 grid gap-2">
            {['Approved', 'Pending', 'This month'].map((filter) => (
              <button
                key={filter}
                type="button"
                className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-left text-xs font-black text-stone-700 ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:bg-primary-light hover:text-primary"
              >
                {filter}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </Card>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">recent</p>
              <h2 className="text-lg font-black text-ink">Expense Details</h2>
            </div>
            <Badge tone="info" className="px-2.5 py-1 text-[11px]">{expenses.length} entries</Badge>
          </div>

          {expenses.map((expense, index) => (
            <Link
              key={expense.id}
              to={`/expenses/${expense.id}`}
              className="animate-rise-in group grid gap-3 rounded-xl bg-surface/92 p-3 shadow-[0_12px_34px_rgba(28,25,23,0.055)] ring-1 ring-stone-200/85 transition hover:-translate-y-0.5 hover:shadow-soft hover:ring-primary/35 sm:grid-cols-[1fr_auto]"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-stone-100 text-primary">
                    <ReceiptText className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="truncate text-sm font-black text-ink">{expense.title}</h3>
                  <Badge
                    tone={expense.status === 'Approved' ? 'success' : 'warning'}
                    className="px-2 py-0.5 text-[10px]"
                  >
                    {expense.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-stone-500">
                  <span>{expense.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {expense.members?.length || 4} members
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {expense.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-stone-400">paid by {expense.paidBy}</p>
                  <p className="text-sm font-black text-ink">{formatAmount(expense.amount)}</p>
                </div>
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-white transition group-hover:bg-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ExpenseList
