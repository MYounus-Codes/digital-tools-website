import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const accessKey = process.env.WEB3FORMS_KEY
    if (!accessKey) {
      return NextResponse.json(
        { error: 'Form service is not configured.' },
        { status: 500 }
      )
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: subject || 'General inquiry',
        message,
      }),
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || 'Web3Forms error')
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent. We will get back to you soon!',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again later.' },
      { status: 500 }
    )
  }
}
