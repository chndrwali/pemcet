'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardTechnique = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <p className="leading relaxed"> Amul: &quot;Selamat pagi, semua! Hari ini kita akan membahas dua teknik membaca yang penting, yaitu skimming dan scanning. Ada yang pernah dengar tentang teknik ini sebelumnya?&quot;</p>

            <p className="leading-relaxed">Azizah: &quot;Pernah, Bu, tapi saya belum terlalu paham apa perbedaannya.&quot;</p>

            <p className="leading-relaxed">
              Amul: &quot;Baik, saya jelaskan dulu. Skimming adalah teknik membaca cepat untuk mendapatkan gambaran umum atau intisari dari suatu teks. Jadi, kita tidak membaca kata per kata, tapi cukup melihat poin-poin utama. Ini biasanya
              digunakan ketika kita ingin tahu topik utama atau ide pokok dari suatu bacaan. Mengerti sampai sini?&quot;
            </p>

            <p className="leading-relaxed">Azizah: &quot;Oh, jadi seperti kalau kita baca sekilas saja untuk tahu isi besarnya, ya bu?&quot;</p>
            <p className="leading-relaxed">
              Amul: &quot;Betul sekali! Misalnya, saat membaca artikel atau esai panjang, kamu bisa menggunakan teknik skimming untuk langsung tahu ide utamanya tanpa membaca seluruh teks secara mendalam.&quot;
            </p>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/learning-materials/basic-technique/continues')} isLeft={false} />
    </>
  );
};
