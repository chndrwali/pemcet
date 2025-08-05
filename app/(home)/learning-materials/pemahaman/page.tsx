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
        <div
          style={{
            backgroundColor: '#442412',
            color: 'white',
            padding: '15px 40px',
            fontSize: '32px',
            fontWeight: 'bold',
            borderRadius: '30px',
            width: 'fit-content',
            margin: '0 auto 40px auto',
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          Uji Pemahaman Dalam Membaca Cepat
        </div>
        <div
          style={{
            backgroundColor: '#fff',
            border: '9px solid #442412',
            borderRadius: '20px',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '30px',
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#000',
            boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
          }}
        >
          <h2>
            <strong>1. Pengertian Uji Pemahaman Membaca Cepat</strong>
          </h2>
          <p className="text-justify indent-6">
            Uji pemahaman membaca cepat adalah tes yang bertujuan mengukur kemampuan seseorang dalam memahami isi bacaan setelah membacanya dalam waktu terbatas. Uji ini menilai keseimbangan antara kecepatan membaca dan tingkat pemahaman
            terhadap teks yang dibaca.
          </p>
          <br />
          <h2>
            <strong>2. Tujuan Uji Pemahaman Membaca Cepat</strong>
          </h2>
          <ol className="list-decimal pl-6 list-inside">
            <li>Mengetahui tingkat pemahaman pembaca setelah membaca cepat.</li>
            <li>Menentukan kecepatan efektif membaca (KEM) siswa.</li>
            <li>Melatih pembaca agar mampu membaca dengan cepat tanpa kehilangan makna.</li>
            <li>Mengevaluasi kemampuan siswa dalam menangkap ide pokok, detail, dan kesimpulan bacaan.</li>
          </ol>
        </div>

        {/* Navigasi Panah */}
      </div>
      <div className="flex justify-between w-full  mt-8 px-8">
        <button onClick={() => router.push('/learning-materials/kebiasaan')}>
          <Image src="/icon/arrow.png" alt="Back" width={55} height={55} style={{ transform: 'scaleX(-1)' }} />
        </button>
      </div>
    </section>
  );
};

export default Page;
