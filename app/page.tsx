'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LogoutForm from '../components/logoutForm';
import { isAuthenticated } from "@services/authService";
import { User } from '@api/models';
import { getUserData } from '@services/userService';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        router.push('/auth/login');
      }
    };

    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
    else {
      fetchUserData();
    }
  }, [router]);

  return (
    <div>
      {user && (
          <div className="text-center">
            <p>Welcome, {user.firstName} {user.lastName}</p>
            <p>Role: {user.role}</p>
          </div>
        )}
      <div className="p-10 m-5 flex space-x-5 justify-center items-center">
        <Link className="hover:text-blue-500" href="/dashboard">Dashboard</Link>
        <Link className="hover:text-blue-500" href="/auth/login">Login</Link>
        <Link className="hover:text-blue-500" href="/auth/register">Register</Link>
        <LogoutForm />
      </div>
    </div>

  );
}
