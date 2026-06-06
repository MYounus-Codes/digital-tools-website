"use client"
import { useMemo, useState } from 'react'

export default function DueDateCalculator() {
  const [lmp, setLmp] = useState('2026-06-01')

  const dueDate = useMemo(() => {
    const d = new Date(lmp)
    d.setDate(d.getDate() + 280)
    return d
  }, [lmp])

  return (
    <div>
      <label className="block text-sm">Last menstrual period</label>
      <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full p-2 border rounded" />
      <div className="mt-4 p-3 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Estimated due date</div>
        <div className="text-2xl font-bold">{dueDate.toLocaleDateString()}</div>
      </div>
    </div>
  )
}
