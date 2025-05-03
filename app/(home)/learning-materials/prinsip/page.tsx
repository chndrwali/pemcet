import { Header } from '@/components/header/header';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-deskripsi z-20">
      <Header />
      <div
        style={{
          backgroundColor: '#442412',
          color: 'white',
          padding: '15px 40px',
          fontSize: '35px',
          fontWeight: 'bold',
          borderRadius: '20px',
          width: 'fit-content',
          margin: '0 auto 30px auto',
          fontFamily: '"Comic Sans MS", cursive',
        }}
      >
        Prinsip Dalam Membaca
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
            <b>Gunakan Mata, Bukan Suara:</b> Lakukan teknik membaca cepat dengan memindai teks menggunakan mata, bukan bergantung pada suara.
          </li>
          <li>
            <b>Lompat Kata dan Fokus pada Inti:</b> Tidak semua kata dalam teks penting. Latihlah untuk langsung mengenali dan memahami kata-kata inti yang mewakili informasi penting.
          </li>
          <li>
            <b>Fokus dan Konsentrasi:</b> Menjaga fokus dan menghindari gangguan sangat penting dalam membaca cepat. Semakin fokus kita, semakin cepat juga kita dapat mencerna informasi.
          </li>
          <li>
            <b>Latihan Rutin:</b> Membaca cepat adalah keterampilan yang membutuhkan latihan. Semakin sering kita berlatih, semakin baik kemampuan dalam membaca cepat.
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
        <Link href="/learning-materials/manfaat">
          <Image src="/icon/arrow.png" width={50} height={50} alt="Left" style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
        </Link>

        <Link href="/learning-materials/kebiasaan">
          <Image src="/icon/arrow.png" width={50} height={50} alt="Right" style={{ width: '55px', height: '55px' }} />
        </Link>
      </div>
    </section>
  );
};

export default Page;
