"use client"
import { useMemo, useState } from 'react'

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70)
  const [activity, setActivity] = useState('moderate')

  const intake = useMemo(() => {
    const factor = activity === 'low' ? 30 : activity === 'high' ? 40 : 35
    return Math.round(weight * factor)
  }, [weight, activity])

  return (
    <div>
      <label className="block text-sm">Weight (kg)</label>
      <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border rounded" />
      <label className="block text-sm mt-2">Activity level</label>
      <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-2 border rounded">
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
      </select>
      <div className="mt-4 p-3 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Recommended daily water intake</div>
        <div className="text-3xl font-bold">{intake} ml</div>
      </div>
    </div>
  )
}
