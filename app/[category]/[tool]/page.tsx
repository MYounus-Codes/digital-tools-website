import ToolPageSEO from '../../../components/seo/ToolPageSEO'
import { tools } from '../../../lib/tools-registry'
import dynamic from 'next/dynamic'

const Tdee = dynamic(() => import('../../../components/tools/TdeeCalculator').then(m => m.default), { ssr: false })
const JsonToCsv = dynamic(() => import('../../../components/tools/JsonToCsv').then(m => m.default), { ssr: false })
const BackgroundRemover = dynamic(() => import('../../../components/tools/BackgroundRemover').then(m => m.default), { ssr: false })
const ImageCompressor = dynamic(() => import('../../../components/tools/ImageCompressor').then(m => m.default), { ssr: false })
const ColorPalette = dynamic(() => import('../../../components/tools/ColorPalette').then(m => m.default), { ssr: false })
const PasswordGenerator = dynamic(() => import('../../../components/tools/PasswordGenerator').then(m => m.default), { ssr: false })
const WordCounter = dynamic(() => import('../../../components/tools/WordCounter').then(m => m.default), { ssr: false })
const Bmi = dynamic(() => import('../../../components/tools/BmiCalculator').then(m => m.default), { ssr: false })
const Compound = dynamic(() => import('../../../components/tools/CompoundInterest').then(m => m.default), { ssr: false })
const Loan = dynamic(() => import('../../../components/tools/LoanCalculator').then(m => m.default), { ssr: false })
const Unit = dynamic(() => import('../../../components/tools/UnitConverter').then(m => m.default), { ssr: false })
const JsonFmt = dynamic(() => import('../../../components/tools/JsonFormatter').then(m => m.default), { ssr: false })
const PasswordStrength = dynamic(() => import('../../../components/tools/PasswordStrength').then(m => m.default), { ssr: false })
const HashGenerator = dynamic(() => import('../../../components/tools/HashGenerator').then(m => m.default), { ssr: false })
const UuidGenerator = dynamic(() => import('../../../components/tools/UuidGenerator').then(m => m.default), { ssr: false })
const DateDifference = dynamic(() => import('../../../components/tools/DateDifference').then(m => m.default), { ssr: false })
const WorldClock = dynamic(() => import('../../../components/tools/WorldClock').then(m => m.default), { ssr: false })
const SavingsGoal = dynamic(() => import('../../../components/tools/SavingsGoalCalculator').then(m => m.default), { ssr: false })
const Calorie = dynamic(() => import('../../../components/tools/CalorieCalculator').then(m => m.default), { ssr: false })
const CaseConverter = dynamic(() => import('../../../components/tools/CaseConverter').then(m => m.default), { ssr: false })
const TextSorter = dynamic(() => import('../../../components/tools/TextSorter').then(m => m.default), { ssr: false })
const DuplicateRemover = dynamic(() => import('../../../components/tools/DuplicateRemover').then(m => m.default), { ssr: false })
const RandomWordGenerator = dynamic(() => import('../../../components/tools/RandomWordGenerator').then(m => m.default), { ssr: false })
const LoremIpsumGenerator = dynamic(() => import('../../../components/tools/LoremIpsumGenerator').then(m => m.default), { ssr: false })
const SlugGenerator = dynamic(() => import('../../../components/tools/SlugGenerator').then(m => m.default), { ssr: false })
const StringExtractor = dynamic(() => import('../../../components/tools/StringExtractor').then(m => m.default), { ssr: false })
const ScientificCalculator = dynamic(() => import('../../../components/tools/ScientificCalculator').then(m => m.default), { ssr: false })
const FractionCalculator = dynamic(() => import('../../../components/tools/FractionCalculator').then(m => m.default), { ssr: false })
const PrimeChecker = dynamic(() => import('../../../components/tools/PrimeChecker').then(m => m.default), { ssr: false })
const RomanNumeralConverter = dynamic(() => import('../../../components/tools/RomanNumeralConverter').then(m => m.default), { ssr: false })
const NumberBaseConverter = dynamic(() => import('../../../components/tools/NumberBaseConverter').then(m => m.default), { ssr: false })
const TimezoneConverter = dynamic(() => import('../../../components/tools/TimezoneConverter').then(m => m.default), { ssr: false })
const SleepCalculator = dynamic(() => import('../../../components/tools/SleepCalculator').then(m => m.default), { ssr: false })
const WaterIntakeCalculator = dynamic(() => import('../../../components/tools/WaterIntakeCalculator').then(m => m.default), { ssr: false })
const OvulationCalculator = dynamic(() => import('../../../components/tools/OvulationCalculator').then(m => m.default), { ssr: false })
const DueDateCalculator = dynamic(() => import('../../../components/tools/DueDateCalculator').then(m => m.default), { ssr: false })
const RetirementCalculator = dynamic(() => import('../../../components/tools/RetirementCalculator').then(m => m.default), { ssr: false })
const GradientBuilder = dynamic(() => import('../../../components/tools/GradientBuilder').then(m => m.default), { ssr: false })
const BoxShadowBuilder = dynamic(() => import('../../../components/tools/BoxShadowBuilder').then(m => m.default), { ssr: false })
const BorderRadiusBuilder = dynamic(() => import('../../../components/tools/BorderRadiusBuilder').then(m => m.default), { ssr: false })
const CssButtonGenerator = dynamic(() => import('../../../components/tools/CssButtonGenerator').then(m => m.default), { ssr: false })
const FaviconGenerator = dynamic(() => import('../../../components/tools/FaviconGenerator').then(m => m.default), { ssr: false })
const MetaTagGenerator = dynamic(() => import('../../../components/tools/MetaTagGenerator').then(m => m.default), { ssr: false })
const KeywordDensityChecker = dynamic(() => import('../../../components/tools/KeywordDensityChecker').then(m => m.default), { ssr: false })
const ReadabilityChecker = dynamic(() => import('../../../components/tools/ReadabilityChecker').then(m => m.default), { ssr: false })
const OpenGraphPreview = dynamic(() => import('../../../components/tools/OpenGraphPreview').then(m => m.default), { ssr: false })
const RobotsTxtGenerator = dynamic(() => import('../../../components/tools/RobotsTxtGenerator').then(m => m.default), { ssr: false })
const SitemapGenerator = dynamic(() => import('../../../components/tools/SitemapGenerator').then(m => m.default), { ssr: false })
const Base64Encoder = dynamic(() => import('../../../components/tools/Base64Encoder').then(m => m.default), { ssr: false })
const UrlEncoder = dynamic(() => import('../../../components/tools/UrlEncoder').then(m => m.default), { ssr: false })
const HtmlEncoder = dynamic(() => import('../../../components/tools/HtmlEncoder').then(m => m.default), { ssr: false })
const RegexTester = dynamic(() => import('../../../components/tools/RegexTester').then(m => m.default), { ssr: false })
const DiffChecker = dynamic(() => import('../../../components/tools/DiffChecker').then(m => m.default), { ssr: false })
const MarkdownEditor = dynamic(() => import('../../../components/tools/MarkdownEditor').then(m => m.default), { ssr: false })
const JwtDecoder = dynamic(() => import('../../../components/tools/JwtDecoder').then(m => m.default), { ssr: false })
const ImageResizer = dynamic(() => import('../../../components/tools/ImageResizer').then(m => m.default), { ssr: false })
const ImageConverter = dynamic(() => import('../../../components/tools/ImageConverter').then(m => m.default), { ssr: false })
const ImageCropper = dynamic(() => import('../../../components/tools/ImageCropper').then(m => m.default), { ssr: false })
const ImageMetadata = dynamic(() => import('../../../components/tools/ImageMetadata').then(m => m.default), { ssr: false })
const PdfMerger = dynamic(() => import('../../../components/tools/PdfMerger').then(m => m.default), { ssr: false })
const PdfSplitter = dynamic(() => import('../../../components/tools/PdfSplitter').then(m => m.default), { ssr: false })
const PdfCompressor = dynamic(() => import('../../../components/tools/PdfCompressor').then(m => m.default), { ssr: false })
const PdfToExcel = dynamic(() => import('../../../components/tools/PdfToExcel').then(m => m.default), { ssr: false })
const ExcelToPdf = dynamic(() => import('../../../components/tools/ExcelToPdf').then(m => m.default), { ssr: false })
const PdfToWord = dynamic(() => import('../../../components/tools/PdfToWord').then(m => m.default), { ssr: false })
const WordToPdf = dynamic(() => import('../../../components/tools/WordToPdf').then(m => m.default), { ssr: false })
const PdfToPowerpoint = dynamic(() => import('../../../components/tools/PdfToPowerpoint').then(m => m.default), { ssr: false })
const PowerpointToPdf = dynamic(() => import('../../../components/tools/PowerpointToPdf').then(m => m.default), { ssr: false })
const Placeholder = dynamic(() => import('../../../components/tools/PlaceholderTool').then(m => m.default), { ssr: false })

