"use client"
import { useState } from 'react'

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png')
  const [output, setOutput] = useState<string | null>(null)

  const convert = async () => {
    if (!file) return
    const img = new Image()
    img.src = URL.createObjectURL(file)
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    setOutput(canvas.toDataURL(format))
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <div className="mt-2 flex gap-2 flex-wrap">
        <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="p-2 border rounded">
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WebP</option>
        </select>
        <button onClick={convert} className="px-4 py-2 bg-[var(--brand-primary)] text-black rounded">Convert</button>
      </div>
      {output && <img src={output} alt="converted" className="mt-4 max-w-full border rounded" />}
    </div>
  )
}
