'use client';

import { Header } from '@/components/header/header';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <section className={`relative flex flex-col items-center min-h-screen bg-center bg-cover bg-deskripsi z-20`}>
      <Header />

      <div className="container px-4 py-12 max-w-5xl">
        {/* Judul Halaman */}
        <div
          style={{
            backgroundColor: '#442412',
            color: 'white',
            padding: '15px 40px',
            fontSize: '30px',
            fontWeight: 'bold',
            border: '9px solid #fff',
            borderRadius: '20px',
            width: 'fit-content',
            margin: '0 auto 40px auto',
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          Games
        </div>

        {/* Kartu Latihan Membaca */}
        <div className="grid gap-8 md:grid-cols-2 ">
          {/* Kartu 2: Prinsip Membaca Cepat */}
          <div className="bg-white rounded-2xl border-[5px] border-[#3e1f1f] overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#3e1f1f] mb-4 text-center">Prinsip Membaca Cepat</h2>
              <div className="flex justify-center mb-4">
                <Image src="/icon/2.png" alt="Prinsip Membaca" width={200} height={150} className="rounded-lg" />
              </div>
              <p className="text-gray-700 mb-6">Soal pilihan ganda (PG) berdasarkan prinsip-prinsip dalam membaca cepat. Uji pengetahuanmu tentang teknik membaca yang efektif.</p>
              <div className="flex justify-center">
                <a href="https://wordwall.net/id/resource/91437565" target="_blank" rel="noopener noreferrer" className="bg-[#5b2c0f] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#78290f] transition-colors">
                  Kerjakan Soal
                </a>
              </div>
            </div>
          </div>

          {/* Kartu 3: Kebiasaan Buruk dalam Membaca */}
          <div className="bg-white rounded-2xl border-[5px] border-[#3e1f1f] overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#3e1f1f] mb-4 text-center">Kebiasaan Buruk Membaca</h2>
              <div className="flex justify-center mb-4">
                <Image src="/icon/4.png" alt="Kebiasaan Buruk" width={200} height={150} className="rounded-lg" />
              </div>
              <p className="text-gray-700 mb-6">Soal pilihan ganda (PG) tentang kebiasaan buruk dalam membaca cepat. Kenali dan hindari kebiasaan yang menghambat kecepatan membaca.</p>
              <div className="flex justify-center">
                <a href="https://wordwall.net/id/resource/91437926" target="_blank" rel="noopener noreferrer" className="bg-[#5b2c0f] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#78290f] transition-colors">
                  Kerjakan Soal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Petunjuk */}
        <div
          className="mt-12 bg-white rounded-2xl border-[5px] border-[#3e1f1f] p-6"
          style={{
            maxWidth: '850px',
            margin: '40px auto',
          }}
        >
          <h2 className="text-2xl font-bold text-[#3e1f1f] mb-4 text-center">Petunjuk Latihan</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-bold">1. Prinsip Membaca Cepat:</span> Kerjakan soal pilihan ganda untuk memahami prinsip-prinsip dalam membaca cepat.
            </p>
            <p>
              <span className="font-bold">2. Kebiasaan Buruk Membaca:</span> Pelajari kebiasaan yang harus dihindari untuk meningkatkan kecepatan membaca.
            </p>
            <p className="font-bold text-center mt-6">Lakukan latihan secara rutin untuk meningkatkan kemampuan membaca cepat!</p>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="flex justify-center mt-8">
          <Link href="/learning-materials" className="flex items-center gap-2 bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5b2c0f] transition-colors">
            <ArrowLeft className="size-5" />
            Kembali ke Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
