"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { tools } from '../lib/tools-registry'

export default function NavMegaDropdown() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  const categories = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; tools: any[] }>()
    for (const t of tools) {
      const cur = map.get(t.categorySlug) || { slug: t.categorySlug, name: t.category, tools: [] }
      cur.tools.push(t)
      map.set(t.categorySlug, cur)
    }
    return Array.from(map.values())
  }, [])

  useEffect(() => {
    if (!active && categories.length > 0) {
      setActive(categories[0].slug)
    }
  }, [active, categories])

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 transition hover:text-[var(--text-primary)] md:hidden"
      >
        Categories
      </button>

      <div className="group relative hidden md:block">
        <button type="button" className="inline-flex items-center gap-2 transition hover:text-[var(--text-primary)]">
          Categories
        </button>

        <div className="invisible absolute left-0 top-full z-50 mt-3 w-[720px] translate-y-1 rounded-[1.4rem] border border-[rgba(37,99,235,0.10)] bg-white/95 p-4 opacity-0 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="grid grid-cols-[0.9fr_1.2fr] gap-4">
            <div className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(245,248,255,0.95),rgba(238,244,255,0.96))] p-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onMouseEnter={() => setActive(cat.slug)}
                  onFocus={() => setActive(cat.slug)}
                  className={`flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left transition ${active === cat.slug ? 'bg-white text-[var(--text-primary)] shadow-[0_10px_24px_rgba(15,23,42,0.08)]' : 'text-[var(--text-muted)] hover:bg-white/70 hover:text-[var(--text-primary)]'}`}
                >
                  <span>
                    <span className="block text-sm font-semibold">{cat.name}</span>
                    <span className="block text-xs text-[var(--text-muted)]">{cat.tools.length} tools</span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary)]">View</span>
                </button>
              ))}
            </div>

            <div className="rounded-[1.2rem] bg-white p-2">
              <div className="grid max-h-[380px] grid-cols-2 gap-2 overflow-auto pr-1">
                {categories
                  .find((cat) => cat.slug === active)
                  ?.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.categorySlug}/${tool.slug}`}
                      className="rounded-[0.9rem] border border-[rgba(37,99,235,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,248,255,0.96))] px-3 py-3 text-sm font-medium text-[var(--text-primary)] shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.16)] hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
                    >
                      {tool.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(92vw,24rem)] rounded-xl bg-white p-4 shadow-lg md:hidden">
          {categories.map((cat) => (
            <details key={cat.slug} className="mb-2">
              <summary className="cursor-pointer font-semibold">{cat.name} <span className="text-sm text-[var(--text-muted)] ml-2">{cat.tools.length} tools</span></summary>
              <div className="mt-2 grid gap-1">
                {cat.tools.map((t) => (
                  <Link key={t.slug} href={`/${t.categorySlug}/${t.slug}`} className="block rounded-md px-2 py-1 hover:bg-[rgba(37,99,235,0.04)]">{t.title}</Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  )
}
