import { Target, Shield, Zap, HeartHandshake, Users, Sparkles, ArrowRight, Quote, Rocket, Globe, Code } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'Fast by nature',
    desc: 'Every tool runs entirely in your browser. No server round-trips, no waiting. Just instant results.',
    accent: 'from-yellow-400 to-orange-400',
  },
  {
    icon: Shield,
    title: 'Private by default',
    desc: 'We never store, log, or share your data. All processing happens client-side — your files never leave your device.',
    accent: 'from-emerald-400 to-teal-400',
  },
  {
    icon: HeartHandshake,
    title: 'Free forever',
    desc: 'No signups, no subscriptions, no hidden limits. Our core tools will always remain free to use.',
    accent: 'from-pink-400 to-rose-400',
  },
  {
    icon: Target,
    title: 'Purpose-built',
    desc: 'Each tool is designed with a single job in mind. No bloat, no confusing menus — just what you need.',
    accent: 'from-blue-400 to-indigo-400',
  },
  {
    icon: Users,
    title: 'Community first',
    desc: 'We listen to our users. Feature requests and feedback shape the roadmap of every tool we build.',
    accent: 'from-purple-400 to-violet-400',
  },
  {
    icon: Sparkles,
    title: 'Calm design',
    desc: 'Clean, consistent, and calming UI. We believe productivity tools should reduce stress, not add to it.',
    accent: 'from-sky-400 to-cyan-400',
  },
]

