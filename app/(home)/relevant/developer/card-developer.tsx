'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CardDeveloper = () => {
  const router = useRouter();

  return (
    <>
      <div className="relative flex flex-col md:flex-row items-center justify-center z-20">
        <div>
          <Image src="/logo/nur.png" alt="Nur" width={200} height={100} />
        </div>
        <div className="rounded-xl bg-blue-900 p-4">
          <div className="rounded-xl bg-white ">
            <div className={` flex flex-col px-4 py-1 text-sm uppercase text-center`}>
              <h1>Nur Aulia Rahmah</h1>
              <h2>2109004</h2>
              <span>Pendidikan Guru Sekolah Dasar</span>
              <span>Universitas Pendidikan Indonesia</span>
              <span>Kampus Daerah Sumedang</span>
            </div>
          </div>
        </div>
      </div>
      <ButtonNextPrevious isLeft={true} onClick={() => router.back()} />
      <ButtonNextPrevious isLeft={false} onClick={() => router.push('/learning-materials')} />
    </>
  );
};
