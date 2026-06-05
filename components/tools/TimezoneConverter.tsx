"use client"
import { useMemo, useState } from 'react'

const zones = [
  { label: 'UTC', tz: 'UTC' },
  { label: 'New York', tz: 'America/New_York' },
  { label: 'London', tz: 'Europe/London' },
  { label: 'Tokyo', tz: 'Asia/Tokyo' },
  { label: 'Sydney', tz: 'Australia/Sydney' }
]

export default function TimezoneConverter() {
  const [value, setValue] = useState('2026-06-05T12:00')

  const date = useMemo(() => new Date(value), [value])

  return (
    <div>
      <input type="datetime-local" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-2 border rounded" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {zones.map((zone) => (
          <div key={zone.tz} className="p-3 border rounded">
            <div className="text-sm text-[var(--text-muted)]">{zone.label}</div>
            <div className="text-lg font-semibold">{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: zone.tz }).format(date)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
