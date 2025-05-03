import { Header } from '@/components/header/header';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-doa z-20">
      <Header />
      <div
        style={{
          backgroundColor: '#442412',
          color: 'white',
          padding: '15px 40px',
          fontSize: '30px',
          fontWeight: 'bold',
          borderRadius: '20px',
          width: 'fit-content',
          border: '9px solid #fff',
          margin: '0 auto 30px auto',
          fontFamily: '"Comic Sans MS", cursive',
        }}
      >
        Kebiasaan Buruk Dalam Membaca Cepat
      </div>

      {/* Konten */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '9px solid #442412',
          borderRadius: '20px',
          padding: '25px',
          maxWidth: '900px',
          margin: '0 auto',
          lineHeight: '1.8',
          fontSize: '17px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <b>Hindari Vokalisasi:</b> kebiasaan ini dilakukan dengan cara melafalkan apa yang kita baca. Kebiasaan ini juga dapat mengurangi kecepatan membaca.
          </li>
          <li>
            <b>Hindari Subvokalisasi:</b> Kebiasaan membaca tanpa suara di bibir, tapi mengucapkan kata dalam hati, dapat mengurangi kecepatan dalam membaca.
          </li>
          <li>
            <b>Hindari Gerakan Bibir:</b> Tidak bersuara, tapi bibir seperti orang berbicara dan melafalkan sesuatu. Kebiasaan ini dapat mengurangi kecepatan dalam membaca.
          </li>
          <li>
            <b>Hindari Gerakan Kepala:</b> Banyak orang ketika membaca kepalanya ikut bergerak mengikuti kata demi kata dalam bahan bacaan. Kebiasaan ini akan menghambat kecepatan dalam membaca.
          </li>
          <li>
            <b>Regresi (Pengulangan ke belakang):</b> Kebiasaan membaca suatu kalimat atau paragraf kemudian tidak yakin dengan isinya atau merasa kurang paham kemudian kita balik lagi dan mengulang kalimat atau paragraf tersebut.
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
        <Link href="/learning-materials/prinsip">
          <Image src="/icon/arrow.png" width={50} height={50} alt="Left" style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
        </Link>
      </div>
    </section>
  );
};

export default Page;
