"use client"
import { useMemo, useState } from 'react'

export default function RegexTester() {
  const [pattern, setPattern] = useState('(free)')
  const [flags, setFlags] = useState('gi')
  const [text, setText] = useState('Free online tools are free and fast.')

  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags)
      return Array.from(text.matchAll(re)).map((m) => m[0])
    } catch {
      return ['Invalid regex']
    }
  }, [pattern, flags, text])

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="p-2 border rounded font-mono" />
        <input value={flags} onChange={(e) => setFlags(e.target.value)} className="p-2 border rounded font-mono" />
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-2 w-full h-28 p-2 border rounded" />
      <div className="mt-4 p-3 border rounded text-sm break-all">{result.join(', ')}</div>
    </div>
  )
}
