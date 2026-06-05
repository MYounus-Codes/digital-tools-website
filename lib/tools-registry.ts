export interface Tool {
  slug: string
  category: string
  categorySlug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  icon: string
  primaryKeyword: string
  secondaryKeywords: string[]
  lsiKeywords: string[]
  faqs: { q: string; a: string }[]
  howToSteps: { name: string; text: string }[]
  relatedTools: string[]
  isPopular?: boolean
  isNew?: boolean
  adSlots: {
    top: boolean
    sidebar: boolean
    belowTool: boolean
    inContent: boolean
  }
}

function makeFaqs(primaryKeyword: string, toolName: string) {
  return [
    { q: `What is ${toolName}?`, a: `${toolName} (${primaryKeyword}) is a free browser-based tool that performs ${toolName.toLowerCase()} operations without uploading data.` },
    { q: `Is my data uploaded when using ${toolName}?`, a: `No. ${toolName} runs entirely in your browser — your input never leaves your device.` },
    { q: `How accurate is this ${toolName}?`, a: `This ${toolName} provides instant client-side results suitable for general use; check specific tool notes for precision.` },
    { q: `Can I download or copy results from ${toolName}?`, a: `Yes — most tools provide copy or download options where applicable.` }
  ]
}

function makeHowTo() {
  return [
    { name: 'Step 1', text: 'Enter or paste the required input into the tool interface.' },
    { name: 'Step 2', text: 'Adjust any optional settings (units, quality, options) as needed.' },
    { name: 'Step 3', text: 'View the result and use copy/download controls if available.' }
  ]
}

