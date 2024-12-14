import { getCurrentUser } from '@/actions/getCurrentUser';
import { Header } from '@/components/header/header';
import { Footer } from './footer';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <main className="relative flex flex-col bg-ungu bg-cover bg-center md:bg-gradient-to-b md:from-purple-600 md:via-purple-900 md:to-darkPurple h-screen">
      <Header currentUser={currentUser} />
      {children}
      <Footer />
    </main>
  );
}
