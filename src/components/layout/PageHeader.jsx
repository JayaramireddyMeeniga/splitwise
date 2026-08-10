const PageHeader = ({ eyebrow, title, description, actions, meta }) => (
  <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      {eyebrow && (
        <p className="mb-2 text-xs font-black uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-black tracking-normal text-ink md:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">{description}</p>}
      {meta && <div className="mt-4 flex flex-wrap gap-2">{meta}</div>}
    </div>
    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
  </header>
)

export default PageHeader
