import { Metadata } from 'next';
import { NavigationMaterial } from './navigation-materials';
import { Header } from '@/components/header/header';

export const metadata: Metadata = {
  title: 'Materi',
};

const LearningMaterialsPage = async () => {
  return (
    <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-deskripsi z-20">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div
          style={{
            backgroundColor: '#442412',
            color: 'white',
            padding: '15px 40px',
            fontSize: '40px',
            fontWeight: 'bold',
            borderRadius: '30px',
            width: 'fit-content',
            margin: '0 auto 40px auto',
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          Menu Materi
        </div>
        <NavigationMaterial />
      </div>
    </section>
  );
};

export default LearningMaterialsPage;
