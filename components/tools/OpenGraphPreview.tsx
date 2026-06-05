"use client"
import { useState } from 'react'

export default function OpenGraphPreview() {
  const [title, setTitle] = useState('Free Online Tools')
  const [description, setDescription] = useState('Fast, free browser-based tools.')
  const [url, setUrl] = useState('https://example.com')

  return (
    <div>
      <div className="grid gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border rounded" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border rounded" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="p-2 border rounded" />
      </div>
      <div className="mt-4 border rounded overflow-hidden">
        <div className="h-32 bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-muted)]">Preview Image</div>
        <div className="p-3">
          <div className="text-xs uppercase text-[var(--text-muted)]">{url}</div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-[var(--text-muted)]">{description}</div>
        </div>
      </div>
    </div>
  )
}
