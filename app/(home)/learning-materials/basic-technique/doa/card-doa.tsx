'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardDoa = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <p className="leading-relaxed text-center">بِسْمِ اللَّهِ الرحمن الرَّحِيمِ.</p>

            <p className="leading-relaxed text-right">رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولًا. رَبِّ زِدْنِي عِلْمًا نَافِعًا وَارْزُقْنِي فَهْمًا</p>

            <p className="leading-relaxed">Rodlitu billahi robba, wabi islaamidina, wabimuhammadin nabiyya warasulla Robbi zidni ilman nafi&apos;a warzuqni fahma.</p>

            <p className="leading-relaxed">Artinya: “Aku ridha Allah SWT sebagai Tuhanku, dan Islam sebagai agamaku, dan Muhammad saw sebagai Nabi dan Rasulku. Ya Allah tambahkanlah kepadaku ilmu dan berikanlah aku pemahaman yang baik.“</p>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/reading-simulation')} isLeft={false} />
    </>
  );
};
