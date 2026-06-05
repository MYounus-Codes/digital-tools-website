"use client"
import { useMemo, useState } from 'react'

export default function DuplicateRemover() {
  const [text, setText] = useState('apple\nbanana\napple\npear\nbanana')

  const uniqueLines = useMemo(() => Array.from(new Set(text.split(/\r?\n/).filter(Boolean))), [text])

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 p-2 border rounded" />
      <div className="mt-4 p-3 border rounded text-sm whitespace-pre-line">{uniqueLines.join('\n')}</div>
      <div className="mt-2 text-sm text-[var(--text-muted)]">Removed {text.split(/\r?\n/).filter(Boolean).length - uniqueLines.length} duplicate lines.</div>
    </div>
  )
}
