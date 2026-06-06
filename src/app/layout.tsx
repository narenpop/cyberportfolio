import type { Metadata, Viewport } from 'next';
import { Outfit, Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { AudioProvider } from '@/context/AudioContext';
import { CanvasBackground } from '@/components/CanvasBackground';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import { CustomCursor } from '@/components/CustomCursor';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Creative Developer & Designer | Portfolio',
  description: 'A premium, highly animated developer portfolio showcasing creative projects, interactive code, design systems, and frontend wizardry.',
  authors: [{ name: 'Creative Developer' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
        <ThemeProvider>
          <AudioProvider>
            {/* Grain overlay */}
            <div className="noise-overlay" />
            
            {/* Background grid overlay */}
            <div className="background-grid" />
            
            {/* Real-time HTML5 Canvas particle/matrix background */}
            <CanvasBackground />
            
            {/* Smooth dual custom cursor */}
            <CustomCursor />
            
            {/* Floating theme controls */}
            <ThemeCustomizer />
            
            {/* Main Application Container */}
            <div className="app-container">
              {children}
            </div>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
