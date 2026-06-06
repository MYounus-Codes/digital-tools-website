"use client"
import { useState } from 'react'

const conversions = {
  length: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    in: 39.3701,
    ft: 3.28084
  },
  weight: {
    kg: 1,
    g: 1000,
    lb: 2.20462,
    oz: 35.274
  }
}

export default function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight'>('length')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('km')
  const [value, setValue] = useState(1)

  const convert = () => {
    const table = (conversions as any)[category]
    const base = value / table[from]
    return base * table[to]
  }

  const options = Object.keys((conversions as any)[category])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <select value={category} onChange={(e) => { setCategory(e.target.value as any); setFrom(Object.keys((conversions as any)[e.target.value])[0]); setTo(Object.keys((conversions as any)[e.target.value])[1]) }} className="p-2 border rounded">
          <option value="length">Length</option>
          <option value="weight">Weight</option>
        </select>

        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="p-2 border rounded" />

        <div className="flex gap-2">
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="p-2 border rounded flex-1">
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="p-2 border rounded flex-1">
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4 p-4 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Result</div>
        <div className="text-2xl font-bold">{convert()}</div>
      </div>
    </div>
  )
}
