'use client';

import Link from 'next/link';
import NavLinks from '@components/navLinks';
import LogoutForm from './logoutForm';
import { getUserData } from '@services/userService';
import { useEffect, useState } from 'react';
import { User } from '@api/models';
import clsx from 'clsx';


export default function SideNav() {
  const [user, setUser] = useState<{name:string, role:string} | null>(null);


  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-sky-100 p-4 md:h-40"
      >
        <div className="w-ful md:w-40 text-2xl font-bold">
          <span className="sky-animated">Hi! Welcome
            <span className="">
              {" " + user?.name }
            </span>
            {(" ^_^")}
          </span>
          {user?.role &&
            (<div className="w-32  font-bold md:w-40 text-xl mt-5 md:block hidden">
              <span className={clsx({
                "gold-animated": user?.role === 'Admin',
                "magic-animated": user?.role === 'Manager',
                "silver-animated": user?.role === 'Employee',
              })}>
                { user?.role }
              </span>
            </div>)}
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <LogoutForm />
      </div>
    </div>
  );
}
