import type { ReactNode } from 'react'
import type { Viewport } from 'next'

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0c' },
  ],
}

export const metadata = {
  metadataBase: new URL('https://docs.nocobuilder.cloud'),
  title: {
    default: 'Sim Documentation — Build AI Agents & Run Your Agentic Workforce',
    template: '%s',
  },
  description:
    'Documentation for Sim — the open-source platform to build AI agents and run your agentic workforce. Connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows.',
  applicationName: 'Sim Docs',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin' as const,
  keywords: [
    'AI agents',
    'agentic workforce',
    'AI agent platform',
    'open-source AI agents',
    'agentic workflows',
    'LLM orchestration',
    'AI integrations',
    'knowledge base',
    'AI automation',
    'workflow builder',
    'AI workflow orchestration',
    'enterprise AI',
    'AI agent deployment',
    'intelligent automation',
    'AI tools',
  ],
  authors: [{ name: 'Sim Team', url: 'https://nocobuilder.cloud' }],
  creator: 'Sim',
  publisher: 'Sim',
  category: 'Developer Tools',
  classification: 'Developer Documentation',
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sim Docs',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#33C482',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR', 'de_DE', 'ja_JP', 'zh_CN'],
    url: 'https://docs.nocobuilder.cloud',
    siteName: 'Sim Documentation',
    title: 'Sim Documentation — Build AI Agents & Run Your Agentic Workforce',
    description:
      'Documentation for Sim — the open-source platform to build AI agents and run your agentic workforce. Connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows.',
    images: [
      {
        url: 'https://docs.nocobuilder.cloud/api/og?title=Sim%20Documentation',
        width: 1200,
        height: 630,
        alt: 'Sim Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sim Documentation — Build AI Agents & Run Your Agentic Workforce',
    description:
      'Documentation for Sim — the open-source platform to build AI agents and run your agentic workforce. Connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows.',
    creator: '@simdotai',
    site: '@simdotai',
    images: ['https://docs.nocobuilder.cloud/api/og?title=Sim%20Documentation'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://docs.nocobuilder.cloud',
    languages: {
      'x-default': 'https://docs.nocobuilder.cloud',
      en: 'https://docs.nocobuilder.cloud',
      es: 'https://docs.nocobuilder.cloud/es',
      fr: 'https://docs.nocobuilder.cloud/fr',
      de: 'https://docs.nocobuilder.cloud/de',
      ja: 'https://docs.nocobuilder.cloud/ja',
      zh: 'https://docs.nocobuilder.cloud/zh',
    },
  },
}
