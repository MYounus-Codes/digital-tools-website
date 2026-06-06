"use client"
import { useMemo, useState } from 'react'

async function digest(algo: 'SHA-1' | 'SHA-256' | 'SHA-512', text: string) {
  const enc = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest(algo, enc)
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [sha1, setSha1] = useState('')
  const [sha256, setSha256] = useState('')
  const [sha512, setSha512] = useState('')

  const canCompute = useMemo(() => input.trim().length > 0, [input])

  const generate = async () => {
    if (!canCompute) return
    setSha1(await digest('SHA-1', input))
    setSha256(await digest('SHA-256', input))
    setSha512(await digest('SHA-512', input))
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to hash"
        className="w-full h-32 p-2 border rounded"
      />
      <div className="mt-3 flex gap-2">
        <button onClick={generate} disabled={!canCompute} className="px-4 py-2 bg-[var(--brand-primary)] text-black rounded disabled:opacity-50">Generate hashes</button>
      </div>
      <div className="mt-4 space-y-3 text-sm">
        <div><div className="font-semibold">SHA-1</div><code className="break-all">{sha1}</code></div>
        <div><div className="font-semibold">SHA-256</div><code className="break-all">{sha256}</code></div>
        <div><div className="font-semibold">SHA-512</div><code className="break-all">{sha512}</code></div>
      </div>
    </div>
  )
}
