"use client"
import { useEffect, useMemo, useState } from 'react'

const cities = ['UTC', 'New York', 'London', 'Tokyo', 'Sydney']

export default function WorldClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const timeStrings = useMemo(() => {
    return cities.map((city) => ({
      city,
      time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: city === 'UTC' ? 'UTC' : city === 'New York' ? 'America/New_York' : city === 'London' ? 'Europe/London' : city === 'Tokyo' ? 'Asia/Tokyo' : 'Australia/Sydney' }).format(now)
    }))
  }, [now])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {timeStrings.map((item) => (
        <div key={item.city} className="p-4 border rounded">
          <div className="text-sm text-[var(--text-muted)]">{item.city}</div>
          <div className="text-2xl font-bold">{item.time}</div>
        </div>
      ))}
    </div>
  )
}
