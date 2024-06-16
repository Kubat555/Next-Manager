'use client';
import {
  UserGroupIcon,
  UserIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Employees', href: '/dashboard/employees', icon: UserGroupIcon },
  { name: 'Personal', href: '/dashboard/user', icon: UserIcon },
];

export default function NavLinks({ role }: { role: string | undefined }) {
  const pathname = usePathname();
  const filteredLinks = role === "Admin" 
    ? links
    : links.filter(link => link.name !== "Employees");

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-sky-500 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-sky-500': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
