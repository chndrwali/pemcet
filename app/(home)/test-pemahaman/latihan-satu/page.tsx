'use client';

import { Header } from '@/components/header/header';
import { getAnswerNumber } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [waktu, setWaktu] = useState(36); //36
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

  const [showResults, setShowResults] = useState(false);
  const [wordResults, setWordResults] = useState<{ [key: string]: { correct: number; total: number; inputTotal: number; missed: number; wrong: number; words: { word: string; isCorrect: boolean }[]; percentage: number } }>({});

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

  const checkWordsInSentence = (inputSentence: string, correctSentence: string) => {
    const inputWords = inputSentence
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const correctWords = correctSentence
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    // Check each input word against correct words
    const inputResults = inputWords.map((word) => {
      const cleanWord = word.replace(/[.,!?;:"()]/g, ''); // Remove punctuation for comparison
      const isCorrect = correctWords.some((correctWord) => correctWord.replace(/[.,!?;:"()]/g, '') === cleanWord);
      return { word, isCorrect };
    });

    // Count correct words from input
    const correctInputWords = inputResults.filter((r) => r.isCorrect).length;

    // Calculate based on correct answer length (not input length)
    const totalCorrectWords = correctWords.length;
    const missedWords = totalCorrectWords - correctInputWords;
    const extraWrongWords = inputWords.length - correctInputWords;

    // Score based on correct answer total
    const accuracyPercentage = totalCorrectWords > 0 ? Math.round((correctInputWords / totalCorrectWords) * 100) : 0;

    return {
      correct: correctInputWords,
      total: totalCorrectWords, // Total should be based on correct answer
      inputTotal: inputWords.length,
      missed: missedWords,
      wrong: extraWrongWords,
      words: inputResults,
      percentage: accuracyPercentage,
    };
  };

  const calculateAllResults = () => {
    const results: { [key: string]: { correct: number; total: number; inputTotal: number; missed: number; wrong: number; words: { word: string; isCorrect: boolean }[]; percentage: number } } = {};

    if (step === 3) {
      // Check answers for step 3
      Object.keys(answers).forEach((key) => {
        const inputSentence = answers[key as keyof typeof answers];
        const correctSentence = correctAnswers[key as keyof typeof correctAnswers];
        if (inputSentence.trim()) {
          results[key] = checkWordsInSentence(inputSentence, correctSentence);
        }
      });
    } else if (step === 5) {
      // Check answers for step 5
      Object.keys(answersTwo).forEach((key) => {
        const inputSentence = answersTwo[key as keyof typeof answersTwo];
        const correctSentence = correctAnswers2[key as keyof typeof correctAnswers2];
        if (inputSentence.trim()) {
          results[key] = checkWordsInSentence(inputSentence, correctSentence);
        }
      });
    }

    setWordResults(results);
    setShowResults(true);
  };

  const getWordColorClass = (answerKey: string, wordIndex: number) => {
    if (!showResults || !wordResults[answerKey]) return '';

    const wordResult = wordResults[answerKey].words[wordIndex];
    if (!wordResult) return '';

    return wordResult.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  };

  const renderInputWithWordHighlight = (answerKey: string, value: string, onChange: (value: string) => void, placeholder: string) => {
    if (!showResults || !wordResults[answerKey]) {
      return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="border-b-2 border-dotted outline-none w-full mt-2 text-red-600 border-red-600" placeholder={placeholder} />;
    }

    const words = value.split(/(\s+)/); // Split but keep spaces

    return (
      <div className="border-b-2 border-dotted w-full mt-2 min-h-[2rem] p-1">
        {words.map((part, index) => {
          if (part.match(/\s+/)) {
            return <span key={index}>{part}</span>;
          }

          const wordIndex = words.slice(0, index).filter((p) => !p.match(/\s+/)).length;
          const colorClass = getWordColorClass(answerKey, wordIndex);

          return (
            <span key={index} className={`px-1 rounded ${colorClass}`}>
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  // const isCorrect = (key: keyof typeof answers) => {
  //   if (!showResults) {
  //     return answers[key].trim() === correctAnswers[key];
  //   }

  //   const result = checkWordsInSentence(answers[key], correctAnswers[key]);
  //   return result.percentage >= 70; // Consider correct if 70% or more of required words are present
  // };

  // const isCorrectTwo = (key: keyof typeof answersTwo) => {
  //   if (!showResults) {
  //     return answersTwo[key].trim() === correctAnswers2[key];
  //   }

  //   const result = checkWordsInSentence(answersTwo[key], correctAnswers2[key]);
  //   return result.percentage >= 70; // Consider correct if 70% or more of required words are present
  // };

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
      setWaktu(36); //36
      setMulai(false);
    }

    if (step !== 3 && step !== 5) {
      setShowResults(false);
      setWordResults({});
    }
  }, [step]);

  const handleNext = () => {
    if (step === 3 || step === 5) {
      setShowResults(false);
      setWordResults({});
    }

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
              cokelat. {renderInputWithWordHighlight('one', answers.one, (value) => setAnswers({ ...answers, one: value }), 'Ketik jawaban di sini...')}
            </p>

            <p className="indent-6">
              Ia berpikir sejenak. Lalu, datanglah seekor burung pipit. Burung itu menyapa Kancil dan berkata, &quot;Jika kamu sabar, tunggulah sebentar. Setelah tanah mengendap, air akan menjadi jernih.&quot;{' '}
              {renderInputWithWordHighlight('two', answers.two, (value) => setAnswers({ ...answers, two: value }), 'Ketik jawaban di sini...')}
              Beberapa menit kemudian, air di tepi sungai mulai terlihat jernih. Kancil pun minum perlahan dan merasa segar.
            </p>

            <p className="indent-6">
              Burung pipit tersenyum dan berkata, &quot;Kadang kita hanya perlu bersabar agar bisa membuat keputusan yang baik.&quot;{' '}
              {renderInputWithWordHighlight('three', answers.three, (value) => setAnswers({ ...answers, three: value }), 'Ketik jawaban di sini...')}
              Ia belajar bahwa kesabaran bisa menyelamatkan diri dari bahaya.
            </p>

            <p className="indent-6">
              {renderInputWithWordHighlight('four', answers.four, (value) => setAnswers({ ...answers, four: value }), 'Ketik jawaban di sini...')}
              Ia ingin semua temannya tahu bahwa tidak semua hal harus diselesaikan dengan cepat. Beberapa keputusan perlu waktu dan ketenangan. Bahkan saat menghadapi masalah yang mendesak, seperti rasa haus di musim kemarau, kesabaran
              tetap menjadi kunci utama. Kini, Kancil dikenal bukan hanya sebagai hewan yang cerdik, tetapi juga bijak dalam bersikap.
            </p>
          </div>

          <div className="flex flex-col items-center mt-6 space-y-4">
            <button onClick={calculateAllResults} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Hasil
            </button>

            {showResults && (
              <div className="bg-white border-4 border-blue-600 rounded-lg p-6 max-w-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-800 text-center">Hasil Latihan 1</h3>
                <div className="space-y-4">
                  {Object.entries(wordResults).map(([key, result]) => (
                    <div key={key} className="border-b pb-3">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Jawaban {getAnswerNumber(key)}:</div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        <div>
                          <span className="text-green-600 font-semibold">✓ Benar: {result.correct} kata</span>
                        </div>
                        <div>
                          <span className="text-red-600 font-semibold">✗ Kurang: {result.missed} kata</span>
                        </div>
                        <div>
                          <span className="text-orange-600 font-semibold">📝 Diisi: {result.inputTotal} kata</span>
                        </div>
                        <div>
                          <span className="text-purple-600 font-semibold">📋 Total: {result.total} kata</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold">
                        <span className={`${result.percentage >= 70 ? 'text-green-600' : result.percentage >= 50 ? 'text-orange-600' : 'text-red-600'}`}>Skor: {result.percentage}%</span>
                      </div>
                      {result.wrong > 0 && <div className="text-xs text-red-500 mt-1">({result.wrong} kata salah/tidak relevan)</div>}
                    </div>
                  ))}
                  <div className="text-center pt-4 border-t">
                    <div className="text-lg font-bold text-blue-600">
                      Total Skor Rata-rata: {Object.values(wordResults).length > 0 ? Math.round(Object.values(wordResults).reduce((sum, result) => sum + result.percentage, 0) / Object.values(wordResults).length) : 0}%
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Skor dihitung berdasarkan kelengkapan jawaban yang benar</div>
                  </div>
                </div>
              </div>
            )}
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
              {renderInputWithWordHighlight('one', answersTwo.one, (value) => setAnswersTwo({ ...answersTwo, one: value }), 'Ketik jawaban di sini...')}
              Musim kemarau membuat banyak sungai mengering. Setelah berjalan jauh, akhirnya ia menemukan sebuah sungai kecil. Namun, air sungai itu tampak keruh dan berwarna cokelat.{' '}
              {renderInputWithWordHighlight('two', answersTwo.two, (value) => setAnswersTwo({ ...answersTwo, two: value }), 'Ketik jawaban di sini...')}
            </p>

            <p className="indent-6">
              Ia berpikir sejenak. Lalu, datanglah seekor burung pipit. Burung itu menyapa Kancil dan berkata, &quot;Jika kamu sabar, tunggulah sebentar. Setelah tanah mengendap, air akan menjadi jernih.&quot;{' '}
              {renderInputWithWordHighlight('three', answersTwo.three, (value) => setAnswersTwo({ ...answersTwo, three: value }), 'Ketik jawaban di sini...')}
              Beberapa menit kemudian, air di tepi sungai mulai terlihat jernih. Kancil pun minum perlahan dan merasa segar.
            </p>

            <p className="indent-6">
              Burung pipit tersenyum dan berkata, &quot;Kadang kita hanya perlu bersabar agar bisa membuat keputusan yang baik.&quot; Kancil mengangguk dan mengucapkan terima kasih.
              {renderInputWithWordHighlight('four', answersTwo.four, (value) => setAnswersTwo({ ...answersTwo, four: value }), 'Ketik jawaban di sini...')}
              Ia belajar bahwa kesabaran bisa menyelamatkan diri dari bahaya.
            </p>

            <p className="indent-6">
              {renderInputWithWordHighlight('five', answersTwo.five, (value) => setAnswersTwo({ ...answersTwo, five: value }), 'Ketik jawaban di sini...')}
              Ia ingin semua temannya tahu bahwa tidak semua hal harus diselesaikan dengan cepat. Beberapa keputusan perlu waktu dan ketenangan. Bahkan saat menghadapi masalah yang mendesak, seperti rasa haus di musim kemarau, kesabaran
              tetap menjadi kunci utama. Kini, Kancil dikenal bukan hanya sebagai hewan yang cerdik, tetapi juga bijak dalam bersikap.
            </p>
          </div>

          <div className="flex flex-col items-center mt-6 space-y-4">
            <button onClick={calculateAllResults} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Hasil
            </button>

            {showResults && (
              <div className="bg-white border-4 border-green-600 rounded-lg p-6 max-w-2xl">
                <h3 className="text-xl font-bold mb-4 text-green-800 text-center">Hasil Latihan 2</h3>
                <div className="space-y-4">
                  {Object.entries(wordResults).map(([key, result]) => (
                    <div key={key} className="border-b pb-3">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Jawaban {getAnswerNumber(key)}:</div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        <div>
                          <span className="text-green-600 font-semibold">✓ Benar: {result.correct} kata</span>
                        </div>
                        <div>
                          <span className="text-red-600 font-semibold">✗ Kurang: {result.missed} kata</span>
                        </div>
                        <div>
                          <span className="text-orange-600 font-semibold">📝 Diisi: {result.inputTotal} kata</span>
                        </div>
                        <div>
                          <span className="text-purple-600 font-semibold">📋 Total: {result.total} kata</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold">
                        <span className={`${result.percentage >= 70 ? 'text-green-600' : result.percentage >= 50 ? 'text-orange-600' : 'text-red-600'}`}>Skor: {result.percentage}%</span>
                      </div>
                      {result.wrong > 0 && <div className="text-xs text-red-500 mt-1">({result.wrong} kata salah/tidak relevan)</div>}
                    </div>
                  ))}
                  <div className="text-center pt-4 border-t">
                    <div className="text-lg font-bold text-green-600">
                      Total Skor Rata-rata: {Object.values(wordResults).length > 0 ? Math.round(Object.values(wordResults).reduce((sum, result) => sum + result.percentage, 0) / Object.values(wordResults).length) : 0}%
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Skor dihitung berdasarkan kelengkapan jawaban yang benar</div>
                  </div>
                </div>
              </div>
            )}
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
