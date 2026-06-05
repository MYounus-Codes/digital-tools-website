import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
        color: 'white',
        fontSize: 64,
        fontWeight: 800,
        fontFamily: 'sans-serif'
      }}>
        ToolNest — Free Online Tools
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
