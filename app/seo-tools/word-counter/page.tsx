import WordCounter from '../../../components/tools/WordCounter'
import ToolPageSEO from '../../../components/seo/ToolPageSEO'
import { tools } from '../../../lib/tools-registry'

const tool = tools.find((t) => t.slug === 'word-counter')!

export async function generateMetadata() {
  const { generateToolMetadata } = await import('../../../lib/seo-helpers')
  return generateToolMetadata(tool)
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Word & Character Counter</h1>
      <p className="text-[var(--text-muted)] mb-4">Count words, characters and estimate reading time.</p>
      <div className="p-4 border rounded bg-[var(--bg-card)]">
        <WordCounter />
      </div>

      <ToolPageSEO tool={tool} />
    </div>
  )
}
