import JsonToCsv from '../../../components/tools/JsonToCsv'
import ToolPageSEO from '../../../components/seo/ToolPageSEO'
import { tools } from '../../../lib/tools-registry'

const tool = tools.find((t) => t.slug === 'json-to-csv')!

export async function generateMetadata() {
  const { generateToolMetadata } = await import('../../../lib/seo-helpers')
  return generateToolMetadata(tool)
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">JSON to CSV Converter</h1>
      <p className="text-[var(--text-muted)] mb-4">Convert JSON arrays to CSV in your browser. No uploads.</p>
      <div className="p-4 border rounded bg-[var(--bg-card)]">
        <JsonToCsv />
      </div>

      <ToolPageSEO tool={tool} />
    </div>
  )
}
