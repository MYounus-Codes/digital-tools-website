import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="max-w-4xl">
      <div className="section-kicker">Contact</div>
      <h1 className="section-title mt-2">Get in touch</h1>
      <p className="mt-4 text-[var(--text-muted)]">Have questions, feedback, or a partnership idea? Send us a message and we'll get back within a business day.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <form className="site-card p-6">
          <label className="block text-sm font-semibold">Your email</label>
          <input className="mt-2 w-full p-3" placeholder="you@example.com" />

          <label className="mt-4 block text-sm font-semibold">Message</label>
          <textarea className="mt-2 w-full p-3 h-36" placeholder="How can we help?"></textarea>

          <div className="mt-4">
            <button className="primary-pill">Send message</button>
          </div>
        </form>

        <div className="site-card p-6">
          <div className="text-sm font-extrabold">Office</div>
          <div className="mt-4 text-sm text-[var(--text-muted)]">Remote-first · Maintained by a small team · Privacy-minded</div>

          <div className="mt-6 text-sm">
            <div className="font-semibold">Email</div>
            <div className="text-[var(--text-muted)]">support@toolnest.example</div>
          </div>
        </div>
      </div>
    </div>
  )
}
