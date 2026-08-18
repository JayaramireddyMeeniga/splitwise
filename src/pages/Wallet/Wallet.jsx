import { createElement, useMemo } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  PiggyBank,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  UserRound,
  WalletCards,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import FormTextarea from '../../components/forms/FormTextarea'
import { mapWalletErrors, walletTransactionSchema } from '../../schemas/wallet.schema'
import { useWalletStore } from '../../store/wallet.store'

const transactionTypes = [
  { label: 'Money in', value: 'credit' },
  { label: 'Money out', value: 'debit' },
]

const categories = ['Contribution', 'Groceries', 'Household', 'Repairs', 'Emergency', 'Refund', 'Miscellaneous']
const roommates = ['Rahul', 'Arun', 'Sai', 'Naveen']

const Wallet = () => {
  const {
    draft,
    transactions,
    errors,
    emergencyFund,
    setDraftField,
    setErrors,
    addTransaction,
    resetDraft,
  } = useWalletStore()

  const balance = useMemo(
    () =>
      transactions.reduce((total, transaction) => (
        transaction.type === 'credit'
          ? total + Number(transaction.amount)
          : total - Number(transaction.amount)
      ), 0),
    [transactions],
  )

  const moneyIn = useMemo(
    () => transactions
      .filter((transaction) => transaction.type === 'credit')
      .reduce((total, transaction) => total + Number(transaction.amount), 0),
    [transactions],
  )

  const moneyOut = useMemo(
    () => transactions
      .filter((transaction) => transaction.type === 'debit')
      .reduce((total, transaction) => total + Number(transaction.amount), 0),
    [transactions],
  )

  const columns = [
    { key: 'title', header: 'Transaction' },
    { key: 'category', header: 'Category' },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => (
        <span className={row.type === 'credit' ? 'text-primary' : 'text-ink'}>
          {row.type === 'credit' ? '+' : '-'} INR {Number(row.amount).toLocaleString('en-IN')}
        </span>
      ),
    },
    { key: 'handledBy', header: 'Handled by' },
    {
      key: 'type',
      header: 'Flow',
      render: (row) => (
        <Badge tone={row.type === 'credit' ? 'success' : 'warning'}>
          {row.type === 'credit' ? 'Money in' : 'Money out'}
        </Badge>
      ),
    },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = walletTransactionSchema.safeParse(draft)

    if (!result.success) {
      setErrors(mapWalletErrors(result.error))
      return
    }

    addTransaction(result.data)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
            wallet desk
          </p>
          <h1 className="mt-1 text-2xl font-black text-ink">Manage room wallet</h1>
          <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
            Track common fund deposits, shared purchases, emergency money, and wallet movement.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">Balance INR {balance.toLocaleString('en-IN')}</Badge>
          <Badge tone="info">Emergency INR {emergencyFund.toLocaleString('en-IN')}</Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-4">
        {[
          { label: 'Balance', value: `INR ${balance.toLocaleString('en-IN')}`, icon: WalletCards },
          { label: 'Money in', value: `INR ${moneyIn.toLocaleString('en-IN')}`, icon: ArrowDownRight },
          { label: 'Money out', value: `INR ${moneyOut.toLocaleString('en-IN')}`, icon: ArrowUpRight },
          { label: 'Emergency', value: `INR ${emergencyFund.toLocaleString('en-IN')}`, icon: PiggyBank },
        ].map(({ label, value, icon }) => (
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

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="wallet entry">Add transaction</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>

          <form className="grid gap-3" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormSelect
                label="Type"
                value={draft.type}
                onChange={(event) => setDraftField('type', event.target.value)}
                options={transactionTypes}
                error={errors.type}
              />
              <FormInput
                label="Amount"
                value={draft.amount}
                onChange={(event) => setDraftField('amount', event.target.value)}
                placeholder="1000"
                icon={CircleDollarSign}
                error={errors.amount}
              />
            </div>
            <FormInput
              label="Title"
              value={draft.title}
              onChange={(event) => setDraftField('title', event.target.value)}
              placeholder="Grocery purchase"
              icon={ReceiptText}
              error={errors.title}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <FormSelect
                label="Category"
                value={draft.category}
                onChange={(event) => setDraftField('category', event.target.value)}
                options={categories}
                error={errors.category}
              />
              <FormSelect
                label="Handled by"
                value={draft.handledBy}
                onChange={(event) => setDraftField('handledBy', event.target.value)}
                options={roommates}
                error={errors.handledBy}
              />
            </div>
            <FormInput
              label="Date"
              type="date"
              value={draft.date}
              onChange={(event) => setDraftField('date', event.target.value)}
              icon={CalendarDays}
              error={errors.date}
            />
            <FormTextarea
              label="Note"
              value={draft.note}
              onChange={(event) => setDraftField('note', event.target.value)}
              placeholder="Optional wallet note"
              rows={2}
              error={errors.note}
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" className="rounded-xl" icon={RotateCcw} onClick={resetDraft}>
                Reset
              </Button>
              <Button type="submit" className="rounded-xl" icon={WalletCards}>
                Save transaction
              </Button>
            </div>
          </form>
        </Card>

        <div className="grid gap-4">
          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="history">Wallet ledger</CardTitle>
              <Badge tone="info">{transactions.length} entries</Badge>
            </CardHeader>
            <Table columns={columns} data={transactions} />
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4 shadow-none">
              <CardHeader className="mb-3">
                <CardTitle eyebrow="fund rule">Common wallet</CardTitle>
                <WalletCards className="h-4 w-4 text-primary" />
              </CardHeader>
              <div className="rounded-xl bg-primary-light px-3 py-3">
                <p className="text-xs font-black text-ink">Used for daily room needs</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-stone-600">
                  Groceries, household items, cleaning supplies, and small repairs should move through this wallet.
                </p>
              </div>
            </Card>

            <Card className="p-4 shadow-none">
              <CardHeader className="mb-3">
                <CardTitle eyebrow="category flow">Top movement</CardTitle>
                <ReceiptText className="h-4 w-4 text-primary" />
              </CardHeader>
              <div className="grid gap-2">
                {['Contribution', 'Groceries', 'Household'].map((category) => {
                  const categoryTotal = transactions
                    .filter((transaction) => transaction.category === category)
                    .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

                  return (
                    <div key={category} className="flex items-center justify-between rounded-xl bg-stone-50/70 px-3 py-2">
                      <p className="text-xs font-black text-ink">{category}</p>
                      <p className="text-xs font-bold text-stone-600">
                        INR {categoryTotal.toLocaleString('en-IN')}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Wallet
