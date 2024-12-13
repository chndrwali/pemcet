'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardConclusion = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 mt-[30px] ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <h2 className="font-semibold text-center">Kesimpulan</h2>
            <p className="leading-relaxed text-justify">
              Membaca cepat adalah kemampuan membaca dengan kecepatan tinggi tanpa mengorbankan pemahaman. Membaca cepat bertujuan untuk menghemat waktu sambil tetap memahami inti dari teks yang dibaca.
            </p>
            <h2 className="text-center font-semibold">Kata Kunci:</h2>
            <ul>
              <ol className="list-decimal text-justify ml-2">
                <li>
                  <strong>Skimming</strong> adalah teknik membaca cepat untuk menangkap gagasan utama atau inti dari suatu teks tanpa memperhatikan detailnya.
                </li>
                <li>
                  <strong>Scanning</strong> adalah teknik membaca cepat untuk mencari informasi spesifik dalam sebuah teks.
                </li>
                <li>
                  <strong>Subvokalisasi</strong> adalah kebiasaan mengucapkan kata-kata dalam pikiran atau &quot;membaca dalam hati&quot; saat membaca. Dalam subvokalisasi, pembaca menggerakkan atau membayangkan suaranya sendiri mengucapkan
                  setiap kata, meskipun suara tersebut tidak terdengar.
                </li>
              </ol>
            </ul>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/learning-materials/benefit')} isLeft={false} />
    </>
  );
};
