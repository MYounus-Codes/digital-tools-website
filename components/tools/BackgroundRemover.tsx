"use client"
import { useState, useRef, useCallback } from 'react'

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File | null) => {
    setFile(f)
    setResultUrl(null)
    setError(null)
    if (!f) { setPreview(null); return }
    setPreview(URL.createObjectURL(f))
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f?.type.startsWith('image/')) handleFile(f)
  }, [handleFile])

  const removeBg = async () => {
    if (!file) return
    setProcessing(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('image_file', file)
      const res = await fetch('/api/remove-bg', { method: 'POST', body: fd })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Failed to remove background' }))
        throw new Error(err.error || 'Failed to remove background')
      }
      setResultUrl(URL.createObjectURL(await res.blob()))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div
        className={`tool-card p-5 md:p-6 transition-colors ${dragOver ? 'border-blue-500 bg-blue-50/50' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="w-full lg:max-w-md"
          />
          <span className="text-sm text-[var(--text-muted)]">or drag & drop an image</span>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="tool-card p-4">
          <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">Original</div>
          {preview ? (
            <img src={preview} alt="original" className="mt-3 max-w-full rounded-[1.25rem]" />
          ) : (
            <div className="mt-3 rounded-[1.25rem] border border-dashed border-[var(--border)] p-6 text-[var(--text-muted)]">No image selected</div>
          )}
        </div>
        <div className="tool-card p-4">
          <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">Result</div>
          {resultUrl ? (
            <img src={resultUrl} alt="result" className="mt-3 max-w-full rounded-[1.25rem]" />
          ) : (
            <div className="mt-3 rounded-[1.25rem] border border-dashed border-[var(--border)] p-6 text-[var(--text-muted)]">No output yet</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={removeBg}
          disabled={!file || processing}
          className="rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)] disabled:opacity-50"
        >
          {processing ? 'Processing...' : 'Remove Background'}
        </button>
        {resultUrl && (
          <a
            href={resultUrl}
            download="background-removed.png"
            className="rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]"
          >
            Download
          </a>
        )}
      </div>
    </div>
  )
}
