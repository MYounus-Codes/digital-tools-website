import '../styles/globals.css'
import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import { Manrope } from 'next/font/google'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'ToolNest — Free Online Tools',
  description: '50+ free browser-based tools — 100% client-side, no signup.',
  verification: {
    google: 'qoR9ANmVflZd8lW-BUSGvLSn3BcChlfKd3w1-IeIt0o',
  },
}

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <head />
      <body>
        <div className="min-h-screen text-[var(--text-primary)]">
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[-8rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[rgba(37,99,235,0.14)] blur-3xl" />
            <div className="absolute right-[-6rem] top-[10rem] h-[18rem] w-[18rem] rounded-full bg-[rgba(201,245,82,0.26)] blur-3xl" />
            <div className="absolute bottom-[-10rem] left-[20%] h-[22rem] w-[22rem] rounded-full bg-[rgba(14,165,233,0.12)] blur-3xl" />
          </div>

          <SiteHeader />

          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="overflow-hidden pt-0">
            <div className="mx-auto max-w-[1400px] px-4 pb-0 pt-2 md:px-6">
              <div className="grid gap-8 rounded-[2rem] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:px-10 md:py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
                <div className="max-w-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-primary)] text-lg font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.28)]">T</span>
                    <span className="font-display text-2xl text-[var(--text-primary)]">ToolNest</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">A calm, premium collection of browser tools built to stay fast, private, and easy to use.</p>
                </div>

                <div>
                  <div className="text-sm font-extrabold uppercase tracking-[0.24em] text-[var(--text-primary)]">Menu</div>
                  <div className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                    <Link href="/" className="block hover:text-[var(--text-primary)]">Home</Link>
                    <Link href="/blog" className="block hover:text-[var(--text-primary)]">Blog</Link>
                    <Link href="/calculators" className="block hover:text-[var(--text-primary)]">Calculators</Link>
                    <Link href="/developer-tools" className="block hover:text-[var(--text-primary)]">Developer</Link>
                    <Link href="/image-tools" className="block hover:text-[var(--text-primary)]">Images</Link>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-extrabold uppercase tracking-[0.24em] text-[var(--text-primary)]">Tools</div>
                  <div className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                    <Link href="/seo-tools" className="block hover:text-[var(--text-primary)]">SEO Tools</Link>
                    <Link href="/security-tools" className="block hover:text-[var(--text-primary)]">Security Tools</Link>
                    <Link href="/design-tools" className="block hover:text-[var(--text-primary)]">Design Tools</Link>
                    <Link href="/text-tools" className="block hover:text-[var(--text-primary)]">Text Tools</Link>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-extrabold uppercase tracking-[0.24em] text-[var(--text-primary)]">About</div>
                  <div className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                    <p>100% client-side</p>
                    <p>No signup required</p>
                    <p>Optimized for mobile</p>
                    <p>Zero ads inside tools</p>
                  </div>
                </div>
              </div>

              <div className="footer-band mt-4 rounded-[2rem] px-6 py-10 text-center md:px-10 md:py-14">
                <div className="footer-band-word">TOOLNEST</div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  <span>Designed for speed and clarity</span>
                  <span>© {new Date().getFullYear()} ToolNest</span>
                  <span>Built with calm UI</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
