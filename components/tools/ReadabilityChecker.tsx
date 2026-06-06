"use client"
import { useMemo, useState } from 'react'

function countSyllables(word: string) {
  return Math.max(1, (word.toLowerCase().match(/[aeiouy]+/g) || []).length)
}

export default function ReadabilityChecker() {
  const [text, setText] = useState('This is a simple sentence. It is easy to read.')
  const stats = useMemo(() => {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length || 1
    const words = text.trim().split(/\s+/).filter(Boolean)
    const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0)
    const wordsCount = words.length || 1
    const fk = 0.39 * (wordsCount / sentences) + 11.8 * (syllables / wordsCount) - 15.59
    return { fk: fk.toFixed(2), words: wordsCount, sentences }
  }, [text])

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-36 p-2 border rounded" />
      <div className="mt-4 p-3 border rounded text-sm space-y-1">
        <div>Words: {stats.words}</div>
        <div>Sentences: {stats.sentences}</div>
        <div>Flesch-Kincaid: {stats.fk}</div>
      </div>
    </div>
  )
}
