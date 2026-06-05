"use client"
import { useState } from 'react'

const safePattern = /^[0-9+\-*/().\s^sqrtpiPIeE]+$/

function evaluateExpression(expr: string) {
  const sanitized = expr.replace(/\^/g, '**').replace(/pi/gi, 'Math.PI').replace(/sqrt/gi, 'Math.sqrt').replace(/e/gi, 'Math.E')
  if (!safePattern.test(expr)) throw new Error('Unsupported characters in expression')
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${sanitized})`)()
}

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('2+2*5')
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const calculate = () => {
    try {
      const value = evaluateExpression(expression)
      setResult(String(value))
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setResult('')
    }
  }

  return (
    <div>
      <input value={expression} onChange={(e) => setExpression(e.target.value)} className="w-full p-2 border rounded font-mono" />
      <div className="mt-3 flex gap-2">
        <button onClick={calculate} className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded">Calculate</button>
      </div>
      {error && <div className="mt-3 text-red-500 text-sm">{error}</div>}
      <div className="mt-4 p-4 border rounded">
        <div className="text-sm text-[var(--text-muted)]">Result</div>
        <div className="text-3xl font-bold">{result || '—'}</div>
      </div>
    </div>
  )
}
