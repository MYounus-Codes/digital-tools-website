export type FaqItem = {
  question: string
  answer: string
  category: string
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'Are the tools free to use?',
    answer: 'Yes. ToolNest is a free collection of browser-based tools, and the core tools work without signup.',
    category: 'General'
  },
  {
    question: 'Do the tools run in my browser?',
    answer: 'Most tools run client-side in your browser, which keeps them fast and helps protect your privacy.',
    category: 'Privacy'
  },
  {
    question: 'Can I use ToolNest on mobile?',
    answer: 'Yes. The site is built to be responsive, so the layout adapts cleanly to smaller screens.',
    category: 'Mobile'
  },
  {
    question: 'Do I need an account?',
    answer: 'No account is required for normal use. You can open a tool and start working right away.',
    category: 'General'
  },
  {
    question: 'Do you save my files or data?',
    answer: 'No permanent storage is required for standard usage. Most tools process data locally in the browser.',
    category: 'Privacy'
  },
  {
    question: 'Why do some tools feel instant?',
    answer: 'They are optimized to avoid unnecessary page reloads and to keep interactions lightweight.',
    category: 'Performance'
  },
  {
    question: 'Can I use the tools offline?',
    answer: 'Some tools may work partially after loading, but the experience is designed primarily for online use.',
    category: 'General'
  },
  {
    question: 'Are there ads inside the tools?',
    answer: 'No. The tools are built to stay calm and uncluttered while you work.',
    category: 'General'
  },
  {
    question: 'Does ToolNest work on tablets?',
    answer: 'Yes. The layout scales for tablets and larger touch devices without losing readability.',
    category: 'Mobile'
  },
  {
    question: 'How often are new tools added?',
    answer: 'The library is updated over time with new utilities and refinements to existing tools.',
    category: 'Updates'
  }
]

