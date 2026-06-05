"use client"
import { useMemo, useState } from 'react'

export default function DateDifference() {
  const [start, setStart] = useState('2026-01-01')
  const [end, setEnd] = useState('2026-06-05')

  const diff = useMemo(() => {
    const a = new Date(start)
    const b = new Date(end)
    const ms = Math.abs(b.getTime() - a.getTime())
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))
    return { days, weeks: Math.floor(days / 7), months: Math.floor(days / 30), years: Math.floor(days / 365) }
  }, [start, end])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Start date</label>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">End date</label>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full p-2 border rounded" />
        </div>
      </div>
      <div className="mt-4 p-4 border rounded">
        <div className="text-2xl font-bold">{diff.days} days</div>
        <div className="mt-2 text-sm text-[var(--text-muted)]">{diff.weeks} weeks · {diff.months} months · {diff.years} years</div>
      </div>
    </div>
  )
}
