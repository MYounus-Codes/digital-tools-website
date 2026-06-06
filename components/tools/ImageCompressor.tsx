"use client"
import { useState } from 'react'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [quality, setQuality] = useState(0.8)
  const [outputUrl, setOutputUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleFile = (f: File | null) => {
    setFile(f)
    setOutputUrl(null)
    if (!f) { setPreview(null); return }
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  const compress = async () => {
    if (!file) return
    setProcessing(true)
    try {
      const lib = await import('browser-image-compression')
      const compressed = await lib.default(file, { maxSizeMB: 1, initialQuality: quality })
      const url = URL.createObjectURL(compressed)
      setOutputUrl(url)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} className="w-full lg:max-w-md" />
          <div className="rounded-full bg-[rgba(37,99,235,0.08)] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Quality: {(quality * 100).toFixed(0)}%</div>
          <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="flex-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="tool-card p-4">
          <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">Original</div>
          {preview ? <img src={preview} alt="orig" className="mt-3 max-w-full rounded-[1.25rem]" /> : <div className="mt-3 rounded-[1.25rem] border border-dashed border-[var(--border)] p-6 text-[var(--text-muted)]">No image selected</div>}
        </div>
        <div className="tool-card p-4">
          <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">Compressed</div>
          {outputUrl ? <img src={outputUrl} alt="out" className="mt-3 max-w-full rounded-[1.25rem]" /> : <div className="mt-3 rounded-[1.25rem] border border-dashed border-[var(--border)] p-6 text-[var(--text-muted)]">No output yet</div>}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={compress} disabled={!file || processing} className="rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)]">{processing ? 'Processing...' : 'Compress'}</button>
        {outputUrl && <a href={outputUrl} download="compressed.jpg" className="rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Download</a>}
      </div>
    </div>
  )
}
