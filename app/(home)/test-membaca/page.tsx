'use client';

import { Header } from '@/components/header/header';
import { quizSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const Page = () => {
  const [waktu, setWaktu] = useState(0);
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

  const durasiPerBaris = (30 * 1000) / teksPerBaris.length;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (mulai) {
      timer = setInterval(() => {
        setWaktu((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mulai]);

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

  const handleSelesaiMembaca = () => {
    setMulai(false);
    form.setValue('count', waktu);
    setStep(4);
  };

  const handleMulaiMembaca = () => {
    setMulai(true);
    setWaktu(0);
    setBarisAktif(0);
    setStep(3);
  };

  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      name: '',
      class: undefined,
      count: undefined,
      quiz: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof quizSchema>) => {
    console.log('Data terkumpul:', data);
    alert('Form berhasil dikirim!');
  };

  const nextStep = async () => {
    const valid = await trigger(step === 1 ? ['name', 'class'] : step === 4 ? ['count'] : ['quiz']);
    if (valid) setStep((s) => s + 1);
  };

  //   const prevStep = () => setStep((s) => s - 1);

  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-deskripsi z-20">
      <Header />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div
              style={{
                backgroundColor: '#fff',
                border: '8px solid #5b2c0f',
                borderRadius: '16px',
                padding: '30px 20px',
                maxWidth: '700px',
                width: '100%',
                margin: '0 auto',
                marginTop: '150px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                textAlign: 'center',
              }}
            >
              {/* Judul */}
              <h1
                style={{
                  fontSize: '26px',
                  fontWeight: 'bold',
                  color: '#78290f',
                  textShadow: '1px 1px #fff',
                  marginBottom: '25px',
                }}
              >
                Tes Membaca Cepat dan Uji Pemahaman <br /> Dalam Membaca
              </h1>

              {/* Gambar sekolah */}
              <div style={{ marginBottom: '25px' }} className="flex items-center justify-center">
                <Image src="/sekolah.png" alt="Sekolah" width={200} height={200} style={{ maxWidth: '250px' }} />
              </div>

              {/* Form nama dan kelas */}
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '2px solid #5b2c0f',
                  borderRadius: '10px',
                  padding: '15px 20px',
                  display: 'inline-block',
                  textAlign: 'left',
                  marginBottom: '30px',
                }}
              >
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontWeight: 'bold' }}>NAMA :</label>
                  <input
                    {...register('name')}
                    placeholder="............................."
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '5px',
                      border: 'none',
                      borderBottom: '2px dotted #000',
                      backgroundColor: 'transparent',
                      fontSize: '16px',
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>KELAS :</label>
                  <input
                    {...register('class')}
                    type="number"
                    placeholder="............................."
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '5px',
                      border: 'none',
                      borderBottom: '2px dotted #000',
                      backgroundColor: 'transparent',
                      fontSize: '16px',
                    }}
                  />
                  {errors.class && <p className="text-red-500 text-sm">{errors.class.message}</p>}
                </div>
              </div>

              {/* Tombol Mulai */}
              <div>
                <button
                  type="button"
                  onClick={nextStep}
                  style={{
                    backgroundColor: '#5b2c0f',
                    color: 'white',
                    padding: '12px 40px',
                    fontSize: '22px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  Mulai
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <div
                style={{
                  backgroundColor: '#4b2e13',
                  color: 'white',
                  border: '9px solid #fff',
                  borderRadius: '20px',
                  padding: '30px',
                  maxWidth: '850px',
                  margin: '100px auto 0 auto',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  lineHeight: '1.6',
                  textAlign: 'center',
                }}
              >
                <p>Tes waktunya dimulai sekarang! ⏱️</p>
                <p>Di bagian ini, kamu akan diuji untuk melihat seberapa cepat dan seberapa baik kamu bisa membaca dan memahami bacaan. Saat kamu mulai membaca, waktu akan berjalan otomatis. Jadi, pastikan kamu fokus sejak awal ya!</p>
                <p>Kalau kamu sudah selesai membaca, jangan lupa tekan tombol “Selesai Membaca” supaya waktunya berhenti.</p>
                <p>
                  Setelah itu, kamu akan menjawab beberapa pertanyaan tentang isi bacaan. Tenang saja, ini bukan ujian yang menakutkan, kok! Ini hanya untuk melihat seberapa besar kemampuanmu berkembang. 📌 Yuk, ambil posisi yang nyaman,
                  tarik napas dalam-dalam... dan mulai membaca sekarang! 💡
                </p>
              </div>

              <button
                onClick={handleMulaiMembaca}
                type="button"
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: 30,
                }}
                title="Mulai Latihan"
              >
                <Image src="/icon/arrow.png" alt="Next" width={55} height={55} style={{ width: '55px', height: '55px' }} />
              </button>
            </>
          )}

          {step === 3 && (
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
                Tes Membaca Cepat
              </div>
              <div className="flex items-center justify-between my-8 px-20 w-full">
                <div className="bg-[#3e1f1f] text-white px-5 py-2 rounded-[15px] font-bold">Membaca 250 Kata</div>
                <div className="bg-[#3e1f1f] text-white px-5 py-2 rounded-[15px] font-bold">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
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
                {mulai ? <div>{teksPerBaris[barisAktif]}</div> : <p>Klik tombol mulai untuk memulai tes</p>}
              </div>
              {!mulai && (
                <button
                  onClick={handleMulaiMembaca}
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '15px 30px',
                    fontSize: '20px',
                    borderRadius: '10px',
                    display: 'block',
                    margin: '30px auto 0 auto',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Mulai Latihan
                </button>
              )}

              <button onClick={handleSelesaiMembaca} type="button" className="absolute bottom-[30px] right-[30px] w-[60px] h-[60px]">
                <Image src="/icon/arrow.png" width={55} height={55} alt="Next" />
              </button>
            </>
          )}
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
