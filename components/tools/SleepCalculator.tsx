"use client"
import { useMemo, useState } from 'react'

function addMinutes(base: string, minutes: number) {
  const [hours, mins] = base.split(':').map(Number)
  const d = new Date()
  d.setHours(hours, mins + minutes, 0, 0)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function SleepCalculator() {
  const [time, setTime] = useState('23:00')
  const sleepTimes = useMemo(() => [
    addMinutes(time, -90 * 6),
    addMinutes(time, -90 * 5),
    addMinutes(time, -90 * 4)
  ], [time])

  return (
    <div>
      <label className="block text-sm">Desired wake-up time</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border rounded" />
      <div className="mt-4 p-3 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Suggested bedtimes</div>
        <ul className="mt-2 space-y-1">
          {sleepTimes.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </div>
  )
}
