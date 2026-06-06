import { Tool } from '../../lib/tools-registry'

function buildJsonLd(tool: Tool) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const url = `${siteUrl}/${tool.categorySlug}/${tool.slug}`

  const webApp = {
    '@type': 'WebApplication',
    name: tool.title,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: tool.description,
    featureList: ['Free', 'No signup', 'Client-side processing', 'Mobile-friendly']
  }

  const howTo = {
    '@type': 'HowTo',
    name: `How to Use ${tool.title}`,
    step: tool.howToSteps.map((s, i) => ({ '@type': 'HowToStep', name: s.name || `Step ${i + 1}`, text: s.text }))
  }

  const faq = {
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl || '/' },
      { '@type': 'ListItem', position: 2, name: tool.category, item: `${siteUrl}/${tool.categorySlug}` },
      { '@type': 'ListItem', position: 3, name: tool.title, item: url }
    ]
  }

  return JSON.stringify([webApp, howTo, faq, breadcrumb], null, 2)
}

export default function ToolPageSEO({ tool }: { tool: Tool }) {
  const ld = buildJsonLd(tool)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <section className="site-card mt-8 p-6 md:p-8">
        <div className="section-kicker">FAQs</div>
        <h2 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Questions answered cleanly</h2>
        <div className="mt-5 grid gap-3">
          {tool.faqs.map((f, i) => (
            <details key={i} className="border border-[var(--border)] bg-white/75 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <summary className="cursor-pointer list-none text-base font-semibold text-[var(--text-primary)]">{f.q}</summary>
              <div className="mt-3 leading-7 text-[var(--text-muted)]">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
