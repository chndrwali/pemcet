'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const CardRelevant = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 ">
        <div className=" bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 space-y-4 text-sm `}>
            <h1 className="text-base font-semibold">Assalamualaikum warohmatullahi wabarokatuh</h1>

            <p className="leading-relaxed text-justify">
              {' '}
              Puji dan syukur kehadirat Allah SWT. Karena berkat Rahmat dan karunia-nya saya dapat menyelesaikan media pembelejaran berbasis website yang responsive di android yang di beri nama &quot;WEPCET&quot;{' '}
            </p>
            <p className="leading-relaxed text-justify">
              Aplikasi WEPCET ini merupakan aplikasi yang didalam nya membahas mengenai materi pembaca cepat, bukan hanya materi saja didalam aplikasi ini juga terdapat beberapa fitur diantara nya yaitu relevansi, materi, simulasi, Quis,
              serta tes membaca cepat. Aplikasi ini dikemas dengan semenarik mungkin agar peserta didik mudah untuk memahami nya. Saya berharap semoga aplikasi ini bermanfaat untuk menambah ilmu pengetahuan dan dapat menambah wawasan bagi
              para pengguna
            </p>
          </div>
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/relevant/benefit')} isLeft={false} />
    </>
  );
};
