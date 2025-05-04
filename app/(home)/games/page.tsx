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
        {/* Petunjuk */}
        <div
          className="mt-12 bg-white rounded-2xl border-[5px] border-[#3e1f1f] p-6"
          style={{
            maxWidth: '850px',
            margin: '40px auto',
          }}
        >
          <h2 className="text-2xl font-bold text-[#3e1f1f] mb-6 text-center">Petunjuk Permainan</h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700 text-base leading-relaxed">
            {/* Prinsip Membaca Cepat */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#3e1f1f]">📖 Prinsip Membaca Cepat</h3>
              <p className="italic mb-2">Judul Permainan: Roda Acak</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Klik tombol “Putar” pada roda yang muncul di layar.</li>
                <li>Roda akan berputar otomatis dan menunjuk salah satu dari lima soal.</li>
                <li>Setelah roda berhenti, bacalah soal pilihan ganda yang muncul.</li>
                <li>Pilih jawaban (A, B, C, atau D) yang paling benar.</li>
                <li>Klik “Lanjutkan” atau “Putar Lagi” untuk soal berikutnya.</li>
                <li>Ulangi sampai semua soal selesai dikerjakan.</li>
              </ol>
            </div>

            {/* Kebiasaan Buruk Membaca */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#3e1f1f]">📚 Kebiasaan Buruk Membaca</h3>
              <p className="italic mb-2">Judul Permainan: Membuka Kotak</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Beberapa kotak tertutup dengan nomor akan muncul di layar.</li>
                <li>Klik salah satu kotak untuk membukanya.</li>
                <li>Akan muncul satu soal pilihan ganda (PG).</li>
                <li>Bacalah soal dan pilih jawaban yang paling tepat.</li>
                <li>Kembali ke layar utama dan buka kotak lainnya.</li>
                <li>Lanjutkan sampai semua kotak terbuka dan soal terjawab.</li>
              </ol>
            </div>
          </div>

          <p className="font-bold text-center text-[#3e1f1f] mt-8">🎯 Lakukan latihan secara rutin untuk meningkatkan kemampuan membaca cepat!</p>
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
