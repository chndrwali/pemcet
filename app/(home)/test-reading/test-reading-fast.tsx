'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { PauseCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export const FastReadingTest = () => {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // Waktu 90 detik untuk simulasi
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    let animationFrame: number;
    const scrollText = () => {
      if (textRef.current) {
        const element = textRef.current;
        element.scrollLeft += 1; // Kecepatan scroll (1px setiap frame)
        if (element.scrollLeft >= element.scrollWidth - element.clientWidth) {
          element.scrollLeft = 0; // Ulangi dari awal
        }
      }
      animationFrame = requestAnimationFrame(scrollText);
    };

    if (isRunning) {
      animationFrame = requestAnimationFrame(scrollText);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(90);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <>
      <div className="bg-blue-900 p-4 rounded-xl">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
          {isRunning ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Sisa waktu -{' '}
                <span className="text-purple-600">
                  {Math.floor(timeLeft / 60)} Menit {timeLeft % 60} Detik{' '}
                </span>
              </h2>
              <div ref={textRef} className="overflow-hidden whitespace-nowrap bg-gray-100 border border-gray-200 p-4 rounded-lg" style={{ width: '100%', height: '80px', position: 'relative' }}>
                <span
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  Di sebuah hutan yang lebat, hiduplah seekor gajah besar dan kuat, serta seekor monyet kecil yang lincah. Gajah sering merasa dirinya lebih hebat karena tubuhnya yang besar dan kuat, sementara monyet sering merasa rendah
                  diri karena tubuhnya yang kecil. Suatu hari, gajah merasa bangga dan berkata kepada monyet, “Lihatlah tubuhku yang besar dan kuat! Aku pasti lebih hebat darimu!” Monyet yang bijaksana hanya tersenyum dan menjawab, “Tidak
                  selalu ukuran menentukan kekuatan. Setiap makhluk memiliki kelebihan masing-masing.” Gajah tertawa mendengar jawaban monyet. Ia menantang monyet untuk berlomba lari mengelilingi hutan. “Lomba lari? Kamu pasti akan kalah,
                  monyet. Aku sangat cepat!” ujar gajah. Monyet tidak keberatan dan setuju untuk ikut lomba. Mereka pun memulai perlombaan. Gajah berlari cepat dengan langkah besar, sementara monyet melompat-lompat kecil dengan gesitnya.
                  Tiba-tiba, mereka sampai di sebuah sungai yang lebar. Gajah bingung karena tubuh besarnya tidak bisa melompat dengan mudah. Monyet, dengan kecepatan dan kelincahannya, melompat dari pohon ke pohon dan menyeberangi sungai
                  dengan mudah. Gajah merasa kecewa, tapi monyet dengan sabar menunggu gajah dan berkata, “Lihat, setiap makhluk memiliki cara tersendiri untuk mengatasi masalah. Kamu hebat dalam hal-hal tertentu, dan aku punya cara
                  sendiri.” Akhirnya, mereka melanjutkan lomba, dan meskipun gajah lebih besar, mereka berdua menyadari bahwa kelebihan masing-masing saling melengkapi.
                </span>
              </div>
              <button onClick={handleStop} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 mt-4">
                <PauseCircle size={20} /> Stop Simulasi
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-purple-600 mb-2">Level: Pemula</h1>
              <h2 className="text-xl font-semibold text-purple-600 mb-2">Kisah Si Gajah dan Si Monyet</h2>
              <span className="text-xl font-semibold text-purple-600 mb-2">Waktu: 1,5 Menit</span>
              <button onClick={handleStart} className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-900">
                Mulai Simulasi
              </button>
            </div>
          )}
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/test-reading')} isLeft={false} />
    </>
  );
};
