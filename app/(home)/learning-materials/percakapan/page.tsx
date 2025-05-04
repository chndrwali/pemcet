'use client';

import { Header } from '@/components/header/header';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get('step') || '1', 10);
  const [step, setStep] = useState(initialStep);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      router.push('/learning-materials/manfaat');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <section className={`relative  min-h-screen bg-center bg-cover ${step === 1 ? 'bg-doa' : 'bg-deskripsi'} z-20`}>
      <Header />
      {step === 1 && (
        <motion.div style={{ position: 'relative', marginBottom: '10px' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
          {/* Karakter */}
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Image src="/pem.png" alt="Karakter" width={160} height={160} style={{ width: '160px' }} />
          </motion.div>

          {/* Balon ucapan */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              position: 'absolute',
              top: '10px',
              left: '150px',
              backgroundColor: 'white',
              border: '4px solid #333',
              borderRadius: '30px',
              padding: '20px',
              maxWidth: '420px',
              fontSize: '16px',
              boxShadow: '4px 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            Hallo sobat pinter! Kali ini kita akan mempelajari bersama mengenai pengertian membaca cepat, yuk simak obrolan Guru dan siswa dibawah ini!!!
          </motion.div>
        </motion.div>
      )}

      {/* Kotak Dialog */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '9px solid #442412',
          borderRadius: '20px',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '30px',
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#000',
          boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
        }}
      >
        {step === 1 ? (
          <>
            <p>
              <strong>Guru:</strong> &quot;Baik, anak-anak, hari ini kita akan belajar tentang membaca cepat. Ada yang tahu apa itu membaca cepat?&quot;
            </p>
            <p>
              <strong>Siswa:</strong> &quot;Apakah itu cara membaca dengan sangat cepat bu?&quot;
            </p>
            <p>
              <strong>Guru:</strong> &quot;Ya, benar, membaca cepat adalah teknik membaca dengan kecepatan lebih tinggi dari biasanya, tetapi bukan hanya tentang membaca cepat saja. Apakah kalian tahu apa lagi yang penting?&quot;
            </p>
            <p>
              <strong>Siswa:</strong> &quot;Mungkin memahami apa yang kita baca bu?&quot;
            </p>
            <p>
              <strong>Guru:</strong> &quot;Tepat sekali, dalam membaca cepat, kita berusaha membaca lebih cepat sambil tetap memahami isi teks yang kita baca. Jadi, maksudnya membaca cepat tanpa kehilangan pemahaman. Bukan sekadar membaca
              secepat kilat, dan melewatkan informasi penting ya.&quot;
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Siswa:</strong> &quot;Kenapa harus belajar membaca cepat bu? Apa bedanya dengan membaca biasa?&quot;
            </p>
            <p>
              <strong>Guru:</strong> &quot;Pertanyaan yang bagus, membaca cepat bisa membantu kita dalam berbagai hal, misalnya menghemat waktu saat membaca buku, artikel, atau materi pelajaran. Dengan membaca cepat, kita bisa memahami
              lebih banyak informasi dalam waktu yang lebih singkat.&quot;
            </p>
            <p>
              <strong>Siswa:</strong> &quot;Bagaimana caranya agar kita bisa membaca cepat, Bu?&quot;
            </p>
            <p>
              <strong>Guru:</strong> &quot;Nah, ada beberapa teknik yang bisa kita pelajari, seperti teknik skimming dan scanning. Kita juga bisa berlatih memperluas area pandangan, sehingga bisa melihat lebih banyak kata dalam sekali
              pandang. Selain itu, kita perlu mengurangi kebiasaan mengucapkan kata-kata dalam hati.&quot;
            </p>
            <p>
              <strong>Siswa:</strong> &quot;Apakah kita bisa langsung jadi cepat membaca, Bu?&quot;
            </p>
            <p>
              <strong>Guru:</strong> &quot;Tidak langsung, karena ini butuh latihan. Seiring waktu, dengan latihan yang teratur, kalian akan bisa meningkatkan kecepatan dan pemahaman kalian dalam membaca.&quot;
            </p>
            <p>
              <strong>Siswa:</strong> &quot;Seru juga ya bu, bisa baca cepat dan paham semuanya!&quot;
            </p>
            <p>
              <strong>Guru:</strong> &quot;Iya, membaca cepat bisa sangat membantu. Nanti kita akan coba latihan ya. Siap belajar membaca cepat?&quot;
            </p>
            <p>
              <strong>Siswa:</strong> &quot;Siap, Bu!&quot;
            </p>
          </>
        )}{' '}
      </div>

      {/* Navigasi Panah */}
      <div className="flex justify-between w-full  mt-8 px-8">
        {step === 2 ? (
          <button onClick={handleBack}>
            <Image src="/icon/arrow.png" alt="Back" width={55} height={55} style={{ transform: 'scaleX(-1)' }} />
          </button>
        ) : (
          <div />
        )}

        <button onClick={handleNext}>
          <Image src="/icon/arrow.png" alt="Next" width={55} height={55} />
        </button>
      </div>
    </section>
  );
};

export default Page;
