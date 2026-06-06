"use client"
import { useState } from 'react'

function mifflinStJeor(sex: string, weightKg: number, heightCm: number, age: number) {
  if (sex === 'male') return 10 * weightKg + 6.25 * heightCm - 5 * age + 5
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161
}

export default function TdeeCalculator() {
  const [sex, setSex] = useState('male')
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(175)
  const [age, setAge] = useState(30)
  const [activity, setActivity] = useState(1.2)

  const bmr = mifflinStJeor(sex, weight, height, age)
  const tdee = Math.round(bmr * activity)

  const macros = {
    protein: Math.round((0.3 * tdee) / 4),
    carbs: Math.round((0.45 * tdee) / 4),
    fat: Math.round((0.25 * tdee) / 9)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Sex</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full p-2 border rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label className="block text-sm mt-2">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Activity</label>
          <select value={String(activity)} onChange={(e) => setActivity(Number(e.target.value))} className="w-full p-2 border rounded">
            <option value={1.2}>Sedentary (little or no exercise)</option>
            <option value={1.375}>Lightly active (1–3 days/week)</option>
            <option value={1.55}>Moderately active (3–5 days/week)</option>
            <option value={1.725}>Very active (6–7 days/week)</option>
            <option value={1.9}>Extra active (very hard exercise)</option>
          </select>
        </div>

        <div>
          <div className="p-4 border rounded">
            <div className="text-sm text-[var(--text-muted)]">Estimated TDEE</div>
            <div className="text-3xl font-bold">{tdee} kcal/day</div>
            <div className="mt-4">
              <div className="text-sm">Suggested Macros</div>
              <ul className="mt-2">
                <li>Protein: {macros.protein} g/day</li>
                <li>Carbs: {macros.carbs} g/day</li>
                <li>Fat: {macros.fat} g/day</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