function selectComponent(slug: string) {
  switch (slug) {
    case 'tdee-calculator': return Tdee
    case 'json-to-csv': return JsonToCsv
    case 'background-remover': return BackgroundRemover
    case 'image-compressor': return ImageCompressor
    case 'color-palette': return ColorPalette
    case 'password-generator': return PasswordGenerator
    case 'word-counter': return WordCounter
    case 'bmi-calculator': return Bmi
    case 'compound-interest': return Compound
    case 'loan-calculator': return Loan
    case 'unit-converter': return Unit
    case 'json-formatter': return JsonFmt
    case 'password-strength': return PasswordStrength
    case 'hash-generator': return HashGenerator
    case 'uuid-generator': return UuidGenerator
    case 'date-difference': return DateDifference
    case 'world-clock': return WorldClock
    case 'savings-goal-calculator': return SavingsGoal
    case 'calorie-calculator': return Calorie
    case 'case-converter': return CaseConverter
    case 'text-sorter': return TextSorter
    case 'duplicate-remover': return DuplicateRemover
    case 'random-word-generator': return RandomWordGenerator
    case 'lorem-ipsum': return LoremIpsumGenerator
    case 'slug-generator': return SlugGenerator
    case 'string-extractor': return StringExtractor
    case 'scientific-calculator': return ScientificCalculator
    case 'fraction-calculator': return FractionCalculator
    case 'prime-checker': return PrimeChecker
    case 'roman-numeral': return RomanNumeralConverter
    case 'number-base-converter': return NumberBaseConverter
    case 'timezone-converter': return TimezoneConverter
    case 'sleep-calculator': return SleepCalculator
    case 'water-intake': return WaterIntakeCalculator
    case 'ovulation-calculator': return OvulationCalculator
    case 'due-date-calculator': return DueDateCalculator
    case 'retirement-calculator': return RetirementCalculator
    case 'gradient-builder': return GradientBuilder
    case 'box-shadow-builder': return BoxShadowBuilder
    case 'border-radius-builder': return BorderRadiusBuilder
    case 'css-button-generator': return CssButtonGenerator
    case 'favicon-generator': return FaviconGenerator
    case 'meta-tag-generator': return MetaTagGenerator
    case 'keyword-density': return KeywordDensityChecker
    case 'readability-checker': return ReadabilityChecker
    case 'open-graph-preview': return OpenGraphPreview
    case 'robots-txt-generator': return RobotsTxtGenerator
    case 'sitemap-generator': return SitemapGenerator
    case 'base64-encoder': return Base64Encoder
    case 'url-encoder': return UrlEncoder
    case 'html-encoder': return HtmlEncoder
    case 'regex-tester': return RegexTester
    case 'diff-checker': return DiffChecker
    case 'markdown-editor': return MarkdownEditor
    case 'jwt-decoder': return JwtDecoder
    case 'image-resizer': return ImageResizer
    case 'image-converter': return ImageConverter
    case 'image-cropper': return ImageCropper
    case 'image-metadata': return ImageMetadata
    case 'pdf-merger': return PdfMerger
    case 'pdf-splitter': return PdfSplitter
    case 'pdf-compressor': return PdfCompressor
    case 'pdf-to-excel': return Placeholder
    case 'excel-to-pdf': return Placeholder
    case 'pdf-to-word': return Placeholder
    case 'word-to-pdf': return Placeholder
    case 'pdf-to-powerpoint': return Placeholder
    case 'powerpoint-to-pdf': return Placeholder
    default: return Placeholder
  }
}

