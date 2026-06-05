const fs = require('fs')
const path = require('path')

function validate() {
  const file = path.join(__dirname, '..', 'lib', 'tools-registry.json')
  const raw = fs.readFileSync(file, 'utf8')
  const data = JSON.parse(raw)
  const tools = data.tools || []

  let ok = true
  for (const t of tools) {
    const howToCount = (t.howToSteps || []).length
    const faqCount = (t.faqs || []).length
    if (howToCount < 3) {
      console.warn(`Tool ${t.slug} should have at least 3 HowTo steps (has ${howToCount})`)
      ok = false
    }
    if (faqCount < 4) {
      console.warn(`Tool ${t.slug} should have 4 FAQs for best SEO (has ${faqCount})`)
      ok = false
    }
  }

  if (!ok) {
    console.error('Schema validation found issues.')
    process.exit(2)
  }

  console.log('All tools pass basic HowTo/FAQ schema counts.')
}

validate()
