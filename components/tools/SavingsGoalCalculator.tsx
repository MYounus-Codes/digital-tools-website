"use client"
import { useMemo, useState } from 'react'

export default function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(10000)
  const [months, setMonths] = useState(12)

  const perMonth = useMemo(() => {
    if (months <= 0) return 0
    return goal / months
  }, [goal, months])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Savings goal</label>
          <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} className="w-full p-2 border rounded" />
          <label className="block text-sm mt-2">Timeline (months)</label>
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-[var(--text-muted)]">Required monthly savings</div>
          <div className="text-3xl font-bold">${perMonth.toFixed(2)}</div>
          <div className="mt-2 text-sm text-[var(--text-muted)]">Save this amount every month to reach your goal.</div>
        </div>
      </div>
    </div>
  )
}
