"use client"
import { useMemo, useState } from 'react'

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('Free Online Tools')
  const [description, setDescription] = useState('Free browser-based tools that run 100% client-side.')
  const tags = useMemo(() => `
<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta name="twitter:card" content="summary_large_image" />`.trim(), [title, description])

  return (
    <div>
      <div className="grid gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border rounded" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border rounded h-24" />
      </div>
      <pre className="mt-4 p-3 border rounded text-sm whitespace-pre-wrap">{tags}</pre>
    </div>
  )
}
