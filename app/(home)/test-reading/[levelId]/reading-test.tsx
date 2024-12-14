'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { TestReading } from '@prisma/client';
import { PauseCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface ReadingFastProps {
  reading: TestReading;
}

export const FastReadingTest = ({ reading }: ReadingFastProps) => {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false); // Menjalankan simulasi
  const [isTextFinished, setIsTextFinished] = useState(false); // Menyelesaikan teks berjalan
  const [timeLeft, setTimeLeft] = useState(reading.time); // Timer simulasi
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // Timer habis, hentikan simulasi
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    let animationFrame: number;
    const scrollText = () => {
      if (textRef.current) {
        const element = textRef.current;
        element.scrollLeft += 2; // Kecepatan scroll (1px setiap frame)

        // Jika mencapai akhir teks
        if (element.scrollLeft >= element.scrollWidth - element.clientWidth) {
          setIsTextFinished(true); // Tandai teks selesai
          cancelAnimationFrame(animationFrame);
          return;
        }
      }
      animationFrame = requestAnimationFrame(scrollText);
    };

    if (isRunning && !isTextFinished) {
      animationFrame = requestAnimationFrame(scrollText);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning, isTextFinished]);

  const handleStart = () => {
    if (textRef.current) {
      textRef.current.scrollLeft = 0; // Reset posisi teks saat mulai ulang
    }
    setIsRunning(true);
    setIsTextFinished(false); // Reset state teks selesai
    setTimeLeft(reading.time); // Reset waktu
  };

  const handleStop = () => {
    setIsRunning(false); // Hentikan simulasi
    setIsTextFinished(false); // Reset teks selesai
  };

  return (
    <>
      <div className="bg-blue-900 p-4 rounded-xl">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
          {isRunning ? (
            <div className="max-w-[300px] md:max-w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Test {reading.level} -{' '}
                <span className="text-purple-600">
                  {Math.floor(timeLeft / 60)} Menit {timeLeft % 60} Detik
                </span>
              </h2>
              <div
                ref={textRef}
                className="simulation-container overflow-hidden whitespace-nowrap bg-gray-100 border border-gray-200 p-4 rounded-lg"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: '80px',
                }}
              >
                <span
                  className="scrollable-text"
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  {reading.story}
                </span>
              </div>
              <button onClick={handleStop} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 mt-4">
                <PauseCircle size={20} /> Stop Simulasi
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-purple-600 mb-2">Level: {reading.level}</h1>
              <span className="text-xl font-semibold text-purple-600 mb-2">Waktu: {timeLeft}</span>
              <h2 className="text-xl font-semibold text-purple-600 mb-2">{reading.title}</h2>
              <button onClick={handleStart} className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-900">
                Mulai Test Membaca
              </button>
            </div>
          )}
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious
        onClick={() => {
          let nextPath = '';
          switch (reading.level) {
            case 'Pemula':
              nextPath = '/test-reading/Menengah';
              break;
            case 'Menengah':
              nextPath = '/test-reading/Lanjutan';
              break;
            case 'Lanjutan':
              nextPath = '/test-understanding';
              break;
            default:
              nextPath = '/'; // fallback ke halaman utama jika level tidak diketahui
          }
          router.push(nextPath);
        }}
        isLeft={false}
      />
    </>
  );
};
