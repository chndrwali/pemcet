'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardUnderstanding = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <p className="leading relaxed">Amul: &quot;Baik, anak-anak, hari ini kita akan belajar tentang membaca cepat. Ada yang tahu apa itu membaca cepat?&quot;</p>

            <p className="leading-relaxed">Azizah: &quot;Apakah itu cara membaca dengan sangat cepat?&quot;</p>

            <p className="leading-relaxed">
              Amul: &quot;Ya, benar! Membaca cepat adalah teknik membaca dengan kecepatan lebih tinggi dari biasanya, tetapi bukan hanya tentang membaca cepat saja. Apakah kalian tahu apa lagi yang penting?&quot;
            </p>

            <p className="leading-relaxed">Azizah: &quot;Mungkin memahami apa yang kita baca?&quot;</p>
            <p className="leading-relaxed">
              Amul: &quot;Tepat sekali! Dalam membaca cepat, kita berusaha membaca lebih cepat sambil tetap memahami isi teks yang kita baca. Jadi, intinya adalah membaca cepat tanpa kehilangan pemahaman. Bukan sekadar membaca secepat kilat
              dan melewatkan informasi penting, ya.&quot;
            </p>

            <p className="leading-relaxed">Azizah: &quot;Kenapa harus belajar membaca cepat, Bu? Apa bedanya dengan membaca biasa?&quot;</p>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/learning-materials/understanding/continues')} isLeft={false} />
    </>
  );
};
