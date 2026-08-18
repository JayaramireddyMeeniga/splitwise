import { createElement } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, CalendarDays, Copy, Paperclip, ReceiptText, Trash2,
  UserRound, Users, WalletCards,
} from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import { useExpenseStore } from '../../store/expense.store'

const formatAmount = (amount) => `INR ${Number(amount || 0).toLocaleString('en-IN')}`

const ExpenseDetails = () => {
  const { expenseId } = useParams()
  const navigate = useNavigate()
  const expense = useExpenseStore((state) => state.getExpenseById(expenseId))
  const duplicateExpense = useExpenseStore((state) => state.duplicateExpense)
  const removeExpense = useExpenseStore((state) => state.removeExpense)

  if (!expense) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="p-5 text-center shadow-none">
          <ReceiptText className="mx-auto h-8 w-8 text-primary" />
          <h1 className="mt-3 text-xl font-black text-ink">Expense not found</h1>
          <p className="mt-1 text-xs font-semibold text-stone-500">
            This expense may have been removed from the room ledger.
          </p>
          <Button className="mt-4 rounded-lg" size="sm" icon={ArrowLeft} onClick={() => navigate('/expenses')}>
            Back to expenses
          </Button>
        </Card>
      </div>
    )
  }

  const members = expense.members?.length ? expense.members : ['Rahul', 'Arun', 'Sai', 'Naveen']
  const perMember = Number(expense.amount || 0) / members.length

  const handleDuplicate = () => {
    duplicateExpense(expense.id)
    navigate('/expenses')
  }

  const handleDelete = () => {
    removeExpense(expense.id)
    navigate('/expenses')
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-4">
      <section className="animate-rise-in rounded-xl bg-ink p-4 text-white shadow-[0_18px_50px_rgba(28,25,23,0.16)]">
        <Link
          to="/expenses"
          className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-orange-100 transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Expenses
        </Link>
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge
                tone={expense.status === 'Approved' ? 'success' : 'warning'}
                className="px-2.5 py-1 text-[11px]"
              >
                {expense.status}
              </Badge>
              <span className="text-[11px] font-bold text-stone-300">{expense.category}</span>
            </div>
            <h1 className="truncate text-2xl font-black text-white">{expense.title}</h1>
            <p className="mt-1 text-xs font-semibold text-stone-300">{expense.notes || 'No notes added.'}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-100">total amount</p>
            <p className="text-2xl font-black text-white">{formatAmount(expense.amount)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        {[
          { label: 'Paid by', value: expense.paidBy, icon: UserRound },
          { label: 'Split method', value: expense.splitMethod, icon: Users },
          { label: 'Date', value: expense.date, icon: CalendarDays },
          { label: 'Per member', value: formatAmount(perMember), icon: WalletCards },
        ].map(({ label, value, icon: Icon }, index) => (
          <Card
            key={label}
            className="animate-rise-in p-3 shadow-none"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {createElement(Icon, { className: 'mb-2 h-4 w-4 text-primary' })}
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{label}</p>
            <p className="mt-1 truncate text-sm font-black text-ink">{value}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.62fr]">
        <Card className="p-3 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="split details" className="[&_h3]:text-base [&_p]:text-[10px]">
              Roommate shares
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="grid gap-2">
            {members.map((member) => (
              <div
                key={member}
                className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg bg-stone-50 px-3 py-2 ring-1 ring-stone-200/70"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-black text-ink">{member}</p>
                  <p className="text-[11px] font-bold text-stone-500">
                    {member === expense.paidBy ? 'Paid first' : 'Owes share'}
                  </p>
                </div>
                <p className="text-xs font-black text-ink">{formatAmount(perMember)}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid content-start gap-3">
          <Card className="p-3 shadow-none">
            <CardHeader className="mb-2">
              <CardTitle eyebrow="receipt" className="[&_h3]:text-base [&_p]:text-[10px]">
                Attachment
              </CardTitle>
              <Paperclip className="h-4 w-4 text-primary" />
            </CardHeader>
            <div className="rounded-lg bg-primary-light px-3 py-3">
              <p className="truncate text-xs font-black text-ink">
                {expense.receiptName || 'No receipt attached'}
              </p>
              <p className="mt-1 text-[11px] font-bold text-stone-500">Visible to room members</p>
            </div>
          </Card>

          <Card className="p-3 shadow-none">
            <CardHeader className="mb-2">
              <CardTitle eyebrow="actions" className="[&_h3]:text-base [&_p]:text-[10px]">
                Manage
              </CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" className="rounded-lg" icon={Copy} onClick={handleDuplicate}>
                Copy
              </Button>
              <Button variant="danger" size="sm" className="rounded-lg" icon={Trash2} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default ExpenseDetails
