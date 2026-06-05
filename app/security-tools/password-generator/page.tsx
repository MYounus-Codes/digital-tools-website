import PasswordGenerator from '../../../components/tools/PasswordGenerator'
import ToolPageSEO from '../../../components/seo/ToolPageSEO'
import { tools } from '../../../lib/tools-registry'

const tool = tools.find((t) => t.slug === 'password-generator')!

export async function generateMetadata() {
  const { generateToolMetadata } = await import('../../../lib/seo-helpers')
  return generateToolMetadata(tool)
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
      <p className="text-[var(--text-muted)] mb-4">Generate secure passwords and copy to clipboard.</p>
      <div className="p-4 border rounded bg-[var(--bg-card)]">
        <PasswordGenerator />
      </div>

      <ToolPageSEO tool={tool} />
    </div>
  )
}
