"use client"
import { useState } from 'react'
import { Upload, Download, FileText, Loader2, Table2 } from 'lucide-react'
import * as XLSX from 'xlsx'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export default function ExcelToPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [rows, setRows] = useState<string[][]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleFile = (f: File | null) => {
    setFile(f)
    setRows([])
    setHeaders([])
    setError(null)
    setDone(false)
  }

  const parseExcel = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const buf = await file.arrayBuffer()
      const wb = XLSX.read(buf, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const data: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 })
      if (!data.length) throw new Error('Sheet is empty')
      setHeaders(data[0].map((c: any) => String(c)))
      setRows(data.slice(1).map((r: any[]) => r.map((c: any) => c !== undefined ? String(c) : '')))
    } catch (e: any) {
      setError(e.message || 'Failed to read Excel file')
    } finally {
      setLoading(false)
    }
  }

  const convertToPdf = async () => {
    if (!headers.length) return
    setLoading(true)
    setError(null)
    setDone(false)
    try {
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontSize = 9
      const margin = 40
      const lineHeight = 16
      const pageHeight = 792

      const allRows = [headers, ...rows]
      const colCount = Math.min(headers.length, 8)
      const colWidths: number[] = Array(colCount).fill(60)
      for (const row of allRows) {
        row.slice(0, colCount).forEach((cell, ci) => {
          const textWidth = font.widthOfTextAtSize(cell, fontSize)
          colWidths[ci] = Math.max(colWidths[ci], textWidth + 10)
        })
      }
      const totalWidth = colWidths.reduce((a, b) => a + b, 0)
      const pageWidth = margin * 2 + totalWidth

      let page = pdfDoc.addPage([pageWidth, pageHeight])
      let y = pageHeight - margin

      const drawRow = (cells: string[], isHeader: boolean) => {
        if (y - lineHeight < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight])
          y = pageHeight - margin
        }
        let x = margin
        cells.slice(0, colCount).forEach((cell, ci) => {
          const cw = colWidths[ci]
          page.drawRectangle({ x, y: y - lineHeight + 2, width: cw - 2, height: lineHeight - 2, borderColor: rgb(0.8, 0.8, 0.8), borderWidth: 0.5 })
          page.drawText(cell, { x: x + 3, y: y - lineHeight + 5, size: fontSize, font, color: isHeader ? rgb(0.2, 0.2, 0.2) : rgb(0, 0, 0) })
          x += cw
        })
        y -= lineHeight
      }

      drawRow(headers, true)
      for (const row of rows) {
        drawRow(row, false)
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([Uint8Array.from(pdfBytes)], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (file?.name?.replace(/\.xlsx?$/i, '') || 'export') + '.pdf'
      a.click()
      URL.revokeObjectURL(url)
      setDone(true)
    } catch (e: any) {
      setError(e.message || 'Failed to create PDF')
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
            {file ? file.name : 'Upload Excel file'}
          </span>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={parseExcel}
          disabled={!file || loading}
          className="rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]"
        >
          {loading ? <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> : <Table2 className="mr-2 inline h-4 w-4" />}
          Preview Data
        </button>
        {headers.length > 0 && (
          <button
            onClick={convertToPdf}
            disabled={loading}
            className="rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black shadow-[0_16px_34px_rgba(37,99,235,0.24)]"
          >
            {loading ? <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> : <FileText className="mr-2 inline h-4 w-4" />}
            Convert to PDF
          </button>
        )}
      </div>

      {error && (
        <div className="tool-card p-4 text-sm font-semibold text-[var(--danger)]">{error}</div>
      )}

      {headers.length > 0 && (
        <div>
          <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
            Data Preview ({rows.length} rows)
          </div>
          <div className="tool-card overflow-x-auto p-0">
            <table className="w-full text-left text-sm font-semibold text-[var(--text-primary)]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {headers.slice(0, 8).map((h, i) => (
                    <th key={i} className="px-4 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 20).map((row, ri) => (
                  <tr key={ri} className="border-b border-[var(--border)] last:border-none">
                    {row.slice(0, 8).map((cell, ci) => (
                      <td key={ci} className="px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 20 && (
              <div className="px-4 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Showing 20 of {rows.length} rows
              </div>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="text-sm font-semibold text-[var(--brand-primary)]">
          <Download className="mr-2 inline h-4 w-4" />
          PDF downloaded successfully!
        </div>
      )}
    </div>
  )
}
