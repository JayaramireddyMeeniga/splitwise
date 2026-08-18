import { createElement, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CalendarDays, CheckCircle2, CircleDollarSign, Clock3, ReceiptText, RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import FormTextarea from '../../components/forms/FormTextarea'
import FileUpload from '../../components/forms/FileUpload'
import { expenseSchema, mapExpenseErrors } from '../../schemas/expense.schema'
import { useExpenseStore } from '../../store/expense.store'

const categories = ['Rent', 'Electricity', 'Groceries', 'Internet', 'Household', 'Repairs', 'Miscellaneous']
const roommates = ['Rahul', 'Arun', 'Sai', 'Naveen']
const splitMethods = ['Equal split', 'Selected members', 'Fixed amount', 'Percentage split', 'Attendance based']

const spendStats = [
  { label: 'This month', value: 'INR 18,420', icon: ReceiptText },
  { label: 'Pending approval', value: 'INR 999', icon: Clock3 },
  { label: 'Avg per person', value: 'INR 3,070', icon: Users },
]

const ExpenseList = () => {
  const location = useLocation()
  const entryCardRef = useRef(null)
  const titleInputRef = useRef(null)
  const { draft, expenses, errors, setDraftField, setErrors, addExpense, resetDraft } = useExpenseStore()

  useEffect(() => {
    if (!location.state?.focusExpenseEntry) return

    entryCardRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    window.setTimeout(() => titleInputRef.current?.focus(), 250)
  }, [location.state])

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses],
  )

  const columns = [
    { key: 'title', header: 'Expense' },
    { key: 'category', header: 'Category' },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => `INR ${Number(row.amount).toLocaleString('en-IN')}`,
    },
    { key: 'paidBy', header: 'Paid by' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge tone={row.status === 'Approved' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = expenseSchema.safeParse(draft)

    if (!result.success) {
      setErrors(mapExpenseErrors(result.error))
      return
    }

    addExpense(result.data)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
            spend desk
          </p>
          <h1 className="mt-1 text-2xl font-black text-ink">Create and track expenses</h1>
          <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
            Add room spending, choose split rules, and keep approvals visible.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">Total INR {total.toLocaleString('en-IN')}</Badge>
          <Badge tone="warning">Large spends need approval</Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-3">
        {spendStats.map(({ label, value, icon }) => (
          <Card key={label} className="p-3 shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-stone-400">
                  {label}
                </p>
                <p className="mt-1 text-lg font-black text-ink">{value}</p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary">
                {createElement(icon, { className: 'h-5 w-5' })}
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-4 shadow-none" ref={entryCardRef}>
          <CardHeader className="mb-3">
            <CardTitle eyebrow="new expense">Quick spend entry</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>

          <form className="grid gap-3" onSubmit={handleSubmit}>
            <FormInput
              label="Expense title"
              ref={titleInputRef}
              value={draft.title}
              onChange={(event) => setDraftField('title', event.target.value)}
              placeholder="Vegetables and milk"
              icon={ReceiptText}
              error={errors.title}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <FormInput
                label="Amount"
                value={draft.amount}
                onChange={(event) => setDraftField('amount', event.target.value)}
                placeholder="1200"
                icon={CircleDollarSign}
                error={errors.amount}
              />
              <FormInput
                label="Date"
                type="date"
                value={draft.date}
                onChange={(event) => setDraftField('date', event.target.value)}
                // icon={CalendarDays}
                error={errors.date}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormSelect
                label="Category"
                value={draft.category}
                onChange={(event) => setDraftField('category', event.target.value)}
                options={categories}
                error={errors.category}
              />
              <FormSelect
                label="Paid by"
                value={draft.paidBy}
                onChange={(event) => setDraftField('paidBy', event.target.value)}
                options={roommates}
                error={errors.paidBy}
              />
            </div>
            <FormSelect
              label="Split method"
              value={draft.splitMethod}
              onChange={(event) => setDraftField('splitMethod', event.target.value)}
              options={splitMethods}
              error={errors.splitMethod}
            />
            <FormTextarea
              label="Notes"
              value={draft.notes}
              onChange={(event) => setDraftField('notes', event.target.value)}
              placeholder="Optional note for roommates"
              rows={2}
              error={errors.notes}
            />
            <FileUpload label="Attach receipt" />
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" className="rounded-xl" icon={RotateCcw} onClick={resetDraft}>
                Reset
              </Button>
              <Button type="submit" className="rounded-xl" icon={ShieldCheck}>
                Save expense
              </Button>
            </div>
          </form>
        </Card>

        <div className="grid gap-4">
          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="recent">Expense ledger</CardTitle>
              <Badge tone="info">{expenses.length} entries</Badge>
            </CardHeader>
            <Table columns={columns} data={expenses} />
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4 shadow-none">
              <CardHeader className="mb-3">
                <CardTitle eyebrow="split preview">Per roommate</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <div className="grid gap-2">
                {roommates.map((member) => (
                  <div key={member} className="flex items-center justify-between rounded-xl bg-stone-50/70 px-3 py-2">
                    <p className="text-xs font-black text-ink">{member}</p>
                    <p className="text-xs font-bold text-stone-600">
                      INR {Math.round(total / roommates.length).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 shadow-none">
              <CardHeader className="mb-3">
                <CardTitle eyebrow="approval">Manager queue</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <div className="rounded-xl bg-primary-light px-3 py-3">
                <p className="text-xs font-black text-ink">Auto approval rule</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-stone-600">
                  Expenses above INR 1,000 are marked pending for maintainer review.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExpenseList
