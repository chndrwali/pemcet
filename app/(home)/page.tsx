import { getCurrentUser } from '@/actions/getCurrentUser';
import { Hero } from './hero';
import { Bottom } from './bottom';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <section className="relative flex flex-col items-center justify-center z-20">
      <div
        className="absolute sm:hidden -left-0 -top-20 z-20 "
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
        className="absolute sm:hidden -right-0 -top-20 z-20 "
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
        className="absolute sm:hidden -left-0 -top-10 z-20 "
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
        className="absolute sm:hidden -right-0 -top-10 z-20 "
        style={{
          backgroundImage: `url("/icon/right-top2.png")`,
          backgroundPosition: 'right top',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '100px', // atau ukuran sesuai kebutuhan
          height: '100px',
        }}
      />
      <Hero currentUser={currentUser} />
      <Bottom />
      <div
        className="absolute sm:hidden -bottom-52 z-20 "
        style={{
          backgroundImage: `url("/icon/light-2.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '100px', // atau ukuran sesuai kebutuhan
          height: '100px',
        }}
      />
    </section>
  );
}