const milestones = [
  { year: '2024', event: 'ToolNest founded with a mission to build fast, private web tools.' },
  { year: '2025', event: 'Launched 30+ tools across calculators, image tools, and developer utilities.' },
  { year: '2026', event: 'Crossed 50+ tools, added AI-powered features, and growing daily.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-12">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[var(--brand-primary)]/5 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-400/10 blur-[80px]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="section-kicker">About</div>
            <h1 className="section-title mt-3 text-[var(--text-primary)]">
              About ToolNest
            </h1>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)] sm:text-base sm:leading-8 max-w-xl">
              ToolNest is a curated collection of fast, private, browser-based tools built for
              developers, designers, and everyday problem solvers. No signups, no tracking, no fuss.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">50+ Tools</span>
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">100% Private</span>
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">No Signup</span>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[var(--brand-primary)]/20 to-purple-400/20 blur-sm" />
              <div className="relative h-52 w-52 overflow-hidden rounded-[2rem] border-2 border-[var(--border)] shadow-[0_24px_60px_rgba(0,0,0,0.10)] sm:h-60 sm:w-60">
                <img
                  src="/m-younus.png"
                  alt="M. Younus — Founder of ToolNest"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-xl bg-[var(--brand-primary)] px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_rgba(37,99,235,0.30)] whitespace-nowrap">
                <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-green-300" />
                Founder & Developer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="site-card overflow-hidden p-0">
        <div className="grid lg:grid-cols-[1fr_1.2fr]">
          <div className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] p-8 text-white sm:p-10 lg:p-12">
            <Quote size={28} className="text-white/40" />
            <blockquote className="mt-4 font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.1] text-white">
              Everyday online tools should be fast, private, and beautiful.
            </blockquote>
            <p className="mt-6 text-sm leading-7 text-white/80">
              Too many websites clutter simple utilities with ads, trackers, and paywalls.
              We set out to build the opposite — a clean, respectful space where anyone can
              get things done without jumping through hoops.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/40">
                <img src="/m-younus.png" alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-extrabold">M. Younus</div>
                <div className="text-xs text-white/70">Founder</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-12">
            <p className="text-sm leading-7 text-[var(--text-muted)] sm:text-base sm:leading-8">
              Every tool we ship runs 100% in your browser. That means your data never touches a server
              — it stays on your machine, where it belongs. We maintain a growing library of 50+ tools
              across calculators, developer utilities, image editors, SEO analyzers, text processors,
              and security helpers.
            </p>
            <p className="text-sm leading-7 text-[var(--text-muted)] sm:text-base sm:leading-8">
              Every tool we build is crafted with care — from the color of a button to the speed of a
              calculation. We believe the best tools are the ones you don&apos;t notice. They just work.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                  <Rocket size={18} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[var(--text-primary)]">50+ Tools</div>
                  <div className="text-xs text-[var(--text-muted)]">And growing</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-500">
                  <Globe size={18} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[var(--text-primary)]">10+ Categories</div>
                  <div className="text-xs text-[var(--text-muted)]">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-500">
                  <Code size={18} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[var(--text-primary)]">100% Client-side</div>
                  <div className="text-xs text-[var(--text-muted)]">Your data stays yours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section>
        <div className="section-kicker">Timeline</div>
        <h2 className="section-title mt-2 text-[var(--text-primary)]">Our journey</h2>
        <div className="mt-8 space-y-0">
          {milestones.map((m, i) => (
            <div key={m.year} className="relative flex gap-6 pb-8 last:pb-0">
              {i < milestones.length - 1 && (
                <div className="absolute left-[11px] top-7 h-full w-0.5 bg-gradient-to-b from-[var(--brand-primary)]/30 to-transparent" />
              )}
              <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-[var(--brand-primary)] ring-4 ring-[var(--brand-primary)]/10" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-[var(--brand-primary)]">{m.year}</span>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)] sm:text-base">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section>
        <div className="section-kicker">Values</div>
        <h2 className="section-title mt-2 text-[var(--text-primary)]">What we believe in</h2>
        <p className="section-copy mt-3 max-w-2xl">Six principles that guide every tool we build and every decision we make.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(v => {
            const Icon = v.icon
            return (
              <div key={v.title} className="group relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white/90 p-6 shadow-[0_12px_34px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.10)]">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${v.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${v.accent} text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-[var(--text-primary)]">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="section-kicker">Team</div>
        <h2 className="section-title mt-2 text-[var(--text-primary)]">The people behind ToolNest</h2>
        <p className="section-copy mt-3 max-w-2xl">
          We&apos;re a small, remote team of designers and engineers who care deeply about user
          experience. We believe the best tools are the ones you don&apos;t notice — they just work.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group site-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.10)]">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0.5 overflow-hidden rounded-full border-2 border-[var(--border)] group-hover:border-transparent">
                <img
                  src="/m-younus.png"
                  alt="M. Younus"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <h3 className="mt-5 font-extrabold text-[var(--text-primary)]">M. Younus</h3>
            <p className="mt-1 text-xs font-semibold text-[var(--brand-primary)] uppercase tracking-[0.18em]">Founder & Developer</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Building tools that make life easier, one feature at a time.</p>
          </div>
          <div className="group site-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.10)]">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0.5 flex items-center justify-center rounded-full border-2 border-[var(--border)] bg-gradient-to-br from-[var(--brand-accent)] to-emerald-400 text-3xl text-white">
                D
              </div>
            </div>
            <h3 className="mt-5 font-extrabold text-[var(--text-primary)]">Design Team</h3>
            <p className="mt-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.18em]">UX & Interface</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Crafting calm, intuitive experiences that feel effortless.</p>
          </div>
          <div className="group site-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.10)]">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0.5 flex items-center justify-center rounded-full border-2 border-[var(--border)] bg-gradient-to-br from-purple-400 to-pink-400 text-3xl text-white">
                E
              </div>
            </div>
            <h3 className="mt-5 font-extrabold text-[var(--text-primary)]">Engineering</h3>
            <p className="mt-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.18em]">Core Development</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Shipping reliable, client-side tools you can count on.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] p-8 text-white sm:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/5 blur-[80px]" />
          <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-white/5 blur-[80px]" />
        </div>
        <div className="relative z-10">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1] text-white">Have an idea?</h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            We&apos;re always looking for the next useful tool to build. If you have a suggestion or
            just want to say hello, we&apos;d love to hear from you.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-[var(--brand-primary)] shadow-[0_14px_34px_rgba(0,0,0,0.12)] transition-all hover:scale-105 hover:shadow-[0_18px_44px_rgba(0,0,0,0.18)]"
          >
            Get in touch
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}
