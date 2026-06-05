"use client"
import { useMemo, useState } from 'react'

function toTitleCase(text: string) {
  return text.toLowerCase().split(/\s+/).map((word) => word ? word[0].toUpperCase() + word.slice(1) : word).join(' ')
}

export default function CaseConverter() {
  const [text, setText] = useState('hello world from toolnest')
  const outputs = useMemo(() => ({
    upper: text.toUpperCase(),
    lower: text.toLowerCase(),
    title: toTitleCase(text),
    sentence: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    camel: text.toLowerCase().split(/\s+/).map((w, i) => i === 0 ? w : w[0]?.toUpperCase() + w.slice(1)).join(''),
    snake: text.trim().toLowerCase().split(/\s+/).join('_'),
    kebab: text.trim().toLowerCase().split(/\s+/).join('-')
  }), [text])

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 p-2 border rounded" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {Object.entries(outputs).map(([key, value]) => (
          <div key={key} className="p-3 border rounded"><div className="font-semibold uppercase">{key}</div><div className="break-all">{value}</div></div>
        ))}
      </div>
    </div>
  )
}
