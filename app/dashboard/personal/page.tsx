"use client";
import { useEffect, useState } from 'react';
import { getUser } from '@services/userService';
import { User } from '@api/models';
import { updateUser } from '@api/data';

const UserPage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const userData = await getUser(userId);
      if(userData) {
          setUser(userData);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
      }
    }
  };

  useEffect(() => {
    
    fetchUser();
  }, []);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const formData = new FormData(e.target as HTMLFormElement);
        const userData: User = {
            id: user?.id as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            role: "",
            email: "",
            userName:"",
        }
        await updateUser(userData);
        alert('User edited successfully');
        localStorage.setItem("userName", firstName)
    } catch (error) {
        alert('Failed to edit User. Please try again.');
        console.error('Failed to edit User:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:w-1/4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-3 mb-5">User Information</h2>
      <form onSubmit={handleSaveChanges}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
          <input
            name="lastName"
            id="lastName"
            type="text"
            
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            defaultValue={user?.email}
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
          <input
            name="role"
            id="role"
            type="text"
            defaultValue={user?.role}
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input
            name="userName"
            id="userName"
            type="text"
            defaultValue={user?.userName}
            disabled
            className="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="btnSecondary w-full flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UserPage;
