import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const EmailConfirmationPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className=" p-8 text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                <h1 className="text-2xl font-bold mt-4">Email Confirmed!</h1>
                <p className="text-gray-600 mt-2 mb-5">Your email has been successfully confirmed.</p>
                <Link href="/auth/login" className=" text-blue-500 hover:underline hover:text-blue-600">
                        Go to Login
                </Link>
            </div>
        </div>
    );
};

export default EmailConfirmationPage;
