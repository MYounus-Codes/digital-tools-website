"use client"

import { useMemo, useState } from 'react'
import { faqItems } from '../../lib/faqs'

const allCategories = ['All', ...Array.from(new Set(faqItems.map((faq) => faq.category)))]

export default function FaqsClient() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return faqItems.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
      const matchesQuery =
        !normalizedQuery ||
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery) ||
        faq.category.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategory])

  return (
    <div className="space-y-8 pb-6">
      <section className="site-card overflow-hidden px-6 py-6 md:px-8 md:py-8">
        <div className="section-kicker">FAQs</div>
        <h1 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}>Find answers fast.</h1>
        <p className="section-copy mt-4 max-w-3xl text-sm sm:text-base">
          Browse common questions about ToolNest, including calculators, SEO tools, image tools, developer utilities, and text tools. Search by keyword or filter by topic to jump straight to what you need.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <label className="block">
            <span className="sr-only">Search FAQs</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions, tool names, or categories..."
              className="w-full rounded-[1.1rem] px-4 py-3 text-sm sm:text-base"
            />
          </label>

          <div className="text-sm font-semibold text-[var(--text-muted)]">
            Showing {filteredFaqs.length} of {faqItems.length} FAQs
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedCategory === category ? 'bg-[var(--brand-primary)] text-white shadow-[0_12px_28px_rgba(37,99,235,0.18)]' : 'border border-[var(--border)] bg-white/80 text-[var(--text-primary)] hover:bg-white'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <details key={`${faq.category}-${faq.question}`} className="rounded-[1.25rem] border border-[var(--border)] bg-white/85 px-5 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[var(--text-primary)] sm:text-lg">
                <span className="mr-3 rounded-full bg-[rgba(37,99,235,0.08)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
                  {faq.category}
                </span>
                {faq.question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)] sm:text-base sm:leading-8">
                {faq.answer}
              </p>
            </details>
          ))
        ) : (
          <div className="site-card px-6 py-8 text-center text-[var(--text-muted)]">
            No FAQs match your current filter.
          </div>
        )}
      </section>
    </div>
  )
}
