'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Caveat_Brush } from 'next/font/google';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

const route = [
  {
    label: 'Relevansi',
    link: '/relevant',
  },
  {
    label: 'Materi',
    link: '/learning-materials',
  },
  {
    label: 'Simulasi membaca',
    link: '/reading-simulation',
  },
  {
    label: 'Tes Membaca',
    link: '/test-reading/Pemula',
  },
  {
    label: 'Uji Pemahaman',
    link: '/test-understanding/Pemula',
  },
];

export const Navigation = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 md:flex md:items-center p-4 gap-4 place-items-center mt-20 sm:mt-10">
      {route.map((item) => (
        <div
          key={item.label}
          className="group relative rounded-full bg-amber-200 w-[120px] h-[120px] flex flex-col items-center justify-center outline-2 outline-dotted outline-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-yellow-300 hover:to-orange-400"
        >
          <button className="flex flex-col items-center justify-center text-center focus:outline-none p-6" onClick={() => router.push(item.link)}>
            <Image src="/logo/book.png" alt={item.label} width={80} height={80} className="transition-transform duration-300 group-hover:scale-110" />
            <span className={`${caveat.className} mt-2 text-sm leading-tight break-words uppercase font-semibold group-hover:text-white`}>{item.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
};
