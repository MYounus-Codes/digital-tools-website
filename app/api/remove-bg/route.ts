import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const imageFile = formData.get('image_file') as File | null
  if (!imageFile) {
    return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
  }

  const apiFormData = new FormData()
  apiFormData.append('image_file', imageFile)
  apiFormData.append('size', 'auto')

  const res = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': process.env.REMOVE_BG_API! },
    body: apiFormData,
  })

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: text }, { status: res.status })
  }

  const blob = await res.blob()
  return new NextResponse(blob, {
    headers: { 'Content-Type': 'image/png' },
  })
}
