"use client"
import { useMemo, useState } from 'react'

export default function NumberBaseConverter() {
  const [value, setValue] = useState('42')
  const [fromBase, setFromBase] = useState(10)

  const decimal = useMemo(() => parseInt(value, fromBase) || 0, [value, fromBase])

  const outputs = {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase()
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="p-2 border rounded">
          <option value={2}>Binary</option>
          <option value={8}>Octal</option>
          <option value={10}>Decimal</option>
          <option value={16}>Hex</option>
        </select>
        <input value={value} onChange={(e) => setValue(e.target.value)} className="p-2 border rounded font-mono" />
        <div className="p-2 border rounded text-sm">Decimal: {decimal}</div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(outputs).map(([key, val]) => <div key={key} className="p-3 border rounded"><div className="font-semibold uppercase">{key}</div><div className="break-all font-mono">{val}</div></div>)}
      </div>
    </div>
  )
}
