"use client";
import Modal from "@components/ui/modal";
import { FC, useState } from "react";
import { PlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Priority, TaskData, User } from "@api/models";
import { AddNewTask } from "@services/projectsService";
import Link from "next/link";


interface TaskCreateFormProps {
  projectId: number;
  onTaskAdded: () => void;
  users?: User[];
  priorities?: Priority[] | null;
}

const TaskCreateForm: FC<TaskCreateFormProps> = ({ projectId, onTaskAdded, users, priorities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const taskData: TaskData = {
        name: formData.get('name') as string,
        priorityId: parseInt(formData.get('priorityId') as string),
        statusId: 1,
        createdDate: new Date().toISOString().slice(0, 10),
        deadline: formData.get('deadline') as string,
        projectId: projectId,
        executorId: formData.get('executorId') as string,
        description: formData.get('description') as string
      }

      await AddNewTask(taskData);

      handleCloseModal();
      onTaskAdded();
    } catch (error) {
      alert('Failed to create task. Please try again.');
      console.error('Failed to create task:', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="">
      <div className="flex justify-between ">
        <Link href={`/dashboard/projects/${projectId}/edit`} className="btnSecondary flex items-center">
            <Cog6ToothIcon className="w-5 h-5 mr-2 -ms-1" />
            <span>About project</span>
        </Link>
        <button onClick={handleOpenModal} className="btnPrimary">
          <PlusIcon className="w-5 h-5 mr-2 -ms-1" />
          <span>Create task</span>
        </button>
      </div>


      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Create New Task">
        <form onSubmit={handleSubmit} className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type task name"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write task description here"
              ></textarea>
            </div>
            <div className="col-span-2">
              <label htmlFor="priorityId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Priority
              </label>
              <select
                name="priorityId"
                id="priorityId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                {priorities?.map(priority => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="executorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Executor
              </label>
              <select
                name="executorId"
                id="executorId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                {users?.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
          </div>
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
            {isLoading ? 'loading' : 'Add new project'}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default TaskCreateForm;