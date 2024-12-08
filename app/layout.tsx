import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: {
    default: 'WEPCET | Web Pembaca Cepat',
    template: '%s - WEPCET | Web Pembaca Cepat',
  },
  description: 'Sebuah Website Pembaca Cepat untuk anak kelas 5 SD.',
  keywords: ['Website Pembaca Cepat', 'Front-End Developer', 'Candra Wali', 'Web Development'],
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
        <body className={`${inter.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
