import { Metadata } from 'next';
import { Header } from '@/components/header/header';
import { getCurrentUser } from '@/actions/getCurrentUser';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Manfaat',
};

const RelevantPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-desa z-20">
      <Header currentUser={currentUser} />
      <div
        style={{
          maxWidth: '400px',
          margin: '0 auto 30px auto',
          padding: '10px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {/* Card Coklat di Dalamnya */}
        <div
          style={{
            background: '#442412',
            color: 'white',
            borderRadius: '12px',
            padding: '20px',
            fontSize: '16px',
            fontWeight: '500',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            rowGap: '8px',
            columnGap: '10px',
          }}
        >
          <div>Mata pelajaran</div>
          <div>: Bahasa Indonesia</div>
          <div>Kelas</div>
          <div>: V (Lima)</div>
          <div>Fase</div>
          <div>: C</div>
          <div>Elemen</div>
          <div>: Membaca</div>
        </div>
      </div>

      {/* Card Gabungan Capaian dan Tujuan Pembelajaran */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto 40px auto',
          background: '#442412',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '20px',
          color: 'white',
        }}
      >
        {/* Capaian Pembelajaran */}
        <div
          style={{
            background: '#2f80ed',
            color: 'white',
            padding: '10px 20px',
            width: 'fit-content',
            clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0% 100%)',
            fontWeight: 'bold',
            margin: '15px',
          }}
        >
          Capaian Pembelajaran
        </div>

        <div
          style={{
            padding: '15px',
            borderBottom: '1px solid #eee',
            background: '#fff',
            color: 'black',
            borderRadius: '8px',
            marginBottom: '15px',
          }}
        >
          <p>
            Peserta didik mampu membaca kata-kata dengan berbagai pola kombinasi huruf dalam kata dengan fasih dan indah. Peserta didik mampu memahami informasi dan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk
            mengidentifikasi objek, fenomena, dan karakter. Peserta didik mampu menganalisis informasi dari berbagai tipe teks serta nilai-nilai yang terkandung dalam teks sastra dari teks visual dan/atau audiovisual. Peserta didik mampu
            membaca hasil pengamatan.
          </p>
        </div>

        {/* Tujuan Pembelajaran */}
        <div
          style={{
            background: '#2f80ed',
            color: 'white',
            padding: '10px 20px',
            width: 'fit-content',
            clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0% 100%)',
            fontWeight: 'bold',
            margin: '15px',
          }}
        >
          Tujuan Pembelajaran
        </div>

        <div
          style={{
            padding: '15px',
            background: '#fff',
            color: 'black',
            borderRadius: '8px',
            marginBottom: '15px',
          }}
        >
          <ol>
            <li>Peserta didik dapat membaca teks bacaan dengan kecepatan minimal 250 kata per menit dengan tetap mempertahankan pemahaman terhadap isi teks.</li>
            <li>Peserta didik mampu menjawab pertanyaan berdasarkan isi teks yang telah dibaca.</li>
          </ol>
        </div>
      </div>

      {/* Navigasi */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
        <Link href="/relevant">
          <Image src="/icon/arrow.png" width={50} height={50} alt="Left" style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
        </Link>

        <Link href="/relevant/developer">
          <Image src="/icon/arrow.png" width={50} height={50} alt="Right" style={{ width: '55px', height: '55px' }} />
        </Link>
      </div>
    </section>
  );
};

export default RelevantPage;
