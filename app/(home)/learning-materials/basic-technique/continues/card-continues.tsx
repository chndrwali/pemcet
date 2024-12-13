'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardTechniqueContinues = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <p className="leading relaxed"> Azizah: &quot;Oke, lalu bagaimana dengan scanning, Bu?&quot;</p>

            <p className="leading-relaxed">
              Amul: &quot;Nah, scanning berbeda. Ini teknik membaca cepat yang tujuannya mencari informasi spesifik, seperti tanggal, nama, angka, atau kata kunci tertentu. Jadi, saat scanning, kamu fokus mencari kata atau frasa tertentu
              tanpa membaca seluruh teks.&quot;
            </p>

            <p className="leading-relaxed">Azizah: &quot;Jadi kalau kita ingin tahu informasi yang spesifik, kita langsung cari kata kuncinya saja, ya bu?&quot;</p>

            <p className="leading-relaxed">Amul: &quot;Benar. Misalnya, kamu sedang membaca koran dan ingin tahu hasil pertandingan sepak bola. Kamu cukup scanning bagian skornya saja, tanpa membaca seluruh artikel.&quot;</p>
            <p className="leading-relaxed">Azizah: &quot;Jadi kalau skimming untuk mencari ide utama, dan scanning untuk mencari detail tertentu, begitu ya, Bu?&quot;</p>

            <p className="leading-relaxed">
              Amul: &quot;Tepat sekali! Coba sekarang kita praktikkan. Saya akan membagikan artikel, dan saya ingin kalian menggunakan skimming dulu untuk menemukan ide pokoknya, kemudian gunakan scanning untuk mencari informasi spesifik
              yang saya minta. Siap?&quot;
            </p>
            <p className="leading-relaxed">Azizah: &quot;Siap, Bu!&quot;</p>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/learning-materials/basic-technique/doa')} isLeft={false} />
    </>
  );
};
