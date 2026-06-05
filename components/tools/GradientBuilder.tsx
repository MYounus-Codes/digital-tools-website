"use client"
import { useMemo, useState } from 'react'

export default function GradientBuilder() {
  const [angle, setAngle] = useState(135)
  const [start, setStart] = useState('#4f46e5')
  const [end, setEnd] = useState('#06b6d4')

  const background = useMemo(() => `linear-gradient(${angle}deg, ${start}, ${end})`, [angle, start, end])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block text-sm">Angle<input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" /></label>
        <label className="block text-sm">Start<input type="color" value={start} onChange={(e) => setStart(e.target.value)} className="w-full h-10 p-1 border rounded" /></label>
        <label className="block text-sm">End<input type="color" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full h-10 p-1 border rounded" /></label>
      </div>
      <div className="mt-4 h-40 rounded border" style={{ background }} />
      <div className="mt-3 p-3 border rounded font-mono text-sm break-all">background: {background};</div>
    </div>
  )
}
