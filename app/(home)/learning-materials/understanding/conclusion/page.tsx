import Image from 'next/image';
import { CardConclusion } from './card-conclusion';
import { Caveat_Brush } from 'next/font/google';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

const ConclusionPage = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-20">
      <h1 className={`${caveat.className} text-5xl sm:text-9xl text-white`}>WEPCET</h1>
      <div className="absolute top-0 left-4 ">
        <Image src="/logo/murid.png" alt="murid" width={100} height={100} />
      </div>
      <CardConclusion />
    </section>
  );
};

export default ConclusionPage;
