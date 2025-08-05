'use client';

import { Header } from '@/components/header/header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-deskripsi z-20">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-[#442412] border-[4px] border-white rounded-[15px] max-w-[900px] mx-auto px-10 py-8 text-white text-center font-bold text-3xl leading-tight shadow-lg space-y-0">
          <p>Hai, Sahabat Pintar!</p>
          <p>Siap untuk melatih pemahaman bacaanmu hari ini?</p>
          <p>Di sini, kamu akan membaca teks yang seru dan menantang dengan waktu yang sudah disiapkan. Jangan khawatir, kamu tidak perlu buru-buru, tapi cobalah untuk membaca dengan fokus tanpa mengulang kata-kata.</p>
          <p>Ini untuk melihat apakah kamu benar-benar paham dengan isi bacaan, bukan hanya sekadar cepat.</p>
          <p>Yuk, mulai sekarang! Buktikan bahwa kamu bisa membaca cepat dan paham isi bacaan dengan baik!</p>
        </div>

        {/* Navigasi Panah */}
      </div>
      <div className="flex justify-between w-full  mt-8 px-8">
        <div />

        <button onClick={() => router.push('/test-pemahaman/latihan-satu')}>
          <Image src="/icon/arrow.png" alt="Next" width={55} height={55} />
        </button>
      </div>
    </section>
  );
};

export default Page;
