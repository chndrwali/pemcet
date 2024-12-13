'use client';

import { ButtonNextPrevious } from '@/components/button-next-previous';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

const benefits = [
  { id: 1, text: 'Menghemat Waktu: Dengan membaca cepat, pelajar dapat menyelesaikan bacaan lebih cepat tanpa mengorbankan pemahaman, sehingga dapat menghemat waktu.' },
  { id: 2, text: 'Meningkatkan Produktivitas: Membaca cepat memungkinkan pelajar mengonsumsi lebih banyak informasi dalam waktu singkat, meningkatkan produktivitas dalam belajar atau bekerja.' },
  { id: 3, text: 'Meningkatkan Pemahaman: Teknik membaca cepat melatih otak untuk memahami poin utama dari suatu teks dengan lebih cepat dan efektif.' },
  { id: 4, text: 'Meningkatkan Konsentrasi: Membaca cepat melatih pelajar untuk lebih fokus dan konsisten dalam membaca, karena memerlukan konsentrasi yang lebih tinggi.' },
  { id: 5, text: 'Meningkatkan Memori: Membaca cepat juga membantu dalam meningkatkan daya ingat, karena otak bekerja lebih aktif saat memahami informasi dalam waktu singkat.' },
  { id: 6, text: 'Mengurangi Kebosanan: Dengan teknik membaca cepat, pelajar mengurangi waktu yang diperlukan untuk menyelesaikan satu bacaan, yang bisa mengurangi rasa bosan dalam membaca.' },
  { id: 7, text: 'Mengasah Kemampuan Analisis: Membaca cepat membantu otak menganalisis dan menyaring informasi lebih efisien, sehingga pelajar bisa lebih kritis dalam memahami konten.' },
  { id: 8, text: 'Meningkatkan Kepercayaan Diri: Dengan kemampuan membaca cepat, pelajar akan lebih percaya diri saat harus memahami atau menyampaikan informasi dari berbagai bacaan.' },
  { id: 9, text: 'Meningkatkan Penguasaan Bahasa: Semakin banyak bahan bacaan yang dibaca, semakin bertambah pula kosakata dan pemahaman bahasa siswa.' },
  { id: 10, text: 'Mengurangi Stres: Membaca cepat membantu pelajar mengatasi tumpukan bacaan dengan lebih mudah, yang bisa mengurangi rasa stres atau kewalahan dalam belajar.' },
];

export const CardBenefit = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calculate the items to display based on the current page
  const currentItems = benefits.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Check if there are more items to display
  const hasNextPage = (currentPage + 1) * itemsPerPage < benefits.length;

  return (
    <>
      <div className="w-full rounded-xl bg-blue-900 p-4 mt-[30px]">
        <div className="bg-white rounded-xl">
          <div className={`${inter.className} px-4 py-1 text-sm`}>
            <ul className="list-disc text-justify ml-4">
              {currentItems.map((benefit) => (
                <li key={benefit.id}>
                  <strong>{benefit.text.split(':')[0]}:</strong> {benefit.text.split(':')[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        {currentPage > 0 ? <ButtonNextPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} isLeft={true} /> : <ButtonNextPrevious onClick={() => router.back()} isLeft={true} />}
        {hasNextPage ? <ButtonNextPrevious onClick={() => setCurrentPage((prev) => prev + 1)} isLeft={false} /> : <ButtonNextPrevious onClick={() => router.push('/learning-materials/basic-principles')} isLeft={false} />}
      </div>
    </>
  );
};

export default CardBenefit;
