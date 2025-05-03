import { Metadata } from 'next';
import { Header } from '@/components/header/header';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pengembang',
};

const DeveloperPage = async () => {
  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-doa z-20">
      <Header />
      <div
        style={{
          backgroundColor: '#442412',
          color: 'white',
          padding: '10px 20px',
          fontSize: '35px',
          fontWeight: 'bold',
          borderRadius: '30px',
          width: 'fit-content',
          margin: '0 auto 10px auto',
          textAlign: 'center',
        }}
      >
        Profil
      </div>
      <div
        style={{
          backgroundColor: '#442412',
          color: 'white',
          padding: '10px 30px',
          fontSize: '35px',
          fontWeight: 'bold',
          borderRadius: '30px',
          width: 'fit-content',
          margin: '0 auto 30px auto',
          textAlign: 'center',
        }}
      >
        Pengembangan
      </div>

      {/* Kartu Utama Profil */}
      <div className="bg-[#442412] rounded-[20px] max-w-[500px] w-full mx-auto p-4 shadow-md">
        <div className="bg-white rounded-xl p-6 text-center">
          <Image src="/aulia.jpg" alt="Profil" width={160} height={200} className="mx-auto rounded-xl object-cover mb-4" />
          <h3 className="text-[25px] font-bold text-[#442412] mb-1">Nur Aulia Rahmah</h3>
          <p className="font-bold text-[#442412]">2109004</p>
          <p className="font-bold text-[#442412]">Pendidikan Guru Sekolah Dasar</p>
          <p className="font-bold text-[#442412]">Universitas Pendidikan Indonesia</p>
          <p className="font-bold text-[#442412]">Kampus Daerah Sumedang</p>
        </div>
      </div>

      {/* Navigasi Panah */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', width: '100%', paddingRight: '10px', paddingLeft: '10px' }}>
        <Link href="/relevant/benefit">
          <Image src="/icon/arrow.png" width={55} height={55} alt="Sebelumnya" style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
        </Link>
        <Link href="/learning-materials">
          <Image src="/icon/arrow.png" width={55} height={55} alt="Selanjutnya" style={{ width: '55px', height: '55px' }} />
        </Link>
      </div>
    </section>
  );
};

export default DeveloperPage;
