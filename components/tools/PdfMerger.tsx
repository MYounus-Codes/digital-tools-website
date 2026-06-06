"use client"
import { useState } from 'react'
import { Upload, X, FileText, Check, AlertCircle, Loader2 } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

interface PdfFile {
  file: File
  id: string
}

let idCounter = 0

export default function PdfMerger() {
  const [files, setFiles] = useState<PdfFile[]>([])
  const [merging, setMerging] = useState(false)
  const [mergedUrl, setMergedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return
    setError(null)
    setMergedUrl(null)
    const newFiles: PdfFile[] = []
    for (const f of incoming) {
      if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) continue
      newFiles.push({ file: f, id: String(++idCounter) })
    }
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    setMergedUrl(null)
  }

  const mergePdfs = async () => {
    if (files.length < 2) return
    setMerging(true)
    setError(null)
    setMergedUrl(null)
    try {
      const mergedPdf = await PDFDocument.create()
      for (const { file } of files) {
        const bytes = await file.arrayBuffer()
        const pdf = await PDFDocument.load(bytes)
        const indices = pdf.getPageIndices()
        const copied = await mergedPdf.copyPages(pdf, indices)
        copied.forEach((p: any) => mergedPdf.addPage(p))
      }
      const mergedBytes = await mergedPdf.save()
      const blob = new Blob([Uint8Array.from(mergedBytes)], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setMergedUrl(url)
    } catch (err: any) {
      setError(err.message || 'Failed to merge PDFs')
    } finally {
      setMerging(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        <label className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] p-8 transition-colors hover:border-[var(--brand-primary)]">
          <Upload size={28} className="text-[var(--brand-primary)]" />
          <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Upload PDF files</span>
          <span className="text-xs text-[var(--text-muted)]">or drag & drop them here</span>
          <input type="file" multiple accept=".pdf" onChange={(e) => addFiles(e.target.files)} className="hidden" />
        </label>
      </div>

      {files.length > 0 && (
        <div className="tool-card p-5 md:p-6">
          <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
            Selected files ({files.length})
          </div>
          <ul className="space-y-2">
            {files.map(({ file, id }) => (
              <li key={id} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] px-4 py-3">
                <div className="flex items-center gap-3 truncate">
                  <FileText size={16} className="shrink-0 text-[var(--brand-primary)]" />
                  <span className="truncate text-sm font-semibold text-[var(--text-primary)]">{file.name}</span>
                  <span className="shrink-0 text-xs text-[var(--text-muted)]">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
                <button onClick={() => removeFile(id)} className="shrink-0 rounded-full p-1 text-[var(--text-muted)] hover:bg-red-50 hover:text-red-600">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={mergePdfs}
          disabled={files.length < 2 || merging}
          className="primary-pill disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {merging ? (
            <><Loader2 size={16} className="animate-spin" /> Merging…</>
          ) : (
            <><Upload size={16} /> Merge PDFs</>
          )}
        </button>
        {mergedUrl && (
          <a
            href={mergedUrl}
            download="merged.pdf"
            className="secondary-pill"
          >
            <Check size={16} className="text-green-600" />
            Download merged PDF
          </a>
        )}
        {files.length > 0 && (
          <button
            onClick={() => { setFiles([]); setMergedUrl(null); setError(null) }}
            className="secondary-pill text-[var(--text-muted)]"
          >
            <X size={16} />
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}
