'use client';

import { SafeUser } from '@/types';
import { Caveat_Brush } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

interface HeroProps {
  currentUser: SafeUser | null;
}

export const Hero = ({ currentUser }: HeroProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="absolute sm:hidden inset-0 z-30  pb-20" style={{ backgroundImage: `url("/icon/light1.png")`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '180px' }} />
      <div className="flex flex-col text-center">
        <h1 className={`${caveat.className} text-5xl sm:text-9xl `}>WEPCET</h1>
        <h3 className={`${caveat.className} text-3xl sm:text-5xl `}>(WEB PEMBACA CEPAT)</h3>
        <p className={`${caveat.className} text-lg`}>BACA DAN PAHAMI SELURUH INFORMASI NYA</p>
      </div>

      <div className="mt-[80px]">
        <button
          onClick={() => {
            router.push(currentUser ? '/home' : '/login');
          }}
          className="bg-yellow-400 z-50 flex h-full w-full items-center justify-center rounded-full border-4 border-red-600 p-4 hover:bg-yellow-400/50 hover:border-red-500 outline outline-4 outline-pink-500 hover:outline-pink-600 transition-colors "
        >
          <Image src="/icon/home.png" alt="home" width={30} height={30} />
        </button>
      </div>
    </div>
  );
};
