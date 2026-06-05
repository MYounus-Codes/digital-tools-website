"use client"
import { useMemo, useState } from 'react'

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState('Free online tools for developers and designers. Free tools are fast and free.')
  const analysis = useMemo(() => {
    const words = normalize(text).split(/\s+/).filter(Boolean)
    const total = words.length || 1
    const counts = words.reduce<Record<string, number>>((acc, word) => { acc[word] = (acc[word] || 0) + 1; return acc }, {})
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(2) }))
  }, [text])

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-36 p-2 border rounded" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {analysis.map((item) => <div key={item.word} className="p-2 border rounded flex justify-between"><span>{item.word}</span><span>{item.count} ({item.density}%)</span></div>)}
      </div>
    </div>
  )
}
