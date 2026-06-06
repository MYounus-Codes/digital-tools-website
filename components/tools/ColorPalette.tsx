"use client"
import { useState } from 'react'

function randomHex() { return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0') }

export default function ColorPalette() {
  const [colors, setColors] = useState<string[]>(() => Array.from({ length: 5 }, randomHex))
  const [locks, setLocks] = useState<boolean[]>(() => Array.from({ length: 5 }, () => false))

  const generate = () => setColors((c) => c.map((col, i) => (locks[i] ? col : randomHex())))
  const toggleLock = (i: number) => setLocks((l) => l.map((v, idx) => (idx === i ? !v : v)))
  const exportCss = () => navigator.clipboard.writeText(colors.map((c, i) => `--color-${i + 1}: ${c};`).join('\n'))

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {colors.map((c, i) => (
          <div key={i} className="p-4 rounded" style={{ background: c }}>
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">{c}</div>
              <button onClick={() => toggleLock(i)} className="text-white bg-black/30 px-2 py-1 rounded">{locks[i] ? '🔒' : '🔓'}</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={generate} className="px-4 py-2 bg-[var(--brand-primary)] text-black rounded">Generate</button>
        <button onClick={exportCss} className="px-4 py-2 border rounded">Copy CSS Vars</button>
      </div>
    </div>
  )
}
