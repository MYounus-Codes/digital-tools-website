import Link from 'next/link'
import { tools } from '../../lib/tools-registry'

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params
  const items = tools.filter((t) => t.categorySlug === category)

  if (items.length === 0) {
    return (
      <div className="site-card mx-auto max-w-4xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Category not found</h1>
        <p className="mt-2 text-[var(--text-muted)]">No tools found for {category}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-6">
      <section className="site-card overflow-hidden px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <div className="section-kicker">Category</div>
            <h1 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}>{items[0].category}</h1>
            <p className="section-copy mt-4 max-w-2xl">A curated set of smooth, focused tools in one place. Each tool opens in the same calm interface, with clear spacing and consistent controls.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="stat-card">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Tools</div>
              <div className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">{items.length}</div>
            </div>
            <div className="stat-card">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Focus</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Fast workflows</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-kicker">Tools inside</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((t) => (
            <Link key={t.slug} href={`/${t.categorySlug}/${t.slug}`} className="site-card group p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="text-3xl">{t.icon}</div>
                <div className="flex gap-1.5 shrink-0">
                  {t.isHot && (
                    <span className="rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)]">Hot</span>
                  )}
                  {t.isPopular && (
                    <span className="rounded-full bg-[rgba(217,242,90,0.28)] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-primary)]">Popular</span>
                  )}
                  {(t.isFree !== false) && (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-emerald-600">Free</span>
                  )}
                </div>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]">{t.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{t.description}</p>
              <div className="mt-5 inline-flex items-center rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--text-primary)]">Open tool</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
