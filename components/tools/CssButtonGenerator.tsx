"use client"
import { useMemo, useState } from 'react'

export default function CssButtonGenerator() {
  const [label, setLabel] = useState('Click Me')
  const [radius, setRadius] = useState(12)
  const [bg, setBg] = useState('#4f46e5')
  const [fg, setFg] = useState('#ffffff')

  const css = useMemo(() => `.btn { background: ${bg}; color: ${fg}; border-radius: ${radius}px; padding: 0.75rem 1.25rem; border: none; }`, [bg, fg, radius])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input value={label} onChange={(e) => setLabel(e.target.value)} className="p-2 border rounded" />
        <label className="block text-sm">Radius<input type="range" min={0} max={40} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full" /></label>
        <label className="block text-sm">BG<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10 p-1 border rounded" /></label>
      </div>
      <div className="mt-4 inline-block" style={{ background: bg, color: fg, borderRadius: radius, padding: '0.75rem 1.25rem' }}>{label}</div>
      <div className="mt-3 p-3 border rounded font-mono text-sm break-all">{css}</div>
    </div>
  )
}
