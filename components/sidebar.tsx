'use client';

import Link from 'next/link';
import NavLinks from '@components/navLinks';
import LogoutForm from './logoutForm';
import { getUserData } from '@services/userService';
import { useEffect, useState } from 'react';
import { User } from '@api/models';
import { isAuthenticated } from '@services/authService';
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/auth/login');
  //   }
  // }, [router]);

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-full text-white md:w-40 text-2xl font-bold">
          <span className="">Hi! Welcome {user?.firstName}</span>
          {user?.role &&
            (<div className="w-32 text-white md:w-40 text-lg mt-5 font-normal md:block hidden">
              Role: {user?.role}
            </div>)}
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <LogoutForm />
      </div>
    </div>
  );
}
