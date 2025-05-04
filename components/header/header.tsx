'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const isNotHome = ['/learning-materials', '/relevant', '/latihan-membaca', '/test-membaca', '/meningkatkan-membaca', '/games', '/doa'].some((path) => pathname.startsWith(path));
  const isNotMaterials = ['/learning-materials', '/latihan-membaca', 'test-membaca', '/meningkatkan-membaca'].some((path) => pathname.startsWith(path));
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 px-2 lg:px-4 w-full bg-transparent py-2">
      <div className="w-full flex items-center justify-between">
        {isAdminPage ? (
          <div />
        ) : (
          <div className="block">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo/upi.png" alt="upi text" width={44} height={44} priority />
              {isNotHome && <Image src="/logo/logo2.png" alt="Logo 2" width={44} height={44} />}
            </Link>
          </div>
        )}
        <div className="flex items-center gap-2">
          {!isNotHome && <Image src="/logo/logo2.png" alt="Logo 2" width={44} height={44} />}
          {isNotHome && (
            <Link
              href={isNotMaterials ? '/learning-materials' : '/'}
              style={{
                backgroundColor: '#fff',
                border: '2px solid #4b7bec',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                padding: '5px',
              }}
              title="Kembali ke Beranda"
            >
              <Image src="/icon/home-page.png" alt="Home" width={35} height={35} style={{ width: '35px', height: '35px' }} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