export const faqItems: FaqItem[] = [
  ...homeFaqs,
  {
    question: 'How do I remove the background from an image for free?',
    answer: 'Upload your image to our Background Remover tool and click "Remove Background". The AI processes it instantly in your browser — no signup, no cost, and your image never leaves your device.',
    category: 'Image Tools'
  },
  {
    question: 'Is the AI background remover really free to use?',
    answer: 'Yes, it is 100% free with no hidden charges, no credit card required, and no usage limits. You can remove backgrounds from as many images as you like.',
    category: 'Image Tools'
  },
  {
    question: 'What image formats are supported for background removal?',
    answer: 'The tool accepts all common image formats including JPG, JPEG, PNG, WebP, GIF, and BMP. The output is a PNG image with a transparent background.',
    category: 'Image Tools'
  },
  {
    question: 'Are my images uploaded to any server when I remove the background?',
    answer: 'No. The entire background removal process runs locally in your browser. Your images are never uploaded, stored, or processed on any external server — your privacy is guaranteed.',
    category: 'Image Tools'
  },
  {
    question: 'How accurate is the AI background removal?',
    answer: 'The AI is highly accurate for most subjects including people, products, animals, and objects. It can handle complex edges like hair, fur, and intricate shapes with impressive precision.',
    category: 'Image Tools'
  },
  {
    question: 'Can I remove the background from a photo with a white background?',
    answer: 'Yes, the AI works on any background color or pattern, including solid white, gradient backgrounds, outdoor scenes, or busy indoor settings.',
    category: 'Image Tools'
  },
  {
    question: 'Does the background remover work on mobile phones?',
    answer: 'Yes, the tool is fully responsive and works on all mobile devices, tablets, and desktops. You can upload images directly from your phone\'s camera roll.',
    category: 'Image Tools'
  },
  {
    question: 'What can I use the transparent background image for?',
    answer: 'Transparent PNG images are perfect for e-commerce product photos, profile pictures, logo design, graphic design projects, social media content, and presentations.',
    category: 'Image Tools'
  },
  {
    question: 'How is this background remover different from Photoshop?',
    answer: 'Unlike Photoshop which requires design skills and manual selection tools, our AI background remover does the job in one click — no learning curve, no installation, and completely free.',
    category: 'Image Tools'
  },
  {
    question: 'Can I download the background-removed image in high resolution?',
    answer: 'Yes, the output preserves the original image resolution and quality. You download a full-resolution PNG with the background removed.',
    category: 'Image Tools'
  },
  {
    question: 'What kind of tools are included on ToolNest?',
    answer: 'The site includes calculators, SEO helpers, text utilities, image tools, developer utilities, and everyday productivity tools.',
    category: 'Tools'
  },
  {
    question: 'Can I generate and copy results quickly?',
    answer: 'Yes. Most tools are designed with a short workflow so you can paste, calculate, copy, and move on.',
    category: 'Tools'
  },
  {
    question: 'Is the site optimized for speed?',
    answer: 'The interface uses a lightweight layout and client-side interactions to keep the experience fast.',
    category: 'Performance'
  },
  {
    question: 'What happens if I refresh the page?',
    answer: 'You can continue using the tool normally; in many cases the page simply resets to a clean state.',
    category: 'General'
  },
  {
    question: 'Do you track my actions inside the tools?',
    answer: 'The tools are designed with privacy in mind and do not need heavy tracking to function.',
    category: 'Privacy'
  },
  {
    question: 'Can I open tools from the category pages?',
    answer: 'Yes. Each category page lists its tools so you can jump directly into the one you need.',
    category: 'Tools'
  },
  {
    question: 'How do I find a specific tool?',
    answer: 'Use the category pages or the dedicated Tools page to browse everything by category.',
    category: 'Navigation'
  },
  {
    question: 'Why do the pages look so consistent?',
    answer: 'The site uses shared design tokens and surfaces so every page feels connected and calm.',
    category: 'Design'
  },
  {
    question: 'Can I use the site on slow connections?',
    answer: 'Yes. The layout is intentionally lean, which helps it remain usable on slower connections.',
    category: 'Performance'
  },
  {
    question: 'Is there a way to contact the team?',
    answer: 'Yes. Use the Contact page to send feedback, request a tool, or report an issue.',
    category: 'Support'
  },
  {
    question: 'What browsers are supported?',
    answer: 'Modern browsers with standard JavaScript support should work well, including desktop and mobile browsers.',
    category: 'General'
  },
  {
    question: 'Can I bookmark individual tools?',
    answer: 'Yes. Each tool has its own page, so you can bookmark the exact tool you use often.',
    category: 'Tools'
  },
  {
    question: 'Are the tools useful for daily work?',
    answer: 'Yes. The collection is built for small, repeated tasks like conversion, validation, counting, and quick calculations.',
    category: 'Daily Use'
  },
  {
    question: 'Do the tools work on touch screens?',
    answer: 'Yes. Inputs, controls, and cards are tuned to remain comfortable on touch devices.',
    category: 'Mobile'
  },
  {
    question: 'Can I request a new tool?',
    answer: 'You can use the Contact page to suggest new tools or improvements to existing ones.',
    category: 'Support'
  },
  {
    question: 'Can I use ToolNest for work or client projects?',
    answer: 'Yes. The tools are practical for everyday tasks and can help with quick client or internal workflows.',
    category: 'Daily Use'
  },
  {
    question: 'Does the FAQ page support filtering on mobile?',
    answer: 'Yes. The search box and category chips are designed to stay usable on smaller screens.',
    category: 'Mobile'
  },
  {
    question: 'Are the FAQ answers short on purpose?',
    answer: 'Yes. They are written to be clear, useful, and easy to scan without cluttering the page.',
    category: 'Design'
  },
  {
    question: 'Can I open the FAQ page directly from the navbar?',
    answer: 'Yes. The FAQs link in the header takes you straight to the dedicated FAQ page.',
    category: 'Navigation'
  },
  {
    question: 'What tools do you have on ToolNest?',
    answer: 'ToolNest includes calculators like TDEE Calculator, BMI Calculator, and Loan / EMI Calculator; SEO tools like Word Counter; developer tools like JSON Formatter & Validator and JSON to CSV Converter; image tools like Image Compressor; and utilities like Password Generator.',
    category: 'Tools'
  }
]
