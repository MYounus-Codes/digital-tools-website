"use client"
import { useMemo, useState } from 'react'

function decodePart(part: string) {
  try {
    return JSON.stringify(JSON.parse(atob(part)), null, 2)
  } catch {
    return 'Invalid token part'
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJleHAiOjE3MDAwMDAwMDB9.signature')
  const [header, payload] = useMemo(() => token.split('.'), [token])
  return (
    <div>
      <textarea value={token} onChange={(e) => setToken(e.target.value)} className="w-full h-24 p-2 border rounded font-mono" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <pre className="p-3 border rounded whitespace-pre-wrap">{decodePart(header || '')}</pre>
        <pre className="p-3 border rounded whitespace-pre-wrap">{decodePart(payload || '')}</pre>
      </div>
    </div>
  )
}
