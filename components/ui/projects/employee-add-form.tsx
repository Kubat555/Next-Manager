import React, { useState } from 'react';
import Modal from '@components/ui/modal';  // Импорт вашего компонента Modal
import {User} from '@api/models';
import { AddEmployee } from '@services/projectsService';

type AddMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: () => void;
  users: User[] | undefined;
  projectId: number;
};

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onAddMember, users, projectId }) => {
  const [selectedUser, setSelectedUser] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
         AddEmployee(selectedUser, projectId); 
        onAddMember();
        onClose();
    }
    catch (error) {
      console.error('Failed to add member:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Member">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          >
            {users && users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btnPrimary flex items-center w-full"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMemberModal;
