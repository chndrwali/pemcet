'use client';

import { Header } from '@/components/header/header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [waktu, setWaktu] = useState(25);
  const [mulai, setMulai] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (mulai && waktu > 0) {
      timer = setInterval(() => {
        setWaktu((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mulai, waktu]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      router.push('/latihan-membaca/cepat2');
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
          {/* Judul */}
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
          {/* Info dan Timer */}
          {mulai && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center mt-4 mb-6 px-6 w-full max-w-4xl">
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Kemampuan Mengenali Kata (25 Detik)</div>
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
            </div>
          )}

          {/* Running Text Box */}
          <div className="bg-white mx-auto w-4/5 h-[300px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative">
            {mulai ? (
              <div className={`absolute w-full text-[1.2rem]  text-center ${waktu === 0 ? 'animate-none' : 'animate-scrollDown'}`}>
                <h1 className="font-bold text-center">Kucing Hitam yang Bijaksana</h1>
                <p>Dlahu satau wktu, hduiplah sseekor kcoong brwarna htam di sebuat htuatn.</p>
                <p>Kcoong tbreseut snagat cpadik dngean mlcari mknaan di mlama hrai.</p>
                <p>Sautu hiari, ia mnemukan sbeuah bkaul ynag bsurir hkamd dan rtoi.</p>
                <p>Ia mmberikn mnakanan itu kpada tman-tmannya dngan snagat bhgia.</p>
                <p>Kcoong itu dketahui mnyuka tlong mnolong dan slalu mbuat sgala mhahluk di htuan trsebut snang.</p>
                <p>Apda akhrnya, kcoong htam itupun mjadi pmpinan di htuan trsbt krna kbijakannya.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4">
                <p className="text-lg font-semibold">Klik tombol mulai untuk memulai latihan</p>
                <button
                  onClick={() => setMulai(true)}
                  style={{
                    backgroundColor: '#ffc107',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    padding: '12px 30px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  }}
                  className="w-fit mt-14"
                >
                  Mulai
                </button>
              </div>
            )}
          </div>

          {/* Tombol Next */}
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
              borderRadius: '15px',
              border: '9px solid #fff',
              padding: '15px 30px',
              maxWidth: '600px',
              margin: '80px auto 10px auto',
              fontSize: '28px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Inilah Isi Teks Asli Diatas
          </div>

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
            Kucing Hitam yang Bijaksana
          </div>

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
            Dahulu suatu waktu, hiduplah seekor kucing berwarna hitam di sebuah hutan. Kucing tersebut sangat cerdik dalam mencari makanan di malam hari. Suatu hari, ia menemukan sebuah bakul yang berisi ikan dan roti. Ia memberikan makanan
            itu kepada teman-temannya dengan sangat bahagia. Kucing itu dikenal suka menolong dan selalu membuat segala makhluk di hutan tersebut senang. Pada akhirnya, kucing hitam itu pun menjadi pemimpin di hutan tersebut karena
            kebijakannya.
          </div>

          {/* Tombol Next dan Back */}
          <div className="flex justify-between w-full px-10 mt-10">
            <button onClick={handleBack}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
            </button>
            <button onClick={handleNext}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ width: '55px', height: '55px' }} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
