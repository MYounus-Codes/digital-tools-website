"use client"
import { useState } from 'react'

export default function BmiCalculator() {
  const [weight, setWeight] = useState(70) // kg
  const [height, setHeight] = useState(175) // cm

  const bmi = (weight / ((height / 100) ** 2))
  let category = 'Underweight'
  if (bmi >= 18.5 && bmi < 25) category = 'Normal (healthy weight)'
  if (bmi >= 25 && bmi < 30) category = 'Overweight'
  if (bmi >= 30) category = 'Obesity'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>

        <div>
          <div className="p-4 border rounded">
            <div className="text-sm text-[var(--text-muted)]">BMI</div>
            <div className="text-3xl font-bold">{bmi.toFixed(1)}</div>
            <div className="mt-2">Category: <strong>{category}</strong></div>
            <div className="mt-2 text-sm text-[var(--text-muted)]">BMI is a screening tool and does not account for muscle mass.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
