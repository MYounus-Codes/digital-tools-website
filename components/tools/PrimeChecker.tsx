"use client"
import { useMemo, useState } from 'react'

function isPrime(n: number) {
  if (n < 2 || !Number.isInteger(n)) return false
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false
  return true
}

function factorize(n: number) {
  const factors: number[] = []
  let x = Math.abs(n)
  for (let d = 2; d * d <= x; d++) {
    while (x % d === 0) {
      factors.push(d)
      x /= d
    }
  }
  if (x > 1) factors.push(x)
  return factors.length ? factors.join(' × ') : String(n)
}

export default function PrimeChecker() {
  const [value, setValue] = useState(97)
  const prime = useMemo(() => isPrime(value), [value])

  return (
    <div>
      <label className="block text-sm">Number</label>
      <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full p-2 border rounded" />
      <div className="mt-4 p-4 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Prime?</div>
        <div className="text-2xl font-bold">{prime ? 'Yes' : 'No'}</div>
        <div className="mt-2 text-sm">Factorization: {factorize(value)}</div>
      </div>
    </div>
  )
}
