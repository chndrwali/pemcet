import { Metadata } from 'next';
import { Header } from '@/components/header/header';
import { getCurrentUser } from '@/actions/getCurrentUser';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Relevansi',
};

const RelevantPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-deskripsi z-20">
      <Header currentUser={currentUser} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '-20px',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: '#4b2e18',
            color: '#fff',
            padding: '8px 20px',
            borderRadius: '30px 30px 0 0',
            fontWeight: 'bold',
            fontSize: '18px',
            fontFamily: '"Comic Sans MS", cursive',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          DESKRIPSI
        </div>

        <div
          style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '8px 20px',
            borderRadius: '30px 30px 0 0',
            fontWeight: 'bold',
            fontSize: '18px',
            fontFamily: '"Comic Sans MS", cursive',
            border: '2px solid #ccc',
          }}
        >
          PRODUK
        </div>
      </div>

      {/* Konten Deskripsi */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '30px',
          background: 'rgba(255,255,255,0.95)',
          border: '8px solid #5b3923',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8rem', marginBottom: '15px' }}>Assalamualaikum warahmatullahi wabarakatuh.</p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8rem', marginBottom: '15px' }}>
          Puji dan syukur kehadirat Allah SWT. Karena berkat rahmat dan karunia-Nya, saya dapat menyelesaikan media pembelajaran berbasis website yang bernama <strong>“WEPCET”</strong>, yang merupakan kependekatan dari{' '}
          <em>(Web Pembaca Cepat)</em>.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8rem', marginBottom: '15px' }}>
          Website ini dapat membantu peserta didik untuk bisa membaca cepat pada mata pelajaran Bahasa Indonesia. Dalam Web ini terdapat menu materi, latihan membaca cepat, tes membaca cepat, dan latihan meningkatkan membaca cepat. Dengan
          adanya media pembelajaran berbasis website ini peserta didik dapat belajar kapan pun dan dimana pun baik di sekolah maupun di rumah.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8rem', marginBottom: '25px' }}>
          Website ini dikemas dengan semenarik mungkin agar peserta didik mudah untuk memahaminya. Saya berharap semoga website ini bermanfaat untuk menambah ilmu pengetahuan dan dapat menambah wawasan bagi para pengguna.
        </p>

        {/* Navigasi panah */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
          <Link href="/doa">
            <Image width={55} height={55} src="/icon/arrow.png" alt="Kembali" style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
          </Link>

          <Link href="/relevant/benefit">
            <Image width={55} height={55} src="/icon/arrow.png" alt="Lanjut" style={{ width: '55px', height: '55px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelevantPage;
