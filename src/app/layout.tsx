import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-sans",
  subsets: ["latin"],
});

const spaceGroteskMono = Space_Grotesk({
  variable: "--font-space-grotesk-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base URL for your site
  metadataBase: new URL('https://messiasfms.dev'),

  // Core metadata from your request
  title: {
    template: '%s | Felipe Messias',
    default: 'Felipe Messias - Software Developer Portfolio',
  },
  description: 'The portfolio for Felipe Messias, a passionate software developer creating modern and efficient web solutions.',
  
  // Favicon from your request
  icons: {
    icon: '/logo.svg',
  },

  // Keywords for search engines
  keywords: ['Software Developer', 'Programmer', 'Next.js', 'React', 'TypeScript', 'Portfolio', 'Felipe Messias'],
  
  // Author information
  authors: [{ name: 'Felipe Messias' }],
  creator: 'Felipe Messias',
  
  // --- Social Media & SEO Enhancements ---

  // Open Graph (for Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: 'Felipe Messias - Software Developer Portfolio',
    description: 'Explore the projects and skills of Felipe Messias, a software developer.',
    url: 'https://messiasfms.dev',
    siteName: 'Felipe Messias Portfolio',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Felipe Messias Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Messias - Software Developer Portfolio',
    description: 'Explore the projects and skills of Felipe Messias, a software developer.',
    creator: '@your_twitter_handle', 
    images: ['/og-image.png'], 
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Felipe Messias',
  url: 'https://messiasfms.dev',
  sameAs: [ 
    'https://www.linkedin.com/in/your-linkedin-profile/',
    'https://github.com/your-github-profile',
  ],
  jobTitle: 'Software Developer',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceGroteskMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
