"use client"
import { useMemo, useState } from 'react'

export default function BorderRadiusBuilder() {
  const [r1, setR1] = useState(24)
  const [r2, setR2] = useState(24)
  const [r3, setR3] = useState(24)
  const [r4, setR4] = useState(24)

  const radius = useMemo(() => `${r1}px ${r2}px ${r3}px ${r4}px`, [r1, r2, r3, r4])

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <label>TL<input type="range" min={0} max={100} value={r1} onChange={(e) => setR1(Number(e.target.value))} className="w-full" /></label>
        <label>TR<input type="range" min={0} max={100} value={r2} onChange={(e) => setR2(Number(e.target.value))} className="w-full" /></label>
        <label>BR<input type="range" min={0} max={100} value={r3} onChange={(e) => setR3(Number(e.target.value))} className="w-full" /></label>
        <label>BL<input type="range" min={0} max={100} value={r4} onChange={(e) => setR4(Number(e.target.value))} className="w-full" /></label>
      </div>
      <div className="mt-4 h-40 bg-[var(--brand-primary)]" style={{ borderRadius: `${r1}px ${r2}px ${r3}px ${r4}px` }} />
      <div className="mt-3 p-3 border rounded font-mono text-sm break-all">border-radius: {radius};</div>
    </div>
  )
}
