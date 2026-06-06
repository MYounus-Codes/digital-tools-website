"use client"
import { useMemo, useState } from 'react'

export default function BoxShadowBuilder() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(10)
  const [blur, setBlur] = useState(20)
  const [spread, setSpread] = useState(0)
  const [opacity, setOpacity] = useState(0.25)

  const shadow = useMemo(() => `${x}px ${y}px ${blur}px ${spread}px rgba(15, 23, 42, ${opacity})`, [x, y, blur, spread, opacity])

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
        <label>X<input type="range" min={-50} max={50} value={x} onChange={(e) => setX(Number(e.target.value))} className="w-full" /></label>
        <label>Y<input type="range" min={-50} max={50} value={y} onChange={(e) => setY(Number(e.target.value))} className="w-full" /></label>
        <label>Blur<input type="range" min={0} max={80} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full" /></label>
        <label>Spread<input type="range" min={-40} max={40} value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full" /></label>
        <label>Opacity<input type="range" min={0} max={1} step={0.01} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full" /></label>
      </div>
      <div className="mt-4 p-8 rounded bg-white border" style={{ boxShadow: shadow }}>Shadow preview</div>
      <div className="mt-3 p-3 border rounded font-mono text-sm break-all">box-shadow: {shadow};</div>
    </div>
  )
}
