"use client"
import { useState } from 'react'

function encodeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function decodeHtml(text: string) {
  const parser = new DOMParser()
  return parser.parseFromString(text, 'text/html').documentElement.textContent || ''
}

export default function HtmlEncoder() {
  const [text, setText] = useState('<div>Hello</div>')
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-28 p-2 border rounded" />
      <div className="mt-3 grid gap-3 text-sm">
        <div className="p-3 border rounded"><div className="font-semibold">Encoded</div><div className="break-all">{encodeHtml(text)}</div></div>
        <div className="p-3 border rounded"><div className="font-semibold">Decoded</div><div className="break-all">{decodeHtml(text)}</div></div>
      </div>
    </div>
  )
}
