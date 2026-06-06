"use client"
import { useState } from 'react'

export default function ImageMetadata() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      {file && (
        <div className="mt-4 p-3 border rounded text-sm space-y-1">
          <div>Name: {file.name}</div>
          <div>Type: {file.type || 'unknown'}</div>
          <div>Size: {(file.size / 1024).toFixed(1)} KB</div>
          <div>Last modified: {new Date(file.lastModified).toLocaleString()}</div>
        </div>
      )}
    </div>
  )
}
