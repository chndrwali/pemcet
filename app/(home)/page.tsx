import { getCurrentUser } from '@/actions/getCurrentUser';
import { Hero } from './hero';
import { Bottom } from './bottom';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <section className="relative flex flex-col items-center justify-center z-50">
      <Hero currentUser={currentUser} />
      <Bottom />
    </section>
  );
}
