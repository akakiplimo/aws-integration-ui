'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
// import { Button } from "@/components/ui/button";
import {
  Users,
  Database,
  // Folder,
  Settings,
  Home,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  const adminLinks = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: Home,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users,
    },
    {
      title: 'Buckets',
      href: '/admin/buckets',
      icon: Database,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const userLinks = [
    {
      title: 'Dashboard',
      href: '/user',
      icon: Home,
    },
    {
      title: 'My Buckets',
      href: '/user/buckets',
      icon: Database,
    },
    {
      title: 'Settings',
      href: '/user/settings',
      icon: Settings,
    },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-60">
      <div className="flex h-full w-full flex-col overflow-y-auto py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {isAdmin ? 'Admin Panel' : 'User Dashboard'}
          </h2>
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm flex w-full items-center rounded-md p-2 hover:bg-muted',
                  pathname === link.href && 'bg-muted font-medium'
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
