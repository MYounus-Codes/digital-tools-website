"use client"
import { useMemo, useState } from 'react'

export default function RobotsTxtGenerator() {
  const [allowAll, setAllowAll] = useState(true)
  const text = useMemo(() => allowAll ? 'User-agent: *\nAllow: /' : 'User-agent: *\nDisallow: /', [allowAll])
  return (
    <div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={allowAll} onChange={(e) => setAllowAll(e.target.checked)} /> Allow all crawling</label>
      <pre className="mt-4 p-3 border rounded whitespace-pre-wrap">{text}</pre>
    </div>
  )
}
