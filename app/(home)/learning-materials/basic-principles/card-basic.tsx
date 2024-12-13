'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardBasic = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 mt-[30px] ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm`}>
            <ul>
              <ol className="list-disc text-justify ml-2">
                <li>
                  <strong>Hindari Subvokalisasi:</strong> Kebiasaan mengucapkan kata dalam hati (subvokalisasi) dapat mengurangi kecepatan membaca. Fokuskan mata untuk memindai kata, bukan untuk &quot;mendengar&quot; kata.
                </li>
                <li>
                  <strong> Gunakan Mata, Bukan Suara:</strong> Lakukan teknik membaca cepat dengan memindai teks menggunakan mata, bukan dengan bergantung pada suara.
                </li>
                <li>
                  <strong> Lompat Kata dan Fokus pada Inti:</strong> Tidak semua kata dalam teks penting. Latihlah untuk langsung mengenali dan memahami kata-kata inti yang mewakili informasi penting.
                </li>
                <li>
                  <strong> Hindari Bersuara :</strong>Tujuannya untuk menciptakan suasana tenang.
                </li>
                <li>
                  <strong> Hindari Bergumam :</strong> yaitu suara samar atau pelan yang dihasilkan saat berbicara tanpa jelas mengartikulasikan kata-kata.
                </li>
                <li>
                  <strong> Hindari Mengerakan Bibir</strong>
                </li>
              </ol>
            </ul>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/learning-materials/basic-technique')} isLeft={false} />
    </>
  );
};
