import { Caveat } from 'next/font/google';
import { Metadata } from 'next';
import { CardRelevant } from './card-relevant';

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Relevansi',
};

const RelevantPage = () => {
  return (
    <section className={`${caveat.className} relative flex flex-col z-20`}>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl  sm:text-9xl text-white">WEPCET</h1>
      </div>

      <h2 className="border border-gray-800 rounded-md bg-yellow-400 w-[100px] ml-4 p-1 font-semibold text-lg uppercase text-center">Deskripsi</h2>
      <h3 className="bg-blue-200 rounded-md border border-gray-800 ml-12  p-1 w-[100px] font font-semibold text-lg text-center uppercase">Produk</h3>
      <CardRelevant />
    </section>
  );
};

export default RelevantPage;
