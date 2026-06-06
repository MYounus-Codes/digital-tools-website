"use client"
import { useState } from 'react'

export default function UrlEncoder() {
  const [text, setText] = useState('https://example.com?q=hello world')
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-28 p-2 border rounded" />
      <div className="mt-3 grid gap-3 text-sm">
        <div className="p-3 border rounded"><div className="font-semibold">Encoded</div><div className="break-all">{encodeURIComponent(text)}</div></div>
        <div className="p-3 border rounded"><div className="font-semibold">Decoded</div><div className="break-all">{decodeURIComponent(encodeURIComponent(text))}</div></div>
      </div>
    </div>
  )
}
