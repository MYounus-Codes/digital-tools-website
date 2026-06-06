'use client'

import { useState, FormEvent } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...formData,
          subject: formData.subject || 'General inquiry',
        }),
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error(data.message || 'Something went wrong.')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message.')
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="section-kicker">Contact</div>
      <h1 className="section-title mt-2">Get in touch</h1>
      <p className="mt-4 text-[var(--text-muted)] max-w-2xl">
        Have a question, feedback, or a partnership idea? We&apos;d love to hear from you.
        Fill out the form and we&apos;ll get back within one business day.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="site-card p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1.5 w-full p-3"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1.5 w-full p-3"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="subject" className="block text-sm font-semibold">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1.5 w-full p-3"
            >
              <option value="">Select a topic…</option>
              <option value="General inquiry">General inquiry</option>
              <option value="Feature request">Feature request</option>
              <option value="Bug report">Bug report</option>
              <option value="Partnership">Partnership</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="block text-sm font-semibold">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-1.5 w-full p-3 h-40 resize-y"
              placeholder="How can we help you?"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="primary-pill inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send message
                </>
              )}
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800">
              <CheckCircle size={18} className="mt-0.5 shrink-0 text-green-600" />
              <span>Your message was sent successfully! We&apos;ll get back to you soon.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        <div className="space-y-5">
          <div className="site-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <Mail size={16} className="text-[var(--brand-primary)]" />
              Email us
            </h3>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              <a href="mailto:myounushere@gmail.com" className="text-[var(--brand-primary)] hover:underline font-semibold">
                myounushere@gmail.com
              </a>
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              We reply within 24 hours on business days.
            </p>
          </div>

          <div className="site-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <MapPin size={16} className="text-[var(--brand-primary)]" />
              Location
            </h3>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Remote-first team<br />
              Built with care from around the world
            </p>
          </div>

          <div className="site-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <Clock size={16} className="text-[var(--brand-primary)]" />
              Response time
            </h3>
            <div className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              <div className="flex items-center justify-between">
                <span>General inquiries</span>
                <span className="font-semibold text-[var(--text-primary)]">&lt; 24h</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bug reports</span>
                <span className="font-semibold text-[var(--text-primary)]">&lt; 12h</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Partnerships</span>
                <span className="font-semibold text-[var(--text-primary)]">&lt; 48h</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] p-6 text-white">
            <p className="text-sm font-bold">Prefer direct email?</p>
            <p className="mt-1 text-sm text-white/80">
              Send us an email directly and we&apos;ll respond promptly.
            </p>
            <a
              href="mailto:myounushere@gmail.com"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-bold backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <Mail size={15} />
              myounushere@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
