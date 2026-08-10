import { createElement } from 'react'
import {
    AlertCircle, ArrowUpRight, CalendarDays, CheckCircle2, CircleDollarSign,
    Clock3, Plus, ReceiptText, ShieldCheck, Users, WalletCards,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import FileUpload from '../../components/forms/FileUpload'

const summary = [
    {
        label: 'Monthly spend',
        value: 'INR 18,420',
        delta: '72% of budget',
        icon: ReceiptText,
        tone: 'bg-charcoal text-white',
    },
    {
        label: 'Collected',
        value: 'INR 14,500',
        delta: '4 members paid',
        icon: CheckCircle2,
        tone: 'bg-primary-light text-primary',
    },
    {
        label: 'Pending dues',
        value: 'INR 3,920',
        delta: '2 reminders today',
        icon: CircleDollarSign,
        tone: 'bg-secondary-light text-secondary-hover',
    },
    {
        label: 'Wallet',
        value: 'INR 6,080',
        delta: 'healthy balance',
        icon: WalletCards,
        tone: 'bg-primary-light text-primary',
    },
]

const columns = [
    { key: 'name', header: 'Member' },
    { key: 'paid', header: 'Paid' },
    { key: 'share', header: 'Share' },
    {
        key: 'status',
        header: 'Status',
        render: (row) => (
            <Badge tone={row.status === 'Settled' ? 'success' : row.status === 'Receive' ? 'info' : 'warning'}>
                {row.status}
            </Badge>
        ),
    },
]

const settlements = [
    { name: 'Rahul', paid: 'INR 3,500', share: 'INR 3,000', status: 'Receive' },
    { name: 'Arun', paid: 'INR 2,500', share: 'INR 3,000', status: 'Pay' },
    { name: 'Sai', paid: 'INR 3,000', share: 'INR 3,000', status: 'Settled' },
]

const dashboardActions = [
    {
        label: 'Budget used',
        value: '72%',
        detail: 'INR 3,580 left from INR 22,000',
        icon: CircleDollarSign,
        tone: 'bg-primary-light text-primary',
    },
    {
        label: 'Unpaid members',
        value: '2',
        detail: 'Arun and Naveen need reminders',
        icon: AlertCircle,
        tone: 'bg-secondary-light text-secondary-hover',
    },
    {
        label: 'Reimbursements',
        value: '3',
        detail: 'INR 1,840 waiting for approval',
        icon: ReceiptText,
        tone: 'bg-primary-light text-primary',
    },
]

const upcomingBills = [
    { label: 'Rent', due: 'Aug 5', amount: 'INR 12,000' },
    { label: 'Internet', due: 'Aug 10', amount: 'INR 999' },
    { label: 'Electricity', due: 'Aug 14', amount: 'Estimate pending' },
]

const Dashboard = () => (
    <>
        <section className="mb-4 flex flex-col gap-3 rounded-xl border border-stone-200/80 bg-surface/70 px-4 py-3 shadow-[0_12px_34px_rgba(28,25,23,0.055)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
                <Badge tone="dark">6 active roommates</Badge>
                <Badge tone="success">Wallet healthy</Badge>
                <Badge tone="warning">Rent due Aug 5</Badge>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
                <Button className="rounded-md" variant="secondary" icon={CalendarDays}>
                    View month
                </Button>
                <Button className="rounded-md" icon={Plus}>
                    Add expense
                </Button>
            </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {summary.map(({ label, value, delta, icon, tone }) => (
                <Card key={label} className="overflow-hidden">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-bold text-stone-500">{label}</p>
                            <p className="mt-0.5 text-lg font-bold text-ink">{value}</p>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                                {delta}
                            </p>
                        </div>
                        <div className={`grid p-2.5 place-items-center rounded-md ${tone}`}>
                            {createElement(icon, { className: 'h-4.5 w-4.5' })}
                        </div>
                    </div>
                </Card>
            ))}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <Card>
                <CardHeader>
                    <CardTitle eyebrow="settlement preview">Who pays who</CardTitle>
                    <Button variant="ghost" className="font-semibold" icon={ArrowUpRight}>
                        Open report
                    </Button>
                </CardHeader>
                <Table columns={columns} data={settlements} />
            </Card>

            <Card tone="glass">
                <CardHeader>
                    <CardTitle eyebrow="quick capture">Add shared spend</CardTitle>
                    <Badge tone="info">Draft</Badge>
                </CardHeader>
                <div className="grid gap-4">
                    <FormInput label="Expense title" placeholder="Vegetables and milk" icon={ReceiptText} />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput label="Amount" placeholder="1200" icon={CircleDollarSign} />
                        <FormSelect
                            label="Split method"
                            options={['Equal split', 'Selected members', 'Attendance based']}
                        />
                    </div>
                    <FileUpload label="Attach receipt proof" />
                    <Button className="w-full rounded-lg" icon={ShieldCheck}>
                        Save for manager approval
                    </Button>
                </div>
            </Card>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle eyebrow="manager focus">Needs attention</CardTitle>
                    <Badge tone="warning">5 open items</Badge>
                </CardHeader>
                <div className="grid gap-3 md:grid-cols-3">
                    {dashboardActions.map(({ label, value, detail, icon, tone }) => (
                        <div
                            key={label}
                            className="rounded-lg border border-stone-200 bg-stone-50/70 px-4 py-3"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-bold text-stone-500">{label}</p>
                                <div className={`grid p-2.5 place-items-center rounded-lg ${tone}`}>
                                    {createElement(icon, { className: 'h-5 w-5' })}
                                </div>
                            </div>
                            <p className="text-2xl font-black text-ink">{value}</p>
                            <p className="mt-0.5 text-xs font-semibold leading-5 text-stone-500">{detail}</p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle eyebrow="upcoming">Bill reminders</CardTitle>
                    <Clock3 className="h-5 w-5 text-primary" />
                </CardHeader>
                <div className="space-y-2.5">
                    {upcomingBills.map((bill) => (
                        <div
                            key={bill.label}
                            className="flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-surface px-3 py-2"
                        >
                            <div>
                                <p className="text-sm font-black text-ink">{bill.label}</p>
                                <p className="text-xs font-semibold text-stone-500">Due {bill.due}</p>
                            </div>
                            <p className="text-right text-sm font-bold text-stone-700">{bill.amount}</p>
                        </div>
                    ))}
                    <div className="rounded-xl bg-primary-light px-3 py-3">
                        <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-surface text-primary">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-ink">6 active roommates</p>
                                <p className="text-xs font-semibold text-stone-600">All settlement shares are calculated for this room.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    </>
)

export default Dashboard
