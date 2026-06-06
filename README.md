# ToolNest

ToolNest is a polished Next.js website for browser-based tools, blog content, FAQs, and category browsing.

## Features

- Fast, responsive homepage with featured tools
- Blog with search, category filters, and full article pages
- FAQ content designed for SEO and trust
- Tool pages for calculators, developer utilities, image tools, SEO tools, text tools, and security tools
- Server-rendered metadata and clean internal linking

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- App Router

## Local Development

Install dependencies first:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the site at `http://localhost:3000`.

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## Deploying Securely

This repository is ready to deploy to Vercel or any Node.js hosting provider that supports Next.js.

Recommended deployment steps:

1. Push the repository to GitHub over SSH.
2. Connect the GitHub repo to Vercel.
3. Leave environment secrets out of the repo and set them in the hosting dashboard if needed.
4. Deploy from the `main` branch.

## Git Push Commands

If you want to create the Git repository and push it over SSH:

```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:MYounus-Codes/digital-tools-website.git
git push -u origin main
```

If the repo already exists locally, use this instead:

```bash
git add .
git commit -m "Prepare site for deployment"
git push -u origin main
```

## Notes

- The app is built to work well on mobile and desktop.
- Blog pages include SEO-friendly headings, metadata, and internal links.
- Avoid committing secrets or local environment files.

## Thanks for reading!