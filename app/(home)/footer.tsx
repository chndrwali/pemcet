'use client';

import { Caveat } from 'next/font/google';
import { usePathname } from 'next/navigation';

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

export const Footer = () => {
  const pathname = usePathname();

  const isNotHome = ['/learning-materials', '/relevant', '/reading-simulation', '/test-reading', '/test-understanding', '/home'].some((path) => pathname.startsWith(path));

  return (
    <footer className="fixed w-full bottom-0 bg-[#F1E0CC] p-4 sm:p-6">
      {isNotHome ? (
        <div className="h-5" />
      ) : (
        <p className={`${caveat.className} text-sm sm:text-normal text-purple-800 text-center uppercase`}>LITERASI SANGAT PENTING UNTUK KEHIDUPAN KITA karena memungkinkan untuk memperluas wawasan dan cakrwala</p>
      )}
    </footer>
  );
};
