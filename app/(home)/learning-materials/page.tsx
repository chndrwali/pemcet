import { Metadata } from 'next';
import { Caveat_Brush } from 'next/font/google';
import { NavigationMaterial } from './navigation-materials';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Materi',
};

const LearningMaterialsPage = () => {
  return (
    <section className={`${caveat.className} relative flex flex-col z-20`}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-9xl text-white">WEPCET</h1>
        <div className="bg-yellow-400 border border-neutral-900 rounded-xl p-2 text-lg uppercase">Menu Materi</div>
        <NavigationMaterial />
      </div>
    </section>
  );
};

export default LearningMaterialsPage;
