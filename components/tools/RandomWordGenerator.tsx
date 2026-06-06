"use client"
import { useMemo, useState } from 'react'

const pool = ['atlas', 'binary', 'cipher', 'delta', 'ember', 'flux', 'glow', 'harbor', 'ionic', 'jolt', 'knit', 'lumen', 'mosaic', 'nova']

export default function RandomWordGenerator() {
  const [count, setCount] = useState(10)
  const words = useMemo(() => Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]), [count])

  return (
    <div>
      <label className="block text-sm">Count</label>
      <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-2 border rounded" />
      <div className="mt-4 p-3 border rounded text-sm leading-7">{words.join(' • ')}</div>
    </div>
  )
}
