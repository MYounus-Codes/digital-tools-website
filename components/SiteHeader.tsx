"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(248,250,255,0.88)] backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-primary)] text-lg font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.28)]">T</span>
          <span className="min-w-0">
            <span className="block font-display text-xl leading-none text-[var(--text-primary)] md:text-2xl">ToolNest</span>
            <span className="block truncate text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] md:text-xs">Fast, private, smooth</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] md:flex">
          <Link href="/" className="transition hover:text-[var(--text-primary)]">Home</Link>
          <Link href="/tools" className="transition hover:text-[var(--text-primary)]">Tools</Link>
          <Link href="/blog" className="transition hover:text-[var(--text-primary)]">Blog</Link>
          <Link href="/faqs" className="transition hover:text-[var(--text-primary)]">FAQs</Link>
          <Link href="/contact" className="transition hover:text-[var(--text-primary)]">Contact</Link>
          <Link href="/about" className="transition hover:text-[var(--text-primary)]">About</Link>
        </nav>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 text-[var(--text-primary)] shadow-[0_10px_24px_rgba(15,23,42,0.06)] md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-[var(--border)] bg-[rgba(248,250,255,0.98)] px-4 py-4 md:hidden">
          <div className="mx-auto max-w-5xl space-y-4">
            <div className="grid gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">Home</Link>
              <Link href="/tools" onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">Tools</Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">Blog</Link>
              <Link href="/faqs" onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">FAQs</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">Contact</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">About</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
