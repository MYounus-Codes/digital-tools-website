"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { BlogPost } from '../../lib/blogs'

type Props = {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogClient({ posts, categories }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const matchesSearch = !search || [post.title, post.excerpt, post.summary, post.category, ...post.tags].join(' ').toLowerCase().includes(search)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, posts, query])

  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0]
  const gridPosts = featuredPost ? filteredPosts.filter((post) => post.slug !== featuredPost.slug) : filteredPosts

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-slate-950 via-blue-900 to-sky-700 px-6 py-8 text-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] md:px-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.34em] text-white/75">ToolNest Blog</div>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.94]">Ideas, demos, and product stories worth reading.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/84 md:text-base md:leading-8">
              Browse the best ToolNest articles, including a complete website demo walkthrough, tool guides, and practical workflow posts.
            </p>

            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ['10', 'blog posts'],
                ['1', 'full demo guide'],
                ['Fast', 'filter search']
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.25rem] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm">
                  <div className="text-2xl font-black tracking-tight">{value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <label className="rounded-[1.25rem] border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/70">Search blogs</div>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by topic, tag, or keyword"
                className="mt-2 w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-white/45 focus:ring-0"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = category === activeCategory
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] ${active ? 'bg-white/95 text-slate-950 shadow-[0_10px_24px_rgba(255,255,255,0.18)]' : 'border border-white/30 bg-white/90 text-slate-950'}`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            {featuredPost ? (
              <Link href={`/blog/${featuredPost.slug}`} className="group rounded-[1.35rem] border border-white/15 bg-white/10 p-4 transition hover:bg-white/14">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/72">Featured post</div>
                <h2 className="mt-2 text-xl font-extrabold leading-tight text-white group-hover:underline">{featuredPost.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/78">{featuredPost.excerpt}</p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {gridPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group tool-card overflow-hidden p-4 md:p-5">
            <div className={`rounded-[1.35rem] bg-gradient-to-br ${post.heroTone} p-[1px]`}>
              <div className="rounded-[1.3rem] bg-white/95 p-5">
                <div className="flex items-center justify-between gap-4 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-primary)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
