import Link from 'next/link'
import { tools } from '../../lib/tools-registry'

export default function ToolsIndexPage() {
  const categoryEntries = Array.from(
    tools.reduce((map, tool) => {
      const current = map.get(tool.categorySlug) || { slug: tool.categorySlug, name: tool.category, tools: [] as any[] }
      current.tools.push(tool)
      map.set(tool.categorySlug, current)
      return map
    }, new Map<string, { slug: string; name: string; tools: any[] }>()).values()
  )

  return (
    <div className="space-y-8">
      <div>
        <div className="section-kicker">All tools</div>
        <h1 className="section-title mt-2">Browse tools by category</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryEntries.map((cat) => (
          <div key={cat.slug} className="site-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-extrabold uppercase tracking-[0.24em] text-[var(--brand-primary)]">{cat.tools.length} tools</div>
                <h3 className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{cat.name}</h3>
              </div>
              <Link href={`/${cat.slug}`} className="ml-4 inline-flex items-center rounded-full border border-[var(--border)] bg-white/70 px-3 py-2 text-sm font-semibold text-[var(--text-primary)]">View</Link>
            </div>

            <div className="mt-4 grid gap-2">
              {cat.tools.map((t) => (
                <Link key={t.slug} href={`/${t.categorySlug}/${t.slug}`} className="block rounded-md px-3 py-2 text-sm hover:bg-[rgba(37,99,235,0.04)]">{t.title}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
