export default function AboutPage() {
  return (
    <div className="max-w-4xl">
      <div className="section-kicker">About</div>
      <h1 className="section-title mt-2">About ToolNest</h1>
      <p className="mt-4 text-[var(--text-muted)]">ToolNest is a curated collection of small, focused browser tools designed for speed, privacy, and usefulness. We prioritize clean UX and zero-signup experiences.</p>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="site-card p-6">
          <h3 className="font-extrabold">Our principles</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
            <li>Fast and lightweight</li>
            <li>Private by default</li>
            <li>Consistent, calm UI</li>
          </ul>
        </div>

        <div className="site-card p-6">
          <h3 className="font-extrabold">Team</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">A small team of designers and engineers building useful tools for everyday tasks.</p>
        </div>
      </section>
    </div>
  )
}
