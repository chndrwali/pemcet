'use client';

import { postQuizFour } from '@/actions/postQuiz';
import { Header } from '@/components/header/header';
import { quizSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const Page = () => {
  const [waktu, setWaktu] = useState(40);
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
      '2': 'B', // Siapa pun yang menemukannya akan mendapat keberuntungan
      '3': 'C', // Karena ia ingin tahu bentuk tongkat dan percaya tongkat itu bisa membawa perubahan
      '4': 'C', // Ia duduk di tepi danau dan mengamati dengan sabar setiap sore
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
      const result = await postQuizFour(formData);
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
                  <div className="bg-[#3e1f1f] text-white px-5 py-2 rounded-[15px] font-bold">Membaca 250 Kata</div>
                  <div className="bg-[#3e1f1f] text-white px-5 py-2 rounded-[15px] font-bold">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
                </div>
              )}
              {/* Running Text Box */}
              <div className="bg-white mx-auto h-[300px] rounded-[20px] pt-2 px-8  border-[5px] border-[#3e1f1f] whitespace-pre-wrap break-words overflow-hidden relative w-[1000px]">
                {mulai ? (
                  <div className={`absolute w-full text-[1.2rem] font-bold ${!mulai ? 'animate-none' : 'animate-scrollDown'} text-justify`}>
                    <h1 className="text-center text-[#3e1f1f] text-xl mb-4 font-bold">Harta Karun di Bukit Senja</h1>
                    <div className="whitespace-pre-wrap break-words w-full pr-12">
                      <p>
                        Di sebuah dusun yang dikelilingi oleh ladang dan kebun teh, terdapat sebuah bukit bernama Bukit Senja. Bukit itu terkenal karena pemandangannya yang indah saat matahari terbenam. Namun bukan hanya keindahannya yang
                        dikenal orang, melainkan juga sebuah legenda yang diwariskan dari generasi ke generasi. Konon, di puncak bukit pernah tinggal seorang pertapa tua yang menyimpan sebuah kotak misterius berisi harta karun. Kotak itu
                        dikatakan hanya bisa ditemukan oleh orang berhati tulus.
                      </p>
                      <p className="mt-4">
                        Harta tersebut bukan sekadar emas atau permata, tetapi sesuatu yang bisa membawa kesejahteraan bagi seluruh dusun. Setelah sang pertapa meninggal, tidak ada yang berhasil menemukan kotak itu. Sejak saat itu,
                        masyarakat percaya bahwa kotak itu hanya akan muncul pada waktu yang tepat dan kepada orang yang benar-benar layak. Seorang anak bernama Saka sering mendaki Bukit Senja setiap sore.
                      </p>
                      <p className="mt-4">
                        Ia duduk di bawah pohon besar di puncak bukit sambil menikmati hembusan angin dan warna langit yang berubah-ubah. Dalam diam, ia selalu membayangkan bentuk kotak itu. Apakah terbuat dari kayu ukiran kuno? Ataukah
                        dilapisi logam mulia? Suatu hari, hujan turun deras hingga malam.
                      </p>
                      <p className="mt-4">
                        Keesokan paginya, saat tanah masih basah dan udara dipenuhi kabut tipis, Saka menemukan sebuah tonjolan aneh di balik akar pohon besar. Dengan hati-hati, ia mengorek tanah dan menemukan sebuah benda persegi tertutup
                        lumut.
                      </p>
                      <p className="mt-4">
                        Jantungnya berdegup kencang. Ia percaya bahwa rahasia Bukit Senja hampir terungkap. Jika benar itu kotak legenda, mungkin seluruh dusun akan mengalami perubahan besar. Namun, apakah itu benar kotak sang pertapa atau
                        hanya peti biasa yang tertinggal zaman dulu? Dengan rasa ingin tahu yang besar, Saka bertekad untuk menggali lebih dalam. Ia tahu, penjelajahannya baru dimulai. Ia pulang dengan langkah cepat, menyusun rencana agar
                        besok ia bisa kembali dengan alat yang tepat.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button
                      onClick={() => {
                        setMulai(true);
                        setWaktu(40);
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
                      Mulai
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
                    <strong>1. Di mana lokasi harta karun dalam legenda tersebut?</strong>
                    <div className="mt-2">
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <div
                          key={`1-${option}`}
                          className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['1'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                          onClick={() => handleAnswerSelect(1, option)}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['1'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                          <span>
                            {option === 'A' && 'Di dalam gua tersembunyi'}
                            {option === 'B' && 'Di bawah sungai di dusun'}
                            {option === 'C' && 'Di puncak Bukit Senja'}
                            {option === 'D' && 'Di tengah ladang teh'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </li>
                  <br />
                  <li>
                    <strong>2. Siapa nama anak yang sering mendaki Bukit Senja?</strong>
                    <div className="mt-2">
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <div
                          key={`2-${option}`}
                          className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['2'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                          onClick={() => handleAnswerSelect(2, option)}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['2'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                          <span>
                            {option === 'A' && 'Bima'}
                            {option === 'B' && 'Saka'}
                            {option === 'C' && 'Raka'}
                            {option === 'D' && 'Aji'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </li>
                  <br />
                  <li>
                    <strong>3. Mengapa masyarakat percaya bahwa hanya orang berhati tulus yang dapat menemukan kotak harta karun?</strong>
                    <div className="mt-2">
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <div
                          key={`3-${option}`}
                          className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['3'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                          onClick={() => handleAnswerSelect(3, option)}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['3'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                          <span>
                            {option === 'A' && 'Karena kotak itu dilindungi oleh makhluk gaib'}
                            {option === 'B' && 'Karena kotak tersebut memiliki sistem keamanan tinggi'}
                            {option === 'C' && 'Karena kotak itu dikaitkan dengan nilai moral dan keikhlasan dalam legenda'}
                            {option === 'D' && 'Karena kotak itu hanya bisa terlihat saat malam hari'}
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
                  <p style={{ fontWeight: 'bold' }}>4. Bagaimana reaksi Saka saat menemukan benda persegi di balik akar pohon besar?</p>
                  <div className="mt-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div
                        key={`4-${option}`}
                        className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['4'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                        onClick={() => handleAnswerSelect(4, option)}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['4'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                        <span>
                          {option === 'A' && 'Ia langsung membuka benda itu dan membawanya pulang'}
                          {option === 'B' && 'Ia merasa takut dan berlari meninggalkannya'}
                          {option === 'C' && 'Ia percaya bahwa itu mungkin kotak legenda dan mulai menyusun rencana'}
                          {option === 'D' && 'Ia menguburnya kembali agar tidak ditemukan orang lain'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontWeight: 'bold' }}>5. Apa dampak yang mungkin terjadi bagi dusun jika kotak misterius benar-benar ditemukan?</p>
                  <div className="mt-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div
                        key={`5-${option}`}
                        className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${selectedAnswers['5'] === option ? 'bg-amber-100 border border-amber-500' : 'hover:bg-gray-100'}`}
                        onClick={() => handleAnswerSelect(5, option)}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${selectedAnswers['5'] === option ? 'bg-amber-500 text-white' : 'border border-gray-400'}`}>{option}</div>
                        <span>
                          {option === 'A' && 'Dusun akan tenggelam oleh banjir emas'}
                          {option === 'B' && 'Masyarakat dusun akan mengalami kesejahteraan'}
                          {option === 'C' && 'Penduduk dusun akan pindah ke kota'}
                          {option === 'D' && 'Bukit Senja akan ditutup untuk umum'}
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
                  href="/learning-materials"
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
                  Ke Menu Materi
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
