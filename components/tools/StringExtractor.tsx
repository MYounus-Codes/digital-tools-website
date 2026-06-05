"use client"
import { useMemo, useState } from 'react'

const patterns = {
  emails: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
  urls: /https?:\/\/[^\s]+/gi,
  phones: /(?:\+?\d[\d\s-]{7,}\d)/g
}

export default function StringExtractor() {
  const [text, setText] = useState('Email me at hello@example.com or visit https://example.com. Call +1 555-123-4567.')

  const extracted = useMemo(() => ({
    emails: text.match(patterns.emails) || [],
    urls: text.match(patterns.urls) || [],
    phones: text.match(patterns.phones) || []
  }), [text])

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 p-2 border rounded" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="p-3 border rounded"><div className="font-semibold">Emails</div><div className="break-all">{extracted.emails.join('\n') || 'None'}</div></div>
        <div className="p-3 border rounded"><div className="font-semibold">URLs</div><div className="break-all">{extracted.urls.join('\n') || 'None'}</div></div>
        <div className="p-3 border rounded"><div className="font-semibold">Phones</div><div className="break-all">{extracted.phones.join('\n') || 'None'}</div></div>
      </div>
    </div>
  )
}
