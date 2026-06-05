"use client"
import { useMemo, useState } from 'react'

const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor']

function makeText(count: number) {
  return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(' ')
}

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(50)
  const text = useMemo(() => makeText(count), [count])

  return (
    <div>
      <label className="block text-sm">Word count</label>
      <input type="number" min={5} max={500} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-2 border rounded" />
      <div className="mt-4 p-3 border rounded text-sm leading-6">{text}</div>
    </div>
  )
}
