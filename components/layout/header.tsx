'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

export function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href={isAdmin ? '/admin' : '/user'} className="font-bold text-xl">
          AWS Integration
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
