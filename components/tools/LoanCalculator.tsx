"use client"
import { useState } from 'react'

export default function LoanCalculator() {
  const [amount, setAmount] = useState(10000)
  const [rate, setRate] = useState(6)
  const [years, setYears] = useState(5)

  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const emi = monthlyRate === 0 ? amount / months : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Loan Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Annual Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-2 border rounded" />

          <label className="block text-sm mt-2">Term (years)</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>

        <div>
          <div className="p-4 border rounded">
            <div className="text-sm text-[var(--text-muted)]">Monthly EMI</div>
            <div className="text-3xl font-bold">${Math.round(emi * 100) / 100}</div>
            <div className="mt-2">Total Payment: ${(Math.round(emi * months * 100) / 100).toLocaleString()}</div>
            <div className="mt-2 text-sm text-[var(--text-muted)]">Use this to estimate monthly payments and total interest cost.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
