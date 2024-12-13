import { Caveat_Brush } from 'next/font/google';
import { CardBasic } from './card-basic';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

const BasicPrinciplesPage = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-20">
      <div className="mt-2 relative inline-block bg-yellow-300 rounded-3xl px-4 py-2 border-2 border-neutral-900 shadow-[10px_10px_20px_rgba(0,0,0,0.3)]">
        <span className="absolute text-sm -bottom-2 -left-2 rotate-[-10deg]">✨</span>
        <span className="absolute text-sm -top-2 -right-2 rotate-[15deg]">✨</span>
        <h1 className={`${caveat.className} text-black font-bold text-lg uppercase text-center relative z-10`}>Prinsip dasar membaca cepat</h1>
      </div>
      <CardBasic />
    </section>
  );
};

export default BasicPrinciplesPage;
