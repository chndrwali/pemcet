'use client';

import { Header } from '@/components/header/header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [waktu, setWaktu] = useState(40);
  const [mulai, setMulai] = useState(false);
  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    one: '',
    two: '',
    three: '',
  });

  const [answersTwo, setAnswersTwo] = useState({
    one: '',
    two: '',
    three: '',
  });

  const correctAnswers = {
    one: 'burung hantu tua terbang rendah diantara pepohonan. Ia sedang mencari makanan untuk anak-anaknya yang menunggu disarang.',
    two: 'Tak lama kemudian, seekor tikus kecil muncul dari semak-semak, disusul dua tikus lainnya.',
    three: 'Hewan-hewan di hutan menghormatinya karena ketenangan dan kesabaran yang ia miliki.',
  };

  const correctAnswers2 = {
    one: 'Pagi itu, Si Kancil berjalan menyusuri hutan mencari air minum.',
    two: 'Kancil ragu. Ia haus, tapi ia juga tahu bahwa air keruh bisa membuat perut sakit.',
    three: 'Kancil duduk di bawah pohon rindang sambil menunggu. Ia mengamati aliran sungai dengan sabar.',
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
      setWaktu(40);
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
            Cerita 3
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
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown3'}`}>
                <h1 className="font-bold text-center">Burung Hantu yang Sabar Menunggu</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Malam mulai larut ketika seekor burung hantu tua terbang rendah di antara pepohonan. Ia sedang mencari makan untuk anak-anaknya yang menunggu di sarang. Namun, malam itu tak seperti biasanya. Tak satu pun tikus terlihat
                    keluar dari persembunyian. Burung hantu mulai gelisah. Ia lelah terbang, tapi belum menemukan makanan. Ia sempat berpikir untuk pergi jauh ke ladang, namun itu akan menghabiskan tenaga. Ia akhirnya bertengger di dahan
                    dan berkata dalam hati, &quot;Aku akan menunggu dengan sabar. Mungkin mereka akan keluar sebentar lagi.&quot;{' '}
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Tak lama kemudian, seekor tikus kecil muncul dari semak-semak, disusul dua tikus lainnya. Burung hantu pun menyambar salah satunya dengan cepat. Ia pulang ke sarangnya dengan membawa hasil. Anak-anaknya pun makan dengan
                    lahap. Seekor kelelawar yang melihat dari kejauhan terkesan dan bertanya, &quot;Bagaimana kau tahu harus menunggu di tempat itu?&quot; Burung hantu menjawab, &quot;Pengalaman mengajarku bahwa kadang yang kita butuhkan
                    bukan lebih banyak tenaga, tapi lebih banyak kesabaran.&quot;
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Sejak malam itu, burung hantu selalu mengajarkan kepada anak-anaknya bahwa keberhasilan sering datang kepada mereka yang tahu kapan harus bertindak dan kapan harus menunggu. Ia tak hanya dikenal sebagai pemburu malam
                    yang handal, tetapi juga bijak dan penuh perhitungan. Hewan-hewan di hutan menghormatinya karena ketenangan dan kesabaran yang ia miliki. Bahkan di saat mendesak, burung hantu tetap memilih untuk berpikir jernih dan
                    tidak gegabah.{' '}
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
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown3'}`}>
                <h1 className="font-bold text-center">Burung Hantu yang Sabar Menunggu</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Malam mulai larut ketika seekor <span className="text-red-600"> burung hantu tua terbang rendah di antara pepohonan. Ia sedang mencari makan untuk anak-anaknya yang menunggu di sarang.</span> Namun, malam itu tak seperti
                    biasanya. Tak satu pun tikus terlihat keluar dari persembunyian. Burung hantu mulai gelisah. Ia lelah terbang, tapi belum menemukan makanan. Ia sempat berpikir untuk pergi jauh ke ladang, namun itu akan menghabiskan
                    tenaga. Ia akhirnya bertengger di dahan dan berkata dalam hati, &quot;Aku akan menunggu dengan sabar. Mungkin mereka akan keluar sebentar lagi.&quot;{' '}
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    <span className="text-red-600">Tak lama kemudian, seekor tikus kecil muncul dari semak-semak, disusul dua tikus lainnya. </span>Burung hantu pun menyambar salah satunya dengan cepat. Ia pulang ke sarangnya dengan membawa
                    hasil. Anak-anaknya pun makan dengan lahap. Seekor kelelawar yang melihat dari kejauhan terkesan dan bertanya, &quot;Bagaimana kau tahu harus menunggu di tempat itu?&quot; Burung hantu menjawab, &quot;Pengalaman
                    mengajarku bahwa kadang yang kita butuhkan bukan lebih banyak tenaga, tapi lebih banyak kesabaran.&quot;
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Sejak malam itu, burung hantu selalu mengajarkan kepada anak-anaknya bahwa keberhasilan sering datang kepada mereka yang tahu kapan harus bertindak dan kapan harus menunggu. Ia tak hanya dikenal sebagai pemburu malam
                    yang handal, tetapi juga bijak dan penuh perhitungan. <span className="text-red-600"> Hewan-hewan di hutan menghormatinya karena ketenangan dan kesabaran yang ia miliki.</span> Bahkan di saat mendesak, burung hantu tetap
                    memilih untuk berpikir jernih dan tidak gegabah.{' '}
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
            <h1 className="font-bold text-center">Burung Hantu yang Sabar Menunggu</h1>
            <p className="indent-6">
              Malam mulai larut ketika seekor{' '}
              <input
                type="text"
                value={answers.one}
                onChange={(e) => setAnswers({ ...answers, one: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('one') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Namun, malam itu tak seperti biasanya. Tak satu pun tikus terlihat keluar dari persembunyian. Burung hantu mulai gelisah. Ia lelah terbang, tapi belum menemukan makanan. Ia sempat berpikir untuk pergi jauh ke ladang, namun itu
              akan menghabiskan tenaga. Ia akhirnya bertengger di dahan dan berkata dalam hati, &quot;Aku akan menunggu dengan sabar. Mungkin mereka akan keluar sebentar lagi.&quot;{' '}
            </p>
            <p className="indent-6">
              <input
                type="text"
                value={answers.two}
                onChange={(e) => setAnswers({ ...answers, two: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('two') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />
              Burung hantu pun menyambar salah satunya dengan cepat. Ia pulang ke sarangnya dengan membawa hasil. Anak-anaknya pun makan dengan lahap. Seekor kelelawar yang melihat dari kejauhan terkesan dan bertanya, &quot;Bagaimana kau
              tahu harus menunggu di tempat itu?&quot; Burung hantu menjawab, &quot;Pengalaman mengajarku bahwa kadang yang kita butuhkan bukan lebih banyak tenaga, tapi lebih banyak kesabaran.&quot;
            </p>
            <p className="indent-6">
              Sejak malam itu, burung hantu selalu mengajarkan kepada anak-anaknya bahwa keberhasilan sering datang kepada mereka yang tahu kapan harus bertindak dan kapan harus menunggu. Ia tak hanya dikenal sebagai pemburu malam yang
              handal, tetapi juga bijak dan penuh perhitungan.{' '}
              <input
                type="text"
                value={answers.three}
                onChange={(e) => setAnswers({ ...answers, three: e.target.value })}
                className={`border-b-2 border-dotted outline-none w-full mt-2 ${isCorrect('three') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Bahkan di saat mendesak, burung hantu tetap memilih untuk berpikir jernih dan tidak gegabah.{' '}
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
              <div className={`absolute w-fit text-[1.2rem]  text-justify ${waktu === 0 ? 'animate-none' : 'animate-scrollDown3'}`}>
                <h1 className="font-bold text-center">Burung Hantu yang Sabar Menunggu</h1>
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Malam mulai larut ketika seekor burung hantu tua terbang rendah di antara pepohonan. Ia sedang mencari makan untuk anak-anaknya yang menunggu di sarang. Namun, malam itu tak seperti biasanya. Tak satu pun tikus terlihat
                    keluar dari persembunyian. Burung hantu mulai gelisah. Ia lelah terbang, tapi belum menemukan makanan. Ia sempat berpikir untuk pergi jauh ke ladang, namun itu akan menghabiskan tenaga. Ia akhirnya bertengger di dahan
                    dan berkata dalam hati, <span className="font-bold"> &quot;Aku akan menunggu dengan sabar. Mungkin mereka akan keluar sebentar lagi.&quot;</span>
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    Tak lama kemudian, seekor tikus kecil muncul dari semak-semak, disusul dua tikus lainnya. Burung hantu pun menyambar salah satunya dengan cepat. Ia pulang ke sarangnya dengan membawa hasil. Anak-anaknya pun makan dengan
                    lahap. Seekor kelelawar yang melihat dari kejauhan terkesan dan bertanya,{' '}
                    <span className="font-bold">
                      &quot;Bagaimana kau tahu harus menunggu di tempat itu?&quot; Burung hantu menjawab, &quot;Pengalaman mengajarku bahwa kadang yang kita butuhkan bukan lebih banyak tenaga, tapi lebih banyak kesabaran.&quot;
                    </span>
                  </p>
                  <p className="whitespace-pre-wrap break-words w-full pr-10 indent-6">
                    <span className="font-bold"> Sejak malam itu, burung hantu selalu mengajarkan kepada anak-anaknya bahwa keberhasilan sering datang kepada mereka yang tahu kapan harus bertindak dan kapan harus menunggu.</span> Ia tak
                    hanya dikenal sebagai pemburu malam yang handal, tetapi juga bijak dan penuh perhitungan. Hewan-hewan di hutan menghormatinya karena ketenangan dan kesabaran yang ia miliki. Bahkan di saat mendesak, burung hantu tetap
                    memilih untuk berpikir jernih dan tidak gegabah.{' '}
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
            <h1 className="font-bold text-center">Burung Hantu yang Sabar Menunggu</h1>
            <p className="indent-6">
              Malam mulai larut ketika seekor burung hantu tua terbang rendah di antara pepohonan. Ia sedang mencari makan untuk anak-anaknya yang menunggu di sarang. Namun, malam itu tak seperti biasanya. Tak satu pun tikus terlihat keluar
              dari persembunyian. Burung hantu mulai gelisah. Ia lelah terbang, tapi belum menemukan makanan. Ia sempat berpikir untuk pergi jauh ke ladang, namun itu akan menghabiskan tenaga. Ia akhirnya bertengger di dahan dan berkata
              dalam hati,{' '}
              <input
                type="text"
                value={answersTwo.one}
                onChange={(e) => setAnswersTwo({ ...answersTwo, one: e.target.value })}
                className={`border-b-2 outline-none border-dotted w-full mt-2 ${isCorrectTwo('one') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />
            </p>
            <p className="indent-6">
              Tak lama kemudian, seekor tikus kecil muncul dari semak-semak, disusul dua tikus lainnya. Burung hantu pun menyambar salah satunya dengan cepat. Ia pulang ke sarangnya dengan membawa hasil. Anak-anaknya pun makan dengan lahap.
              Seekor kelelawar yang melihat dari kejauhan terkesan dan bertanya,{' '}
              <input
                type="text"
                value={answersTwo.two}
                onChange={(e) => setAnswersTwo({ ...answersTwo, two: e.target.value })}
                className={`border-b-2 outline-none border-dotted w-full mt-2 ${isCorrectTwo('two') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />
            </p>
            <p className="indent-6">
              <input
                type="text"
                value={answersTwo.three}
                onChange={(e) => setAnswersTwo({ ...answersTwo, three: e.target.value })}
                className={`border-b-2 outline-none border-dotted w-full mt-2 ${isCorrectTwo('three') ? 'text-green-600 border-green-600 font-bold' : 'text-black border-black'}`}
                placeholder="Ketik jawaban di sini..."
              />{' '}
              Ia tak hanya dikenal sebagai pemburu malam yang handal, tetapi juga bijak dan penuh perhitungan. Hewan-hewan di hutan menghormatinya karena ketenangan dan kesabaran yang ia miliki. Bahkan di saat mendesak, burung hantu tetap
              memilih untuk berpikir jernih dan tidak gegabah.{' '}
            </p>
          </div>

          {/* Navigasi */}
          <div className="flex justify-between w-full px-10 mt-10">
            <button onClick={handleBack}>
              <Image src="/icon/arrow.png" alt="" width={55} height={55} style={{ transform: 'scaleX(-1)' }} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
