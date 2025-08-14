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
  title: "Felipe Messias - Software Developer Portfolio",
  description: "The portfolio for Felipe Messias",
  icons: {
    icon: '/logo.svg'
  }
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
        {children}
      </body>
    </html>
  );
}
