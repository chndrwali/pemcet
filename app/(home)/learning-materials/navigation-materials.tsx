'use client';

import Image from 'next/image';
import Link from 'next/link';

const route = [
  {
    label: 'Materi',
    icon: '/icon/1.png',
    link: '/learning-materials/percakapan',
  },
  {
    label: 'Latihan Membaca Cepat',
    icon: '/icon/2.png',
    link: '/latihan-membaca',
  },
  {
    label: 'Tes Membaca Cepat',
    icon: '/icon/4.png',
    link: '/test-membaca',
  },
  {
    label: 'Latihan Meningkatkan Membaca Cepat',
    icon: '/icon/3.png',
    link: '/meningkatkan-membaca',
  },
  {
    label: 'Tes Pemahaman',
    icon: '/icon/tes.png',
    link: '/test-pemahaman',
  },
  {
    label: 'Game',
    icon: '/logo/games.svg',
    link: '/games',
  },
];

export const NavigationMaterial = () => {
  return (
    <div className="bg-[#3a1f13] border-4 border-white rounded-2xl p-6 max-w-[1100px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 place-items-center">
      {route.map((item) => (
        <Link key={item.label} href={item.link} className="bg-white rounded-xl p-4 w-[160px] h-[200px] shadow-lg flex flex-col justify-between items-center text-black text-center no-underline">
          <Image src={item.icon} alt={item.label} width={100} height={250} className="object-contain w-full h-[250px]" />
          <div className="-mb-[30px] bg-[#192a56] text-white rounded-md px-2 py-2 w-full text-xs font-bold min-h-[48px] flex items-center justify-center text-center leading-tight">{item.label.toUpperCase()}</div>
        </Link>
      ))}
    </div>
  );
};
