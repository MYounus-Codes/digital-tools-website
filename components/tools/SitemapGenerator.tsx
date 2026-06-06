"use client"
import { useState } from 'react'

export default function SitemapGenerator() {
  const [urls, setUrls] = useState('https://example.com\nhttps://example.com/about')
  const xml = `<urlset>\n${urls.split(/\r?\n/).filter(Boolean).map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`
  return (
    <div>
      <textarea value={urls} onChange={(e) => setUrls(e.target.value)} className="w-full h-32 p-2 border rounded" />
      <pre className="mt-4 p-3 border rounded text-sm whitespace-pre-wrap">{xml}</pre>
    </div>
  )
}
