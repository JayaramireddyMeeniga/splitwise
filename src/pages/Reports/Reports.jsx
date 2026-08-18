import { createElement, useMemo } from 'react'
import {
  BarChart3,
  CalendarDays,
  Download,
  FileSpreadsheet,
  PieChart,
  ReceiptText,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import { mapReportErrors, reportFilterSchema } from '../../schemas/report.schema'
import { useReportStore } from '../../store/report.store'

const reportTypes = ['Monthly summary', 'Member contribution', 'Category breakdown', 'Wallet report', 'Settlement report']
const formats = ['PDF', 'Excel', 'CSV']

const Reports = () => {
  const {
    filters,
    errors,
    categoryBreakdown,
    memberReports,
    monthlyTrend,
    lastExport,
    setFilter,
    setErrors,
    markExported,
  } = useReportStore()

  const totalSpend = useMemo(
    () => categoryBreakdown.reduce((sum, item) => sum + item.amount, 0),
    [categoryBreakdown],
  )

  const totalPaid = useMemo(
    () => memberReports.reduce((sum, member) => sum + member.paid, 0),
    [memberReports],
  )

  const columns = [
    { key: 'member', header: 'Member' },
    {
      key: 'paid',
      header: 'Paid',
      render: (row) => `INR ${row.paid.toLocaleString('en-IN')}`,
    },
    {
      key: 'share',
      header: 'Share',
      render: (row) => `INR ${row.share.toLocaleString('en-IN')}`,
    },
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

  const handleExport = (event) => {
    event.preventDefault()
    const result = reportFilterSchema.safeParse(filters)

    if (!result.success) {
      setErrors(mapReportErrors(result.error))
      return
    }

    markExported()
  }

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-surface/76 p-4 shadow-[0_14px_40px_rgba(28,25,23,0.06)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
            report desk
          </p>
          <h1 className="mt-1 text-2xl font-black text-ink">Room financial reports</h1>
          <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">
            Review monthly spending, member contributions, category movement, and export summaries.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="dark">Spend INR {totalSpend.toLocaleString('en-IN')}</Badge>
          <Badge tone="info">Paid INR {totalPaid.toLocaleString('en-IN')}</Badge>
        </div>
      </section>

      <section className="mb-4 grid gap-3 md:grid-cols-4">
        {[
          { label: 'Monthly spend', value: `INR ${totalSpend.toLocaleString('en-IN')}`, icon: ReceiptText },
          { label: 'Collected', value: `INR ${totalPaid.toLocaleString('en-IN')}`, icon: WalletCards },
          { label: 'Members', value: `${memberReports.length} tracked`, icon: Users },
          { label: 'Trend', value: '+4.3%', icon: TrendingUp },
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

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="export">Generate report</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-primary" />
          </CardHeader>

          <form className="grid gap-3" onSubmit={handleExport}>
            <FormInput
              label="Report month"
              type="month"
              value={filters.month}
              onChange={(event) => setFilter('month', event.target.value)}
              icon={CalendarDays}
              error={errors.month}
            />
            <FormSelect
              label="Report type"
              value={filters.reportType}
              onChange={(event) => setFilter('reportType', event.target.value)}
              options={reportTypes}
              error={errors.reportType}
            />
            <FormSelect
              label="Format"
              value={filters.format}
              onChange={(event) => setFilter('format', event.target.value)}
              options={formats}
              error={errors.format}
            />
            <Button className="rounded-xl" icon={Download} type="submit">
              Export report
            </Button>
            {lastExport && (
              <p className="rounded-xl bg-primary-light px-3 py-2 text-xs font-semibold text-primary">
                {lastExport}
              </p>
            )}
          </form>
        </Card>

        <div className="grid gap-4">
          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="categories">Expense breakdown</CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <div className="grid gap-3">
              {categoryBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-xs font-black text-ink">{item.category}</p>
                    <p className="text-xs font-bold text-stone-500">
                      INR {item.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 shadow-none">
            <CardHeader className="mb-3">
              <CardTitle eyebrow="members">Contribution report</CardTitle>
              <Badge tone="neutral">{memberReports.length} members</Badge>
            </CardHeader>
            <Table columns={columns} data={memberReports} />
          </Card>
        </div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="trend">Monthly movement</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="flex h-36 items-end gap-3">
            {monthlyTrend.map((item) => {
              const maxAmount = Math.max(...monthlyTrend.map((trend) => trend.amount))
              const height = Math.max(18, Math.round((item.amount / maxAmount) * 100))

              return (
                <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-24 w-full items-end rounded-xl bg-stone-50 px-2">
                    <div
                      className="w-full rounded-t-lg bg-primary"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-black text-stone-500">{item.month}</p>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-4 shadow-none">
          <CardHeader className="mb-3">
            <CardTitle eyebrow="insights">Maintainer notes</CardTitle>
            <ReceiptText className="h-4 w-4 text-primary" />
          </CardHeader>
          <div className="grid gap-2">
            {[
              'Rent is the largest category this month.',
              'Two members still need final settlement adjustment.',
              'Wallet report is ready for export after verification.',
            ].map((note) => (
              <div key={note} className="rounded-xl bg-stone-50/70 px-3 py-2">
                <p className="text-xs font-semibold leading-5 text-stone-600">{note}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Reports