export const tools: Tool[] = [
  // Calculators & Finance
  {
    slug: 'tdee-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'TDEE Calculator', shortTitle: 'TDEE',
    description: 'Estimate your Total Daily Energy Expenditure and macros.',
    longDescription: 'Calculate maintenance calories and suggested macros using validated formulas and activity multipliers.',
    icon: '🧮', primaryKeyword: 'TDEE calculator free', secondaryKeywords: ['tdee calculator','calorie calculator'], lsiKeywords: [],
    faqs: makeFaqs('TDEE calculator', 'TDEE Calculator'), howToSteps: makeHowTo(), relatedTools: ['bmi-calculator','calorie-calculator','age-calculator'], isPopular: true, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'bmi-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'BMI Calculator', shortTitle: 'BMI',
    description: 'Calculate BMI from height and weight and see category.', longDescription: 'Quick BMI checker with category labels and guidance.', icon: '⚖️', primaryKeyword: 'BMI calculator online', secondaryKeywords: ['bmi calculator','body mass index'], lsiKeywords: [],
    faqs: makeFaqs('BMI calculator online', 'BMI Calculator'), howToSteps: makeHowTo(), relatedTools: ['tdee-calculator','age-calculator','unit-converter'], isPopular: true, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'compound-interest', category: 'Calculators', categorySlug: 'calculators', title: 'Compound Interest Calculator', shortTitle: 'Compound',
    description: 'Project investment growth with compound interest and contributions.', longDescription: 'Interactive compound interest calculator with yearly breakdowns and projections.', icon: '📈', primaryKeyword: 'compound interest calculator', secondaryKeywords: ['compound interest','investment calculator'], lsiKeywords: [],
    faqs: makeFaqs('compound interest calculator', 'Compound Interest Calculator'), howToSteps: makeHowTo(), relatedTools: ['loan-calculator','savings-goal-calculator','retirement-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'loan-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'Loan / EMI Calculator', shortTitle: 'Loan',
    description: 'Calculate EMI, amortization schedule and interest breakdown.', longDescription: 'Enter loan amount, rate and term to compute monthly payments and total interest.', icon: '💳', primaryKeyword: 'loan EMI calculator', secondaryKeywords: ['emi calculator','loan calculator'], lsiKeywords: [],
    faqs: makeFaqs('loan EMI calculator', 'Loan / EMI Calculator'), howToSteps: makeHowTo(), relatedTools: ['compound-interest','savings-goal-calculator','retirement-calculator'], isPopular: true, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'tip-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'Tip Calculator', shortTitle: 'Tip',
    description: 'Split bills and calculate per-person amounts including tip percentage.', longDescription: 'Compute tips and split bills among a group with per-person totals.', icon: '💸', primaryKeyword: 'tip calculator online', secondaryKeywords: ['tip calculator','split bill'], lsiKeywords: [],
    faqs: makeFaqs('tip calculator online', 'Tip Calculator'), howToSteps: makeHowTo(), relatedTools: ['percentage-calculator','discount-calculator','unit-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'percentage-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'Percentage Calculator', shortTitle: 'Percent',
    description: 'Calculate percentages: X% of Y, increase/decrease and reverse calculations.', longDescription: 'Multiple percentage modes for common operations.', icon: '🔢', primaryKeyword: 'percentage calculator', secondaryKeywords: ['percentage calculator online'], lsiKeywords: [],
    faqs: makeFaqs('percentage calculator', 'Percentage Calculator'), howToSteps: makeHowTo(), relatedTools: ['discount-calculator','tip-calculator','unit-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'discount-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'Discount Calculator', shortTitle: 'Discount',
    description: 'Calculate sale price and savings from discounts.', longDescription: 'Enter original price and discount percentage to see sale price and savings.', icon: '🏷️', primaryKeyword: 'discount calculator free', secondaryKeywords: ['discount calculator'], lsiKeywords: [],
    faqs: makeFaqs('discount calculator free', 'Discount Calculator'), howToSteps: makeHowTo(), relatedTools: ['percentage-calculator','tip-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'age-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'Age Calculator', shortTitle: 'Age',
    description: 'Compute exact age from date of birth and next birthday countdown.', longDescription: 'Shows years, months and days and upcoming birthday countdown.', icon: '🎂', primaryKeyword: 'age calculator from date of birth', secondaryKeywords: ['age calculator'], lsiKeywords: [],
    faqs: makeFaqs('age calculator', 'Age Calculator'), howToSteps: makeHowTo(), relatedTools: ['date-difference','tdee-calculator','bmi-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'unit-converter', category: 'Calculators', categorySlug: 'calculators', title: 'Unit Converter', shortTitle: 'Convert',
    description: 'Convert length, weight, temperature and volume.', longDescription: 'Tabbed interface for common unit conversions.', icon: '🔁', primaryKeyword: 'unit converter online free', secondaryKeywords: ['unit converter','convert units'], lsiKeywords: [],
    faqs: makeFaqs('unit converter online free', 'Unit Converter'), howToSteps: makeHowTo(), relatedTools: ['percentage-calculator','bmi-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Developer Tools
  { slug: 'json-formatter', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'JSON Formatter & Validator', shortTitle: 'JSON Format',
    description: 'Beautify, minify and validate JSON with helpful error messages.', longDescription: 'Format and validate JSON with copy and download options.', icon: '🔧', primaryKeyword: 'JSON formatter online', secondaryKeywords: ['json formatter','json validator'], lsiKeywords: [],
    faqs: makeFaqs('JSON formatter online', 'JSON Formatter & Validator'), howToSteps: makeHowTo(), relatedTools: ['json-to-csv','base64-encoder','jwt-decoder'], isPopular: true, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'json-to-csv', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'JSON to CSV Converter', shortTitle: 'JSON→CSV',
    description: 'Convert JSON arrays to CSV tables and download.', longDescription: 'Flatten JSON arrays to CSV with automatic header extraction and download.', icon: '🗃️', primaryKeyword: 'JSON to CSV converter online', secondaryKeywords: ['json to csv','convert json to csv'], lsiKeywords: [],
    faqs: makeFaqs('JSON to CSV converter online', 'JSON to CSV Converter'), howToSteps: makeHowTo(), relatedTools: ['json-formatter','csv-to-json','text-sorter'], isPopular: true, isNew: false,
    adSlots: { top: true, sidebar: false, belowTool: true, inContent: true }
  },
  { slug: 'base64-encoder', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'Base64 Encoder/Decoder', shortTitle: 'Base64',
    description: 'Encode and decode text and files to/from Base64 in the browser.', longDescription: 'Text and file Base64 encoder/decoder with copy/download options.', icon: '🔐', primaryKeyword: 'base64 encoder decoder online', secondaryKeywords: ['base64 encoder','base64 decoder'], lsiKeywords: [],
    faqs: makeFaqs('base64 encoder decoder online', 'Base64 Encoder/Decoder'), howToSteps: makeHowTo(), relatedTools: ['url-encoder','image-to-base64'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'url-encoder', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'URL Encoder/Decoder', shortTitle: 'URL Encode',
    description: 'Encode and decode URLs and query strings.', longDescription: 'Percent-encode and decode URLs for safe transmission.', icon: '🌐', primaryKeyword: 'URL encoder decoder online', secondaryKeywords: ['url encoder','url decoder'], lsiKeywords: [],
    faqs: makeFaqs('URL encoder decoder online', 'URL Encoder/Decoder'), howToSteps: makeHowTo(), relatedTools: ['base64-encoder','html-encoder'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'html-encoder', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'HTML Encoder/Decoder', shortTitle: 'HTML Encode',
    description: 'Convert text to HTML entities and back.', longDescription: 'Encode/decode HTML entities for safe display in webpages.', icon: '🧾', primaryKeyword: 'HTML entity encoder online', secondaryKeywords: ['html encoder','html decoder'], lsiKeywords: [],
    faqs: makeFaqs('HTML entity encoder online', 'HTML Encoder/Decoder'), howToSteps: makeHowTo(), relatedTools: ['url-encoder','json-formatter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'regex-tester', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'Regex Tester', shortTitle: 'Regex',
    description: 'Test regular expressions with live match highlighting.', longDescription: 'Live regex tester with flags support and match highlighting.', icon: '🔎', primaryKeyword: 'regex tester online', secondaryKeywords: ['regex tester','regular expression tester'], lsiKeywords: [],
    faqs: makeFaqs('regex tester online', 'Regex Tester'), howToSteps: makeHowTo(), relatedTools: ['json-formatter','diff-checker'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'diff-checker', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'Code Diff Checker', shortTitle: 'Diff',
    description: 'Compare two text blocks and view line-by-line differences.', longDescription: 'Visual line-by-line diff with color highlights for additions and deletions.', icon: '🧾', primaryKeyword: 'diff checker online free', secondaryKeywords: ['diff checker','text diff'], lsiKeywords: [],
    faqs: makeFaqs('diff checker online free', 'Code Diff Checker'), howToSteps: makeHowTo(), relatedTools: ['regex-tester','json-formatter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'markdown-editor', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'Markdown Editor', shortTitle: 'Markdown',
    description: 'Live split-view Markdown editor with HTML preview and copy.', longDescription: 'Write Markdown and preview rendered HTML with copy/export options.', icon: '📝', primaryKeyword: 'markdown to HTML converter', secondaryKeywords: ['markdown editor','markdown to html'], lsiKeywords: [],
    faqs: makeFaqs('markdown to HTML converter', 'Markdown Editor'), howToSteps: makeHowTo(), relatedTools: ['json-formatter','html-encoder'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'jwt-decoder', category: 'Developer Tools', categorySlug: 'developer-tools', title: 'JWT Decoder', shortTitle: 'JWT',
    description: 'Decode JSON Web Tokens to inspect header and payload.', longDescription: 'Decode and inspect JWT header, payload and expiry information.', icon: '🔐', primaryKeyword: 'JWT decoder online', secondaryKeywords: ['jwt decoder','jwt inspect'], lsiKeywords: [],
    faqs: makeFaqs('JWT decoder online', 'JWT Decoder'), howToSteps: makeHowTo(), relatedTools: ['json-formatter','base64-encoder'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // SEO Tools
  { slug: 'meta-tag-generator', category: 'SEO Tools', categorySlug: 'seo-tools', title: 'Meta Tag Generator', shortTitle: 'Meta Tags',
    description: 'Generate title, description, OG and Twitter tags with live preview.', longDescription: 'Create SEO-friendly meta tags and preview social cards.', icon: '🏷️', primaryKeyword: 'meta tag generator free', secondaryKeywords: ['meta tag generator','og tag generator'], lsiKeywords: [],
    faqs: makeFaqs('meta tag generator free', 'Meta Tag Generator'), howToSteps: makeHowTo(), relatedTools: ['open-graph-preview','sitemap-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'keyword-density', category: 'SEO Tools', categorySlug: 'seo-tools', title: 'Keyword Density Checker', shortTitle: 'Keyword Density',
    description: 'Analyze text for keyword frequency and density percentages.', longDescription: 'Top keyword extraction and density percentages to assist on-page optimization.', icon: '🔎', primaryKeyword: 'keyword density checker online', secondaryKeywords: ['keyword density'], lsiKeywords: [],
    faqs: makeFaqs('keyword density checker online', 'Keyword Density Checker'), howToSteps: makeHowTo(), relatedTools: ['readability-checker','word-counter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'word-counter', category: 'SEO Tools', categorySlug: 'seo-tools', title: 'Word & Character Counter', shortTitle: 'Word Counter',
    description: 'Count words, characters, sentences, paragraphs and estimate reading time.', longDescription: 'Provides live counts and reading time estimates for SEO and content metrics.', icon: '✍️', primaryKeyword: 'word counter online', secondaryKeywords: ['word counter','character counter'], lsiKeywords: [],
    faqs: makeFaqs('word counter online', 'Word & Character Counter'), howToSteps: makeHowTo(), relatedTools: ['readability-checker','keyword-density'], isPopular: true, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'readability-checker', category: 'SEO Tools', categorySlug: 'seo-tools', title: 'Readability Analyzer', shortTitle: 'Readability',
    description: 'Compute Flesch-Kincaid and other readability scores.', longDescription: 'Analyze text for readability metrics and suggestions to improve clarity.', icon: '📚', primaryKeyword: 'readability score checker', secondaryKeywords: ['readability analyzer'], lsiKeywords: [],
    faqs: makeFaqs('readability score checker', 'Readability Analyzer'), howToSteps: makeHowTo(), relatedTools: ['word-counter','keyword-density'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'open-graph-preview', category: 'SEO Tools', categorySlug: 'seo-tools', title: 'Open Graph Preview', shortTitle: 'OG Preview',
    description: 'Preview how link cards appear across social platforms.', longDescription: 'Live preview for Open Graph / Twitter cards from provided metadata.', icon: '📱', primaryKeyword: 'open graph preview tool', secondaryKeywords: ['open graph preview'], lsiKeywords: [],
    faqs: makeFaqs('open graph preview tool', 'Open Graph Preview'), howToSteps: makeHowTo(), relatedTools: ['meta-tag-generator','sitemap-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'robots-txt-generator', category: 'SEO Tools', categorySlug: 'seo-tools', title: 'Robots.txt Generator', shortTitle: 'Robots.txt',
    description: 'Visual form to generate valid robots.txt files.', longDescription: 'Build robots.txt directives for crawling control and copy or download.', icon: '🤖', primaryKeyword: 'robots.txt generator online', secondaryKeywords: ['robots txt generator'], lsiKeywords: [],
    faqs: makeFaqs('robots.txt generator online', 'Robots.txt Generator'), howToSteps: makeHowTo(), relatedTools: ['sitemap-generator','meta-tag-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'sitemap-generator', category: 'SEO Tools', categorySlug: 'seo-tools', title: 'Sitemap Generator', shortTitle: 'Sitemap',
    description: 'Generate XML sitemaps to submit to search engines.', longDescription: 'Add URLs and export a valid XML sitemap for SEO.', icon: '🗺️', primaryKeyword: 'XML sitemap generator free', secondaryKeywords: ['sitemap generator'], lsiKeywords: [],
    faqs: makeFaqs('XML sitemap generator free', 'Sitemap Generator'), howToSteps: makeHowTo(), relatedTools: ['robots-txt-generator','meta-tag-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Image Tools
  { slug: 'image-compressor', category: 'Image Tools', categorySlug: 'image-tools', title: 'Image Compressor', shortTitle: 'Compress',
    description: 'Compress images client-side with quality slider and download.', longDescription: 'Drag & drop images and compress locally with adjustable quality.', icon: '🖼️', primaryKeyword: 'compress image online free', secondaryKeywords: ['image compressor','compress image'], lsiKeywords: [],
    faqs: makeFaqs('compress image online free', 'Image Compressor'), howToSteps: makeHowTo(), relatedTools: ['image-resizer','image-to-base64'], isPopular: true, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'image-resizer', category: 'Image Tools', categorySlug: 'image-tools', title: 'Image Resizer', shortTitle: 'Resize',
    description: 'Resize images by pixels or percentage with aspect lock.', longDescription: 'Client-side resizing with aspect ratio options and batch support.', icon: '📏', primaryKeyword: 'resize image online free', secondaryKeywords: ['image resizer'], lsiKeywords: [],
    faqs: makeFaqs('resize image online free', 'Image Resizer'), howToSteps: makeHowTo(), relatedTools: ['image-compressor','image-cropper'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'image-to-base64', category: 'Image Tools', categorySlug: 'image-tools', title: 'Image to Base64', shortTitle: 'Img→Base64',
    description: 'Convert images to Base64 strings for embedding.', longDescription: 'Get base64 strings for embedding images into HTML/CSS.', icon: '🧩', primaryKeyword: 'image to base64 converter', secondaryKeywords: ['image base64','img to base64'], lsiKeywords: [],
    faqs: makeFaqs('image to base64 converter', 'Image to Base64'), howToSteps: makeHowTo(), relatedTools: ['image-converter','favicon-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'image-converter', category: 'Image Tools', categorySlug: 'image-tools', title: 'Image Format Converter', shortTitle: 'Convert Img',
    description: 'Convert between JPG, PNG, WebP and GIF client-side.', longDescription: 'Change image formats safely in the browser with download support.', icon: '🔁', primaryKeyword: 'convert image to JPG PNG WebP', secondaryKeywords: ['image converter','convert image'], lsiKeywords: [],
    faqs: makeFaqs('convert image to JPG PNG WebP', 'Image Format Converter'), howToSteps: makeHowTo(), relatedTools: ['image-resizer','image-compressor'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'image-cropper', category: 'Image Tools', categorySlug: 'image-tools', title: 'Image Cropper', shortTitle: 'Crop',
    description: 'Crop images with freeform or preset aspect ratios.', longDescription: 'Canvas-based cropping with preset ratios and export options.', icon: '✂️', primaryKeyword: 'crop image online free', secondaryKeywords: ['image cropper'], lsiKeywords: [],
    faqs: makeFaqs('crop image online free', 'Image Cropper'), howToSteps: makeHowTo(), relatedTools: ['image-resizer','favicon-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'image-metadata', category: 'Image Tools', categorySlug: 'image-tools', title: 'Image Metadata Viewer', shortTitle: 'EXIF',
    description: 'View EXIF and image metadata client-side.', longDescription: 'Upload images to inspect EXIF fields, camera, GPS and more locally.', icon: '🧾', primaryKeyword: 'EXIF data viewer online', secondaryKeywords: ['exif viewer','image metadata'], lsiKeywords: [],
    faqs: makeFaqs('EXIF data viewer online', 'Image Metadata Viewer'), howToSteps: makeHowTo(), relatedTools: ['image-compressor','image-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Text Tools
  { slug: 'case-converter', category: 'Text Tools', categorySlug: 'text-tools', title: 'Case Converter', shortTitle: 'Case',
    description: 'Convert text case: UPPER, lower, Title, camelCase and more.', longDescription: 'Multiple case transformations for pasted text with copy button.', icon: '🔤', primaryKeyword: 'text case converter online', secondaryKeywords: ['case converter','text case'], lsiKeywords: [],
    faqs: makeFaqs('text case converter online', 'Case Converter'), howToSteps: makeHowTo(), relatedTools: ['text-reversal','duplicate-remover'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'text-reversal', category: 'Text Tools', categorySlug: 'text-tools', title: 'Text Reverser', shortTitle: 'Reverse',
    description: 'Reverse characters, words, or lines in text.', longDescription: 'Reverse operations with options and copy/export.', icon: '🔁', primaryKeyword: 'reverse text generator online', secondaryKeywords: ['text reverser','reverse text'], lsiKeywords: [],
    faqs: makeFaqs('reverse text generator online', 'Text Reverser'), howToSteps: makeHowTo(), relatedTools: ['case-converter','text-sorter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'duplicate-remover', category: 'Text Tools', categorySlug: 'text-tools', title: 'Duplicate Line Remover', shortTitle: 'Dedupe',
    description: 'Remove duplicate lines and show counts.', longDescription: 'Deduplicate pasted text and show frequency counts with copy.', icon: '🧹', primaryKeyword: 'remove duplicate lines online', secondaryKeywords: ['duplicate remover','dedupe lines'], lsiKeywords: [],
    faqs: makeFaqs('remove duplicate lines online', 'Duplicate Line Remover'), howToSteps: makeHowTo(), relatedTools: ['text-sorter','string-extractor'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'text-sorter', category: 'Text Tools', categorySlug: 'text-tools', title: 'Text Sorter', shortTitle: 'Sorter',
    description: 'Sort lines alphabetically, by length, or randomize.', longDescription: 'Sort and manipulate lines with various algorithms and copy.', icon: '↕️', primaryKeyword: 'sort lines of text online', secondaryKeywords: ['text sorter','sort lines'], lsiKeywords: [],
    faqs: makeFaqs('sort lines of text online', 'Text Sorter'), howToSteps: makeHowTo(), relatedTools: ['duplicate-remover','text-reversal'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'random-word-generator', category: 'Text Tools', categorySlug: 'text-tools', title: 'Random Word Generator', shortTitle: 'Random Words',
    description: 'Generate random words, lists or lorem-style text.', longDescription: 'Generate words or phrases for creative use with copy/export.', icon: '🎲', primaryKeyword: 'random word generator', secondaryKeywords: ['random words generator'], lsiKeywords: [],
    faqs: makeFaqs('random word generator', 'Random Word Generator'), howToSteps: makeHowTo(), relatedTools: ['lorem-ipsum','slug-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'lorem-ipsum', category: 'Text Tools', categorySlug: 'text-tools', title: 'Lorem Ipsum Generator', shortTitle: 'Lorem Ipsum',
    description: 'Generate placeholder text in words, paragraphs or lists.', longDescription: 'Create lorem ipsum blocks for layouts, wireframes and content drafts.', icon: '📄', primaryKeyword: 'lorem ipsum generator', secondaryKeywords: ['lorem ipsum'], lsiKeywords: [],
    faqs: makeFaqs('lorem ipsum generator', 'Lorem Ipsum Generator'), howToSteps: makeHowTo(), relatedTools: ['random-word-generator','slug-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'slug-generator', category: 'Text Tools', categorySlug: 'text-tools', title: 'Slug Generator', shortTitle: 'Slug',
    description: 'Convert title text into SEO-friendly URL slugs.', longDescription: 'Turn headlines into clean slugs with separator options and case normalization.', icon: '🔗', primaryKeyword: 'URL slug generator online', secondaryKeywords: ['slug generator'], lsiKeywords: [],
    faqs: makeFaqs('URL slug generator online', 'Slug Generator'), howToSteps: makeHowTo(), relatedTools: ['case-converter','duplicate-remover'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'string-extractor', category: 'Text Tools', categorySlug: 'text-tools', title: 'String Extractor', shortTitle: 'Extractor',
    description: 'Extract emails, URLs and phone numbers from text.', longDescription: 'Find structured text like emails, URLs and phone numbers inside pasted content.', icon: '🧲', primaryKeyword: 'extract emails from text online', secondaryKeywords: ['string extractor','extract text'], lsiKeywords: [],
    faqs: makeFaqs('extract emails from text online', 'String Extractor'), howToSteps: makeHowTo(), relatedTools: ['duplicate-remover','text-sorter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'password-generator', category: 'Security Tools', categorySlug: 'security-tools', title: 'Password Generator', shortTitle: 'Password',
    description: 'Generate secure passwords with configurable options.', longDescription: 'Control length, charset and exclude ambiguous characters with strength meter.', icon: '🔑', primaryKeyword: 'random password generator', secondaryKeywords: ['password generator','secure password'], lsiKeywords: [],
    faqs: makeFaqs('random password generator', 'Password Generator'), howToSteps: makeHowTo(), relatedTools: ['password-strength','uuid-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Design Tools
  { slug: 'color-palette', category: 'Design Tools', categorySlug: 'design-tools', title: 'Color Palette Generator', shortTitle: 'Palette',
    description: 'Generate and export color palettes with lockable colors.', longDescription: 'Random palette generation, lock colors and export HEX/CSS variables for design use.', icon: '🎨', primaryKeyword: 'color palette generator online', secondaryKeywords: ['color palette generator'], lsiKeywords: [],
    faqs: makeFaqs('color palette generator online', 'Color Palette Generator'), howToSteps: makeHowTo(), relatedTools: ['gradient-builder','favicon-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'gradient-builder', category: 'Design Tools', categorySlug: 'design-tools', title: 'CSS Gradient Builder', shortTitle: 'Gradient',
    description: 'Create linear and radial CSS gradients with multiple stops.', longDescription: 'Visual gradient editor with copyable CSS output.', icon: '🌈', primaryKeyword: 'CSS gradient generator online', secondaryKeywords: ['gradient generator','css gradient builder'], lsiKeywords: [],
    faqs: makeFaqs('CSS gradient generator online', 'CSS Gradient Builder'), howToSteps: makeHowTo(), relatedTools: ['color-palette','css-button-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'box-shadow-builder', category: 'Design Tools', categorySlug: 'design-tools', title: 'Box Shadow Builder', shortTitle: 'Box Shadow',
    description: 'Visually build CSS box-shadows with multiple layers.', longDescription: 'Sliders for blur, spread, color and inset with CSS output.', icon: '🧱', primaryKeyword: 'box shadow generator CSS', secondaryKeywords: ['box shadow generator'], lsiKeywords: [],
    faqs: makeFaqs('box shadow generator CSS', 'Box Shadow Builder'), howToSteps: makeHowTo(), relatedTools: ['border-radius-builder','css-button-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'border-radius-builder', category: 'Design Tools', categorySlug: 'design-tools', title: 'Border Radius Builder', shortTitle: 'Border Radius',
    description: 'Control 8-point border radii and export CSS.', longDescription: 'Visual control for border radii and copyable code.', icon: '🔲', primaryKeyword: 'border radius generator', secondaryKeywords: ['border radius generator'], lsiKeywords: [],
    faqs: makeFaqs('border radius generator', 'Border Radius Builder'), howToSteps: makeHowTo(), relatedTools: ['box-shadow-builder','css-button-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'css-button-generator', category: 'Design Tools', categorySlug: 'design-tools', title: 'CSS Button Generator', shortTitle: 'Button Gen',
    description: 'Style every button property and copy CSS+HTML.', longDescription: 'Generate accessible CSS button styles and copy HTML snippets.', icon: '🔘', primaryKeyword: 'CSS button generator online', secondaryKeywords: ['css button generator'], lsiKeywords: [],
    faqs: makeFaqs('CSS button generator online', 'CSS Button Generator'), howToSteps: makeHowTo(), relatedTools: ['box-shadow-builder','border-radius-builder'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'favicon-generator', category: 'Design Tools', categorySlug: 'design-tools', title: 'Favicon Generator', shortTitle: 'Favicon',
    description: 'Create ICO/PNG favicons from images or text.', longDescription: 'Generate favicon assets and HTML link tags for multiple sizes.', icon: '🔖', primaryKeyword: 'favicon generator online free', secondaryKeywords: ['favicon generator'], lsiKeywords: [],
    faqs: makeFaqs('favicon generator online free', 'Favicon Generator'), howToSteps: makeHowTo(), relatedTools: ['image-resizer','image-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Math Tools
  { slug: 'scientific-calculator', category: 'Math Tools', categorySlug: 'math-tools', title: 'Scientific Calculator', shortTitle: 'Scientific',
    description: 'Full keyboard-based scientific calculator with history.', longDescription: 'Advanced math functions with history and memory features.', icon: '🧮', primaryKeyword: 'scientific calculator online', secondaryKeywords: ['scientific calculator'], lsiKeywords: [],
    faqs: makeFaqs('scientific calculator online', 'Scientific Calculator'), howToSteps: makeHowTo(), relatedTools: ['fraction-calculator','number-base-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'fraction-calculator', category: 'Math Tools', categorySlug: 'math-tools', title: 'Fraction Calculator', shortTitle: 'Fraction',
    description: 'Add, subtract, multiply and divide fractions with simplification.', longDescription: 'Fraction arithmetic with step-by-step simplification and conversion.', icon: '➗', primaryKeyword: 'fraction calculator online', secondaryKeywords: ['fraction calculator'], lsiKeywords: [],
    faqs: makeFaqs('fraction calculator online', 'Fraction Calculator'), howToSteps: makeHowTo(), relatedTools: ['scientific-calculator','prime-checker'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'prime-checker', category: 'Math Tools', categorySlug: 'math-tools', title: 'Prime Number Checker', shortTitle: 'Prime',
    description: 'Check if a number is prime and show factorization.', longDescription: 'Fast primality test and factor output for integers.', icon: '🔢', primaryKeyword: 'prime number checker online', secondaryKeywords: ['prime checker'], lsiKeywords: [],
    faqs: makeFaqs('prime number checker online', 'Prime Number Checker'), howToSteps: makeHowTo(), relatedTools: ['number-base-converter','roman-numeral'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'roman-numeral', category: 'Math Tools', categorySlug: 'math-tools', title: 'Roman Numeral Converter', shortTitle: 'Roman',
    description: 'Convert integers to Roman numerals and back.', longDescription: 'Bidirectional conversion with table reference.', icon: '📜', primaryKeyword: 'roman numerals converter online', secondaryKeywords: ['roman numeral converter'], lsiKeywords: [],
    faqs: makeFaqs('roman numerals converter online', 'Roman Numeral Converter'), howToSteps: makeHowTo(), relatedTools: ['number-base-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'number-base-converter', category: 'Math Tools', categorySlug: 'math-tools', title: 'Number Base Converter', shortTitle: 'Base Convert',
    description: 'Convert between binary, octal, decimal and hexadecimal.', longDescription: 'Instant conversions and bit-length display.', icon: '🔢', primaryKeyword: 'binary decimal hex converter', secondaryKeywords: ['base converter','number base converter'], lsiKeywords: [],
    faqs: makeFaqs('binary decimal hex converter', 'Number Base Converter'), howToSteps: makeHowTo(), relatedTools: ['prime-checker','scientific-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Daily Life Tools
  { slug: 'date-difference', category: 'Daily Life', categorySlug: 'daily-life', title: 'Date Difference Calculator', shortTitle: 'Date Diff',
    description: 'Calculate days, weeks, months and years between two dates.', longDescription: 'Accurate date difference with leap-year awareness and display formats.', icon: '📅', primaryKeyword: 'days between two dates calculator', secondaryKeywords: ['date difference calculator'], lsiKeywords: [],
    faqs: makeFaqs('days between two dates calculator', 'Date Difference Calculator'), howToSteps: makeHowTo(), relatedTools: ['age-calculator','timezone-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'world-clock', category: 'Daily Life', categorySlug: 'daily-life', title: 'World Clock', shortTitle: 'World Clock',
    description: 'Live clocks for multiple cities with add/remove support.', longDescription: 'Track multiple timezones with visual clocks and offsets.', icon: '🕒', primaryKeyword: 'world clock online', secondaryKeywords: ['world clock'], lsiKeywords: [],
    faqs: makeFaqs('world clock online', 'World Clock'), howToSteps: makeHowTo(), relatedTools: ['timezone-converter'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'timezone-converter', category: 'Daily Life', categorySlug: 'daily-life', title: 'Timezone Converter', shortTitle: 'Timezone',
    description: 'Convert times between multiple time zones simultaneously.', longDescription: 'Pick a local time and convert to many zones with DST awareness.', icon: '🌍', primaryKeyword: 'time zone converter online', secondaryKeywords: ['timezone converter'], lsiKeywords: [],
    faqs: makeFaqs('time zone converter online', 'Timezone Converter'), howToSteps: makeHowTo(), relatedTools: ['world-clock','date-difference'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'sleep-calculator', category: 'Daily Life', categorySlug: 'daily-life', title: 'Sleep Cycle Calculator', shortTitle: 'Sleep',
    description: 'Calculate optimal sleep/wake times based on cycles.', longDescription: 'Suggests sleep cycles and best wake times for restorative sleep.', icon: '😴', primaryKeyword: 'sleep calculator online', secondaryKeywords: ['sleep calculator'], lsiKeywords: [],
    faqs: makeFaqs('sleep calculator online', 'Sleep Cycle Calculator'), howToSteps: makeHowTo(), relatedTools: ['water-intake','ovulation-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'water-intake', category: 'Daily Life', categorySlug: 'daily-life', title: 'Water Intake Calculator', shortTitle: 'Water',
    description: 'Estimate daily water needs based on weight and activity.', longDescription: 'Recommended daily water intake in ml/oz based on personal inputs.', icon: '💧', primaryKeyword: 'daily water intake calculator', secondaryKeywords: ['water intake calculator'], lsiKeywords: [],
    faqs: makeFaqs('daily water intake calculator', 'Water Intake Calculator'), howToSteps: makeHowTo(), relatedTools: ['calorie-calculator','sleep-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'ovulation-calculator', category: 'Daily Life', categorySlug: 'daily-life', title: 'Ovulation Calculator', shortTitle: 'Ovulation',
    description: 'Estimate fertile window based on last period and cycle length.', longDescription: 'Display fertile window calendar and predicted ovulation date.', icon: '🗓️', primaryKeyword: 'ovulation calculator online', secondaryKeywords: ['ovulation calculator'], lsiKeywords: [],
    faqs: makeFaqs('ovulation calculator online', 'Ovulation Calculator'), howToSteps: makeHowTo(), relatedTools: ['due-date-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'due-date-calculator', category: 'Daily Life', categorySlug: 'daily-life', title: 'Pregnancy Due Date Calculator', shortTitle: 'Due Date',
    description: 'Estimate due date from last menstrual period with trimester breakdown.', longDescription: 'Calculate estimated due date and show trimester milestones.', icon: '🤰', primaryKeyword: 'due date calculator online', secondaryKeywords: ['due date calculator'], lsiKeywords: [],
    faqs: makeFaqs('due date calculator online', 'Pregnancy Due Date Calculator'), howToSteps: makeHowTo(), relatedTools: ['ovulation-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'retirement-calculator', category: 'Daily Life', categorySlug: 'daily-life', title: 'Retirement Calculator', shortTitle: 'Retirement',
    description: 'Project retirement savings based on current contributions and growth.', longDescription: 'Estimate retirement fund projections with adjustable rates and contributions.', icon: '🏦', primaryKeyword: 'retirement savings calculator', secondaryKeywords: ['retirement calculator'], lsiKeywords: [],
    faqs: makeFaqs('retirement savings calculator', 'Retirement Calculator'), howToSteps: makeHowTo(), relatedTools: ['compound-interest','savings-goal-calculator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Security & Privacy (some overlap with Text Tools list)
  { slug: 'password-strength', category: 'Security Tools', categorySlug: 'security-tools', title: 'Password Strength Checker', shortTitle: 'Pwd Strength',
    description: 'Real-time scoring, entropy and crack-time estimates.', longDescription: 'Evaluate password strength and receive improvement suggestions.', icon: '🔒', primaryKeyword: 'password strength checker online', secondaryKeywords: ['password strength checker'], lsiKeywords: [],
    faqs: makeFaqs('password strength checker online', 'Password Strength Checker'), howToSteps: makeHowTo(), relatedTools: ['password-generator','hash-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'hash-generator', category: 'Security Tools', categorySlug: 'security-tools', title: 'Hash Generator', shortTitle: 'Hash',
    description: 'Generate MD5, SHA1, SHA256 and SHA512 hashes from text.', longDescription: 'Client-side hashing tools for quick checks and testing.', icon: '🔐', primaryKeyword: 'MD5 SHA256 hash generator online', secondaryKeywords: ['hash generator','md5 sha256'], lsiKeywords: [],
    faqs: makeFaqs('MD5 SHA256 hash generator online', 'Hash Generator'), howToSteps: makeHowTo(), relatedTools: ['uuid-generator','password-strength'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },
  { slug: 'uuid-generator', category: 'Security Tools', categorySlug: 'security-tools', title: 'UUID Generator', shortTitle: 'UUID',
    description: 'Generate UUID v1/v4 and bulk generate identifiers.', longDescription: 'Create UUIDs client-side with copy and bulk export.', icon: '🔁', primaryKeyword: 'UUID generator online', secondaryKeywords: ['uuid generator'], lsiKeywords: [],
    faqs: makeFaqs('UUID generator online', 'UUID Generator'), howToSteps: makeHowTo(), relatedTools: ['hash-generator','password-generator'], isPopular: false, isNew: false,
    adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  },

  // Finish registry with a few cross-category helpers
  { slug: 'calorie-calculator', category: 'Calculators', categorySlug: 'calculators', title: 'Calorie Calculator', shortTitle: 'Calories',
    description: 'Estimate daily calorie targets for goals.', longDescription: 'Calorie estimation with goal adjustments and timelines.', icon: '🍎', primaryKeyword: 'calorie calculator online', secondaryKeywords: ['calorie calculator'], lsiKeywords: [],
    faqs: makeFaqs('calorie calculator online', 'Calorie Calculator'), howToSteps: makeHowTo(), relatedTools: ['tdee-calculator','bmi-calculator'], isPopular: false, isNew: false, adSlots: { top: true, sidebar: true, belowTool: true, inContent: true }
  }
]
