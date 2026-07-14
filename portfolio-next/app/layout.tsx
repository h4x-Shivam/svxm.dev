import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono, Anton } from 'next/font/google';
import SmoothScroll from '@/lib/smooth-scroll';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
});

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
});

export const metadata: Metadata = {
  title: 'Shivam — Portfolio',
  description: 'Full-stack creative partner.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} ${anton.variable} antialiased locked`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
