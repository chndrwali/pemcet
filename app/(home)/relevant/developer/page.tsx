import { Caveat_Brush } from 'next/font/google';
import { Metadata } from 'next';
import { CardDeveloper } from './card-developer';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Pengembang',
};

const DeveloperPage = () => {
  return (
    <section className={`${caveat.className} relative flex flex-col z-20`}>
      <div className="flex flex-col items-center justify-center">
        <div className=" ml-8 relative custom-wrapper rounded-md border border-[#a3bffa] p-1 z-0">
          <h1 className="relative bg-blue-400 rounded-md py-2 px-6 text-lg font-semibold uppercase z-20">Profil</h1>
        </div>
        <div className="mt-2 relative inline-block bg-yellow-300 rounded-3xl px-4 py-2 border-2 border-neutral-900 shadow-[10px_10px_20px_rgba(0,0,0,0.3)]">
          <span className="absolute text-sm -bottom-2 -left-2 rotate-[-10deg]">✨</span>
          <span className="absolute text-sm -top-2 -right-2 rotate-[15deg]">✨</span>
          <h1 className="text-black font-bold text-lg uppercase font-caveat text-center relative z-10">Pengembangan</h1>
        </div>
      </div>
      <CardDeveloper />
    </section>
  );
};

export default DeveloperPage;