export default function ToolPage({ params }: { params: { category: string, tool: string } }) {
  const { category, tool } = params
  const item = tools.find((t) => t.slug === tool && t.categorySlug === category)

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-2xl font-semibold">Tool not found</h1>
        <p className="text-[var(--text-muted)] mt-2">No tool found for {category}/{tool}</p>
      </div>
    )
  }

  const Comp = selectComponent(tool)

  return (
    <div className="space-y-8 pb-8">
      <section className="site-card overflow-hidden px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="section-kicker">Tool</div>
            <h1 className="section-title mt-2 text-[var(--text-primary)]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}>{item.title}</h1>
            <p className="section-copy mt-4 max-w-2xl">{item.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[var(--text-primary)]">
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2">Client-side</span>
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2">Private</span>
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2">Instant</span>
              {(item.isFree !== false) && (
                <span className="rounded-full bg-emerald-500/10 border border-emerald-200 px-4 py-2 text-emerald-600">Free</span>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="stat-card">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Category</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{item.category}</div>
            </div>
            <div className="stat-card">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Experience</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Smooth UI</div>
            </div>
          </div>
        </div>
      </section>

      <section className="tool-surface p-4 md:p-6">
        <div className="rounded-[1.25rem] border border-[var(--border)] bg-white/72 p-4 md:p-6">
          <Comp slug={tool} />
        </div>
      </section>

      <ToolPageSEO tool={item} />
    </div>
  )
}

export async function generateMetadata({ params }: { params: { category: string, tool: string } }) {
  const item = tools.find((t) => t.slug === params.tool && t.categorySlug === params.category)
  if (!item) return { title: 'Tool' }
  const { generateToolMetadata } = await import('../../../lib/seo-helpers')
  return generateToolMetadata(item)
}
