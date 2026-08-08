import type { Metadata, Viewport } from 'next';
import { Outfit, Syne } from 'next/font/google';
import { AudioProvider } from '@/context/AudioContext';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Naren | Full-Stack Developer',
  description:
    'Portfolio of Naren — full-stack developer building clean, fast, and thoughtful web experiences with React, Next.js, and TypeScript.',
  authors: [{ name: 'Naren' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <body>
        <AudioProvider>
          <div className="app-container">{children}</div>
        </AudioProvider>
      </body>
    </html>
  );
}
