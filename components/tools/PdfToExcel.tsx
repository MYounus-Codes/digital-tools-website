"use client"
import { useState } from 'react'
import { Upload, Download, FileText, Loader2, Table2 } from 'lucide-react'
import * as pdfjs from 'pdfjs-dist'
import * as XLSX from 'xlsx'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
}

interface TextBlock {
  text: string
  x: number
  y: number
  width: number
}

function groupIntoRows(blocks: TextBlock[]): TextBlock[][] {
  const sorted = [...blocks].sort((a, b) => {
    const yDiff = b.y - a.y
    return Math.abs(yDiff) < 3 ? a.x - b.x : yDiff
  })
  const rows: TextBlock[][] = []
  const yThreshold = 5
  for (const block of sorted) {
    const existing = rows.find(r => Math.abs(r[0].y - block.y) < yThreshold)
    if (existing) {
      existing.push(block)
      existing.sort((a, b) => a.x - b.x)
    } else {
      rows.push([block])
    }
  }
  return rows.sort((a, b) => b[0].y - a[0].y)
}

function splitIntoColumns(row: TextBlock[], pageWidth: number): string[] {
  if (row.length === 0) return ['']
  if (row.length === 1) return [row[0].text]

  const avgWidth = row.reduce((s, b) => s + b.width, 0) / row.length
  const gapThreshold = Math.max(avgWidth * 1.5, 15)

  const cols: string[] = [row[0].text]
  for (let i = 1; i < row.length; i++) {
    const gap = row[i].x - (row[i - 1].x + row[i - 1].width)
    if (gap > gapThreshold) {
      cols.push(row[i].text)
    } else {
      cols[cols.length - 1] += ' ' + row[i].text
    }
  }
  return cols
}

export default function PdfToExcel() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [preview, setPreview] = useState<{ sheets: string[][][]; sheetsCount: number } | null>(null)

  const handleFile = (f: File | null) => {
    setFile(f)
    setDone(false)
    setError(null)
    setPreview(null)
  }

  const convert = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setDone(false)
    setPreview(null)
    try {
      const buf = await file.arrayBuffer()
      const data = await pdfjs.getDocument(buf).promise
      const allSheets: string[][][] = []

      for (let p = 1; p <= data.numPages; p++) {
        const page = await data.getPage(p)
        const textContent = await page.getTextContent()
        const viewport = page.getViewport({ scale: 1 })
        const pageHeight = viewport.height

        const blocks: TextBlock[] = textContent.items.map((item: any) => ({
          text: item.str,
          x: item.transform[4],
          y: pageHeight - item.transform[5],
          width: item.width,
        }))

        if (blocks.length === 0) continue

        const rows = groupIntoRows(blocks)
        const maxCols = Math.max(...rows.map(r => r.length))
        if (maxCols < 2) {
          allSheets.push(rows.map(r => [r.map(b => b.text).join(' ')]))
          continue
        }

        const sheet: string[][] = rows.map(row => {
          const cols = splitIntoColumns(row, viewport.width)
          return cols
        })
        allSheets.push(sheet)
      }

      if (allSheets.length === 0) throw new Error('No extractable content found')
      setPreview({ sheets: allSheets, sheetsCount: data.numPages })

      const wb = XLSX.utils.book_new()
      for (let s = 0; s < allSheets.length; s++) {
        const sheetData = allSheets[s]
        const ws = XLSX.utils.aoa_to_sheet(sheetData)
        XLSX.utils.book_append_sheet(wb, ws, `Page ${s + 1}`)
        const maxWidths = sheetData[0].map((_, ci) =>
          Math.max(...sheetData.map(row => (row[ci] || '').length), 10)
        )
        ws['!cols'] = maxWidths.map(w => ({ wch: Math.min(w + 2, 60) }))
      }
      const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (file.name.replace(/\.pdf$/i, '') || 'export') + '.xlsx'
      a.click()
      URL.revokeObjectURL(url)
      setDone(true)
    } catch (e: any) {
      setError(e.message || 'Failed to extract table data from PDF')
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
          {loading ? <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> : <Table2 className="mr-2 inline h-4 w-4" />}
          {loading ? 'Extracting...' : 'Extract to Excel'}
        </button>
        {done && (
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
            <Download className="inline h-4 w-4" />
            Excel file downloaded!
          </div>
        )}
      </div>

      {error && (
        <div className="tool-card p-4 text-sm font-semibold text-[var(--danger)]">{error}</div>
      )}

      {preview && (
        <div className="space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
            Detected {preview.sheets.length} page{preview.sheets.length > 1 ? 's' : ''}
            {preview.sheets.some(s => s[0].length > 1) ? ' with tables' : ''}
          </div>
          {preview.sheets.slice(0, 1).map((sheet, si) => (
            <div key={si} className="tool-card overflow-x-auto p-0">
              <div className="px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)] border-b border-[var(--border)]">
                {preview.sheetsCount > 1 ? `Page ${si + 1}` : 'Content'} — {sheet.length} rows &times; {sheet[0].length} columns
              </div>
              <table className="w-full text-left text-sm font-semibold text-[var(--text-primary)]">
                <tbody>
                  {sheet.slice(0, 15).map((row, ri) => (
                    <tr key={ri} className="border-b border-[var(--border)] last:border-none">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 max-w-[200px] truncate">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {sheet.length > 15 && (
                <div className="px-4 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  Showing 15 of {sheet.length} rows
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
