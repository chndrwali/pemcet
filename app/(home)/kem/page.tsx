/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Header } from '@/components/header/header';
import { useState, useRef, useEffect } from 'react';

export default function KemReader() {
  const [fileName, setFileName] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [words, setWords] = useState<string[]>([]);
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayWord, setDisplayWord] = useState<string>('Bacaan muncul di sini setelah file dipilih.');
  const [isReading, setIsReading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalSpeed, setIntervalSpeed] = useState<number>(150);
  const [wordCount, setWordCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [matchedSentences, setMatchedSentences] = useState<{ sentence: string; score: number }[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFileName(file.name);
      setFileContent(content);
      const wordArray = content.split(/\s+/).filter((w) => w.length > 0);
      setWords(wordArray);
      setWordCount(0);
      setSentences(content.split(/[.!?]+/).filter((s) => s.trim().length > 0));
      setDisplayWord("Siap untuk memulai. Klik 'Mulai'.");
    };
    reader.readAsText(file);
  };

  const startReading = () => {
    if (!words.length) return;
    setIsReading(true);
    setIsPaused(false);
    setCurrentIndex(0);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
    stopwatchRef.current = setInterval(() => {
      setElapsedTime((prev) => (Date.now() - startTimeRef.current) / 1000);
    }, 100);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= words.length) {
          stopReading();
          setDisplayWord('Selesai!');
          return prev;
        }
        setDisplayWord(words[nextIndex]);
        setWordCount(nextIndex + 1);
        return nextIndex;
      });
    }, (60 / intervalSpeed) * 1000);

    intervalRef.current = interval;
  };

  const pauseReading = () => {
    if (isPaused) {
      startTimeRef.current = Date.now() - elapsedTime * 1000;
      stopwatchRef.current = setInterval(() => {
        setElapsedTime((prev) => (Date.now() - startTimeRef.current) / 1000);
      }, 100);
      startReading();
    } else {
      clearInterval(intervalRef.current!);
      clearInterval(stopwatchRef.current!);
    }
    setIsPaused(!isPaused);
  };

  const stopReading = () => {
    clearInterval(intervalRef.current!);
    clearInterval(stopwatchRef.current!);
    setIsReading(false);
    setIsPaused(false);
  };

  const performSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const matched = sentences
      .map((sentence) => {
        const clean = sentence.trim();
        const lower = clean.toLowerCase();
        let score = 0;
        query.split(/\s+/).forEach((word) => {
          if (lower.includes(word)) score += word.length;
        });
        return { sentence: clean, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setMatchedSentences(matched);
  };

  const calculateKEM = () => {
    const K = words.length;
    const W = elapsedTime || 1;
    const x = Math.min(matchedSentences.length, 10);
    return ((K / W) * 60 * (x / 10)).toFixed(2);
  };

  return (
    <main className="min-h-screen bg-center bg-cover bg-pemahaman">
      <Header />
      <section className="max-w-3xl mx-auto p-4 font-sans ">
        <h1 className="text-center text-2xl font-bold text-red-900">Kecepatan Efektif Membaca</h1>

        <div className="bg-blue-100 p-4 rounded my-4 text-center">
          <h3 className="mb-2 font-semibold">Pilih File Teks (.txt)</h3>
          <input type="file" accept=".txt" onChange={handleFileChange} />
          <div className="text-sm text-gray-600 mt-2">{fileName || 'Belum ada file yang dipilih'}</div>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow my-4">
          <h2 className="text-center font-bold text-xl text-blue-900">Kolom Baca</h2>
          <div className="text-4xl h-24 flex items-center justify-center my-4 bg-white rounded border border-gray-300">{displayWord}</div>
          <div className="text-center space-x-2">
            <button disabled={!words.length || isReading} onClick={startReading}>
              Mulai
            </button>
            <button disabled={!isReading} onClick={pauseReading}>
              {isPaused ? 'Lanjutkan' : 'Jeda'}
            </button>
            <button disabled={!isReading} onClick={stopReading}>
              Berhenti
            </button>
            <select value={intervalSpeed} onChange={(e) => setIntervalSpeed(parseInt(e.target.value))} className="ml-2 rounded border px-2 py-1">
              {[80, 90, 150, 200, 400, 500, 600].map((speed) => (
                <option key={speed} value={speed}>
                  {speed} kata per menit
                </option>
              ))}
            </select>
          </div>

          {isReading && (
            <div className="bg-blue-100 p-4 rounded mt-4">
              <p>
                Stopwatch: <strong>{elapsedTime.toFixed(2)}</strong> detik
              </p>
              <p>
                Jumlah kata yang dibaca: <strong>{wordCount}</strong>
              </p>
              <p>
                Waktu baca: <strong>{elapsedTime.toFixed(2)}</strong> detik
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded shadow my-4">
          <h2 className="text-center font-bold text-xl text-blue-900">Uji Pemahaman</h2>
          <textarea
            className="w-full min-h-[100px] p-2 rounded border"
            placeholder="Masukkan kata kunci pemahaman Anda..."
            value={searchQuery}
            disabled={!fileContent}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && performSearch()}
          ></textarea>
          <div className="text-center mt-2">
            <button onClick={performSearch} disabled={!fileContent}>
              Periksa
            </button>
          </div>

          <div className="mt-4">
            {matchedSentences.length > 0 ? (
              <>
                <p>Ditemukan {matchedSentences.length} kalimat relevan:</p>
                {matchedSentences.map(({ sentence, score }, i) => (
                  <div key={i} className="bg-white border rounded p-2 my-2">
                    <p dangerouslySetInnerHTML={{ __html: highlight(sentence, searchQuery) }} />
                    <span className="text-sm text-gray-600 float-right">Relevansi: {score}</span>
                  </div>
                ))}
                <div className="bg-blue-100 p-4 rounded mt-4">
                  <h3 className="font-bold">Kecepatan Efektif Membaca (KEM)</h3>
                  <p className="text-sm">
                    Rumus: <code>KEM = (K / W × 60) × x / 10</code>
                  </p>
                  <p>K (Jumlah kata): {words.length}</p>
                  <p>W (Waktu baca): {elapsedTime.toFixed(2)} detik</p>
                  <p>x (Kalimat relevan): {matchedSentences.length}</p>
                  <p className="font-bold text-lg">Hasil KEM: {calculateKEM()} kata per menit</p>
                </div>
              </>
            ) : (
              <p>Pemahaman Anda yang relevan dengan bacaan akan muncul di sini.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function highlight(sentence: string, query: string) {
  const queryWords = query.split(/\s+/).filter((w) => w.length > 2);
  let result = sentence;
  queryWords.forEach((word) => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '<span class="bg-yellow-300">$1</span>');
  });
  return result;
}
