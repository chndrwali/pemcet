'use client';

import { Caveat_Brush } from 'next/font/google';
import { useRouter } from 'next/navigation';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="mt-[200px] sm:mt-0 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col text-center">
        <h1 className={`${caveat.className} text-5xl sm:text-9xl `}>WEPCET</h1>
        <h3 className={`${caveat.className} text-3xl sm:text-5xl `}>(WEB PEMBACA CEPAT)</h3>
      </div>

      <div className="mt-[20px]">
        <button
          onClick={() => {
            router.push('/doa');
          }}
          style={{
            display: 'inline-block',
            marginTop: '20px',
            backgroundColor: '#fff',
            border: '6px solid #5b3923',
            color: '#5b3923',
            fontWeight: 'bold',
            fontSize: '24px',
            padding: '10px 30px',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '2px 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          Mulai
        </button>
      </div>
    </div>
  );
};
