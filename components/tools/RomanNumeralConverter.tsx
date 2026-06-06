"use client"
import { useMemo, useState } from 'react'

const romanMap = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
] as const

function toRoman(num: number) {
  let n = Math.max(1, Math.floor(num))
  let out = ''
  for (const [val, sym] of romanMap) while (n >= val) { out += sym; n -= val }
  return out
}

function fromRoman(roman: string) {
  let i = 0
  let total = 0
  const s = roman.toUpperCase()
  for (const [val, sym] of romanMap) {
    while (s.slice(i, i + sym.length) === sym) { total += val; i += sym.length }
  }
  return total
}

export default function RomanNumeralConverter() {
  const [number, setNumber] = useState(1987)
  const [roman, setRoman] = useState('MCMLXXXVII')

  const romanOut = useMemo(() => toRoman(number), [number])
  const numberOut = useMemo(() => fromRoman(roman), [roman])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm">Integer</label>
        <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} className="w-full p-2 border rounded" />
        <div className="mt-3 p-3 border rounded font-mono text-lg">{romanOut}</div>
      </div>
      <div>
        <label className="block text-sm">Roman numeral</label>
        <input value={roman} onChange={(e) => setRoman(e.target.value)} className="w-full p-2 border rounded font-mono" />
        <div className="mt-3 p-3 border rounded text-lg">{numberOut || '—'}</div>
      </div>
    </div>
  )
}
