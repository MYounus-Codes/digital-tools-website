"use client"
import { useMemo, useState } from 'react'

export default function DiffChecker() {
  const [left, setLeft] = useState('hello\nworld')
  const [right, setRight] = useState('hello\nthere\nworld')

  const diff = useMemo(() => {
    const a = left.split(/\r?\n/)
    const b = right.split(/\r?\n/)
    return b.map((line, index) => ({ line, changed: line !== a[index] }))
  }, [left, right])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <textarea value={left} onChange={(e) => setLeft(e.target.value)} className="h-32 p-2 border rounded" />
        <textarea value={right} onChange={(e) => setRight(e.target.value)} className="h-32 p-2 border rounded" />
      </div>
      <div className="mt-4 space-y-1 text-sm">
        {diff.map((item, i) => <div key={i} className={`p-2 rounded border ${item.changed ? 'bg-amber-50' : ''}`}>{item.line}</div>)}
      </div>
    </div>
  )
}
