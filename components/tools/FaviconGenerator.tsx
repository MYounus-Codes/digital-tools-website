"use client"
import { useMemo, useState } from 'react'

export default function FaviconGenerator() {
  const [text, setText] = useState('T')
  const [bg, setBg] = useState('#ffffff')
  const [fg, setFg] = useState('#4f46e5')

  const dataUrl = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 64, 64)
    ctx.fillStyle = fg
    ctx.font = 'bold 36px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text.slice(0, 2), 32, 34)
    return canvas.toDataURL('image/png')
  }, [text, bg, fg])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input value={text} onChange={(e) => setText(e.target.value)} className="p-2 border rounded" />
        <label className="block text-sm">BG<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10 p-1 border rounded" /></label>
        <label className="block text-sm">FG<input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-10 p-1 border rounded" /></label>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <img src={dataUrl} alt="favicon preview" className="w-16 h-16 border rounded" />
        <a href={dataUrl} download="favicon.png" className="px-4 py-2 border rounded">Download PNG</a>
      </div>
    </div>
  )
}
