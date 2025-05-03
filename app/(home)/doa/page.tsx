import { Header } from '@/components/header/header';
import Image from 'next/image';
import Link from 'next/link';

const Page = async () => {
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
          borderRadius: '30px',
          width: 'fit-content',
          margin: '0 auto 40px auto',
          fontFamily: '"Comic Sans MS", cursive',
        }}
      >
        Doa Sebelum Belajar
      </div>

      {/* Konten Doa */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '30px',
          background: '#fff',
          border: '8px solid #5b3923',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontFamily: 'Segoe UI',
        }}
      >
        <div
          style={{
            fontSize: '1.8rem',
            direction: 'rtl',
            textAlign: 'right',
            lineHeight: '2.5rem',
            marginBottom: '20px',
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          <br />
          <br />
          رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولًا.
          <br />
          رَبِّ زِدْنِي عِلْمًا نَافِعًا وَارْزُقْنِي فَهْمًا
        </div>

        <div style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
          <strong>Latin:</strong>
          <br />
          Rodlitu billahi robba, wabi islaamidina, wabimuhammadin nabiyya warasulla. Robbi zidni ilman nafi&apos;a warzuqni fahma.
        </div>

        <div style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '30px' }}>
          <strong>Artinya:</strong>
          <br />
          &quot;Aku ridha Allah SWT sebagai Tuhanku, dan Islam sebagai agamaku, dan Muhammad saw sebagai Nabi dan Rasulku. Ya Allah tambahkanlah kepadaku ilmu dan berikanlah aku pemahaman yang baik.&quot;
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '50px' }}>
          <Link href="/relevant" style={{ marginLeft: 'auto' }}>
            <Image src="/icon/arrow.png" width={44} height={44} alt="Next" style={{ width: '55px', height: '55px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
