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
    <main className="relative flex flex-col bg-gradient-to-b from-purple-600 via-purple-900 to-darkPurple h-screen">
      <Header currentUser={currentUser} />
      <div className="overflow-hidden">
        <div className="absolute inset-0 top-0 z-10 w-full  h-[20vh] sm:h-[30vh]">
          <Background1 className="w-full h-full" />
        </div>
        <div className="absolute inset-0 top-20 z-10 w-full  h-[20vh] sm:h-[30vh]">
          <Background2 className="w-full h-full" />
        </div>
        <div
          className="absolute inset-0 sm:hidden left-0 top-0 z-20 "
          style={{
            backgroundImage: `url("/icon/left-top.png")`,
            backgroundPosition: 'left top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '200px', // atau ukuran sesuai kebutuhan
            height: '200px',
          }}
        />
        <div
          className="absolute sm:hidden right-0 top-0 z-20 "
          style={{
            backgroundImage: `url("/icon/right-top-1.png")`,
            backgroundPosition: 'right top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '200px', // atau ukuran sesuai kebutuhan
            height: '200px',
          }}
        />
        <div
          className="absolute sm:hidden left-0 top-14 z-20 "
          style={{
            backgroundImage: `url("/icon/left-top-1.png")`,
            backgroundPosition: 'left top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '100px', // atau ukuran sesuai kebutuhan
            height: '100px',
          }}
        />
        <div
          className="absolute sm:hidden left-0 top-36 z-20 "
          style={{
            backgroundImage: `url("/icon/top-left-3.png")`,
            backgroundPosition: 'left top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '300px', // atau ukuran sesuai kebutuhan
            height: '100px',
          }}
        />
        <div
          className="absolute sm:hidden right-0 top-14 z-20 "
          style={{
            backgroundImage: `url("/icon/right-top2.png")`,
            backgroundPosition: 'right top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '100px', // atau ukuran sesuai kebutuhan
            height: '100px',
          }}
        />
      </div>

      {children}

      <Footer />
    </main>
  );
}
