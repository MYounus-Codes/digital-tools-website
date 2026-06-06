import type { MetadataRoute } from 'next'
import { blogPosts } from '../lib/blogs'
import { tools } from '../lib/tools-registry'

function buildUrl(path: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL || ''
  return site ? `${site}${path}` : path
}

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = Array.from(new Set(tools.map((tool) => tool.categorySlug)))

  return [
    {
      url: buildUrl('/'),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: buildUrl('/blog'),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: buildUrl('/faqs'),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...categories.map((category) => ({
      url: buildUrl(`/${category}`),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    })),
    ...tools.map((tool) => ({
      url: buildUrl(`/${tool.categorySlug}/${tool.slug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    })),
    ...blogPosts.map((post) => ({
      url: buildUrl(`/blog/${post.slug}`),
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.8 : 0.6
    }))
  ]
}
