import React, { useState } from 'react';
import Modal from '@components/ui/modal';  // Импорт вашего компонента Modal
import { User } from '@api/models';
import { changeUserRole, removeUser } from '@services/userService';


type AddMemberModalProps = {
    isOpen: boolean;
    onClose: () => void;
    update: () => void;
    user: User | undefined;
};

const EditEmployeeModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, update, user }) => {
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) {
            throw new Error('User is undefined');
        }
        setIsLoading(true);
        try {
            await changeUserRole(user.id, selectedRole);
            update();
            onClose();
        }
        catch (error) {
            console.error('Failed to change employee role:', error);
        }
        finally{
            setIsLoading(false);
        }
    };

    const hadleEmployeeDelete = async () => {
        if (!user) {
            throw new Error('User is undefined');
        }
        setDeleteLoading(true);
        try {
            const confirmDelete = confirm('Are you sure you want to delete this employee?');
            if (!confirmDelete) {
                return;
            }
            await removeUser(user.id);
            update();
            onClose();
        } catch (error) {
            alert('Failed to delete employee. Please try again.');
            console.error('Failed to delete employee:', error);
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={"Change role: " + user?.firstName}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <select
                        defaultValue={user?.role}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                    >
                        <option value="Employee" key="Employee">Employee</option>
                        <option value="Manager" key="Manager">Manager</option>
                        <option value="Admin" key="Admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className={"btnSecondary w-1/2 mr-5"}
                        disabled={deleteLoading}
                        onClick={hadleEmployeeDelete}
                    >
                        {deleteLoading && (
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        )}
                        {deleteLoading ? 'loading' : 'Delete'}
                    </button>
                    <button
                        type="submit"
                        className="btnPrimary w-full"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        )}
                        {isLoading ? 'loading' : 'Save changes'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditEmployeeModal;
