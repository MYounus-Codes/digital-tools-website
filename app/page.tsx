import Link from 'next/link'
import { tools } from '../lib/tools-registry'
import { homeFaqs } from '../lib/faqs'
import { featuredBlog, blogPosts } from '../lib/blogs'

export default function HomePage() {
  const categoryEntries = Array.from(
    tools.reduce((map, tool) => {
      const current = map.get(tool.categorySlug) || { slug: tool.categorySlug, name: tool.category, count: 0, icon: tool.icon }
      map.set(tool.categorySlug, { ...current, count: current.count + 1 })
      return map
    }, new Map<string, { slug: string; name: string; count: number; icon: string }>()).values()
  )

  const featuredTools = tools.filter((tool) => tool.isPopular).slice(0, 6)
  const stats = [
    { label: 'Tools live', value: `${tools.length}+` },
    { label: 'Categories', value: `${new Set(tools.map((tool) => tool.categorySlug)).size}` },
    { label: 'Zero signup', value: '100%' }
  ]

  return (
    <div className="space-y-12 pb-6">
      <section className="hero-panel overflow-hidden px-3 py-3 shadow-[0_32px_90px_rgba(37,99,235,0.22)] sm:px-4 sm:py-4 md:px-5 md:py-5">
        <div className="rounded-[1.6rem] border border-white/15 bg-white/5 px-4 py-4 backdrop-blur-sm sm:rounded-[2rem] sm:px-5 sm:py-5 md:px-8 md:py-8">
          <div className="flex items-center justify-between text-white/90">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--brand-primary)] shadow-[0_10px_24px_rgba(15,23,42,0.18)]">T</span>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm sm:tracking-[0.28em]">ToolNest</span>
            </div>
          </div>

          <div className="grid gap-8 pt-8 sm:gap-10 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-14">
            <div className="mx-auto max-w-2xl text-center lg:text-left">
              <h1 className="font-display text-[clamp(2.35rem,12vw,5.8rem)] leading-[0.96] text-white drop-shadow-sm sm:text-[clamp(3rem,6vw,5.8rem)] sm:leading-[0.92]">Building the future with AI and strategy.</h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/88 sm:mt-5 sm:text-base sm:leading-8 md:text-lg lg:mx-0">
                We help people move faster with polished, focused tools that feel calm, premium, and immediately useful.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/blog/website-demo" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--brand-primary)] shadow-[0_14px_34px_rgba(15,23,42,0.14)] sm:px-6 sm:text-sm sm:tracking-[0.24em]">
                  View demo
                </Link>
                <Link href="/developer-tools" className="inline-flex items-center justify-center rounded-full bg-[var(--brand-accent)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-950 shadow-[0_14px_34px_rgba(217,242,90,0.32)] sm:px-6 sm:text-sm sm:tracking-[0.24em]">
                  Get started
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold text-white/82 sm:mt-8 sm:gap-4 sm:text-sm lg:justify-start">
                <span>Rated 4.9/5 by 4,900+ users</span>
                <span className="hidden md:inline">•</span>
                <span>100% private</span>
                <span className="hidden md:inline">•</span>
                <span>No signup</span>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="hero-animation mx-auto h-[280px] max-w-[320px] sm:h-[360px] sm:max-w-[420px] lg:mx-0">
                <div className="mock-phone">
                  <div className="phone-shadow" aria-hidden="true" />
                  <div className="phone-glow" aria-hidden="true" />
                  <div className="phone-screen">
                    <div className="phone-top">
                      <span className="phone-dot" />
                      <span className="phone-dot" />
                      <span className="phone-dot" />
                    </div>
                    <div className="phone-content">
                      <div className="pill pill-animated" />
                      <div className="hero-preview">
                        <div className="hero-preview-card hero-preview-card-lg" />
                        <div className="hero-preview-card hero-preview-card-sm" />
                      </div>
                      <div className="stats">
                        <div className="stat stat-animated" />
                        <div className="stat small stat-animated delay-1" />
                      </div>
                      <div className="list">
                        <div className="line line-animated" />
                        <div className="line line-animated delay-1" />
                        <div className="line short line-animated delay-2" />
                      </div>
                    </div>
                    <div className="scan-line" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Popular tools</div>
            <h2 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}>Tools that feel immediate and refined</h2>
          </div>
          <Link href="/calculators" className="hidden rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] md:inline-flex">See all</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link key={tool.slug} href={`/${tool.categorySlug}/${tool.slug}`} className="tool-card group p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-3xl">{tool.icon}</div>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]">{tool.title}</h3>
                </div>
                <span className="rounded-full bg-[rgba(217,242,90,0.28)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">Fast</span>
              </div>
              <p className="mt-3 text-sm font-medium leading-7 text-[var(--text-muted)]">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="section-kicker">Categories</div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categoryEntries.map((category) => (
            <Link key={category.slug} href={`/${category.slug}`} className="tool-card flex items-center justify-between gap-4 p-4 sm:p-5">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--brand-primary)] sm:text-sm sm:tracking-[0.24em]">{category.count} tools</div>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-2xl">{category.name}</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-muted)] text-2xl sm:h-16 sm:w-16 sm:text-3xl">{category.icon}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-card overflow-hidden px-5 py-5 md:px-8 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="section-kicker">Blog</div>
            <h2 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(1.9rem, 5vw, 3.4rem)' }}>
              Best blog stories, guides, and a full website demo.
            </h2>
            <p className="section-copy mt-4 max-w-2xl text-sm sm:text-base">
              Read the full Website Demo walkthrough and explore the most useful posts across productivity, SEO, design, development, and more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/blog/${featuredBlog.slug}`} className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_16px_34px_rgba(37,99,235,0.24)]">
                Read website demo
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/75 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">
                Browse all blogs
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {blogPosts.slice(0, 4).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]">
                <div className={`h-2 rounded-full bg-gradient-to-r ${post.heroTone}`} />
                <div className="mt-4 flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 text-lg font-extrabold leading-tight tracking-tight text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--text-muted)]">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-card overflow-hidden px-6 py-6 md:px-8 md:py-8">
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div>
            <div className="section-kicker">Why it works</div>
            <h2 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)' }}>Focused on speed, clarity, and low friction.</h2>
            <p className="section-copy mt-4 max-w-2xl text-sm sm:text-base">The interface stays quiet and elegant while the tools do the heavy lifting. Every page uses the same calm shell, consistent spacing, and soft surfaces.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              'Instant results',
              'Private by default',
              'Mobile friendly',
              'No clutter'
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-5 text-center text-sm font-semibold text-[var(--text-primary)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-card overflow-hidden px-6 py-6 md:px-8 md:py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="section-kicker">FAQ</div>
            <h2 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)' }}>Frequently asked questions.</h2>
            <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
              Answers about our calculators, SEO tools, image tools, developer utilities, text tools, privacy, mobile support, and how to use ToolNest quickly.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {homeFaqs.map((faq) => (
            <details key={faq.question} className="rounded-[1.25rem] border border-[var(--border)] bg-white/85 px-5 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[var(--text-primary)]">
                {faq.question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)] sm:text-base sm:leading-8">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="footer-cta overflow-hidden px-5 py-7 text-white sm:px-6 md:px-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/80 sm:text-xs sm:tracking-[0.34em]">Last section</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,8vw,4.6rem)] leading-[0.95] text-white">We combine useful tools with a clean, modern experience.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/88 sm:text-base sm:leading-8">Smooth layouts, calm colors, and bold call-to-action styling keep the site attractive without feeling crowded.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/calculators" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--brand-primary)] sm:px-6 sm:text-sm sm:tracking-[0.24em]">Browse tools</Link>
            <Link href="/developer-tools" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-white sm:px-6 sm:text-sm sm:tracking-[0.24em]">See categories</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
