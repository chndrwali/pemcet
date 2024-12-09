import { getCurrentUser } from '@/actions/getCurrentUser';
import { Hero } from './hero';
import { Bottom } from './bottom';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <section className="relative flex flex-col items-center justify-center z-20">
      <Hero currentUser={currentUser} />
      <Bottom />
      <div
        className="absolute sm:hidden -bottom-96 z-20 "
        style={{
          backgroundImage: `url("/icon/light-2.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '100%', // atau ukuran sesuai kebutuhan
          height: '200px',
        }}
      />
      <div
        className="absolute sm:hidden -bottom-[360px] z-30 "
        style={{
          backgroundImage: `url("/icon/people.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '100%', // atau ukuran sesuai kebutuhan
          height: '200px',
        }}
      />
    </section>
  );
}
