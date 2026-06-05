import TdeeCalculator from '../../../components/tools/TdeeCalculator'
import ToolPageSEO from '../../../components/seo/ToolPageSEO'
import { tools } from '../../../lib/tools-registry'

const tool = tools.find((t) => t.slug === 'tdee-calculator')!

export async function generateMetadata() {
  const { generateToolMetadata } = await import('../../../lib/seo-helpers')
  return generateToolMetadata(tool)
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">TDEE Calculator</h1>
      <p className="text-[var(--text-muted)] mb-4">Estimate your maintenance calories. 100% client-side.</p>
      <div className="p-4 border rounded bg-[var(--bg-card)]">
        <TdeeCalculator />
      </div>

      <ToolPageSEO tool={tool} />
    </div>
  )
}
