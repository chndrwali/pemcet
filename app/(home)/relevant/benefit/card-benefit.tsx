'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardBenefit = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <div className="relative bg-blue-900 text-white p-4 w-full max-w-[200px] text-center text-sm rounded-lg arrow-box">
              <h1>Capaian Pembelajaran</h1>
            </div>
            <p className="leading relaxed">
              Peserta didik mampu membaca kata-kata dengan berbagai pola kombinasi huruf dalam kata dengan fasih dan indah. Peserta didik mampu memahami informasi dan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk
              mengidentifikasi objek, fenomena, dan karakter. Peserta didik mampu menganalisis informasi dan berbagai tipe teks serta nilai-nilai yang terkandung dalam teks sastra dari teks visual dan/atau audio visual. Peserta didik mampu
              membaca hasil pengamatan.
            </p>
            <div className="relative bg-blue-900 text-white p-4 w-full max-w-[180px] text-center text-sm rounded-lg arrow-box">
              <h1>Tujuan Pembelajaran</h1>
            </div>
            <p className="leading-relaxed">
              Setelah peserta didik mampu membaca kata-kata dengan berbagai pola kombinasi huruf dalam kata secara fasih, memperhatikan intonasi, dan artikulasi yang indah untuk meningkatkan kemampuan literasi dasar
            </p>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/relevant/developer')} isLeft={false} />
    </>
  );
};
