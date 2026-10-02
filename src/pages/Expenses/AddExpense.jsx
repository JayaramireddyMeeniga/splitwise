import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Check, CircleDollarSign, Paperclip, X,
    ReceiptText, RotateCcw, ShieldCheck, Sparkles, Users,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import FormDateInput from '../../components/forms/FormDateInput'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import FormTextarea from '../../components/forms/FormTextarea'
import { expenseSchema, mapExpenseErrors } from '../../schemas/expense.schema'
import { useExpenseStore } from '../../store/expense.store'
import { cn } from '../../utils/cn'

const categories = ['Rent', 'Electricity', 'Groceries', 'Internet', 'Household', 'Repairs', 'Miscellaneous']
const roommates = ['Rahul', 'Arun', 'Sai', 'Naveen']
const splitMethods = ['Equal split', 'Selected members', 'Fixed amount', 'Percentage split', 'Attendance based']

const AddExpense = ({ mode = 'page', onClose, onSaved }) => {
    const navigate = useNavigate()
    const {
        draft,
        errors,
        setDraftField,
        toggleDraftMember,
        setReceiptName,
        setErrors,
        addExpense,
        updateExpense,
        resetDraft,
        editingExpenseId,
    } = useExpenseStore()

    const perPerson = Number(draft.amount || 0) / Math.max(draft.members.length, 1)

    const handleSubmit = (event) => {
        event.preventDefault()
        const result = expenseSchema.safeParse(draft)

        if (!result.success) {
            setErrors(mapExpenseErrors(result.error))
            return
        }

        if (editingExpenseId) {
            updateExpense(editingExpenseId, result.data)
        } else {
            addExpense(result.data)
        }

        onSaved?.()

        if (mode === 'dialog') {
            onClose?.()
            return
        }

        navigate('/expenses')
    }

    const handleReceipt = (event) => {
        setReceiptName(event.target.files?.[0]?.name || '')
    }

    const handleBack = () => {
        if (mode === 'dialog') {
            onClose?.()
            return
        }

        navigate('/expenses')
    }

    return (
        <div
            className={cn(
                'grid gap-4',
                mode === 'dialog'
                    ? 'h-full overflow-hidden'
                    : 'mx-auto max-w-5xl lg:grid-cols-[0.9fr_0.55fr]',
            )}
        >
            <section
                className={cn(
                    'animate-rise-in overflow-hidden bg-surface/94 ring-1 ring-stone-200',
                    mode === 'dialog'
                        ? 'flex h-full flex-col rounded-2xl shadow-none ring-0'
                        : 'rounded-xl shadow-[0_18px_50px_rgba(28,25,23,0.08)]',
                )}
            >
                <div className="border-b border-stone-100 bg-ink px-4 py-3 text-white">
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-primary-light transition hover:text-white"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Expenses
                        </button>
                        {mode === 'dialog' && (
                            <button
                                type="button"
                                aria-label="Close add expense"
                                onClick={onClose}
                                className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/15"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <h1 id="add-expense-title" className={cn('font-black', mode === 'dialog' ? 'text-lg' : 'text-xl md:text-2xl')}>
                        {editingExpenseId ? 'Edit Expense' : 'Add Expense'}
                    </h1>
                    <p className="mt-1 text-xs font-semibold leading-5 text-stone-300">
                        {editingExpenseId
                            ? 'Update the expense details and keep the room ledger clean.'
                            : 'A focused entry flow with compact fields, quick splits, and receipt context.'}
                    </p>
                </div>

                <form
                    className={cn(
                        'grid gap-3 p-4',
                        mode === 'dialog' && 'min-h-0 flex-1 content-start overscroll-contain overflow-y-auto pb-5',
                    )}
                    onSubmit={handleSubmit}
                >
                    <FormInput
                        label="Expense title"
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
                        <FormDateInput
                            label="Date"
                            value={draft.date}
                            onChange={(event) => setDraftField('date', event.target.value)}
                            error={errors.date}
                        />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
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
                        <FormSelect
                            label="Split"
                            value={draft.splitMethod}
                            onChange={(event) => setDraftField('splitMethod', event.target.value)}
                            options={splitMethods}
                            error={errors.splitMethod}
                        />
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-bold text-ink">Roommates</p>
                        <div className="grid gap-2 sm:grid-cols-4">
                            {roommates.map((member) => {
                                const selected = draft.members.includes(member)

                                return (
                                    <button
                                        key={member}
                                        type="button"
                                        onClick={() => toggleDraftMember(member)}
                                        className={cn(
                                            'flex h-10 items-center justify-between rounded-lg px-3 text-xs font-black ring-1 transition hover:-translate-y-0.5',
                                            selected
                                                ? 'bg-ink text-white ring-ink'
                                                : 'bg-stone-50 text-stone-600 ring-stone-200 hover:bg-primary-light hover:text-primary',
                                        )}
                                    >
                                        {member}
                                        {selected && <Check className="h-3.5 w-3.5 text-primary-light" />}
                                    </button>
                                )
                            })}
                        </div>
                        {errors.members && <p className="mt-2 text-xs font-semibold text-danger">{errors.members}</p>}
                    </div>

                    <FormTextarea
                        label="Notes"
                        value={draft.notes}
                        onChange={(event) => setDraftField('notes', event.target.value)}
                        placeholder="Optional note for roommates"
                        rows={2}
                        error={errors.notes}
                        textareaClassName="rounded-lg px-3 py-2 text-xs"
                    />

                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-dashed border-stone-300 bg-stone-50/70 px-3 py-2.5 transition hover:border-primary hover:bg-primary-light">
                        <input type="file" accept="image/*,.pdf" className="sr-only" onChange={handleReceipt} />
                        <span className="flex min-w-0 items-center gap-2">
                            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
                                <Paperclip className="h-4 w-4" />
                            </span>
                            <span className="min-w-0">
                                <span className="block truncate text-xs font-black text-ink">
                                    {draft.receiptName || 'Attach receipt'}
                                </span>
                                <span className="block text-[11px] font-bold text-stone-500">PNG, JPG, or PDF</span>
                            </span>
                        </span>
                        <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                    </label>

                    <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
                        <Button type="button" variant="secondary" size="sm" className="rounded-lg" icon={RotateCcw} onClick={resetDraft}>
                            Reset
                        </Button>
                        <Button type="submit" size="sm" className="rounded-lg" icon={ShieldCheck}>
                            {editingExpenseId ? 'Update expense' : 'Save expense'}
                        </Button>
                    </div>
                </form>
            </section>

            {mode !== 'dialog' && (
                <aside className="grid content-start gap-3">
                    <Card className="animate-rise-in p-3 shadow-none" style={{ animationDelay: '90ms' }}>
                        <CardHeader className="mb-2">
                            <CardTitle eyebrow="live split" className="[&_h3]:text-base [&_p]:text-[10px]">
                                Preview
                            </CardTitle>
                            <Users className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <div className="rounded-lg bg-primary-light px-3 py-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-primary">per roommate</p>
                            <p className="mt-1 text-xl font-black text-ink">
                                INR {Math.round(perPerson || 0).toLocaleString('en-IN')}
                            </p>
                        </div>
                    </Card>

                    <Card className="animate-rise-in p-3 shadow-none" style={{ animationDelay: '140ms' }}>
                        <CardHeader className="mb-2">
                            <CardTitle eyebrow="status" className="[&_h3]:text-base [&_p]:text-[10px]">
                                Approval rule
                            </CardTitle>
                            <ShieldCheck className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <p className="text-xs font-semibold leading-5 text-stone-600">
                            Expenses above INR 1,000 are saved as pending. Smaller spends are approved instantly.
                        </p>
                    </Card>
                </aside>
            )}
        </div>
    )
}

export default AddExpense
