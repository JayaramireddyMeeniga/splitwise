const AuthLayout = ({ children, title = 'Welcome to RoomMateX', subtitle }) => (
  <main className="grid min-h-screen bg-ink text-white lg:grid-cols-[1.05fr_0.95fr]">
    <section className="relative overflow-hidden p-8 md:p-12">
      <div className="absolute inset-0 opacity-20 ledger-grid" />
      <div className="relative flex min-h-full flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-ink text-lg font-black">
            RX
          </div>
          <p className="text-xl font-black">RoomMateX</p>
        </div>
        <div className="max-w-xl py-16">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-mint">expense clarity</p>
          <h1 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
            Shared rooms, clean money stories.
          </h1>
          <p className="mt-5 text-base leading-7 text-white/68">
            Track rent, wallet balance, reimbursements, and settlements without the monthly confusion.
          </p>
        </div>
      </div>
    </section>
    <section className="grid place-items-center bg-canvas p-5 text-ink">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.22)] md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black">{title}</h2>
          {subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  </main>
)

export default AuthLayout
