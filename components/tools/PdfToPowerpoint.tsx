"use client"
import { useState } from 'react'
import * as pdfjs from 'pdfjs-dist'
import PptxGenJS from 'pptxgenjs'
import { Upload, Download, FileText, Loader2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
}

export default function PdfToPowerpoint() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')
  const [outputUrl, setOutputUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleFile = (f: File | null) => {
    setFile(f)
    setOutputUrl(null)
    setError('')
  }

  const convert = async () => {
    if (!file) return
    setError('')
    setLoading(true)
    setProgress('Loading PDF...')
    try {
      const buffer = await file.arrayBuffer()
      const pdf = await pdfjs.getDocument({ data: buffer }).promise
      const pres = new PptxGenJS()
      pres.layout = 'LAYOUT_WIDE'
      const slideW = 13.33
      const slideH = 7.5

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`)
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        ctx.clearRect(0, 0, viewport.width, viewport.height)

        const renderCtx = { canvasContext: ctx, viewport }
        await page.render(renderCtx).promise

        const dataUrl = canvas.toDataURL('image/png')
        const slide = pres.addSlide()
        slide.addImage({ data: dataUrl, x: 0, y: 0, w: slideW, h: slideH })
      }

      setProgress('Generating PowerPoint...')
      const blob = await pres.write({ outputType: 'blob' }) as Blob
      setOutputUrl(URL.createObjectURL(blob))
    } catch {
      setError('Conversion failed. Make sure the PDF is valid and try again.')
    } finally {
      setLoading(false)
      setProgress('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
          {file && (
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white/60 p-3 text-sm">
              <FileText className="w-5 h-5 text-[var(--brand-primary)]" />
              <span className="font-medium text-[var(--text-primary)]">{file.name}</span>
              <span className="ml-auto text-[var(--text-muted)]">{(file.size / 1024).toFixed(1)} KB</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
      )}

      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={convert}
          disabled={loading || !file}
          className="rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <><Loader2 size={16} className="inline animate-spin mr-1" /> Converting...</> : 'Convert to PowerPoint'}
        </button>
        {loading && progress && (
          <span className="text-sm text-[var(--text-muted)]">{progress}</span>
        )}
        {outputUrl && (
          <a
            href={outputUrl}
            download="converted.pptx"
            className="rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[rgba(37,99,235,0.06)]"
          >
            <Download className="inline-block w-4 h-4 -mt-0.5 mr-1.5" />
            Download PPTX
          </a>
        )}
      </div>
    </div>
  )
}
