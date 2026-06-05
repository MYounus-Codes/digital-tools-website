"use client"
import { useMemo, useState } from 'react'

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(1000)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(10)
  const [annualContribution, setAnnualContribution] = useState(0)

  const result = useMemo(() => {
    const r = rate / 100
    let balance = principal
    const yearly = [] as { year: number; balance: number }[]
    for (let y = 1; y <= years; y++) {
      balance = (balance + annualContribution) * (1 + r)
      yearly.push({ year: y, balance: Math.round(balance * 100) / 100 })
    }
    return { final: Math.round(balance * 100) / 100, yearly }
  }, [principal, rate, years, annualContribution])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Principal</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Annual Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Years</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Annual Contribution</label>
          <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>

        <div>
          <div className="p-4 border rounded">
            <div className="text-sm text-[var(--text-muted)]">Projected Balance</div>
            <div className="text-3xl font-bold">${result.final.toLocaleString()}</div>
            <div className="mt-4 text-sm text-[var(--text-muted)]">Yearly breakdown:</div>
            <ul className="mt-2 text-sm">
              {result.yearly.map((y) => (
                <li key={y.year}>Year {y.year}: ${y.balance.toLocaleString()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
