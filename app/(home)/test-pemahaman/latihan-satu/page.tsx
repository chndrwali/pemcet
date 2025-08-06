'use client';

import { Header } from '@/components/header/header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [waktu, setWaktu] = useState(36);
  const [mulai, setMulai] = useState(false);
  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
  });

  const [answersTwo, setAnswersTwo] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
  });

  const correctAnswers = {
    one: 'Kancil ragu. Ia haus, tapi ia juga tahu bahwa air keruh bisa membuat perut sakit.',
    two: 'Kancil duduk di bawah pohon rindang sambil menunggu. Ia mengamati aliran sungai dengan sabar.',
    three: 'Kancil mengangguk dan mengucapkan terima kasih. Sejak hari itu, Kancil tidak lagi terburu-buru dalam bertindak.',
    four: 'Sejak kejadian itu, Kancil sering menceritakan pengalamannya kepada hewan-hewan lain di hutan.',
  };

  const correctAnswers2 = {
    one: 'Pagi itu, Si Kancil berjalan menyusuri hutan mencari air minum.',
    two: 'Kancil ragu. Ia haus, tapi ia juga tahu bahwa air keruh bisa membuat perut sakit.',
    three: 'Kancil duduk di bawah pohon rindang sambil menunggu. Ia mengamati aliran sungai dengan sabar.',
    four: 'Sejak hari itu, Kancil tidak lagi terburu-buru dalam bertindak.',
    five: 'Sejak kejadian itu, Kancil sering menceritakan pengalamannya kepada hewan-hewan lain di hutan.',
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
      setWaktu(36);
      setMulai(false);
    }
  }, [step]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      router.push('/test-pemahaman/latihan-dua');
    }
  };

  // const handleBack = () => {
  //   if (step > 1) {
  //     setStep(step - 1);
  //   }
  // };

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
            Cerita 1
          </div>
          {/* Info dan Timer */}
          {mulai && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center mt-4 mb-6 px-6 w-full max-w-4xl">
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Membaca 250 Kata</div>
              <div className="bg-[#3e1f1f] text-white px-6 py-3 rounded-xl font-bold text-center w-full sm:w-auto">Waktu: {waktu < 10 ? `0${waktu}` : waktu} Detik</div>
            </div>
          )}

          {/* Running Text Box */}
          <div className="bg-white mx-auto w-[1000px] h-[350px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative">
            {mulai ? (
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown3'}`}>
                <h1 className="font-bold text-center">Si Kancil dan Sungai yang Keruh</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Pagi itu, Si Kancil berjalan menyusuri hutan mencari air minum. Musim kemarau membuat banyak sungai mengering. Setelah berjalan jauh, akhirnya ia menemukan sebuah sungai kecil. Namun, air sungai itu tampak keruh dan
                    berwarna cokelat. Kancil ragu. Ia haus, tapi ia juga tahu bahwa air keruh bisa membuat perut sakit.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Ia berpikir sejenak. Lalu, datanglah seekor burung pipit. Burung itu menyapa Kancil dan berkata, &quot;Jika kamu sabar, tunggulah sebentar. Setelah tanah mengendap, air akan menjadi jernih.&quot; Kancil duduk di bawah
                    pohon rindang sambil menunggu. Ia mengamati aliran sungai dengan sabar. Beberapa menit kemudian, air di tepi sungai mulai terlihat jernih. Kancil pun minum perlahan dan merasa segar.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Burung pipit tersenyum dan berkata, &quot;Kadang kita hanya perlu bersabar agar bisa membuat keputusan yang baik.&quot; Kancil mengangguk dan mengucapkan terima kasih. Sejak hari itu, Kancil tidak lagi terburu-buru dalam
                    bertindak. Ia belajar bahwa kesabaran bisa menyelamatkan diri dari bahaya.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Sejak kejadian itu, Kancil sering menceritakan pengalamannya kepada hewan-hewan lain di hutan. Ia ingin semua temannya tahu bahwa tidak semua hal harus diselesaikan dengan cepat. Beberapa keputusan perlu waktu dan
                    ketenangan. Bahkan saat menghadapi masalah yang mendesak, seperti rasa haus di musim kemarau, kesabaran tetap menjadi kunci utama. Kini, Kancil dikenal bukan hanya sebagai hewan yang cerdik, tetapi juga bijak dalam
                    bersikap.
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
          <div className="bg-white mx-auto w-[1000px] h-[350px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative">
            {mulai ? (
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown3'}`}>
                <h1 className="font-bold text-center">Si Kancil dan Sungai yang Keruh</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Pagi itu, Si Kancil berjalan menyusuri hutan mencari air minum. Musim kemarau membuat banyak sungai mengering. Setelah berjalan jauh, akhirnya ia menemukan sebuah sungai kecil. Namun, air sungai itu tampak keruh dan
                    berwarna cokelat. <span className="text-red-600">Kancil ragu. Ia haus, tapi ia juga tahu bahwa air keruh bisa membuat perut sakit.</span>
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Ia berpikir sejenak. Lalu, datanglah seekor burung pipit. Burung itu menyapa Kancil dan berkata, &quot;Jika kamu sabar, tunggulah sebentar. Setelah tanah mengendap, air akan menjadi jernih.&quot;{' '}
                    <span className="text-red-600">Kancil duduk di bawah pohon rindang sambil menunggu. Ia mengamati aliran sungai dengan sabar. </span> Beberapa menit kemudian, air di tepi sungai mulai terlihat jernih. Kancil pun minum
                    perlahan dan merasa segar.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Burung pipit tersenyum dan berkata, &quot;Kadang kita hanya perlu bersabar agar bisa membuat keputusan yang baik.&quot;{' '}
                    <span className="text-red-600">Kancil mengangguk dan mengucapkan terima kasih. Sejak hari itu, Kancil tidak lagi terburu-buru dalam bertindak. </span> Ia belajar bahwa kesabaran bisa menyelamatkan diri dari bahaya.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    <span className="text-red-600"> Sejak kejadian itu, Kancil sering menceritakan pengalamannya kepada hewan-hewan lain di hutan. </span> Ia ingin semua temannya tahu bahwa tidak semua hal harus diselesaikan dengan cepat.
                    Beberapa keputusan perlu waktu dan ketenangan. Bahkan saat menghadapi masalah yang mendesak, seperti rasa haus di musim kemarau, kesabaran tetap menjadi kunci utama. Kini, Kancil dikenal bukan hanya sebagai hewan yang
                    cerdik, tetapi juga bijak dalam bersikap.
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
            <div />
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
            <h1 className="font-bold text-center">Si Kancil dan Sungai yang Keruh</h1>

            <p className="indent-6">
              Pagi itu, Si Kancil berjalan menyusuri hutan mencari air minum. Musim kemarau membuat banyak sungai mengering. Setelah berjalan jauh, akhirnya ia menemukan sebuah sungai kecil. Namun, air sungai itu tampak keruh dan berwarna
              cokelat.{' '}
              <input
                type="text"
                value={answers.one}
                onChange={(e) => setAnswers({ ...answers, one: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('one') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />
            </p>

            <p className="indent-6">
              Ia berpikir sejenak. Lalu, datanglah seekor burung pipit. Burung itu menyapa Kancil dan berkata, &quot;Jika kamu sabar, tunggulah sebentar. Setelah tanah mengendap, air akan menjadi jernih.&quot;{' '}
              <input
                type="text"
                value={answers.two}
                onChange={(e) => setAnswers({ ...answers, two: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('two') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />
              {/* <textarea
                value={answers.two}
                onChange={(e) => setAnswers({ ...answers, two: e.target.value })}
                className={`w-full mt-2 p-2 rounded-md resize-none font-medium focus:outline-none focus:ring-0 focus:border-transparent ${isCorrect('two') ? 'text-green-600 border-green-600 border-2' : 'text-red-600 border border-gray-400'}`}
                rows={2}
                placeholder="Ketik jawaban di sini..."
              /> */}
              Beberapa menit kemudian, air di tepi sungai mulai terlihat jernih. Kancil pun minum perlahan dan merasa segar.
            </p>

            <p className="indent-6">
              Burung pipit tersenyum dan berkata, &quot;Kadang kita hanya perlu bersabar agar bisa membuat keputusan yang baik.&quot;{' '}
              <input
                type="text"
                value={answers.three}
                onChange={(e) => setAnswers({ ...answers, three: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('three') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />
              Ia belajar bahwa kesabaran bisa menyelamatkan diri dari bahaya.
            </p>

            <p className="indent-6">
              <input
                type="text"
                value={answers.four}
                onChange={(e) => setAnswers({ ...answers, four: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('four') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Ia ingin semua temannya tahu bahwa tidak semua hal harus diselesaikan dengan cepat. Beberapa keputusan perlu waktu dan ketenangan. Bahkan saat menghadapi masalah yang mendesak, seperti rasa haus di musim kemarau, kesabaran
              tetap menjadi kunci utama. Kini, Kancil dikenal bukan hanya sebagai hewan yang cerdik, tetapi juga bijak dalam bersikap.
            </p>
          </div>

          {/* Navigasi */}
          <div className="flex justify-between w-full px-10 mt-10">
            <div />
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
          <div className="bg-white mx-auto w-[1000px] h-[350px] rounded-[20px] p-2 border-[5px] border-[#3e1f1f] overflow-hidden relative">
            {mulai ? (
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown3'}`}>
                <h1 className="font-bold text-center">Si Kancil dan Sungai yang Keruh</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    <span className="font-bold">Pagi itu, Si Kancil berjalan menyusuri hutan mencari air minum. </span> Musim kemarau membuat banyak sungai mengering. Setelah berjalan jauh, akhirnya ia menemukan sebuah sungai kecil. Namun,
                    air sungai itu tampak keruh dan berwarna cokelat. <span className="font-bold">Kancil ragu. Ia haus, tapi ia juga tahu bahwa air keruh bisa membuat perut sakit.</span>
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Ia berpikir sejenak. Lalu, datanglah seekor burung pipit. Burung itu menyapa Kancil dan berkata, &quot;Jika kamu sabar, tunggulah sebentar. Setelah tanah mengendap, air akan menjadi jernih.&quot;{' '}
                    <span className="font-bold">Kancil duduk di bawah pohon rindang sambil menunggu. Ia mengamati aliran sungai dengan sabar. </span> Beberapa menit kemudian, air di tepi sungai mulai terlihat jernih. Kancil pun minum
                    perlahan dan merasa segar.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    Burung pipit tersenyum dan berkata, &quot;Kadang kita hanya perlu bersabar agar bisa membuat keputusan yang baik.&quot; Kancil mengangguk dan mengucapkan terima kasih.{' '}
                    <span className="font-bold"> Sejak hari itu, Kancil tidak lagi terburu-buru dalam bertindak. </span> Ia belajar bahwa kesabaran bisa menyelamatkan diri dari bahaya.
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pl-8 pr-10 indent-6">
                    <span className="font-bold"> Sejak kejadian itu, Kancil sering menceritakan pengalamannya kepada hewan-hewan lain di hutan. </span> Ia ingin semua temannya tahu bahwa tidak semua hal harus diselesaikan dengan cepat.
                    Beberapa keputusan perlu waktu dan ketenangan. Bahkan saat menghadapi masalah yang mendesak, seperti rasa haus di musim kemarau, kesabaran tetap menjadi kunci utama. Kini, Kancil dikenal bukan hanya sebagai hewan yang
                    cerdik, tetapi juga bijak dalam bersikap.
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
            <div />
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
            <h1 className="font-bold text-center">Si Kancil dan Sungai yang Keruh</h1>

            <p className="indent-6">
              <input
                type="text"
                value={answersTwo.one}
                onChange={(e) => setAnswersTwo({ ...answersTwo, one: e.target.value })}
                className={`border-b-2 outline-none border-dotted w-full mt-2 ${isCorrectTwo('one') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />
              Musim kemarau membuat banyak sungai mengering. Setelah berjalan jauh, akhirnya ia menemukan sebuah sungai kecil. Namun, air sungai itu tampak keruh dan berwarna cokelat.{' '}
              <input
                type="text"
                value={answersTwo.two}
                onChange={(e) => setAnswersTwo({ ...answersTwo, two: e.target.value })}
                className={`border-b-2 outline-none border-dotted w-full mt-2 ${isCorrectTwo('two') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />
            </p>

            <p className="indent-6">
              Ia berpikir sejenak. Lalu, datanglah seekor burung pipit. Burung itu menyapa Kancil dan berkata, &quot;Jika kamu sabar, tunggulah sebentar. Setelah tanah mengendap, air akan menjadi jernih.&quot;{' '}
              <input
                type="text"
                value={answersTwo.three}
                onChange={(e) => setAnswersTwo({ ...answersTwo, three: e.target.value })}
                className={`border-b-2 outline-none w-full mt-2 ${isCorrectTwo('three') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />
              {/* <textarea
                value={answers.two}
                onChange={(e) => setAnswers({ ...answers, two: e.target.value })}
                className={`w-full mt-2 p-2 rounded-md resize-none font-medium focus:outline-none focus:ring-0 focus:border-transparent ${isCorrect('two') ? 'text-green-600 border-green-600 border-2' : 'text-red-600 border border-gray-400'}`}
                rows={2}
                placeholder="Ketik jawaban di sini..."
              /> */}
              Beberapa menit kemudian, air di tepi sungai mulai terlihat jernih. Kancil pun minum perlahan dan merasa segar.
            </p>

            <p className="indent-6">
              Burung pipit tersenyum dan berkata, &quot;Kadang kita hanya perlu bersabar agar bisa membuat keputusan yang baik.&quot; Kancil mengangguk dan mengucapkan terima kasih.
              <input
                type="text"
                value={answersTwo.four}
                onChange={(e) => setAnswersTwo({ ...answersTwo, four: e.target.value })}
                className={`border-b-2 outline-none w-full mt-2 ${isCorrectTwo('four') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />
              Ia belajar bahwa kesabaran bisa menyelamatkan diri dari bahaya.
            </p>

            <p className="indent-6">
              <input
                type="text"
                value={answersTwo.five}
                onChange={(e) => setAnswersTwo({ ...answersTwo, five: e.target.value })}
                className={`border-b-2 outline-none w-full mt-2 ${isCorrectTwo('five') ? 'text-green-600 border-green-600 font-bold' : 'text-red-600 border-red-600'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Ia ingin semua temannya tahu bahwa tidak semua hal harus diselesaikan dengan cepat. Beberapa keputusan perlu waktu dan ketenangan. Bahkan saat menghadapi masalah yang mendesak, seperti rasa haus di musim kemarau, kesabaran
              tetap menjadi kunci utama. Kini, Kancil dikenal bukan hanya sebagai hewan yang cerdik, tetapi juga bijak dalam bersikap.
            </p>
          </div>

          {/* Navigasi */}
          <div className="flex justify-between w-full px-10 mt-10">
            <div />
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
