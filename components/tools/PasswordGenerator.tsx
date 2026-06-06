"use client"
import { useState } from 'react'

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUM = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?'

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [useLower, setUseLower] = useState(true)
  const [useUpper, setUseUpper] = useState(true)
  const [useNum, setUseNum] = useState(true)
  const [useSym, setUseSym] = useState(false)
  const [pwd, setPwd] = useState('')

  const generate = () => {
    let chars = ''
    if (useLower) chars += LOWER
    if (useUpper) chars += UPPER
    if (useNum) chars += NUM
    if (useSym) chars += SYMBOLS
    if (!chars) return
    let out = ''
    for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)]
    setPwd(out)
  }

  const copy = async () => { if (pwd) await navigator.clipboard.writeText(pwd) }

  const strength = () => {
    let score = 0
    if (useLower) score++
    if (useUpper) score++
    if (useNum) score++
    if (useSym) score++
    score += Math.min(4, Math.floor(length / 8))
    return score
  }

  return (
    <div className="space-y-5">
      <div className="tool-card p-5">
        <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">Length</div>
        <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} />
        <div className="mt-3 text-sm font-semibold text-[var(--text-primary)]">Length: {length}</div>
      </div>
      <div className="tool-card flex flex-wrap gap-3 p-5 text-sm font-semibold text-[var(--text-primary)]">
        <label><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> lower</label>
        <label><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> upper</label>
        <label><input type="checkbox" checked={useNum} onChange={(e) => setUseNum(e.target.checked)} /> numbers</label>
        <label><input type="checkbox" checked={useSym} onChange={(e) => setUseSym(e.target.checked)} /> symbols</label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button onClick={generate} className="rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black">Generate</button>
        <button onClick={copy} className="rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Copy</button>
      </div>
      <div className="tool-card p-4 font-mono text-sm font-semibold text-[var(--text-primary)]">{pwd || 'Your password will appear here'}</div>
      <div className="text-sm font-semibold text-[var(--text-muted)]">Strength: {strength()} / 8</div>
    </div>
  )
}
