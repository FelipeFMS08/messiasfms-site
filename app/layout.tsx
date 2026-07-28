import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const siteUrl = 'https://messiasfms.dev';
const title = 'Felipe Messias | AI Engineer & Fullstack Developer';
const description =
  'Felipe Messias — AI Engineer & Fullstack Developer, co-founder of FP Solutions. Applied AI engineering, production systems and fullstack architecture.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'Felipe Messias',
    'AI Engineer',
    'Fullstack Developer',
    'FP Solutions',
    'Software Engineer',
    'Applied AI',
  ],
  authors: [{name: 'Felipe Messias', url: siteUrl}],
  creator: 'Felipe Messias',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Felipe Messias',
    title,
    description,
    locale: 'en_US',
    alternateLocale: 'pt_BR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Felipe Messias — AI Engineer & Fullstack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Felipe Messias',
  url: siteUrl,
  jobTitle: 'AI Engineer & Fullstack Developer',
  email: 'mailto:felipe.messias.fms@gmail.com',
  sameAs: [
    'https://github.com/FelipeFMS08',
    'https://linkedin.com/in/felipe-messias-fms',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'FP Solutions',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São Paulo',
    addressCountry: 'BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#09090b] text-white selection:bg-[#dc2626]/20 selection:text-white antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
