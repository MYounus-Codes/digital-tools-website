"use client"
import { useMemo, useState } from 'react'

export default function CalorieCalculator() {
  const [age, setAge] = useState(30)
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(175)
  const [activity, setActivity] = useState(1.2)

  const calories = useMemo(() => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5
    return Math.round(bmr * activity)
  }, [age, weight, height, activity])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border rounded" />
          <label className="block text-sm mt-2">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border rounded" />
          <label className="block text-sm mt-2">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border rounded" />
          <label className="block text-sm mt-2">Activity</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full p-2 border rounded">
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Lightly active</option>
            <option value={1.55}>Moderately active</option>
            <option value={1.725}>Very active</option>
          </select>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-[var(--text-muted)]">Estimated daily calories</div>
          <div className="text-3xl font-bold">{calories} kcal</div>
          <div className="mt-2 text-sm text-[var(--text-muted)]">Use this as a starting point for maintenance or weight goals.</div>
        </div>
      </div>
    </div>
  )
}
