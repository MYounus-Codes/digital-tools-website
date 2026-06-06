import type { Metadata } from 'next'
import FaqsClient from './FaqsClient'
import { faqItems } from '../../lib/faqs'

export const metadata: Metadata = {
  title: 'FAQs for ToolNest Tools, Calculators, SEO, Image, and Developer Utilities',
  description:
    'Find answers about ToolNest calculators, SEO tools, image tools, developer tools, text tools, category pages, privacy, mobile support, and how the site works.',
  keywords: [
    'ToolNest FAQs',
    'free online tools',
    'calculators',
    'SEO tools',
    'image tools',
    'developer tools',
    'text tools',
    'password generator',
    'JSON formatter',
    'word counter',
    'image compressor',
    'browser tools',
    'mobile friendly tools'
  ]
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'FAQs', item: `${siteUrl}/faqs` }
  ]
}

export default function FaqsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <FaqsClient />
    </>
  )
}
