export const runtime = 'edge'

export async function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4f46e5"/>
        <stop offset="100%" style="stop-color:#06b6d4"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <text x="600" y="320" font-family="system-ui, sans-serif" font-size="72" font-weight="800" fill="white" text-anchor="middle" dominant-baseline="middle">ToolNest</text>
    <text x="600" y="400" font-family="system-ui, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">Free Online Tools</text>
  </svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
