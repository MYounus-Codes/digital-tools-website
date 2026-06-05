import { Target, Shield, Zap, HeartHandshake, Users, Sparkles } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'Fast by nature',
    desc: 'Every tool runs entirely in your browser. No server round-trips, no waiting. Just instant results.',
  },
  {
    icon: Shield,
    title: 'Private by default',
    desc: 'We never store, log, or share your data. All processing happens client-side — your files never leave your device.',
  },
  {
    icon: HeartHandshake,
    title: 'Free forever',
    desc: 'No signups, no subscriptions, no hidden limits. Our core tools will always remain free to use.',
  },
  {
    icon: Target,
    title: 'Purpose-built',
    desc: 'Each tool is designed with a single job in mind. No bloat, no confusing menus — just what you need.',
  },
  {
    icon: Users,
    title: 'Community first',
    desc: 'We listen to our users. Feature requests and feedback shape the roadmap of every tool we build.',
  },
  {
    icon: Sparkles,
    title: 'Calm design',
    desc: 'Clean, consistent, and calming UI. We believe productivity tools should reduce stress, not add to it.',
  },
]

const stats = [
  { label: 'Free tools', value: '50+' },
  { label: 'Categories', value: '10+' },
  { label: 'Client-side', value: '100%' },
  { label: 'Zero signup', value: 'Always' },
]

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="section-kicker">About</div>
      <h1 className="section-title mt-2">About ToolNest</h1>
      <p className="mt-4 text-[var(--text-muted)] max-w-2xl">
        ToolNest is a curated collection of fast, private, browser-based tools built for
        developers, designers, and everyday problem solvers. No signups, no tracking, no fuss.
      </p>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label} className="stat-card text-center">
            <div className="text-2xl font-extrabold text-[var(--brand-primary)]">{stat.value}</div>
            <div className="mt-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Story */}
      <section className="mt-14">
        <h2 className="text-xl font-extrabold">Our story</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          ToolNest started with a simple belief: everyday online tools should be fast, private, and
          beautiful. Too many websites clutter simple utilities with ads, trackers, and paywalls.
          We set out to build the opposite — a clean, respectful space where anyone can get things
          done without jumping through hoops.
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          Every tool we ship runs 100% in your browser. That means your data never touches a server
          — it stays on your machine, where it belongs. We maintain a growing library of 50+ tools
          across calculators, developer utilities, image editors, SEO analyzers, text processors,
          and security helpers.
        </p>
      </section>

      {/* Values */}
      <section className="mt-14">
        <h2 className="text-xl font-extrabold">What we believe in</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(v => {
            const Icon = v.icon
            return (
              <div key={v.title} className="site-card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-extrabold">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Team */}
      <section className="mt-14">
        <h2 className="text-xl font-extrabold">The team</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] max-w-2xl">
          We&apos;re a small, remote team of designers and engineers who care deeply about user
          experience. We believe the best tools are the ones you don&apos;t notice — they just work.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="site-card p-5 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]" />
            <h3 className="mt-4 font-extrabold">M. Younus</h3>
            <p className="text-xs text-[var(--text-muted)]">Founder & Developer</p>
          </div>
          <div className="site-card p-5 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-emerald-400" />
            <h3 className="mt-4 font-extrabold">Design Team</h3>
            <p className="text-xs text-[var(--text-muted)]">UX & Interface</p>
          </div>
          <div className="site-card p-5 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
            <h3 className="mt-4 font-extrabold">Engineering</h3>
            <p className="text-xs text-[var(--text-muted)]">Core Development</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 mb-10 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] p-8 text-white sm:p-10">
        <h2 className="text-2xl font-extrabold">Have an idea?</h2>
        <p className="mt-2 text-sm text-white/80 max-w-lg">
          We&apos;re always looking for the next useful tool to build. If you have a suggestion or
          just want to say hello, we&apos;d love to hear from you.
        </p>
        <a
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[var(--brand-primary)] shadow-lg hover:bg-white/90 transition-colors"
        >
          Get in touch
          <span aria-hidden="true">&rarr;</span>
        </a>
      </section>
    </div>
  )
}
