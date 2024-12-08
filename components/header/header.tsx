'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './user-menu';
import { SafeUser } from '@/types';

interface HeaderProps {
  currentUser: SafeUser | null;
}

export const Header = ({ currentUser }: HeaderProps) => {
  const pathname = usePathname();

  const isNotHome = ['/learning-materials', '/relevant', '/reading-simulation', '/test-reading', '/test-understanding'].some((path) => pathname.startsWith(path));
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-30 px-1 lg:px-4 w-full bg-transparent py-10 max-lg:py-4">
      <div className="w-full flex items-center justify-between">
        {isAdminPage ? (
          <div />
        ) : (
          <div className="block">
            <Link href="/" className="flex items-center gap-2">
              {isNotHome ? <Image src="/logo/upi.png" alt="upi text" width={44} height={44} /> : <Image src="/logo/upi-text.png" alt="upi text" width={60} height={44} />}
              <Image src="/logo/logo2.png" alt="Logo 2" width={44} height={44} />
            </Link>
          </div>
        )}

        <UserMenu currentUser={currentUser} />
      </div>
    </header>
  );
};
