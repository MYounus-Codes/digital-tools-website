import ImageCompressor from '../../../components/tools/ImageCompressor'
import ToolPageSEO from '../../../components/seo/ToolPageSEO'
import { tools } from '../../../lib/tools-registry'

const tool = tools.find((t) => t.slug === 'image-compressor')!

export async function generateMetadata() {
  const { generateToolMetadata } = await import('../../../lib/seo-helpers')
  return generateToolMetadata(tool)
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
      <p className="text-[var(--text-muted)] mb-4">Compress images client-side — never uploaded.</p>
      <div className="p-4 border rounded bg-[var(--bg-card)]">
        <ImageCompressor />
      </div>

      <ToolPageSEO tool={tool} />
    </div>
  )
}
