"use client"
import { useMemo, useState } from 'react'

export default function TextSorter() {
  const [text, setText] = useState('banana\napple\npear\napple')
  const [mode, setMode] = useState<'az' | 'za' | 'length' | 'random'>('az')

  const sorted = useMemo(() => {
    const lines = text.split(/\r?\n/).filter(Boolean)
    if (mode === 'az') return [...lines].sort()
    if (mode === 'za') return [...lines].sort().reverse()
    if (mode === 'length') return [...lines].sort((a, b) => a.length - b.length)
    return [...lines].sort(() => Math.random() - 0.5)
  }, [text, mode])

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 p-2 border rounded" />
      <div className="mt-2 flex gap-2 flex-wrap">
        <button onClick={() => setMode('az')} className="px-3 py-2 border rounded">A-Z</button>
        <button onClick={() => setMode('za')} className="px-3 py-2 border rounded">Z-A</button>
        <button onClick={() => setMode('length')} className="px-3 py-2 border rounded">Length</button>
        <button onClick={() => setMode('random')} className="px-3 py-2 border rounded">Random</button>
      </div>
      <div className="mt-4 p-3 border rounded text-sm whitespace-pre-line">{sorted.join('\n')}</div>
    </div>
  )
}
