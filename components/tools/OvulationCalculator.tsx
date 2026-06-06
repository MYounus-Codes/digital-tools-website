"use client"
import { useMemo, useState } from 'react'

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState('2026-06-01')
  const [cycle, setCycle] = useState(28)

  const result = useMemo(() => {
    const start = new Date(lmp)
    const ovulation = new Date(start)
    ovulation.setDate(start.getDate() + cycle - 14)
    const fertileStart = new Date(ovulation)
    fertileStart.setDate(ovulation.getDate() - 5)
    const fertileEnd = new Date(ovulation)
    fertileEnd.setDate(ovulation.getDate() + 1)
    return { ovulation, fertileStart, fertileEnd }
  }, [lmp, cycle])

  return (
    <div>
      <label className="block text-sm">Last period date</label>
      <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full p-2 border rounded" />
      <label className="block text-sm mt-2">Cycle length (days)</label>
      <input type="number" value={cycle} onChange={(e) => setCycle(Number(e.target.value))} className="w-full p-2 border rounded" />
      <div className="mt-4 p-3 border rounded text-sm space-y-1">
        <div>Predicted ovulation: {result.ovulation.toLocaleDateString()}</div>
        <div>Fertile window: {result.fertileStart.toLocaleDateString()} - {result.fertileEnd.toLocaleDateString()}</div>
      </div>
    </div>
  )
}
