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
        Manfaat Membaca Cepat
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
            <b>Menghemat Waktu:</b> Dengan membaca cepat, siswa dapat menyelesaikan bacaan lebih cepat tanpa mengorbankan pemahaman, sehingga dapat menghemat waktu.
          </li>
          <li>
            <b>Mengurangi Stres:</b> Dengan membaca cepat, membantu siswa mengatasi tumpukan bacaan dengan lebih mudah, yang bisa mengurangi rasa stres atau kewalahan dalam belajar.
          </li>
          <li>
            <b>Meningkatkan Pemahaman:</b> Dengan membaca cepat, membuat pemahaman menjadi lebih baik karena otak lebih aktif saat membaca cepat.
          </li>
          <li>
            <b>Meningkatkan Konsentrasi:</b> Dengan membaca cepat, melatih siswa untuk lebih fokus dan konsisten dalam membaca, karena memerlukan konsentrasi yang lebih tinggi.
          </li>
          <li>
            <b>Meningkatkan Memori:</b> Dengan membaca cepat, bisa membantu dalam meningkatkan daya ingat, karena otak bekerja lebih aktif saat memahami informasi dalam waktu singkat.
          </li>
          <li>
            <b>Mengurangi Kebosanan:</b> Dengan membaca cepat, siswa mengurangi waktu yang diperlukan untuk menyelesaikan satu bacaan, yang bisa mengurangi rasa bosan dalam membaca.
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
        <Link href="/learning-materials/percakapan">
          <Image src="/icon/arrow.png" width={50} height={50} alt="Left" style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
        </Link>

        <Link href="/learning-materials/prinsip">
          <Image src="/icon/arrow.png" width={50} height={50} alt="Right" style={{ width: '55px', height: '55px' }} />
        </Link>
      </div>
    </section>
  );
};

export default Page;
