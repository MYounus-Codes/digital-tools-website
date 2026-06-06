"use client"
import { useState } from 'react'

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null)
  const [width, setWidth] = useState(800)
  const [output, setOutput] = useState<string | null>(null)

  const resize = async () => {
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.src = url
    await img.decode()
    const ratio = width / img.width
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = Math.round(img.height * ratio)
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    setOutput(canvas.toDataURL(file.type || 'image/png'))
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="p-2 border rounded" />
        <button onClick={resize} className="px-4 py-2 bg-[var(--brand-primary)] text-black rounded">Resize</button>
      </div>
      {output && <img src={output} alt="resized" className="mt-4 max-w-full border rounded" />}
    </div>
  )
}
