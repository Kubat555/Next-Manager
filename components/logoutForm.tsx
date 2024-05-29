
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const LogoutForm = () => {
    const router = useRouter();
    const handleLogout = (event: React.FormEvent) => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        router.push('/auth/login');
      };

    return (
        <form className="w-32" onSubmit={handleLogout}>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>
    );
};

export default LogoutForm;