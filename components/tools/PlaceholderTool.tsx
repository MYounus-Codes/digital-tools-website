import { Clock, Construction, Rocket } from 'lucide-react'

export default function PlaceholderTool({ slug }: { slug: string }) {
  const name = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--brand-primary)]/10 blur-xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)]/10 to-cyan-500/10 border border-[var(--border)]">
          <Construction className="h-10 w-10 text-[var(--brand-primary)]" />
        </div>
      </div>

      <h3 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
        {name}
      </h3>

      <p className="mt-3 max-w-md text-sm font-semibold text-[var(--text-muted)] leading-relaxed">
        We&apos;re building something awesome. This tool is currently under development
        and will be available soon with full functionality.
      </p>

      <div className="mt-8 flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
        <Clock className="h-4 w-4" />
        Launching Soon
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {['Fast', 'Private', 'Free'].map((tag) => (
          <div
            key={tag}
            className="rounded-full border border-[var(--border)] bg-white/60 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
        <Rocket className="h-3.5 w-3.5" />
        Stay tuned — we notify you when it&apos;s ready
      </div>
    </div>
  )
}
