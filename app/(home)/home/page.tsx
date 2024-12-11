import { Metadata } from 'next';
import { Navigation } from './navigation';
import { Caveat_Brush } from 'next/font/google';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Home',
};

const HomePage = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-20">
      <div className="flex items-center justify-center text-center">
        <h1 className={`${caveat.className} text-white text-5xl sm:text-9xl uppercase`}>Menu Utama</h1>
      </div>
      <Navigation />
    </section>
  );
};

export default HomePage;
