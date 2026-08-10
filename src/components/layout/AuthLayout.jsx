import logo from '../../assets/split-wise-logo.png'

const AuthLayout = ({ children, title = 'Welcome back', subtitle }) => (
  <main className="ledger-grid grid min-h-screen place-items-center bg-canvas px-4 py-6 text-ink">
    <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-3xl border border-stone-200/80 bg-surface/80 shadow-[0_20px_60px_rgba(28,25,23,0.09)] backdrop-blur-2xl lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-charcoal p-6 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20 ledger-grid" />
        <div className="flex gap-3 items-center relative">
          <div className="inline-flex items-center rounded-xl bg-white/96 px-3 py-2 shadow-[0_14px_32px_rgba(0,0,0,0.14)]">
            <img src={logo} alt="RoomMateX" className="h-13 w-auto object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">RoomMateX</p>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white mt-1">
              room finance access
            </p>
          </div>

        </div>

        <div className="relative max-w-sm">

          <h1 className="my-3 text-2xl font-semibold leading-tight">
            Pick your room role. Enter the ledger.
          </h1>
          <p className="mb-4 text-sm leading-6 text-white/68">
            Maintainers manage approvals, settlements, and wallet movement. Roommates track
            dues, payments, reimbursements, and shared expenses.
          </p>
        </div>

        <div className="relative grid gap-3">
          {[
            ['1', 'Maintainer creates a room'],
            ['2', 'Roommates join with invite code'],
            ['3', 'Expenses, wallet, and settlements start after setup'],
          ].map(([step, text]) => (
            <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 p-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-xs font-black text-white">
                {step}
              </span>
              <p className="text-[13px] font-semibold leading-5 text-white/72">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid place-items-center p-6">
        <div className="w-full">
          <div className="mb-4 lg:hidden">
            <img src={logo} alt="RoomMateX" className="h-13 w-auto object-contain" />
          </div>
          <div>
            <div className="mb-2">
              {/* <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">RoomMateX</p> */}
              <h2 className="text-2xl font-bold text-ink mt-0">{title}</h2>
              {subtitle && <p className="mt-1.5 text-xs leading-5 text-stone-500">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  </main>
)

export default AuthLayout
