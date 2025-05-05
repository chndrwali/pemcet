'use client';

import { postQuizTwo } from '@/actions/postQuiz';
import { Header } from '@/components/header/header';
import { quizSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const Page = () => {
  const [waktu, setWaktu] = useState(30);
  const [mulai, setMulai] = useState(false); // Awalnya belum mulai
  const [step, setStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (mulai) {
      timer = setInterval(() => {
        setWaktu((prev) => {
          if (prev <= 1) {
            // When timer reaches 0, clear interval and call handleSelesaiMembaca
            clearInterval(timer);
            setMulai(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mulai]);

  const handleSelesaiMembaca = () => {
    setMulai(false);
    form.setValue('count', waktu);
    setStep(3);
    setWaktu(0);
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
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = form;

  const handleAnswerSelect = (questionNumber: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionNumber.toString()]: answer,
    }));
  };

  const calculateScore = () => {
    // Correct answers for each question (1-indexed)
    const correctAnswers: Record<string, string> = {
      '1': 'C', // Bima
      '2': 'C', // Siapa pun yang menemukannya akan mendapat keberuntungan
      '3': 'C', // Karena ia ingin tahu bentuk tongkat dan percaya tongkat itu bisa membawa perubahan
      '4': 'B', // Ia duduk di tepi danau dan mengamati dengan sabar setiap sore
      '5': 'B', // Kehidupan desa bisa kembali makmur seperti dulu
    };

    let totalScore = 0;
    Object.entries(selectedAnswers).forEach(([question, answer]) => {
      if (correctAnswers[question] === answer) {
        totalScore += 20;
      }
    });

    setScore(totalScore);
    setValue('quiz', totalScore);
    return totalScore;
  };

  const onSubmit = async (data: z.infer<typeof quizSchema>) => {
    setIsSubmitting(true);
    const finalScore = calculateScore();
    const formData = {
      ...data,
      quiz: finalScore,
    };

    try {
      const result = await postQuizTwo(formData);
      if (result.success) {
        console.log('Data berhasil disimpan:', result.data);
        setStep(5);
      } else {
        console.error('Gagal menyimpan data:', result.error);
        alert('Gagal menyimpan data. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error saat menyimpan data:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishQuiz = () => {
    // Calculate the score before submitting
    calculateScore();

    // Manually trigger form submission
    handleSubmit(onSubmit)();
  };

  const nextStep = async () => {
    const valid = await trigger(step === 1 ? ['name', 'class'] : step === 3 ? ['count'] : ['quiz']);
    if (valid) setStep((s) => s + 1);
  };
  return (
    <section className={`relative flex flex-col items-center min-h-screen bg-center bg-cover ${step === 1 ? 'bg-desa' : 'bg-deskripsi'} z-20`}>
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
                maxWidth: '900px',
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
                Latihan Meningkatkan Membaca Cepat <br /> dan Uji Pemahaman Dalam Membaca
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
              <input type="hidden" {...register('quiz')} />
              <input type="hidden" {...register('count')} />

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
            <div className="w-full">
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
                  margin: '0 auto 30px auto',
                  fontFamily: '"Comic Sans MS", cursive',
                }}
                className="w-fit"
              >
                Latihan Meningkatkan Membaca Cepat
              </div>
              {/* Info dan Timer */}
              {mulai && (
                <div className="flex items-center justify-between my-8 px-20 w-full">
                  <div className="bg-[#3e1f1f] text-white px-5 py-2 rounded-[15px] font-bold">Membaca 150 Kata</div>
                  <div className="bg-[#3e1f1f] text-white px-5 py-2 rounded-[15px] font-bold">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
                </div>
              )}
              {/* Running Text Box */}
              <div className="bg-white mx-auto h-[300px] rounded-[20px] pt-2 px-8  border-[5px] border-[#3e1f1f] whitespace-pre-wrap break-words overflow-hidden relative w-[1000px]">
                {mulai ? (
                  <div className={`absolute w-full text-[1.2rem]  ${!mulai ? 'animate-none' : 'animate-scrollDown'} text-justify`}>
                    <h1 className="text-center text-[#3e1f1f] font-bold mb-4">Menjaga Kebersihan Lingkungan</h1>
                    <div className="whitespace-pre-wrap break-words w-full pr-10 font-semibold">
                      <p>
                        Kebersihan lingkungan sangat penting bagi kehidupan. Lingkungan yang bersih membuat kita sehat dan nyaman. Oleh karena itu, kita harus menjaga kebersihan di rumah, sekolah, dan lingkungan sekitar agar tetap asri dan
                        indah.
                      </p>
                      <p className="mt-4">
                        Salah satu cara menjaga kebersihan adalah membuang sampah pada tempatnya. Sampah yang berserakan dapat menimbulkan bau tidak sedap dan menjadi sarang penyakit. Kita juga harus memilah sampah organik dan anorganik
                        agar mudah didaur ulang.
                      </p>
                      <p className="mt-4">
                        Jika sampah dikelola dengan baik, lingkungan akan tetap bersih dan sehat. Selain itu, kita perlu membersihkan halaman rumah, menyapu lantai, dan mengepel ruangan secara rutin. Jika rumah bersih, keluarga akan lebih
                        sehat.
                      </p>
                      <p className="mt-4">
                        Di sekolah, kita harus menjaga kebersihan kelas dengan tidak membuang sampah sembarangan dan selalu membersihkan meja serta kursi agar tetap rapi. Menanam pohon dan merawat tanaman juga membantu menjaga lingkungan
                        tetap hijau dan segar. Jika semua orang peduli kebersihan, bumi akan menjadi tempat tinggal yang lebih nyaman. Mari biasakan hidup bersih dan sehat!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button
                      onClick={() => {
                        setMulai(true);
                        setWaktu(30);
                      }}
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
                    >
                      Mulai Latihan
                    </button>
                  </div>
                )}
              </div>
              {/* Tombol Next */}
              {mulai && (
                <div className="flex items-center justify-end mt-4 gap-2">
                  <button onClick={handleSelesaiMembaca} className="absolute bottom-[30px] right-[30px] w-[60px] h-[60px]">
                    <Image src="/icon/arrow.png" width={55} height={55} alt="Next" />
                  </button>
                </div>
              )}
              {!waktu && (
                <button onClick={nextStep} className="absolute bottom-[30px] right-[30px] w-[60px] h-[60px]">
                  <Image src="/icon/arrow.png" width={55} height={55} alt="Next" />
                </button>
              )}{' '}
            </div>
          )}
          {step === 3 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2
                  style={{
                    backgroundColor: '#fff',
                    padding: '10px 40px',
                    border: '8px solid #4b2e13',
                    borderRadius: '15px',
                    display: 'inline-block',
                    color: '#4b2e13',
                  }}
                >
                  Soal Untuk mengukur Pemahaman
                </h2>
              </div>

              <div
                style={{
                  backgroundColor: '#fff',
                  border: '5px solid #5b2c0f',
                  borderRadius: '18px',
                  padding: '30px',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontSize: '18px',
                  lineHeight: '1.6',
                }}
              >
                <ol>
                  <li>
                    <strong>1. Apa yang dapat terjadi jika sampah tidak dibuang pada tempatnya?</strong>
                    <div className="mt-2">
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <div
                          key={`1-${option}`}
                          className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['1'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                          onClick={() => handleAnswerSelect(1, option)}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['1'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                          <span>
                            {option === 'A' && 'Lingkungan menjadi lebih indah'}
                            {option === 'B' && 'Sampah bisa berubah menjadi pupuk'}
                            {option === 'C' && 'Muncul bau tidak sedap dan sarang penyakit'}
                            {option === 'D' && 'Air menjadi lebih jernih'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </li>
                  <br />
                  <li>
                    <strong>2. Di mana saja kita harus menjaga kebersihan? sesuai isi teks yang telah dibaca.</strong>
                    <div className="mt-2">
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <div
                          key={`2-${option}`}
                          className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['2'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                          onClick={() => handleAnswerSelect(2, option)}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['2'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                          <span>
                            {option === 'A' && 'Di tempat kerja saja'}
                            {option === 'B' && 'Di hutan dan gunung'}
                            {option === 'C' && 'Di rumah, sekolah dan lingkungan sekitar'}
                            {option === 'D' && 'Di tempat wisata saja'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </li>
                  <br />
                  <li>
                    <strong>3. Mengapa kita perlu memilah sampah organik dan anorganik?</strong>
                    <div className="mt-2">
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <div
                          key={`3-${option}`}
                          className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['3'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                          onClick={() => handleAnswerSelect(3, option)}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['3'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                          <span>
                            {option === 'A' && 'Agar lebih mudah dibakar'}
                            {option === 'B' && 'Agar bisa dibuang ke laut'}
                            {option === 'C' && 'Agar mudah didaur ulang dan tidak mencemari lingkungan'}
                            {option === 'D' && 'Agar bisa dikumpulkan di satu tempat'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </li>
                </ol>
              </div>
              <button onClick={nextStep} type="button" className="absolute bottom-[30px] right-[30px] w-[60px] h-[60px]">
                <Image src="/icon/arrow.png" width={55} height={55} alt="Next" />
              </button>
            </>
          )}
          {step === 4 && (
            <>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2
                  style={{
                    backgroundColor: '#512e14',
                    color: 'white',
                    padding: '15px 30px',
                    display: 'inline-block',
                    borderRadius: '15px',
                    fontSize: '26px',
                  }}
                >
                  Soal Untuk Mengukur Pemahaman
                </h2>
              </div>

              <div
                style={{
                  backgroundColor: '#fff',
                  border: '6px solid #512e14',
                  borderRadius: '20px',
                  padding: '30px',
                  maxWidth: '900px',
                  margin: '30px auto',
                  fontSize: '18px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                {/* Soal 4 */}
                <div style={{ marginBottom: '25px' }}>
                  <p style={{ fontWeight: 'bold' }}>4. Bagaimana hubungan antara kebersihan rumah dan kesehatan keluarga? sesuai isi teks yang telah di baca?</p>
                  <div className="mt-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div
                        key={`4-${option}`}
                        className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['4'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                        onClick={() => handleAnswerSelect(4, option)}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['4'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                        <span>
                          {option === 'A' && 'Jika rumah bersih, keluarga akan sering ke rumah sakit'}
                          {option === 'B' && 'Rumah yang bersih bisa membuat keluarga lebih sehat dan nyaman'}
                          {option === 'C' && 'Rumah bersih membuat tanaman cepat tumbuh'}
                          {option === 'D' && 'Rumah bersih mengurangi kebiasaan belajar'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontWeight: 'bold' }}>5. Apa dampak jangka panjang jika semua orang peduli pada kebersihan lingkungan?</p>
                  <div className="mt-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div
                        key={`5-${option}`}
                        className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['5'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                        onClick={() => handleAnswerSelect(5, option)}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['5'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                        <span>
                          {option === 'A' && 'Bumi menjadi panas dan kering'}
                          {option === 'B' && 'Bumi akan menjadi tempat tinggal yang lebih nyaman dan sehat'}
                          {option === 'C' && 'Sampah akan semakin menumpuk'}
                          {option === 'D' && 'Semua orang akan tinggal di kota'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={handleFinishQuiz}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#5b2c0f',
                    color: 'white',
                    padding: '10px 40px',
                    fontSize: '20px',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Selesai'}
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <div
              style={{
                backgroundColor: '#fff',
                border: '8px solid #5b2c0f',
                borderRadius: '16px',
                padding: '30px',
                maxWidth: '700px',
                width: '100%',
                margin: '100px auto 0 auto',
                boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#78290f',
                  marginBottom: '25px',
                }}
              >
                Hasil Tes Membaca
              </h1>

              <div
                style={{
                  backgroundColor: '#f8f0e5',
                  border: '3px solid #5b2c0f',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#5b2c0f]">Nama:</h2>
                  <p className="text-xl">{getValues('name')}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#5b2c0f]">Kelas:</h2>
                  <p className="text-xl">{getValues('class')}</p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#f8f0e5',
                    border: '3px solid #5b2c0f',
                    borderRadius: '12px',
                    padding: '20px',
                    width: '48%',
                    textAlign: 'center',
                  }}
                >
                  <h2 className="text-xl font-bold text-[#5b2c0f] mb-2">Waktu Membaca</h2>
                  <p className="text-3xl font-bold">{getValues('count')} detik</p>
                </div>
                <div
                  style={{
                    backgroundColor: '#f8f0e5',
                    border: '3px solid #5b2c0f',
                    borderRadius: '12px',
                    padding: '20px',
                    width: '48%',
                    textAlign: 'center',
                  }}
                >
                  <h2 className="text-xl font-bold text-[#5b2c0f] mb-2">Skor Quiz</h2>
                  <p className="text-3xl font-bold">{score} / 100</p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: score >= 60 ? '#d4edda' : '#f8d7da',
                  border: `3px solid ${score >= 60 ? '#28a745' : '#dc3545'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '30px',
                }}
              >
                <h2 className="text-xl font-bold mb-2">{score >= 60 ? 'Selamat!' : 'Terus Berlatih!'}</h2>
                <p>{score >= 60 ? 'Kamu telah berhasil menyelesaikan tes membaca dengan baik.' : 'Jangan menyerah, teruslah berlatih untuk meningkatkan kemampuan membacamu.'}</p>
              </div>

              <div className="flex items-center gap-x-2 justify-between">
                <button
                  onClick={() => setStep(1)}
                  style={{
                    backgroundColor: '#5b2c0f',
                    color: 'white',
                    padding: '10px 30px',
                    fontSize: '18px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  Kembali ke Awal
                </button>

                <Link
                  href="/meningkatkan-membaca/3"
                  style={{
                    backgroundColor: '#5b2c0f',
                    color: 'white',
                    padding: '10px 30px',
                    fontSize: '18px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  Lanjut Latihan
                </Link>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </section>
  );
};

export default Page;
