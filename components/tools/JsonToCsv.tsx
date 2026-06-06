"use client"
import { useState } from 'react'

function flatten(obj: any, prefix = ''): any {
  const out: Record<string, unknown> = {}
  for (const k in obj) {
    const val = obj[k]
    const key = prefix ? `${prefix}.${k}` : k
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(out, flatten(val, key))
    } else {
      out[key] = val
    }
  }
  return out
}

export default function JsonToCsv() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [csv, setCsv] = useState('')

  const convert = () => {
    setError(null)
    try {
      const data = JSON.parse(input)
      if (!Array.isArray(data)) throw new Error('Expected a JSON array of objects')
      const rows: Record<string, unknown>[] = data.map((r) => flatten(r))
      const headers = Array.from(rows.reduce((s, r) => { Object.keys(r).forEach((k) => s.add(k)); return s }, new Set<string>()))
      const lines = [headers.join(',')]
      for (const r of rows) {
        lines.push(headers.map((h) => {
          const v = r[h] ?? ''
          const cell = String(v).replace(/"/g, '""')
          return `"${cell}"
` + ''
        }).join(','))
      }
      const out = lines.join('\n')
      setCsv(out)
    } catch (e: any) {
      setError(e.message || 'Invalid JSON')
      setCsv('')
    }
  }

  const download = () => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Paste JSON array here' className="tool-card h-40 w-full p-4 text-sm font-medium" />
      <div className="flex flex-wrap gap-3">
        <button onClick={convert} className="rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black">Convert</button>
        <button onClick={() => { setInput('') ; setCsv(''); setError(null) }} className="rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Clear</button>
        {csv && <button onClick={download} className="rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Download CSV</button>}
      </div>
      {error && <div className="text-sm font-semibold text-[var(--danger)]">{error}</div>}
      {csv && <pre className="tool-card mt-4 overflow-auto p-4 text-sm font-mono font-semibold text-[var(--text-primary)]">{csv}</pre>}
    </div>
  )
}
