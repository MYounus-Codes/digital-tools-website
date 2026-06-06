"use client"
import { useState } from 'react'
import { Upload, Download, Check, AlertCircle, Loader2, Settings, X } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

type Level = 'low' | 'medium' | 'high'

const LEVELS: { key: Level; label: string; desc: string }[] = [
  { key: 'low', label: 'Low', desc: 'Minimal optimization' },
  { key: 'medium', label: 'Medium', desc: 'Object stream compression enabled' },
  { key: 'high', label: 'High', desc: 'Full recompression + object streams' },
]

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [level, setLevel] = useState<Level>('medium')
  const [compressing, setCompressing] = useState(false)
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (f: File | null) => {
    setFile(f)
    setCompressedUrl(null)
    setError(null)
    setCompressedSize(0)
    if (f) setOriginalSize(f.size)
  }

  const clearFile = () => {
    setFile(null)
    setCompressedUrl(null)
    setError(null)
    setCompressedSize(0)
  }

  const compress = async () => {
    if (!file) return
    setCompressing(true)
    setError(null)
    setCompressedUrl(null)
    try {
      const bytes = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      })

      let compressedBytes: Uint8Array

      if (level === 'low') {
        compressedBytes = await pdfDoc.save()
      } else if (level === 'medium') {
        compressedBytes = await pdfDoc.save({ useObjectStreams: true })
      } else {
        const cleaner = await PDFDocument.create()
        const indices = pdfDoc.getPageIndices()
        const copied = await cleaner.copyPages(pdfDoc, indices)
        copied.forEach((p: any) => cleaner.addPage(p))
        compressedBytes = await cleaner.save({ useObjectStreams: true })
      }

      const blob = new Blob([Uint8Array.from(compressedBytes)], { type: 'application/pdf' })
      setCompressedSize(blob.size)
      const url = URL.createObjectURL(blob)
      setCompressedUrl(url)
    } catch (err: any) {
      setError(err.message || 'Failed to compress PDF')
    } finally {
      setCompressing(false)
    }
  }

  const savings = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        {!file ? (
          <label className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] p-8 transition-colors hover:border-[var(--brand-primary)]">
            <Upload size={28} className="text-[var(--brand-primary)]" />
            <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Upload PDF</span>
            <span className="text-xs text-[var(--text-muted)]">Choose a PDF file to compress</span>
            <input type="file" accept=".pdf" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} className="hidden" />
          </label>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 truncate">
              <div className="rounded-xl bg-[var(--brand-primary)]/10 p-2">
                <Upload size={18} className="text-[var(--brand-primary)]" />
              </div>
              <div className="truncate">
                <div className="truncate text-sm font-semibold text-[var(--text-primary)]">{file.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{formatSize(originalSize)}</div>
              </div>
            </div>
            <button onClick={clearFile} className="shrink-0 rounded-full p-1 text-[var(--text-muted)] hover:bg-red-50 hover:text-red-600">
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {file && (
        <div className="tool-card p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
            <Settings size={14} />
            Compression level
          </div>
          <div className="grid grid-cols-3 gap-3">
            {LEVELS.map(({ key, label, desc }) => (
              <button
                key={key}
                onClick={() => setLevel(key)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  level === key
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                    : 'border-[var(--border)] hover:border-[var(--brand-primary)]'
                }`}
              >
                <div className={`text-sm font-extrabold uppercase tracking-[0.22em] ${
                  level === key ? 'text-[var(--brand-primary)]' : 'text-[var(--text-primary)]'
                }`}>{label}</div>
                <div className="mt-1 text-xs text-[var(--text-muted)]">{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={compress}
          disabled={!file || compressing}
          className="primary-pill disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {compressing ? (
            <><Loader2 size={16} className="animate-spin" /> Compressing…</>
          ) : (
            <><Upload size={16} /> Compress</>
          )}
        </button>
        {compressedUrl && (
          <a href={compressedUrl} download={`compressed_${file?.name || 'output.pdf'}`} className="primary-pill">
            <Download size={16} /> Download compressed PDF
          </a>
        )}
      </div>

      {compressedUrl && compressedSize > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="stat-card">
            <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--text-muted)]">Original</div>
            <div className="mt-1 text-lg font-bold text-[var(--text-primary)]">{formatSize(originalSize)}</div>
          </div>
          <div className="stat-card">
            <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--text-muted)]">Compressed</div>
            <div className="mt-1 text-lg font-bold text-green-600">{formatSize(compressedSize)}</div>
          </div>
          <div className="stat-card">
            <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--text-muted)]">Saved</div>
            <div className="mt-1 flex items-center gap-2 text-lg font-bold text-[var(--brand-primary)]">
              <Check size={18} />
              {savings}%
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
