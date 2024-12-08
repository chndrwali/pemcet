import { getCurrentUser } from '@/actions/getCurrentUser';
import { Header } from '@/components/header/header';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <main className="bg-gradient-to-b from-purple-600 via-purple-900 to-darkPurple min-h-screen">
      <Header currentUser={currentUser} />
      <div className="relative"></div>
      {children}
    </main>
  );
}
