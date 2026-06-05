"use client"
import { useState } from 'react'

export default function JsonFormatter() {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const beautify = () => {
    try {
      const obj = JSON.parse(text)
      setText(JSON.stringify(obj, null, 2))
      setError(null)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const minify = () => {
    try {
      const obj = JSON.parse(text)
      setText(JSON.stringify(obj))
      setError(null)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 p-2 border rounded" placeholder='Paste JSON here' />
      <div className="flex gap-2 mt-2">
        <button onClick={beautify} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded">Beautify</button>
        <button onClick={minify} className="px-4 py-2 border rounded">Minify</button>
        <button onClick={() => { setText(''); setError(null) }} className="px-4 py-2 border rounded">Clear</button>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  )
}
