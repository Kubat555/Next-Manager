'use client';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { handleLogin } from '@services/authService';
import { getUserData } from '@services/userService';

export default function LoginForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleLogin(userName, password);
      console.log("Login success");
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-medium mb-6 text-center">Let's log in!</h1>
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center border rounded-lg">
            <AtSymbolIcon className="h-5 w-5 ml-2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="px-4 py-2 w-full focus:outline-none rounded-r-lg"
              required
            />
          </div>
          <div className="mb-4 flex items-center border rounded-lg">
            <KeyIcon className="h-5 w-5 ml-2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 w-full focus:outline-none rounded-r-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg font-semibold btnSecondary"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
