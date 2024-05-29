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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await handleRegistration(formData);
        if (!res.isSuccess) {
            console.error(res.message);
        } else {
            alert('Confirm your email to complete registration.');
            router.push('/login');
        }
    };

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="flex justify-center items-center h-screen  bg-blue-100">
            <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-screen-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <div className="mb-4 flex justify-between">
                    <div className="w-1/2 mr-2">
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
                    <div className="w-1/2 ml-2">
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
                <div className="mb-4 flex justify-between">
                    <div className="w-1/2 mr-2">
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
                    <div className="w-1/2 ml-2">
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
                <div className="flex items-center justify-between">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
                <div className="mt-4 text-center">
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

