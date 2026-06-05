"use client"
import { useMemo, useState } from 'react'

function renderMarkdown(md: string) {
  return md
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n$/gim, '<br />')
}

export default function MarkdownEditor() {
  const [md, setMd] = useState('# Hello\n\n**Markdown** preview')
  const html = useMemo(() => renderMarkdown(md), [md])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <textarea value={md} onChange={(e) => setMd(e.target.value)} className="h-64 p-2 border rounded font-mono" />
      <div className="h-64 p-3 border rounded overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
