export default function PlaceholderTool({ slug }: { slug: string }) {
  return (
    <div className="p-8 border rounded bg-[var(--bg-card)] text-center">
      <h3 className="text-xl font-semibold">Tool "{slug}"</h3>
      <p className="text-[var(--text-muted)] mt-2">This tool is coming soon. We scaffolded the page and SEO schema; full functionality will be added in Phase 4.</p>
    </div>
  )
}
