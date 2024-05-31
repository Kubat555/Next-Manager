'use client';

import LoginForm from '@components/loginForm';
import { useEffect } from 'react';
import { isAuthenticated } from '@services/authService';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  // const router = useRouter();
  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     router.push('/');
  //   }
  // }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 z-30">
        <LoginForm />
      </div>
    </main>
  );
}
