import { Tool } from './tools-registry'

export function generateToolMetadata(tool: Tool) {
  const siteUrl = ''
  const url = siteUrl ? `${siteUrl}/${tool.categorySlug}/${tool.slug}` : `/${tool.categorySlug}/${tool.slug}`

  return {
    title: `${tool.title} — ${tool.primaryKeyword.split(' ')[0]} | ToolNest`,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: 'ToolNest',
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
          alt: tool.title
        }
      ]
    }
  }
}
