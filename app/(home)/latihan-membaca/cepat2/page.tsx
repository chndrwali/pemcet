'use client';

import { Header } from '@/components/header/header';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Page = () => {
  const [waktu, setWaktu] = useState(30);
  const [mulai, setMulai] = useState(false); // Awalnya belum mulai
  const [barisAktif, setBarisAktif] = useState(0);
  const [step, setStep] = useState(1);

  const teksPerBaris = [
    'JUDUL: Manfaat Membaca Buku',
    'Membaca buku adalah kegiatan yang sangat bermanfaat.',
    'Dengan membaca, kita bisa mendapatkan banyak ilmu dan wawasan baru.',
    'Selain itu, membaca juga melatih otak agar lebih aktif berpikir.',
    'Salah satu manfaat membaca adalah menambah kosakata.',
    'Semakin banyak kata yang kita baca, semakin kaya bahasa yang kita kuasai.',
    'Ini membantu kita berbicara dan menulis dengan lebih baik.',
    'Selain itu, membaca juga bisa meningkatkan konsentrasi.',
    'Saat membaca, kita harus fokus agar memahami isi bacaan.',
    'Ini melatih otak untuk lebih berkonsentrasi dalam berbagai aktivitas.',
    'Membaca juga bisa menjadi hiburan yang menyenangkan.',
    'Ada banyak jenis buku yang bisa dipilih, seperti cerita petualangan, dongeng, atau buku komik.',
    'Dengan membaca, kita bisa berimajinasi dan masuk ke dunia cerita yang menarik.',
    'Tidak hanya itu, membaca juga bisa membantu meningkatkan daya ingat.',
    'Saat membaca, kita mengingat banyak informasi, seperti nama tokoh, alur cerita, dan fakta penting.',
    'Ini membantu melatih memori kita.',
    'Agar membaca lebih menyenangkan, pilihlah buku yang sesuai dengan minat kita.',
    'Bacalah di tempat yang nyaman dan hindari gangguan.',
    'Jika kita membaca secara rutin, lama-lama akan menjadi kebiasaan yang bermanfaat.',
    'Jadi, mari biasakan membaca setiap hari.',
    'Dengan membaca, kita bisa menjadi lebih cerdas, kreatif, dan memiliki banyak pengetahuan.',
  ];

  const totalDurasi = 30; // detik
  const durasiPerBaris = (totalDurasi * 1000) / teksPerBaris.length;

  // Timer waktu mundur
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (mulai && waktu > 0) {
      timer = setInterval(() => {
        setWaktu((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mulai, waktu]);

  // Ganti baris teks otomatis saat latihan dimulai
  useEffect(() => {
    let teksTimer: ReturnType<typeof setInterval>;
    if (mulai && barisAktif < teksPerBaris.length - 1) {
      teksTimer = setInterval(() => {
        setBarisAktif((prev) => prev + 1);
      }, durasiPerBaris);
    }
    return () => clearInterval(teksTimer);
  }, [mulai, barisAktif, durasiPerBaris, teksPerBaris.length]);

  const handleMulai = () => {
    setMulai(true);
    setWaktu(30);
    setBarisAktif(0);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-desa z-20">
      <Header />
      {step === 1 && (
        <>
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
              margin: '0 auto 30px auto',
              fontFamily: '"Comic Sans MS", cursive',
            }}
          >
            Latihan Membaca Cepat
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center mt-4 mb-6 px-6 w-full max-w-4xl">
            <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Tes Membaca (190 Kata)</div>
            <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
          </div>
          <div
            className="bg-white mx-auto w-4/5 h-[300px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '250px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '20px',
              fontSize: '24px',
              fontWeight: 'bold',
              marginTop: '30px',
              color: '#333',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {mulai ? (
              <div>{teksPerBaris[barisAktif]}</div>
            ) : (
              <div className="flex flex-col">
                <p>Klik tombol mulai untuk memulai latihan</p>
                {!mulai && (
                  <button
                    onClick={handleMulai}
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      padding: '14px 28px',
                      fontSize: '18px',
                      borderRadius: '10px',
                      display: 'block',
                      margin: '16px auto 0 auto',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Mulai
                  </button>
                )}
              </div>
            )}
          </div>

          {waktu === 0 && (
            <button onClick={handleNext} className="absolute bottom-[30px] right-[30px] w-[60px] h-[60px]">
              <Image src="/icon/arrow.png" width={55} height={55} alt="Next" />
            </button>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <div
            style={{
              backgroundColor: '#4b2e13',
              color: 'white',
              borderRadius: '20px',
              border: '9px solid #fff',
              padding: '15px 40px',
              maxWidth: '600px',
              margin: '0 auto 30px auto',
              fontSize: '28px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Inilah Teks Yang Baru Saja Dibaca Selama 30 Detik
          </div>

          {/* Subjudul */}
          <div
            style={{
              backgroundColor: '#4b2e13',
              color: 'white',
              borderRadius: '10px',
              padding: '10px 20px',
              maxWidth: '400px',
              margin: '10px auto',
              fontSize: '22px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Manfaat Membaca Buku
          </div>

          {/* Paragraf teks */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '25px',
              margin: '20px auto',
              maxWidth: '850px',
              fontSize: '18px',
              lineHeight: '1.7',
              border: '8px solid #4b2e13',
              fontWeight: 'bold',
              textAlign: 'justify',
            }}
          >
            <p>
              {' '}
              Membaca buku adalah kegiatan yang sangat bermanfaat. Dengan membaca, kita bisa mendapatkan banyak ilmu dan wawasan baru. Selain itu, membaca juga melatih otak agar lebih aktif berpikir. Salah satu manfaat membaca adalah
              menambah kosakata. Semakin banyak kata yang kita baca, semakin kaya bahasa yang kita kuasai. Ini membantu kita berbicara dan menulis dengan lebih baik. Selain itu, membaca juga bisa meningkatkan konsentrasi. Saat membaca, kita
              harus fokus agar memahami isi bacaan. Ini melatih otak untuk lebih berkonsentrasi dalam berbagai aktivitas. Membaca juga bisa menjadi hiburan yang menyenangkan.
            </p>
            <p className="mt-4">
              Ada banyak jenis buku yang bisa dipilih, seperti cerita petualangan, dongeng, atau buku komik. Dengan membaca, kita bisa berimajinasi dan masuk ke dunia cerita yang menarik. Tidak hanya itu, membaca juga bisa membantu
              meningkatkan daya ingat. Saat membaca, kita mengingat banyak informasi, seperti nama tokoh, alur cerita, dan fakta penting. Ini membantu melatih memori kita. Agar membaca lebih menyenangkan, pilihlah buku yang sesuai dengan
              minat kita. Bacalah di tempat yang nyaman dan hindari gangguan. Jika kita membaca secara rutin, lama-lama akan menjadi kebiasaan yang bermanfaat. Jadi, mari biasakan membaca setiap hari. Dengan membaca, kita bisa menjadi lebih
              cerdas, kreatif, dan memiliki banyak pengetahuan.{' '}
            </p>
          </div>
          <div className="flex justify-between w-full px-10 mt-10">
            <button onClick={handleBack}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
