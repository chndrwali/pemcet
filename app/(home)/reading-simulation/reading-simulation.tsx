'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { PauseCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export const FastReadingSimulation = () => {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false); // Menjalankan simulasi
  const [isTextFinished, setIsTextFinished] = useState(false); // Menyelesaikan teks berjalan
  const [timeLeft, setTimeLeft] = useState(30); // Timer simulasi
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
    setTimeLeft(30); // Reset waktu
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
                Pemanasan Mata - <span className="text-purple-600"> {timeLeft} Detik </span>
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
      <ButtonNextPrevious onClick={() => router.push('/test-reading')} isLeft={false} />
    </>
  );
};

// export const FastReadingSimulation = () => {
//   const router = useRouter();
//   const [isRunning, setIsRunning] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30); // Waktu 30 detik untuk simulasi
//   const textRef = useRef<HTMLDivElement>(null);
//   const [scrollFinished, setScrollFinished] = useState(false);

//   useEffect(() => {
//     let timer: NodeJS.Timeout | undefined;
//     if (isRunning && timeLeft > 0) {
//       timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
//     } else if (timeLeft === 0) {
//       setIsRunning(false);
//     }
//     return () => clearTimeout(timer);
//   }, [isRunning, timeLeft]);

//   useEffect(() => {
//     let animationFrame: number;
//     let lastScrollTime = performance.now(); // Catat waktu awal
//     const scrollText = () => {
//       const now = performance.now();
//       const timeElapsed = now - lastScrollTime;

//       // Atur kecepatan (contoh: 50ms per frame)
//       if (timeElapsed > 100) {
//         if (textRef.current) {
//           const element = textRef.current;
//           element.scrollTop += 1; // Tetap gunakan integer untuk scroll
//           if (element.scrollTop >= element.scrollHeight - element.clientHeight) {
//             cancelAnimationFrame(animationFrame);
//             setScrollFinished(true);
//             return;
//           }
//         }
//         lastScrollTime = now; // Reset waktu terakhir
//       }
//       animationFrame = requestAnimationFrame(scrollText);
//     };

//     if (isRunning && !scrollFinished) {
//       animationFrame = requestAnimationFrame(scrollText);
//     }

//     return () => cancelAnimationFrame(animationFrame);
//   }, [isRunning, scrollFinished]);

//   const handleStart = () => {
//     setIsRunning(true);
//     setScrollFinished(false);
//     setTimeLeft(30);

//     if (textRef.current) {
//       textRef.current.scrollTop = 0; // Reset posisi scroll ke atas
//     }
//   };

//   const handleStop = () => {
//     setIsRunning(false);
//   };

//   return (
//     <>
//       <div className="bg-blue-900 p-4 rounded-xl">
//         <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
//           {isRunning ? (
//             <div className="max-w-[300px] md:max-w-full">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Pemanasan Mata - <span className="text-purple-600"> {timeLeft} Detik </span>
//               </h2>
//               <div
//                 ref={textRef}
//                 className="simulation-container overflow-hidden bg-gray-100 border border-gray-200 p-4 rounded-lg"
//                 style={{
//                   width: '100%',
//                   maxWidth: '400px', // Membatasi lebar maksimal
//                   height: '80px', // Tinggi area simulasi
//                   overflowY: 'hidden', // Scroll vertikal tersembunyi
//                 }}
//               >
//                 <span
//                   className="scrollable-text"
//                   style={{
//                     display: 'block',
//                     whiteSpace: 'normal',
//                     fontSize: '1rem',
//                     lineHeight: '1.5',
//                   }}
//                 >
//                   Dlahu satau wktu, hduiplah sseekor kcoong brwarna htam di sebuat htuatn. Kcoong tbreseut snagat cpadik dngean mlcari mknaan di mlama hrai. Sautu hiari, ia mnemukan sbeuah bkaul ynag bsurir hkamd dan rtoi. Ia mmberikn
//                   mnakanan itu kpada tman-tmannya dngan snagat bhgia. Kcoong itu dketahui mnyuka tlong mnolong dan slalu mbuat sgala mhahluk di htuan trsebut snang. Apda akhrnya, kcoong htam itupun mjadi pmpinan di htuan trsbt krna
//                   kbijakannya.
//                 </span>
//               </div>
//               <button onClick={handleStop} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 mt-4">
//                 <PauseCircle size={20} /> Stop Simulasi
//               </button>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-semibold text-purple-600 mb-2">Judul: Kucing Hitam yang Bijaksana</h2>
//               <p className="text-gray-700 leading-relaxed mb-4">
//                 Dahulu suatu waktu, hiduplah seekor kucing berwarna hitam di sebuah hutan. Kucing tersebut sangat cerdik dalam mencari makanan di malam hari. Suatu hari, ia menemukan sebuah bakul yang berisi ikan dan roti. Ia memberikan
//                 makanan itu kepada teman-temannya dengan sangat bahagia. Kucing itu dikenal suka menolong dan selalu membuat segala makhluk di hutan tersebut senang. Pada akhirnya, kucing hitam itu pun menjadi pemimpin di hutan tersebut
//                 karena kebijakannya.
//               </p>
//               <button onClick={handleStart} className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-300">
//                 Mulai Simulasi
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />
//       <ButtonNextPrevious onClick={() => router.push('/test-reading')} isLeft={false} />
//     </>
//   );
// };
