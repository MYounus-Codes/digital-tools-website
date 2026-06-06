"use client"
import { useMemo, useState } from 'react'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function SlugGenerator() {
  const [text, setText] = useState('Free Online Tools Website')
  const slug = useMemo(() => slugify(text), [text])

  return (
    <div>
      <label className="block text-sm">Title text</label>
      <input value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 border rounded" />
      <div className="mt-4 p-3 border rounded font-mono text-sm break-all">{slug}</div>
    </div>
  )
}
