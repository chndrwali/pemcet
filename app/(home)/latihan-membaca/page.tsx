import { Header } from '@/components/header/header';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-desa z-20">
      <Header />
      <div
        style={{
          backgroundColor: '#4b2e13',
          color: 'white',
          border: '9px solid #fff',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '850px',
          margin: '100px auto 0 auto',
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '1.6',
          textAlign: 'center',
        }}
      >
        <p>Hai, Sahabat Pintar! 👋</p>
        <p>
          Siap untuk melatih kecepatan membacamu hari ini?
          <br />
          Di sini, kamu akan membaca teks yang seru dan menantang dengan waktu yang sudah disiapkan. Jangan khawatir, kamu tidak perlu buru-buru, tapi cobalah untuk membaca dengan fokus dan tanpa mengulang kata-kata.
        </p>
        <p>Ini untuk melihat apakah kamu benar-benar paham dengan isi bacaan, bukan hanya sekadar cepat.</p>
        <p>Yuk, mulai sekarang! Buktikan kalau kamu bisa membaca cepat dan paham isi bacaan dengan baik! 🚀</p>
      </div>

      {/* Tombol Lanjut (Panah kanan) */}
      <Link
        href="/latihan-membaca/cepat" // Ganti sesuai rute kamu
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
        }}
        title="Mulai Latihan"
      >
        <Image src="/icon/arrow.png" alt="Next" width={55} height={55} style={{ width: '55px', height: '55px' }} />
      </Link>
    </section>
  );
};

export default Page;
