"use client"
import { useMemo, useState } from 'react'

function scorePassword(value: string) {
  let score = 0
  if (value.length >= 8) score += 1
  if (value.length >= 12) score += 1
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1
  if (/\d/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1
  return score
}

export default function PasswordStrength() {
  const [password, setPassword] = useState('')
  const score = useMemo(() => scorePassword(password), [password])
  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type a password to test"
        className="w-full p-2 border rounded"
      />
      <div className="mt-3 p-4 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Strength</div>
        <div className="text-2xl font-bold">{labels[score]}</div>
        <div className="mt-2 text-sm text-[var(--text-muted)]">Entropy guidance: longer passwords with mixed character sets are stronger.</div>
      </div>
    </div>
  )
}
