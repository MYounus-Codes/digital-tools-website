"use client"
import { useMemo, useState } from 'react'

function countStats(text: string) {
  const chars = text.length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentences = (text.match(/[.!?]+/g) || []).length
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0)
  const readingMinutes = words / 200
  return { chars, words, sentences, paragraphs, readingMinutes }
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const stats = useMemo(() => countStats(text), [text])

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="tool-card h-48 w-full p-4 text-sm font-medium" placeholder="Paste your text here" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="tool-card p-4"><div className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">Words</div><div className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{stats.words}</div></div>
        <div className="tool-card p-4"><div className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">Characters</div><div className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{stats.chars}</div></div>
        <div className="tool-card p-4"><div className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">Sentences</div><div className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{stats.sentences}</div></div>
        <div className="tool-card p-4"><div className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">Reading Time</div><div className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{stats.readingMinutes.toFixed(2)} min</div></div>
      </div>
    </div>
  )
}
