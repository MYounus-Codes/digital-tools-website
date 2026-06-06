"use client"
import { useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { Upload, Download, FileText, Type, Loader2 } from 'lucide-react'

interface StyledRun {
  text: string
  bold: boolean
  italic: boolean
  fontSize: number
}

interface ParsedParagraph {
  runs: StyledRun[]
  alignment: 'left' | 'center' | 'right'
  spacingBefore: number
  spacingAfter: number
}

function parseDocx(buffer: ArrayBuffer): ParsedParagraph[] {
  const parser = new DOMParser()
  const xml = parser.parseFromString(new TextDecoder().decode(buffer), 'text/xml')
  const ns = (prefix: string): string => {
    const map: Record<string, string> = {
      w: 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    }
    return map[prefix] || ''
  }

  const paragraphs: ParsedParagraph[] = []
  const pNodes = xml.getElementsByTagNameNS(ns('w'), 'p')
  for (let pi = 0; pi < pNodes.length; pi++) {
    const pNode = pNodes[pi]
    const pPr = pNode.getElementsByTagNameNS(ns('w'), 'pPr')[0]
    const jc = pPr?.getElementsByTagNameNS(ns('w'), 'jc')[0]
    const align = jc?.getAttributeNS(ns('w'), 'val') as 'left' | 'center' | 'right' || 'left'
    const spacing = pPr?.getElementsByTagNameNS(ns('w'), 'spacing')[0]
    const spacingBefore = parseInt(spacing?.getAttributeNS(ns('w'), 'before') || '0') / 20 || 0
    const spacingAfter = parseInt(spacing?.getAttributeNS(ns('w'), 'after') || '0') / 20 || 0

    const runs: StyledRun[] = []
    const rNodes = pNode.getElementsByTagNameNS(ns('w'), 'r')
    for (let ri = 0; ri < rNodes.length; ri++) {
      const rNode = rNodes[ri]
      const rPr = rNode.getElementsByTagNameNS(ns('w'), 'rPr')[0]
      const bold = !!rPr?.getElementsByTagNameNS(ns('w'), 'b')[0]
      const italic = !!rPr?.getElementsByTagNameNS(ns('w'), 'i')[0]
      const szNode = rPr?.getElementsByTagNameNS(ns('w'), 'sz')[0]
      const fontSize = parseInt(szNode?.getAttributeNS(ns('w'), 'val') || '24') / 2 || 12
      const tNodes = rNode.getElementsByTagNameNS(ns('w'), 't')
      const text = Array.from(tNodes).map(n => n.textContent || '').join('')
      if (text.trim()) {
        runs.push({ text, bold, italic, fontSize })
      }
    }
    if (runs.length > 0) {
      paragraphs.push({ runs, alignment: align, spacingBefore, spacingAfter })
    }
  }
  return paragraphs
}

export default function WordToPdf() {
  const [mode, setMode] = useState<'text' | 'file'>('text')
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleFile = (f: File | null) => {
    setFile(f)
    setPdfUrl(null)
    setError('')
  }

  const convert = async () => {
    setError('')
    setLoading(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)
      const fontBoldItalic = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique)

      const margin = 54
      const pageWidth = 612
      const pageHeight = 792
      const maxWidth = pageWidth - margin * 2

      let page = pdfDoc.addPage([pageWidth, pageHeight])
      let y = pageHeight - margin

      const drawText = (runs: StyledRun[], align: 'left' | 'center' | 'right', lineHeight: number) => {
        if (y - lineHeight < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight])
          y = pageHeight - margin
        }
        const totalWidth = runs.reduce((w, r) => w + getFont(r).widthOfTextAtSize(r.text, r.fontSize), 0)
        let x = margin
        if (align === 'center') x = margin + (maxWidth - totalWidth) / 2
        else if (align === 'right') x = margin + maxWidth - totalWidth

        for (const run of runs) {
          const font = getFont(run)
          page.drawText(run.text, { x, y: y - lineHeight + 4, size: run.fontSize, font, color: rgb(0, 0, 0) })
          x += font.widthOfTextAtSize(run.text, run.fontSize)
        }
        y -= lineHeight
      }

      const getFont = (run: StyledRun) => {
        if (run.bold && run.italic) return fontBoldItalic
        if (run.bold) return fontBold
        if (run.italic) return fontItalic
        return fontNormal
      }

      if (mode === 'text' && text.trim()) {
        const baseLines = text.split('\n')
        for (const line of baseLines) {
          if (line === '') { y -= 8; continue }
          const words = line.split(' ')
          const runs: StyledRun[] = words.map(w => ({ text: w + ' ', bold: false, italic: false, fontSize: 12 }))
          drawText(runs, 'left', 16)
        }
      } else if (mode === 'file' && file) {
        const buf = await file.arrayBuffer()
        const name = file.name.toLowerCase()
        if (name.endsWith('.docx')) {
          const JSZip = (await import('jszip')).default
          const zip = await JSZip.loadAsync(buf)
          const docFile = zip.file('word/document.xml')
          if (!docFile) throw new Error('No document.xml found in DOCX')
          const xmlStr = await docFile.async('string')
          const paragraphs = parseDocx(new TextEncoder().encode(xmlStr).buffer)

          for (const para of paragraphs) {
            const fontSize = para.runs.reduce((max, r) => Math.max(max, r.fontSize), 12)
            const lineHeight = fontSize * 1.4
            if (para.spacingBefore > 0) y -= para.spacingBefore
            if (y - lineHeight < margin) {
              page = pdfDoc.addPage([pageWidth, pageHeight])
              y = pageHeight - margin
            }
            drawText(para.runs, para.alignment, lineHeight)
            if (para.spacingAfter > 0) y -= para.spacingAfter
          }
        } else {
          const content = new TextDecoder().decode(buf)
          const baseLines = content.split('\n')
          for (const line of baseLines) {
            if (line === '') { y -= 8; continue }
            const words = line.split(' ')
            const runs: StyledRun[] = words.map(w => ({ text: w + ' ', bold: false, italic: false, fontSize: 12 }))
            drawText(runs, 'left', 16)
          }
        }
      } else {
        throw new Error('No content to convert')
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([Uint8Array.from(pdfBytes)], { type: 'application/pdf' })
      setPdfUrl(URL.createObjectURL(blob))
    } catch (e: any) {
      setError(e.message || 'Conversion failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-5 md:p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => { setMode('text'); setPdfUrl(null); setError('') }}
            className={`rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.22em] transition-colors ${
              mode === 'text'
                ? 'bg-[var(--brand-primary)] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)]'
                : 'bg-[rgba(37,99,235,0.08)] text-[var(--text-primary)]'
            }`}
          >
            <Type className="inline-block w-4 h-4 -mt-0.5 mr-1.5" />
            Paste Text
          </button>
          <button
            onClick={() => { setMode('file'); setPdfUrl(null); setError('') }}
            className={`rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.22em] transition-colors ${
              mode === 'file'
                ? 'bg-[var(--brand-primary)] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)]'
                : 'bg-[rgba(37,99,235,0.08)] text-[var(--text-primary)]'
            }`}
          >
            <Upload className="inline-block w-4 h-4 -mt-0.5 mr-1.5" />
            Upload File
          </button>
        </div>

        {mode === 'text' ? (
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setPdfUrl(null) }}
            placeholder="Type or paste your text here..."
            className="w-full h-48 rounded-xl border border-[var(--border)] bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          />
        ) : (
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept=".docx,.txt"
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
        )}
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convert}
          disabled={loading || (mode === 'file' && !file) || (mode === 'text' && !text.trim())}
          className="rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_16px_34px_rgba(37,99,235,0.24)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <><Loader2 size={16} className="inline animate-spin mr-1" /> Converting...</> : 'Convert to PDF'}
        </button>
        {pdfUrl && (
          <a
            href={pdfUrl}
            download="document.pdf"
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
