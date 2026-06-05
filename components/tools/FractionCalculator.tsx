"use client"
import { useMemo, useState } from 'react'

function parseFraction(input: string) {
  const [whole, frac] = input.trim().split(' ')
  if (frac && frac.includes('/')) {
    const [n, d] = frac.split('/').map(Number)
    return Number(whole) + n / d
  }
  if (input.includes('/')) {
    const [n, d] = input.split('/').map(Number)
    return n / d
  }
  return Number(input)
}

function toFraction(value: number) {
  const tolerance = 1e-10
  let denominator = 1
  while (Math.abs(Math.round(value * denominator) / denominator - value) > tolerance && denominator < 1000) denominator++
  const numerator = Math.round(value * denominator)
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a))
  const divisor = gcd(numerator, denominator)
  return `${numerator / divisor}/${denominator / divisor}`
}

export default function FractionCalculator() {
  const [a, setA] = useState('1/2')
  const [b, setB] = useState('1/4')
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+')

  const result = useMemo(() => {
    const x = parseFraction(a)
    const y = parseFraction(b)
    if (!Number.isFinite(x) || !Number.isFinite(y)) return 'Invalid input'
    const value = op === '+' ? x + y : op === '-' ? x - y : op === '*' ? x * y : x / y
    return `${value.toFixed(6)} (${toFraction(value)})`
  }, [a, b, op])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input value={a} onChange={(e) => setA(e.target.value)} className="p-2 border rounded font-mono" />
        <select value={op} onChange={(e) => setOp(e.target.value as any)} className="p-2 border rounded">
          <option>+</option>
          <option>-</option>
          <option>*</option>
          <option>/</option>
        </select>
        <input value={b} onChange={(e) => setB(e.target.value)} className="p-2 border rounded font-mono" />
      </div>
      <div className="mt-4 p-4 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Result</div>
        <div className="text-xl font-bold break-all">{result}</div>
      </div>
    </div>
  )
}
