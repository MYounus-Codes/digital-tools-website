import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '../../../lib/blogs'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((entry) => entry.slug === params.slug)

  if (!post) {
    return {
      title: 'Blog | ToolNest'
    }
  }

  return {
    title: `${post.title} | ToolNest Blog`,
    description: post.excerpt
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((entry) => entry.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${post.heroTone} p-5 text-slate-950 shadow-[0_28px_80px_rgba(15,23,42,0.22)] md:p-8`}>
        <div className="rounded-[1.5rem] bg-white/72 p-6 backdrop-blur-sm md:p-8">
          <div className="max-w-3xl">
            <Link href="/blog" className="text-xs font-extrabold uppercase tracking-[0.28em] text-slate-700 hover:text-slate-950">
              ← Back to blog
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.26em] text-slate-700">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.94] text-slate-950">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">{post.summary}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="site-card space-y-6 p-6 md:p-8">
          <section className="space-y-3 rounded-[1.5rem] bg-[var(--bg-muted)] p-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Introduction</h2>
            <p className="text-sm leading-8 text-[var(--text-muted)] md:text-base">{post.intro}</p>
          </section>

          <section className="space-y-3 rounded-[1.5rem] bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Key takeaways</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {post.keyTakeaways.map((item) => (
                <li key={item} className="rounded-[1.1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[var(--text-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">{section.heading}</h2>
              <p className="text-sm leading-8 text-[var(--text-muted)] md:text-base">{section.body}</p>
              {section.bullets ? (
                <ul className="space-y-2 pl-5 text-sm leading-7 text-[var(--text-muted)] md:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {post.steps ? (
            <section className="space-y-3 rounded-[1.5rem] bg-[var(--bg-muted)] p-5">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Step-by-step demo flow</h2>
              <ol className="space-y-3">
                {post.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-7 text-[var(--text-muted)] md:text-base">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-xs font-extrabold text-white">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {post.functionalities ? (
            <section className="space-y-3 rounded-[1.5rem] bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Key functionalities</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {post.functionalities.map((item) => (
                  <li key={item} className="rounded-[1.1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[var(--text-muted)]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="space-y-3 rounded-[1.5rem] bg-[var(--bg-muted)] p-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Frequently asked questions</h2>
            <div className="space-y-3">
              {post.faq.map((item) => (
                <details key={item.question} className="rounded-[1.15rem] border border-[var(--border)] bg-white px-4 py-3">
                  <summary className="cursor-pointer list-none text-sm font-extrabold leading-7 text-[var(--text-primary)]">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)] md:text-base">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-[1.5rem] bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Conclusion</h2>
            <p className="text-sm leading-8 text-[var(--text-muted)] md:text-base">{post.conclusion}</p>
          </section>
        </article>

        <aside className="space-y-4">
          <div className="tool-card p-5">
            <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">Tags</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-primary)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="tool-card p-5">
            <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-[var(--brand-primary)]">Read next</div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
              <p>Explore more blog posts, guides, and product stories from the ToolNest blog.</p>
              <Link href="/blog" className="inline-flex rounded-full bg-[var(--brand-primary)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_16px_34px_rgba(37,99,235,0.24)]">
                Browse all posts
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
