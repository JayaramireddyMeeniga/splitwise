import { createElement, useMemo } from 'react'
import {
  BadgeCheck,
  CreditCard,
  FileCheck2,
  Landmark,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  UserRound,
  WalletCards,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import FormDateInput from '../../components/forms/FormDateInput'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import FormTextarea from '../../components/forms/FormTextarea'
import FileUpload from '../../components/forms/FileUpload'
import { paymentSchema, mapPaymentErrors } from '../../schemas/payment.schema'
import { usePaymentStore } from '../../store/payment.store'

const roommates = ['Rahul', 'Arun', 'Sai', 'Naveen']
const paymentMethods = ['UPI', 'Cash', 'Bank transfer', 'Digital wallet']

const methodIcons = {
  UPI: Smartphone,
  Cash: WalletCards,
  'Bank transfer': Landmark,
  'Digital wallet': CreditCard,
}

const PaymentList = () => {
  const {
    draft,
    payments,
    errors,
    setDraftField,
    setErrors,
    addPayment,
    verifyPayment,
    resetDraft,
  } = usePaymentStore()

  const collected = useMemo(
    () => payments
      .filter((payment) => payment.status === 'Verified')
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
    [payments],
  )

  const pending = useMemo(
    () => payments
      .filter((payment) => payment.status === 'Pending')
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
    [payments],
  )

  const columns = [
    { key: 'member', header: 'Member' },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => `INR ${Number(row.amount).toLocaleString('en-IN')}`,
    },
    {
      key: 'method',
      header: 'Method',
      render: (row) => {
        const Icon = methodIcons[row.method] || CreditCard
        return (
          <span className="inline-flex items-center gap-2">
            {createElement(Icon, { className: 'h-4 w-4 text-primary' })}
            {row.method}
          </span>
        )
      },
    },
    { key: 'reference', header: 'Reference' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge tone={row.status === 'Verified' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = paymentSchema.safeParse(draft)

    if (!result.success) {
      setErrors(mapPaymentErrors(result.error))
      return
    }

    addPayment(result.data)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
            payment desk
          </p>
          <h1 className="mt-1 text-2xl font-black text-ink">Record and verify payments</h1>
          <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
            Track monthly collections, uploaded proof, pending verification, and payment methods.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">Collected INR {collected.toLocaleString('en-IN')}</Badge>
          <Badge tone="warning">Pending INR {pending.toLocaleString('en-IN')}</Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-3">
        {[
          { label: 'Collected', value: `INR ${collected.toLocaleString('en-IN')}`, icon: BadgeCheck },
          { label: 'Pending', value: `INR ${pending.toLocaleString('en-IN')}`, icon: FileCheck2 },
          { label: 'Payments', value: `${payments.length} entries`, icon: ReceiptText },
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
            <CardTitle eyebrow="new payment">Record collection</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>

          <form className="grid gap-3" onSubmit={handleSubmit}>
            <FormSelect
              label="Roommate"
              value={draft.member}
              onChange={(event) => setDraftField('member', event.target.value)}
              options={roommates}
              error={errors.member}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <FormInput
                label="Amount"
                value={draft.amount}
                onChange={(event) => setDraftField('amount', event.target.value)}
                placeholder="3000"
                icon={WalletCards}
                error={errors.amount}
              />
              <FormDateInput
                label="Date"
                value={draft.date}
                onChange={(event) => setDraftField('date', event.target.value)}
                error={errors.date}
              />
            </div>
            <FormSelect
              label="Payment method"
              value={draft.method}
              onChange={(event) => setDraftField('method', event.target.value)}
              options={paymentMethods}
              error={errors.method}
            />
            <FormInput
              label="Reference"
              value={draft.reference}
              onChange={(event) => setDraftField('reference', event.target.value)}
              placeholder="UPI ref / cash note"
              icon={CreditCard}
              error={errors.reference}
            />
            <FormTextarea
              label="Note"
              value={draft.note}
              onChange={(event) => setDraftField('note', event.target.value)}
              placeholder="Optional note for verification"
              rows={2}
              error={errors.note}
            />
            <FileUpload label="Upload payment proof" />
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" className="rounded-xl" icon={RotateCcw} onClick={resetDraft}>
                Reset
              </Button>
              <Button type="submit" className="rounded-xl" icon={ShieldCheck}>
                Save payment
              </Button>
            </div>
          </form>
        </Card>

        <div className="grid gap-4">
          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="history">Payment ledger</CardTitle>
              <Badge tone="info">{payments.length} records</Badge>
            </CardHeader>
            <Table columns={columns} data={payments} />
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4 shadow-none">
              <CardHeader className="mb-3">
                <CardTitle eyebrow="verification">Pending proof</CardTitle>
                <FileCheck2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <div className="grid gap-2">
                {payments.filter((payment) => payment.status === 'Pending').length === 0 ? (
                  <div className="rounded-xl bg-primary-light px-3 py-3">
                    <p className="text-xs font-black text-ink">No pending payments</p>
                    <p className="mt-1 text-xs font-semibold text-stone-600">Everything is verified.</p>
                  </div>
                ) : (
                  payments
                    .filter((payment) => payment.status === 'Pending')
                    .map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between rounded-xl bg-stone-50/70 px-3 py-2">
                        <div>
                          <p className="text-xs font-black text-ink">{payment.member}</p>
                          <p className="text-xs font-semibold text-stone-500">
                            INR {payment.amount.toLocaleString('en-IN')} via {payment.method}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-lg"
                          icon={BadgeCheck}
                          onClick={() => verifyPayment(payment.id)}
                        >
                          Verify
                        </Button>
                      </div>
                    ))
                )}
              </div>
            </Card>

            <Card className="p-4 shadow-none">
              <CardHeader className="mb-3">
                <CardTitle eyebrow="member dues">Collection status</CardTitle>
                <UserRound className="h-4 w-4 text-primary" />
              </CardHeader>
              <div className="grid gap-2">
                {roommates.map((member) => {
                  const paid = payments
                    .filter((payment) => payment.member === member && payment.status === 'Verified')
                    .reduce((sum, payment) => sum + payment.amount, 0)

                  return (
                    <div key={member} className="flex items-center justify-between rounded-xl bg-stone-50/70 px-3 py-2">
                      <p className="text-xs font-black text-ink">{member}</p>
                      <p className="text-xs font-bold text-stone-600">
                        INR {paid.toLocaleString('en-IN')}
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

export default PaymentList
