"use client"
import { useMemo, useState } from 'react'

export default function RetirementCalculator() {
  const [current, setCurrent] = useState(25000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(6)
  const [years, setYears] = useState(20)

  const projected = useMemo(() => {
    let balance = current
    const r = rate / 100 / 12
    const months = years * 12
    for (let i = 0; i < months; i++) balance = balance * (1 + r) + monthly
    return Math.round(balance)
  }, [current, monthly, rate, years])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Current savings</label>
          <input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="w-full p-2 border rounded" />
          <label className="block text-sm mt-2">Monthly contribution</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full p-2 border rounded" />
          <label className="block text-sm mt-2">Annual return (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-2 border rounded" />
          <label className="block text-sm mt-2">Years until retirement</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-[var(--text-muted)]">Projected retirement fund</div>
          <div className="text-3xl font-bold">${projected.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
