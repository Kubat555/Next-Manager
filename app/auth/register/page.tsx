'use client';
import { useEffect, useState } from 'react';
import { RegisterData } from '@api/models';
import { handleRegistration, isAuthenticated } from '@services/authService';
import { useRouter } from 'next/navigation';
import { UserIcon, AtSymbolIcon, KeyIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterData>({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        const res = await handleRegistration(formData);
        if (!res.isSuccess) {
            console.error(res.message);
        } else {
            alert('Confirm your email to complete registration.');
            router.push('/auth/login');
        }
        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen  bg-blue-100">
            <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-screen-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-medium mb-10 text-center">Register your new account!</h1>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="md:w-1/2 md:mr-2 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <div className="flex items-center border rounded-lg">
                            <IdentificationIcon className="h-5 w-5 mx-3 text-gray-400" />
                            <input
                                className="shadow appearance-none border-none rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 md:mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <div className="flex items-center border rounded-lg">
                            <IdentificationIcon className="h-5 w-5 mx-3 text-gray-400" />
                            <input
                                className="shadow appearance-none border-none rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="md:w-1/2 md:mr-2 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                            Username
                        </label>
                        <div className="flex items-center border rounded-lg">
                            <UserIcon className="h-5 w-5 mx-3 text-gray-400" />
                            <input
                                className="shadow appearance-none border-none rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="userName"
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 md:mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <div className="flex items-center border rounded-lg">
                            <AtSymbolIcon className="h-5 w-5 mx-3 text-gray-400" />
                            <input
                                className="shadow appearance-none border-none rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className=" mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="flex items-center border rounded-lg">
                        <KeyIcon className="h-5 w-5 mx-3 text-gray-400" />
                        <input
                            className="shadow appearance-none border-none rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="w-80 py-2 px-4 btnSecondary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        )}
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </div>
                <div className="mt-10 text-center">
                    <p>
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;

