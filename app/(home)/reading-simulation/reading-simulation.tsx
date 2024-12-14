'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { PauseCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export const FastReadingSimulation = () => {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // Waktu 45 detik untuk simulasi
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
    setTimeLeft(45);
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
              <h2 className="text-xl font-semibold text-purple-600 mb-2">Pemanasan Mata selama {timeLeft} Detik</h2>
              <div ref={textRef} className="overflow-hidden whitespace-nowrap bg-gray-200 p-4 rounded-lg" style={{ width: '100%', height: '80px', position: 'relative' }}>
                <span
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  Dlahu satau wktu, hduiplah sseekor kcoong brwarna htam di sebuat htuatn. Kcoong tbreseut snagat cpadik dngean mlcari mknaan di mlama hrai. Sautu hiari, ia mnemukan sbeuah bkaul ynag bsurir hkamd dan rtoi. Ia mmberikn
                  mnakanan itu kpada tman-tmannya dngan snagat bhgia. Kcoong itu dketahui mnyuka tlong mnolong dan slalu mbuat sgala mhahluk di htuan trsebut snang. Apda akhrnya, kcoong htam itupun mjadi pmpinan di htuan trsbt krna
                  kbijakannya.
                </span>
              </div>
              <button onClick={handleStop} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 mt-4">
                <PauseCircle size={20} /> Stop Simulasi
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-purple-600 mb-2">Judul: Kucing Hitam yang Bijaksana</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dahulu suatu waktu, hiduplah seekor kucing berwarna hitam di sebuah hutan. Kucing tersebut sangat cerdik dalam mencari makanan di malam hari. Suatu hari, ia menemukan sebuah bakul yang berisi ikan dan roti. Ia memberikan
                makanan itu kepada teman-temannya dengan sangat bahagia. Kucing itu dikenal suka menolong dan selalu membuat segala makhluk di hutan tersebut senang. Pada akhirnya, kucing hitam itu pun menjadi pemimpin di hutan tersebut
                karena kebijakannya.
              </p>
              <button onClick={handleStart} className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-450">
                Mulai Simulasi
              </button>
            </div>
          )}
        </div>
      </div>
      <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
      <ButtonNextPrevious onClick={() => router.push('/reading-simulation')} isLeft={false} />
    </>
  );
};
