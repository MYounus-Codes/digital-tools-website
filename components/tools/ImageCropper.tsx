"use client"
import { useState } from 'react'

export default function ImageCropper() {
  const [file, setFile] = useState<File | null>(null)
  const [output, setOutput] = useState<string | null>(null)

  const crop = async () => {
    if (!file) return
    const img = new Image()
    img.src = URL.createObjectURL(file)
    await img.decode()
    const size = Math.min(img.width, img.height)
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size)
    setOutput(canvas.toDataURL(file.type || 'image/png'))
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={crop} className="ml-2 px-4 py-2 bg-[var(--brand-primary)] text-black rounded">Crop center square</button>
      {output && <img src={output} alt="cropped" className="mt-4 max-w-full border rounded" />}
    </div>
  )
}
