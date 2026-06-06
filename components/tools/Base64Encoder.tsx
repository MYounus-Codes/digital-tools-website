"use client"
import { useState } from 'react'

export default function Base64Encoder() {
  const [text, setText] = useState('Hello world')
  const encoded = btoa(unescape(encodeURIComponent(text)))
  const decoded = decodeURIComponent(escape(atob(encoded)))
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-28 p-2 border rounded" />
      <div className="mt-3 grid gap-3 text-sm">
        <div className="p-3 border rounded"><div className="font-semibold">Encoded</div><div className="break-all">{encoded}</div></div>
        <div className="p-3 border rounded"><div className="font-semibold">Decoded</div><div className="break-all">{decoded}</div></div>
      </div>
    </div>
  )
}
