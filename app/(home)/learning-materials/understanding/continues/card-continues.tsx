'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardContinues = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <p className="leading-relaxed">
              Amul: &quot;Pertanyaan yang bagus! Membaca cepat bisa membantu kita dalam berbagai hal, misalnya menghemat waktu saat membaca buku, artikel, atau materi pelajaran. Dengan membaca cepat, kita bisa memahami lebih banyak
              informasi dalam waktu yang lebih singkat.&quot;
            </p>
            <p className="leading-relaxed">Azizah: &quot;Bagaimana caranya agar kita bisa membaca cepat, Bu?&quot;</p>

            <p className="leading-relaxed">
              Amul: &quot;Nah, ada beberapa teknik yang bisa kita pelajari, seperti teknik skimming dan scanning. Kita juga bisa berlatih memperluas area pandangan, sehingga bisa melihat lebih banyak kata dalam sekali pandang. Selain itu,
              kita perlu mengurangi kebiasaan mengucapkan kata-kata dalam hati.&quot;
            </p>

            <p>Azizah: &quot;Apakah kita bisa langsung jadi cepat membaca, Bu?&quot;</p>

            <p>Amul: &quot;Tidak langsung, karena ini butuh latihan. Seiring waktu, dengan latihan yang teratur, kalian akan bisa meningkatkan kecepatan dan pemahaman kalian dalam membaca.&quot;</p>

            <p>Azizah: &quot;Seru juga, ya, bisa baca cepat dan paham semuanya!&quot;</p>

            <p>Amul: &quot;Iya, membaca cepat bisa sangat membantu. Nanti kita akan coba latihan, ya. Siap belajar membaca cepat?&quot;</p>

            <p>Azizah: &quot;Siap, Bu!&quot;</p>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/learning-materials/understanding/conclusion')} isLeft={false} />
    </>
  );
};
