"use client"
import { useMemo, useState } from 'react'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1)
  const uuids = useMemo(() => Array.from({ length: count }, () => uuidv4()), [count])

  return (
    <div>
      <label className="block text-sm">Count</label>
      <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} className="w-full p-2 border rounded" />
      <div className="mt-4 space-y-2">
        {uuids.map((u) => <div key={u} className="p-2 border rounded font-mono text-sm break-all">{u}</div>)}
      </div>
    </div>
  )
}
