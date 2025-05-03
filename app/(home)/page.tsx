import { getCurrentUser } from '@/actions/getCurrentUser';
import { Hero } from './hero';
import { Bottom } from './bottom';
import { Header } from '@/components/header/header';
import Image from 'next/image';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <section className="relative flex flex-col items-center min-h-screen bg-center bg-cover bg-desa z-20">
        <Header currentUser={currentUser} />
        <Hero currentUser={currentUser} />
        <div className="mt-[120px] sm:mt-[150px]">
          <Image src="/anak.png" alt="anak" width={400} height={200} />
        </div>
        <Bottom />
      </section>
      <footer className="text-center bg-white p-4 text-lg italic border-t-2 border border-[#ddd]">
        <p>Literasi sangat penting untuk kehidupan kita, karena literasi adalah kunci menuju pintu-pintu yang tidak terbuka sebelumnya.</p>
      </footer>
    </>
  );
}
