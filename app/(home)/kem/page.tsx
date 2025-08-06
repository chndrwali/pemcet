/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Header } from '@/components/header/header';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ReadingStats {
  totalWords: number;
  currentWord: number;
  elapsedTime: number;
  readingTime: number;
}

interface ComprehensionResult {
  isCorrect: boolean;
  userIdea: string;
  systemIdea: string;
  similarity: number;
  keywords: string[];
}

interface SearchResult {
  sentence: string;
  score: number;
}

const Page = () => {
  // File and content state
  const [fileContent, setFileContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [words, setWords] = useState<string[]>([]);
  const [sentences, setSentences] = useState<string[]>([]);

  // Reading display state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(150);
  const [currentWord, setCurrentWord] = useState<string>('Bacaan muncul di sini setelah file dipilih.');

  // Timer state
  const [stats, setStats] = useState<ReadingStats>({
    totalWords: 0,
    currentWord: 0,
    elapsedTime: 0,
    readingTime: 0,
  });

  // Comprehension state
  const [userIdea, setUserIdea] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [comprehensionResult, setComprehensionResult] = useState<ComprehensionResult | null>(null);
  const [kemScore, setKemScore] = useState<number>(0);

  // Refs for intervals
  const readingInterval = useRef<NodeJS.Timeout | null>(null);
  const stopwatchInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(0);

  // File upload handler
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
      setFileName(file.name);

      // Process words and sentences
      const processedWords = content.split(/\s+/).filter((word) => word.length > 0);
      const processedSentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);

      setWords(processedWords);
      setSentences(processedSentences);
      setStats((prev) => ({ ...prev, totalWords: processedWords.length }));
      setCurrentWord("Siap untuk memulai. Klik 'Mulai'.");

      // Reset states
      setCurrentIndex(0);
      setIsReading(false);
      setIsPaused(false);
      setSearchResults([]);
      setComprehensionResult(null);
      setUserIdea('');
      setSearchQuery('');
    };
    reader.readAsText(file);
  }, []);

  const stopReading = useCallback(() => {
    setIsReading(false);
    setIsPaused(false);

    if (readingInterval.current) clearInterval(readingInterval.current);
    if (stopwatchInterval.current) clearInterval(stopwatchInterval.current);

    const finalTime = (Date.now() - startTime.current) / 1000;
    setStats((prev) => ({ ...prev, readingTime: finalTime, elapsedTime: finalTime }));
  }, []);

  // Reading control functions
  const startReading = useCallback(() => {
    if (words.length === 0) return;

    setIsReading(true);
    setIsPaused(false);
    setCurrentIndex(0);
    startTime.current = Date.now();

    // Start stopwatch
    stopwatchInterval.current = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      setStats((prev) => ({ ...prev, elapsedTime: elapsed }));
    }, 100);

    // Start word display
    const millisecondsPerWord = (60 / speed) * 1000;
    readingInterval.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < words.length - 1) {
          const nextIndex = prev + 1;
          setCurrentWord(words[nextIndex]);
          setStats((prevStats) => ({ ...prevStats, currentWord: nextIndex + 1 }));
          return nextIndex;
        } else {
          // Reading finished
          stopReading();
          setCurrentWord('🎉 Selesai!');
          return prev;
        }
      });
    }, millisecondsPerWord);
  }, [words, speed, stopReading]);

  const pauseReading = useCallback(() => {
    setIsPaused(!isPaused);

    if (!isPaused) {
      // Pause
      if (readingInterval.current) clearInterval(readingInterval.current);
      if (stopwatchInterval.current) clearInterval(stopwatchInterval.current);
    } else {
      // Resume
      startTime.current = Date.now() - stats.elapsedTime * 1000;

      stopwatchInterval.current = setInterval(() => {
        const elapsed = (Date.now() - startTime.current) / 1000;
        setStats((prev) => ({ ...prev, elapsedTime: elapsed }));
      }, 100);

      const millisecondsPerWord = (60 / speed) * 1000;
      readingInterval.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < words.length - 1) {
            const nextIndex = prev + 1;
            setCurrentWord(words[nextIndex]);
            setStats((prevStats) => ({ ...prevStats, currentWord: nextIndex + 1 }));
            return nextIndex;
          } else {
            stopReading();
            setCurrentWord('🎉 Selesai!');
            return prev;
          }
        });
      }, millisecondsPerWord);
    }
  }, [isPaused, stats.elapsedTime, speed, words, stopReading]);

  // Update speed during reading
  useEffect(() => {
    if (isReading && !isPaused && readingInterval.current) {
      clearInterval(readingInterval.current);
      const millisecondsPerWord = (60 / speed) * 1000;
      readingInterval.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < words.length - 1) {
            const nextIndex = prev + 1;
            setCurrentWord(words[nextIndex]);
            setStats((prevStats) => ({ ...prevStats, currentWord: nextIndex + 1 }));
            return nextIndex;
          } else {
            stopReading();
            setCurrentWord('🎉 Selesai!');
            return prev;
          }
        });
      }, millisecondsPerWord);
    }
  }, [speed, isReading, isPaused, words, stopReading]);

  // Comprehension functions
  const extractMainIdea = useCallback((text: string) => {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const stopWords = new Set(['dan', 'atau', 'di', 'ke', 'dari', 'yang', 'untuk', 'pada', 'adalah', 'itu', 'ini', 'dengan']);
    const words = text
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.has(word));

    const wordFreq: Record<string, number> = {};
    words.forEach((word) => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const keywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((entry) => entry[0]);

    let mainIdea = '';
    let maxScore = 0;

    sentences.forEach((sentence) => {
      let score = 0;
      const lowerSentence = sentence.toLowerCase();

      keywords.forEach((keyword) => {
        if (lowerSentence.includes(keyword)) {
          score += keyword.length;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        mainIdea = sentence.trim();
      }
    });

    return {
      mainIdea: mainIdea || sentences[0] || 'Tidak dapat menentukan ide pokok',
      keywords: keywords,
    };
  }, []);

  const calculateKEM = useCallback(
    (relevantSentences: number) => {
      const K = stats.totalWords;
      const W = Math.max(stats.readingTime || 1, 1);
      const x = Math.min(relevantSentences, 10);

      const kemValue = (K / W) * 60 * (x / 10);
      setKemScore(kemValue);
    },
    [stats.totalWords, stats.readingTime]
  );

  const checkMainIdea = useCallback(() => {
    if (!userIdea.trim() || !fileContent) return;

    const { mainIdea, keywords } = extractMainIdea(fileContent);
    const userWords = new Set(userIdea.toLowerCase().split(/\s+/));
    const systemWords = new Set(mainIdea.toLowerCase().split(/\s+/));

    let commonWords = 0;
    userWords.forEach((word) => {
      if (systemWords.has(word) && word.length > 3) {
        commonWords++;
      }
    });

    const similarity = commonWords / Math.max(systemWords.size, 1);
    const isCorrect = similarity > 0.3;

    setComprehensionResult({
      isCorrect,
      userIdea,
      systemIdea: mainIdea,
      similarity,
      keywords,
    });

    calculateKEM(isCorrect ? 10 : 2);
  }, [userIdea, fileContent, extractMainIdea, calculateKEM]);

  const performSearch = useCallback(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query || sentences.length === 0) return;

    const matchedSentences = sentences
      .map((sentence) => {
        const cleanSentence = sentence.trim();
        const lowerSentence = cleanSentence.toLowerCase();

        let score = 0;
        const queryWords = query.split(/\s+/);

        queryWords.forEach((word) => {
          if (lowerSentence.includes(word)) {
            score += word.length;
          }
        });

        return {
          sentence: cleanSentence,
          score: score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setSearchResults(matchedSentences);
    calculateKEM(Math.min(matchedSentences.length, 10));
  }, [calculateKEM, searchQuery, sentences]);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const words = query.split(/\s+/);
    let highlighted = text;

    words.forEach((word) => {
      if (word.length > 2) {
        const regex = new RegExp(`(${word})`, 'gi');
        highlighted = highlighted.replace(regex, '<span class="bg-yellow-200 px-1 py-0.5 rounded">$1</span>');
      }
    });

    return highlighted;
  };

  return (
    <main className="min-h-screen bg-center bg-cover bg-pemahaman p-5" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
      <Header />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-2 drop-shadow-lg">Kecepatan Efektif Membaca</h1>
          <p className="text-2xl text-blue-700">(KEM)</p>
        </div>

        {/* File Upload Section */}
        <div className=" bg-white rounded-2xl p-6 shadow-lg border-4 border-blue-400">
          <div className="bg-blue-100 rounded-2xl p-4 text-center border-2 border-dashed border-blue-400 mb-5">
            <h3 className="text-xl font-bold text-blue-800 mb-4">📁 Pilih File Teks (.txt)</h3>
            <div className="flex justify-center">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer"
              />
            </div>
            <div className="mt-3 text-sm text-blue-700 font-bold">{fileName ? `File terpilih: ${fileName}` : 'Belum ada file yang dipilih'}</div>
          </div>
        </div>

        {/* Speed Reading Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-blue-400">
          <h2 className="text-2xl font-bold text-blue-800 text-center mb-6 drop-shadow-md">🚀 Kolom Baca Cepat</h2>

          <div className="h-32 bg-blue-100 border-4 border-blue-400 rounded-2xl flex items-center justify-center text-5xl font-bold text-blue-900 text-center p-4 mb-6 shadow-inner">{currentWord}</div>

          <div className="text-center mb-6">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
              <button
                onClick={startReading}
                disabled={words.length === 0 || isReading}
                className="bg-blue-400 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
              >
                ▶️ Mulai
              </button>

              <button
                onClick={pauseReading}
                disabled={!isReading}
                className="bg-blue-400 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isPaused ? '▶️ Lanjutkan' : '⏸️ Jeda'}
              </button>

              <button
                onClick={stopReading}
                disabled={!isReading}
                className="bg-blue-400 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
              >
                ⏹️ Berhenti
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <label htmlFor="speed" className="font-bold text-blue-800">
                Kecepatan:
              </label>
              <select
                id="speed"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="bg-blue-100 border-2 border-blue-400 rounded-2xl px-4 py-2 font-bold text-blue-800"
                style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
              >
                <option value={80}>🐢 80 kata per menit</option>
                <option value={90}>🐇 90 kata per menit</option>
                <option value={150}>🚶‍ 150 kata per menit</option>
                <option value={200}>🏃‍ 200 kata per menit</option>
                <option value={250}>🚴‍ 250 kata per menit</option>
                <option value={300}>🚗 300 kata per menit</option>
                <option value={400}>✈️ 400 kata per menit</option>
                <option value={500}>🚀 500 kata per menit</option>
                <option value={600}>⚡ 600 kata per menit</option>
              </select>
            </div>
          </div>

          {(isReading || stats.readingTime > 0) && (
            <div className="bg-blue-100 rounded-2xl p-5 border-2 border-blue-400 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-900">
                <p className="text-center">
                  <span className="font-bold">⏱️ Stopwatch:</span>
                  <br />
                  <span className="text-2xl font-bold text-pink-600">{stats.elapsedTime.toFixed(2)} detik</span>
                </p>
                <p className="text-center">
                  <span className="font-bold">🔢 Kata dibaca:</span>
                  <br />
                  <span className="text-xl font-bold">{stats.currentWord}</span>
                </p>
                <p className="text-center">
                  <span className="font-bold">⏳ Waktu baca:</span>
                  <br />
                  <span className="text-xl font-bold">{stats.readingTime.toFixed(2)} detik</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Comprehension Test Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-blue-400">
          <h2 className="text-2xl font-bold text-blue-800 text-center mb-6 drop-shadow-md">🔍 Uji Pemahaman</h2>

          {/* Main Idea Checker */}
          <div className="bg-blue-100 rounded-2xl p-5 border-2 border-blue-400 mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">💡 Periksa Ide Pokok Anda</h3>
            <textarea
              value={userIdea}
              onChange={(e) => setUserIdea(e.target.value)}
              placeholder="Tuliskan ide pokok yang Anda pahami dari bacaan ini..."
              className="w-full min-h-20 p-3 border-2 border-blue-400 rounded-2xl bg-blue-50 text-blue-900 resize-vertical"
              style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
            />
            <button
              onClick={checkMainIdea}
              disabled={!userIdea.trim() || !fileContent}
              className="mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed text-lg"
            >
              ✔️ Periksa Ide Pokok
            </button>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masukkan kata kunci pemahaman Anda..."
              disabled={!fileContent}
              className="w-full p-3 border-2 border-blue-400 rounded-2xl bg-blue-100 text-blue-900 disabled:bg-gray-200 disabled:text-gray-500 mb-4"
              style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
            />

            <div className="text-center">
              <button
                onClick={performSearch}
                disabled={!searchQuery.trim() || !fileContent}
                className="bg-blue-400 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
              >
                🔎 Periksa
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {comprehensionResult && (
              <div className={`p-5 rounded-2xl border-l-8 ${comprehensionResult.isCorrect ? 'bg-green-100 border-green-500 animate-pulse' : 'bg-red-100 border-red-500 animate-pulse'}`}>
                <h4 className="font-bold mb-3 text-lg">Hasil Pemeriksaan Ide Pokok:</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Ide Pokok Sistem:</strong> {comprehensionResult.systemIdea}
                  </p>
                  <p>
                    <strong>Ide Pokok Anda:</strong> {comprehensionResult.userIdea}
                  </p>
                  <p>
                    <strong>Tingkat Kecocokan:</strong> {(comprehensionResult.similarity * 100).toFixed(1)}%
                  </p>
                  <div className={`p-4 rounded-xl mt-4 ${comprehensionResult.isCorrect ? 'bg-green-200' : 'bg-red-200'}`}>
                    <span className="text-3xl mr-3">{comprehensionResult.isCorrect ? '✅' : '❌'}</span>
                    {comprehensionResult.isCorrect ? (
                      <span className="font-bold">
                        Ide pokok Anda <strong>benar</strong>! Bagus sekali!
                      </span>
                    ) : (
                      <span className="font-bold">
                        Ide pokok Anda <strong>kurang tepat</strong>. Coba perhatikan kata kunci: {comprehensionResult.keywords.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div>
                <p className="font-bold mb-4 text-blue-800">Ditemukan {searchResults.length} kalimat relevan:</p>
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <div key={index} className="bg-blue-100 rounded-2xl p-4 border-2 border-blue-400 shadow-md">
                      <div className="flex justify-between items-start">
                        <div
                          className="flex-1 text-blue-900"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(result.sentence, searchQuery),
                          }}
                        />
                        <span className="ml-4 text-xs bg-blue-300 px-3 py-1 rounded-full font-bold text-blue-800">Relevansi: {result.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!comprehensionResult && searchResults.length === 0 && fileContent && <p className="text-blue-700 text-center font-bold">Masukkan kata kunci dan klik &apos;Periksa&apos; untuk mencari kalimat relevan.</p>}

            {!fileContent && <p className="text-blue-700 text-center">Pemahaman Anda yang relevan dengan bacaan akan muncul di sini.</p>}
          </div>

          {/* KEM Statistics */}
          {kemScore > 0 && (
            <div className="bg-blue-100 rounded-2xl p-5 border-2 border-blue-400 mt-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Kecepatan Efektif Membaca (KEM)</h3>
              <p className="font-mono bg-blue-300 p-3 rounded-xl text-blue-900 font-bold mb-4">Rumus: KEM = (K / W × 60) × x / 10</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-900 mb-4">
                <p>
                  K (Jumlah kata): <span className="font-bold">{stats.totalWords}</span>
                </p>
                <p>
                  W (Waktu baca): <span className="font-bold">{stats.readingTime.toFixed(2)} detik</span>
                </p>
                <p>
                  x (Kalimat relevan): <span className="font-bold">{Math.min(searchResults.length || (comprehensionResult?.isCorrect ? 10 : 2), 10)}</span>
                </p>
              </div>
              <p className="text-xl text-center">
                Hasil KEM: <span className={`font-bold text-4xl ${kemScore > 200 ? 'text-green-600' : kemScore > 100 ? 'text-yellow-600' : 'text-red-600'}`}>{kemScore.toFixed(2)}</span> kata per menit
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
