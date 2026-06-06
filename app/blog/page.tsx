import type { Metadata } from 'next'
import BlogClient from './BlogClient'
import { blogCategories, blogPosts } from '../../lib/blogs'

export const metadata: Metadata = {
  title: 'Blog | ToolNest',
  description: 'Browse the best ToolNest blog posts, product demos, and workflow guides with search and category filters.'
}

export default function BlogPage() {
  return <BlogClient posts={blogPosts} categories={blogCategories} />
}
