"use client"
import { useState } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import { Upload, Download, FileText, X } from 'lucide-react'

export default function PowerpointToPdf() {
  const [images, setImages] = useState<{ file: File; url: string }[]>([])
  const [pptxFile, setPptxFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleImages = (files: FileList | null) => {
    if (!files) return
    setPdfUrl(null)
    setError('')
    const newImages = Array.from(files).map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }))
    setImages((prev) => [...prev, ...newImages])
  }

  const handlePptx = async (f: File | null) => {
    setPptxFile(f)
    setPdfUrl(null)
    setError('')
    if (!f) return
    try {
      const zip = new Uint8Array(await f.arrayBuffer())
      const extracted = await extractImagesFromPptx(zip)
      if (extracted.length > 0) {
        setImages((prev) => [...prev, ...extracted.map((b) => ({ file: new File([Uint8Array.from(b)], 'slide.png'), url: URL.createObjectURL(new Blob([Uint8Array.from(b)], { type: 'image/png' })) }))])
      }
    } catch {
      setError('Could not extract images from the PPTX file. Try uploading slide images directly.')
    }
  }

  const removeImage = (idx: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].url)
      return prev.filter((_, i) => i !== idx)
    })
    setPdfUrl(null)
  }

  const createPdf = async () => {
    if (images.length === 0) {
      setError('Please add at least one image.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const pdfDoc = await PDFDocument.create()

      for (const { url } of images) {
        const imgData = await fetch(url).then((r) => r.arrayBuffer())
        const img = /\.jpe?g$/i.test(url) ? await pdfDoc.embedJpg(imgData) : await pdfDoc.embedPng(imgData)
        const { width, height } = img.scale(1)
        const page = pdfDoc.addPage([width, height])
        page.drawImage(img, { x: 0, y: 0, width, height })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([Uint8Array.from(pdfBytes)], { type: 'application/pdf' })
      setPdfUrl(URL.createObjectURL(blob))
    } catch {
      setError('Failed to create PDF. Try different images.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)] mb-2 block">
              Upload Slide Images (PNG/JPEG)
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              multiple
              onChange={(e) => handleImages(e.target.files)}
              className="w-full text-sm"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs font-semibold text-[var(--text-muted)]">or</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)] mb-2 block">
              Upload PPTX File
            </label>
            <input
              type="file"
              accept=".pptx"
              onChange={(e) => handlePptx(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
            {pptxFile && (
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white/60 p-3 text-sm">
                <FileText className="w-5 h-5 text-[var(--brand-primary)]" />
                <span className="font-medium text-[var(--text-primary)]">{pptxFile.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="tool-card p-5 md:p-6">
          <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)] mb-3">
            Slides ({images.length})
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.url}
                  alt={`Slide ${idx + 1}`}
                  className="w-full aspect-[4/3] object-cover rounded-xl border border-[var(--border)]"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="mt-1 text-xs text-center text-[var(--text-muted)]">Slide {idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={createPdf}
          disabled={loading || images.length === 0}
          className="rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating PDF...' : 'Create PDF'}
        </button>
        {pdfUrl && (
          <a
            href={pdfUrl}
            download="presentation.pdf"
            className="rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[rgba(37,99,235,0.06)]"
          >
            <Download className="inline-block w-4 h-4 -mt-0.5 mr-1.5" />
            Download PDF
          </a>
        )}
      </div>
    </div>
  )
}

async function extractImagesFromPptx(zipData: Uint8Array): Promise<Uint8Array[]> {
  const JSZip = (await import('jszip')).default
  const zip = await JSZip.loadAsync(zipData)
  const images: Uint8Array[] = []
  const entries = zip.filter((relPath) => /^ppt\/media\//i.test(relPath) && /\.(png|jpg|jpeg|gif|bmp)$/i.test(relPath))
  for (const entry of entries) {
    const data = await entry.async('uint8array')
    images.push(data)
  }
  return images
}
