'use client';

import { Header } from '@/components/header/header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [waktu, setWaktu] = useState(35);
  const [mulai, setMulai] = useState(false);
  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
  });

  const [answersTwo, setAnswersTwo] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
  });

  const correctAnswers = {
    one: 'Ia tahu bahwa saat hujan datang, mencari makanan lebih sulit.',
    two: 'Mereka pun belajar bahwa kerja keras dan perencanaan itu penting.',
    three: 'Sejak kejadian itu, para semut mulai berubah.',
    four: 'Semut kecil pun tidak menyimpan dendam.',
    five: 'Tidak ada lagi yang kelaparan, karena mereka telah belajar dari pengalaman.',
  };

  const correctAnswers2 = {
    one: 'Ia tahu bahwa saat hujan datang, mencari makanan lebih sulit.',
    two: 'Dengan senyum, semut berkata, "Aku tidak bisa memberi banyak, tapi aku bisa berbagi sedikit."',
    three: 'Sejak kejadian itu, para semut mulai berubah.',
    four: 'Ketika musim hujan berikutnya tiba, semua semut sudah siap. Tidak ada lagi yang kelaparan, karena mereka telah belajar dari pengalaman.',
  };

  const isCorrect = (key: keyof typeof answers) => {
    return answers[key].trim() === correctAnswers[key];
  };
  const isCorrectTwo = (key: keyof typeof answersTwo) => {
    return answersTwo[key].trim() === correctAnswers2[key];
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (mulai && waktu > 0) {
      timer = setInterval(() => {
        setWaktu((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mulai, waktu]);

  useEffect(() => {
    if (step === 1 || step === 2 || step === 4) {
      setWaktu(35);
      setMulai(false);
    }
  }, [step]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      router.push('/test-pemahaman/latihan-tiga');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-pemahaman z-20">
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
            Cerita 2
          </div>
          {/* Info dan Timer */}
          {mulai && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center mt-4 mb-6 px-6 w-full max-w-4xl">
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Membaca 250 Kata</div>
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
            </div>
          )}

          {/* Running Text Box */}
          <div className="bg-white mx-auto w-[1000px] h-[300px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative">
            {mulai ? (
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown2'}`}>
                <h1 className="font-bold text-center">Semut dan Makanan Musim Hujan</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Musim hujan datang lebih cepat tahun ini. Di sebuah ladang, seekor semut kecil sedang bekerja keras mengangkut biji-bijian ke sarangnya. Ia tahu bahwa saat hujan datang, mencari makanan akan lebih sulit. Teman-temannya
                    mengolok-oloknya. &quot;Mengapa kamu sibuk sekali? Hujan masih lama!&quot; kata mereka sambil bermain. Namun semut tidak peduli. Setiap hari ia mengumpulkan makanan sedikit demi sedikit. Hujan pertama pun turun. Tanah
                    menjadi basah, dan biji-bijian sulit ditemukan.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Teman-teman semut mulai kelaparan. Mereka menyesal karena tidak menyiapkan makanan lebih awal. Mereka datang ke semut kecil dan memohon bantuan. Dengan senyum, semut berkata, &quot;Aku tidak bisa memberi banyak, tapi aku
                    bisa berbagi sedikit.&quot; Mereka pun belajar bahwa kerja keras dan perencanaan itu penting.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Sejak kejadian itu, para semut mulai berubah. Mereka tidak lagi menyepelekan waktu dan selalu membantu semut kecil mengumpulkan makanan sebelum musim berganti. Semut kecil pun tidak menyimpan dendam. Ia justru senang
                    karena kini seluruh koloni menjadi lebih rajin dan saling peduli. Mereka bekerja bersama-sama setiap hari, saling mengingatkan agar tidak malas dan tidak menunda pekerjaan. Ketika musim hujan berikutnya tiba, semua semut
                    sudah siap. Tidak ada lagi yang kelaparan, karena mereka telah belajar dari pengalaman.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4">
                <p className="text-lg font-semibold">Klik tombol mulai untuk membaca cerita</p>
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
            Menemukan Ide Pokok
          </div>
          {/* Info dan Timer */}
          {mulai && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center mt-4 mb-6 px-6 w-full max-w-4xl">
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Membaca 250 Kata</div>
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
            </div>
          )}

          {/* Running Text Box */}
          <div className="bg-white mx-auto w-[1000px] h-[300px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative">
            {mulai ? (
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown2'}`}>
                <h1 className="font-bold text-center">Semut dan Makanan Musim Hujan</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Musim hujan datang lebih cepat tahun ini. Di sebuah ladang, seekor semut kecil sedang bekerja keras mengangkut biji-bijian ke sarangnya.{' '}
                    <span className="text-red-600"> Ia tahu bahwa saat hujan datang, mencari makanan akan lebih sulit. </span> Teman-temannya mengolok-oloknya. &quot;Mengapa kamu sibuk sekali? Hujan masih lama!&quot; kata mereka sambil
                    bermain. Namun semut tidak peduli. Setiap hari ia mengumpulkan makanan sedikit demi sedikit. Hujan pertama pun turun. Tanah menjadi basah, dan biji-bijian sulit ditemukan.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Teman-teman semut mulai kelaparan. Mereka menyesal karena tidak menyiapkan makanan lebih awal. Mereka datang ke semut kecil dan memohon bantuan. Dengan senyum, semut berkata, &quot;Aku tidak bisa memberi banyak, tapi aku
                    bisa berbagi sedikit.&quot; <span className="text-red-600"> Mereka pun belajar bahwa kerja keras dan perencanaan itu penting. </span>
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    <span className="text-red-600"> Sejak kejadian itu, para semut mulai berubah. </span> Mereka tidak lagi menyepelekan waktu dan selalu membantu semut kecil mengumpulkan makanan sebelum musim berganti.{' '}
                    <span className="text-red-600">Semut kecil pun tidak menyimpan dendam.</span> Ia justru senang karena kini seluruh koloni menjadi lebih rajin dan saling peduli. Mereka bekerja bersama-sama setiap hari, saling
                    mengingatkan agar tidak malas dan tidak menunda pekerjaan. Ketika musim hujan berikutnya tiba, semua semut sudah siap.
                    <span className="text-red-600"> Tidak ada lagi yang kelaparan, karena mereka telah belajar dari pengalaman.</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4">
                <p className="text-lg font-semibold">Klik tombol mulai untuk membaca cerita</p>
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

          <div className="flex justify-between w-full px-10 mt-10">
            <button onClick={handleBack}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
            </button>
            {waktu === 0 && (
              <button onClick={handleNext}>
                <Image src="/icon/arrow.png" width={55} height={55} alt="Next" />
              </button>
            )}
          </div>
        </>
      )}
      {step === 3 && (
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
            Latihan 1 Mengisi Ide Pokok
          </div>

          {/* Text Box */}
          <div className="bg-white mx-auto w-[1000px] h-[360px] rounded-[20px] p-4 border-[5px] border-[#3e1f1f] overflow-y-auto overflow-x-hidden text-[1.2rem]  space-y-4">
            <h1 className="font-bold text-center">Semut dan Makanan Musim Hujan</h1>

            <p className="indent-6">
              Musim hujan datang lebih cepat tahun ini. Di sebuah ladang, seekor semut kecil sedang bekerja keras mengangkut biji-bijian ke sarangnya.{' '}
              <input
                type="text"
                value={answers.one}
                onChange={(e) => setAnswers({ ...answers, one: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('one') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Teman-temannya mengolok-oloknya. &quot;Mengapa kamu sibuk sekali? Hujan masih lama!&quot; kata mereka sambil bermain. Namun semut tidak peduli. Setiap hari ia mengumpulkan makanan sedikit demi sedikit. Hujan pertama pun turun.
              Tanah menjadi basah, dan biji-bijian sulit ditemukan.
            </p>
            <p className=" indent-6">
              Teman-teman semut mulai kelaparan. Mereka menyesal karena tidak menyiapkan makanan lebih awal. Mereka datang ke semut kecil dan memohon bantuan. Dengan senyum, semut berkata, &quot;Aku tidak bisa memberi banyak, tapi aku bisa
              berbagi sedikit.&quot;{' '}
              <input
                type="text"
                value={answers.two}
                onChange={(e) => setAnswers({ ...answers, two: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('two') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />
            </p>
            <p className="indent-6">
              <input
                type="text"
                value={answers.three}
                onChange={(e) => setAnswers({ ...answers, three: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('three') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Mereka tidak lagi menyepelekan waktu dan selalu membantu semut kecil mengumpulkan makanan sebelum musim berganti.{' '}
              <input
                type="text"
                value={answers.four}
                onChange={(e) => setAnswers({ ...answers, four: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('four') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Ia justru senang karena kini seluruh koloni menjadi lebih rajin dan saling peduli. Mereka bekerja bersama-sama setiap hari, saling mengingatkan agar tidak malas dan tidak menunda pekerjaan. Ketika musim hujan berikutnya tiba,
              semua semut sudah siap.
              <input
                type="text"
                value={answers.five}
                onChange={(e) => setAnswers({ ...answers, five: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('five') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />
            </p>
          </div>

          {/* Navigasi */}
          <div className="flex justify-between w-full px-10 mt-10">
            <button onClick={handleBack}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ transform: 'scaleX(-1)' }} />
            </button>
            <button onClick={handleNext}>
              <Image src="/icon/arrow.png" alt="Next" width={55} height={55} />
            </button>
          </div>
        </>
      )}

      {step === 4 && (
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
            Menemukan Kalimat Utama
          </div>
          {/* Info dan Timer */}
          {mulai && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center mt-4 mb-6 px-6 w-full max-w-4xl">
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Membaca 250 Kata</div>
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
            </div>
          )}

          {/* Running Text Box */}
          <div className="bg-white mx-auto w-[1000px] h-[300px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative">
            {mulai ? (
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown2'}`}>
                <h1 className="font-bold text-center">Semut dan Makanan Musim Hujan</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Musim hujan datang lebih cepat tahun ini. Di sebuah ladang, seekor semut kecil sedang bekerja keras mengangkut biji-bijian ke sarangnya.{' '}
                    <span className="font-bold"> Ia tahu bahwa saat hujan datang, mencari makanan akan lebih sulit. </span> Teman-temannya mengolok-oloknya. &quot;Mengapa kamu sibuk sekali? Hujan masih lama!&quot; kata mereka sambil
                    bermain. Namun semut tidak peduli. Setiap hari ia mengumpulkan makanan sedikit demi sedikit. Hujan pertama pun turun. Tanah menjadi basah, dan biji-bijian sulit ditemukan.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Teman-teman semut mulai kelaparan. Mereka menyesal karena tidak menyiapkan makanan lebih awal. Mereka datang ke semut kecil dan memohon bantuan.
                    <span className="font-bold"> Dengan senyum, semut berkata, &quot;Aku tidak bisa memberi banyak, tapi aku bisa berbagi sedikit.&quot; </span> Mereka pun belajar bahwa kerja keras dan perencanaan itu penting.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    <span className="font-bold"> Sejak kejadian itu, para semut mulai berubah. </span> Mereka tidak lagi menyepelekan waktu dan selalu membantu semut kecil mengumpulkan makanan sebelum musim berganti. Semut kecil pun tidak
                    menyimpan dendam. Ia justru senang karena kini seluruh koloni menjadi lebih rajin dan saling peduli. Mereka bekerja bersama-sama setiap hari, saling mengingatkan agar tidak malas dan tidak menunda pekerjaan.{' '}
                    <span className="font-bold">Ketika musim hujan berikutnya tiba, semua semut sudah siap. Tidak ada lagi yang kelaparan, karena mereka telah belajar dari pengalaman.</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4">
                <p className="text-lg font-semibold">Klik tombol mulai untuk membaca cerita</p>
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

          <div className="flex justify-between w-full px-10 mt-10">
            <button onClick={handleBack}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ width: '55px', height: '55px', transform: 'scaleX(-1)' }} />
            </button>
            {waktu === 0 && (
              <button onClick={handleNext}>
                <Image src="/icon/arrow.png" width={55} height={55} alt="Next" />
              </button>
            )}
          </div>
        </>
      )}

      {step === 5 && (
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
            Latihan 2 Mengisi Kalimat Utama
          </div>

          {/* Text Box */}
          <div className="bg-white mx-auto w-[1000px] h-[360px] rounded-[20px] p-4 border-[5px] border-[#3e1f1f] overflow-y-auto overflow-x-hidden text-[1.2rem]  space-y-4">
            <h1 className="font-bold text-center">Semut dan Makanan Musim Hujan</h1>

            <p className="indent-6">
              Musim hujan datang lebih cepat tahun ini. Di sebuah ladang, seekor semut kecil sedang bekerja keras mengangkut biji-bijian ke sarangnya.{' '}
              <input
                type="text"
                value={answersTwo.one}
                onChange={(e) => setAnswersTwo({ ...answersTwo, one: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrectTwo('one') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Teman-temannya mengolok-oloknya. &quot;Mengapa kamu sibuk sekali? Hujan masih lama!&quot; kata mereka sambil bermain. Namun semut tidak peduli. Setiap hari ia mengumpulkan makanan sedikit demi sedikit. Hujan pertama pun turun.
              Tanah menjadi basah, dan biji-bijian sulit ditemukan.
            </p>
            <p className=" indent-6">
              Teman-teman semut mulai kelaparan. Mereka menyesal karena tidak menyiapkan makanan lebih awal. Mereka datang ke semut kecil dan memohon bantuan.{' '}
              <input
                type="text"
                value={answersTwo.two}
                onChange={(e) => setAnswersTwo({ ...answersTwo, two: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrectTwo('two') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Mereka pun belajar bahwa kerja keras dan perencanaan itu penting.
            </p>
            <p className="indent-6">
              <input
                type="text"
                value={answersTwo.three}
                onChange={(e) => setAnswersTwo({ ...answersTwo, three: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrectTwo('three') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Mereka tidak lagi menyepelekan waktu dan selalu membantu semut kecil mengumpulkan makanan sebelum musim berganti. Semut kecil pun tidak menyimpan dendam. Ia justru senang karena kini seluruh koloni menjadi lebih rajin dan
              saling peduli. Mereka bekerja bersama-sama setiap hari, saling mengingatkan agar tidak malas dan tidak menunda pekerjaan.{' '}
              <input
                type="text"
                value={answersTwo.four}
                onChange={(e) => setAnswersTwo({ ...answersTwo, four: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrectTwo('four') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />
            </p>
          </div>

          {/* Navigasi */}
          <div className="flex justify-between w-full px-10 mt-10">
            <button onClick={handleBack}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ transform: 'scaleX(-1)' }} />
            </button>
            <button onClick={handleNext}>
              <Image src="/icon/arrow.png" alt="Next" width={55} height={55} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
