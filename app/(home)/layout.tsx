import { getCurrentUser } from '@/actions/getCurrentUser';
import { Header } from '@/components/header/header';
import { Background1, Background2 } from '@/lib/svg';
import { Footer } from './footer';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <main className="relative flex flex-col bg-gradient-to-b from-purple-600 via-purple-900 to-darkPurple min-h-screen">
      <Header currentUser={currentUser} />
      <div className="overflow-hidden">
        <div className="absolute top-0 z-10 w-full  h-[20vh] sm:h-[30vh]">
          <Background1 className="w-full h-full" />
        </div>
        <div className="absolute top-20 z-10 w-full  h-[20vh] sm:h-[30vh]">
          <Background2 className="w-full h-full" />
        </div>
      </div>
      {children}
      <Footer />
    </main>
  );
}
