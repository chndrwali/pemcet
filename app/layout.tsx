import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/toaster';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: {
    default: 'Candra Wali S | Portfolio',
    template: '%s - Candra Wali S | Portfolio',
  },
  description: 'Portfolio Candra Wali Sanjaya, seorang Front-End Developer profesional.',
  category: 'Portfolio, Front-End Developer',
  authors: [{ name: 'chndrwali' }],
  keywords: ['Portfolio', 'Front-End Developer', 'Candra Wali', 'Web Development'],
  creator: 'Candra Wali Sanjaya',
  publisher: 'Candra Wali Sanjaya',
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body className={`${inter.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
