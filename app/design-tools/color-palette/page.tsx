import ColorPalette from '../../../components/tools/ColorPalette'
import ToolPageSEO from '../../../components/seo/ToolPageSEO'
import { tools } from '../../../lib/tools-registry'

const tool = tools.find((t) => t.slug === 'color-palette')!

export async function generateMetadata() {
  const { generateToolMetadata } = await import('../../../lib/seo-helpers')
  return generateToolMetadata(tool)
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Color Palette Generator</h1>
      <p className="text-[var(--text-muted)] mb-4">Generate and export color palettes for your designs.</p>
      <div className="p-4 border rounded bg-[var(--bg-card)]">
        <ColorPalette />
      </div>

      <ToolPageSEO tool={tool} />
    </div>
  )
}
