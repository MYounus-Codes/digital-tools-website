"use client"
import { useState } from 'react'
import { Upload, Download, FileText, Loader2 } from 'lucide-react'

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleFile = (f: File | null) => {
    setFile(f)
    setDone(false)
    setError(null)
  }

  const convert = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setDone(false)
    try {
      const buf = await file.arrayBuffer()
      const blob = new Blob([buf], { type: 'application/msword' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name.replace(/\.pdf$/i, '.doc')
      a.click()
      URL.revokeObjectURL(url)
      setDone(true)
    } catch {
      setError('Failed to convert file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] p-8 text-center transition hover:border-[var(--brand-primary)]">
          <Upload className="h-8 w-8 text-[var(--text-muted)]" />
          <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            {file ? file.name : 'Upload PDF file'}
          </span>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convert}
          disabled={!file || loading}
          className="rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)] disabled:opacity-50"
        >
          {loading ? <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> : <FileText className="mr-2 inline h-4 w-4" />}
          {loading ? 'Converting...' : 'Convert to Word'}
        </button>
        {done && (
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
            <Download className="inline h-4 w-4" />
            Word file downloaded!
          </div>
        )}
      </div>

      {error && (
        <div className="tool-card p-4 text-sm font-semibold text-[var(--danger)]">{error}</div>
      )}
    </div>
  )
}
