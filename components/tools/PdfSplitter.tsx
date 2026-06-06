"use client"
import { useState } from 'react'
import { Upload, X, Download, FileText, Check, AlertCircle, Loader2 } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set())
  const [selectAll, setSelectAll] = useState(true)
  const [splitting, setSplitting] = useState(false)
  const [splitResults, setSplitResults] = useState<{ page: number; url: string }[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (f: File | null) => {
    setFile(f)
    setSplitResults(null)
    setError(null)
    if (!f) { setPageCount(0); setSelectedPages(new Set()); return }
    try {
      const bytes = await f.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const count = pdf.getPageCount()
      setPageCount(count)
      setSelectedPages(new Set(Array.from({ length: count }, (_, i) => i)))
      setSelectAll(true)
    } catch {
      setError('Could not read PDF file. Please upload a valid PDF.')
      setPageCount(0)
    }
  }

  const togglePage = (idx: number) => {
    setSelectedPages(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      setSelectAll(false)
      return next
    })
  }

  const toggleAll = () => {
    if (selectAll) {
      setSelectedPages(new Set())
      setSelectAll(false)
    } else {
      setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i)))
      setSelectAll(true)
    }
  }

  const downloadPage = (page: number, url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `page_${page + 1}.pdf`
    a.click()
  }

  const downloadAll = async () => {
    if (!splitResults) return
    for (const { page, url } of splitResults) {
      downloadPage(page, url)
      await new Promise(r => setTimeout(r, 300))
    }
  }

  const splitPdf = async () => {
    if (!file || selectedPages.size === 0) return
    setSplitting(true)
    setError(null)
    setSplitResults(null)
    try {
      const bytes = await file.arrayBuffer()
      const srcPdf = await PDFDocument.load(bytes)
      const results: { page: number; url: string }[] = []
      const sorted = [...selectedPages].sort((a, b) => a - b)
      for (const idx of sorted) {
        const newPdf = await PDFDocument.create()
        const [copied] = await newPdf.copyPages(srcPdf, [idx])
        newPdf.addPage(copied)
        const pdfBytes = await newPdf.save()
        const blob = new Blob([Uint8Array.from(pdfBytes)], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        results.push({ page: idx, url })
      }
      setSplitResults(results)
    } catch (err: any) {
      setError(err.message || 'Failed to split PDF')
    } finally {
      setSplitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        {!file ? (
          <label className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] p-8 transition-colors hover:border-[var(--brand-primary)]">
            <Upload size={28} className="text-[var(--brand-primary)]" />
            <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Upload PDF</span>
            <span className="text-xs text-[var(--text-muted)]">Select a PDF file to split into individual pages</span>
            <input type="file" accept=".pdf" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} className="hidden" />
          </label>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 truncate">
              <FileText size={20} className="shrink-0 text-[var(--brand-primary)]" />
              <div className="truncate">
                <div className="truncate text-sm font-semibold text-[var(--text-primary)]">{file.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{(file.size / 1024).toFixed(1)} KB &middot; {pageCount} page{pageCount !== 1 ? 's' : ''}</div>
              </div>
            </div>
            <button
              onClick={() => handleFile(null)}
              className="shrink-0 rounded-full p-2 text-[var(--text-muted)] hover:bg-red-50 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {pageCount > 0 && (
        <div className="tool-card p-5 md:p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
              Select pages ({selectedPages.size} of {pageCount})
            </span>
            <button onClick={toggleAll} className="text-xs font-bold text-[var(--brand-primary)] hover:underline">
              {selectAll ? 'Deselect all' : 'Select all'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => togglePage(i)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                  selectedPages.has(i)
                    ? 'bg-[var(--brand-primary)] text-black'
                    : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--brand-primary)]'
                }`}
              >
                {i + 1}
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

      <div className="flex flex-wrap gap-3">
        <button
          onClick={splitPdf}
          disabled={!file || selectedPages.size === 0 || splitting}
          className="primary-pill disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {splitting ? (
            <><Loader2 size={16} className="animate-spin" /> Splitting…</>
          ) : (
            <><Upload size={16} /> Split PDF</>
          )}
        </button>
        {splitResults && splitResults.length > 0 && (
          <>
            <button onClick={downloadAll} className="primary-pill">
              <Download size={16} /> Download all ({splitResults.length})
            </button>
          </>
        )}
      </div>

      {splitResults && splitResults.length > 0 && (
        <div className="tool-card p-5 md:p-6">
          <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
            Split results
          </div>
          <ul className="space-y-2">
            {splitResults.map(({ page, url }) => (
              <li key={page} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-[var(--brand-primary)]" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Page {page + 1}</span>
                </div>
                <button
                  onClick={() => downloadPage(page, url)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 transition-colors"
                >
                  <Download size={14} />
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
