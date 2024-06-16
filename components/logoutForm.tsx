"use client";
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@services/authService';
import { useRouter } from 'next/navigation';

const LogoutForm = () => {
    const router = useRouter();
    const handleLogout = (event: React.FormEvent) => {
        event.preventDefault();
        logout();
        router.push('/auth/login');
      };

    return (
        <form className="" onSubmit={handleLogout}>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-sky-500 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>
    );
};

export default LogoutForm;